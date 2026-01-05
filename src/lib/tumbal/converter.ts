/**
 * TUMBAL - Tabel Urut Mudah Buat Analisa Lanjutan
 * Enhanced converter library with advanced configuration
 */

// ============================================
// Types
// ============================================

export interface TumbalConfig {
  // Header configuration
  headerRows: number;        // Number of header rows (1-10)
  separator: string;         // Separator for merging headers (" - ")

  // Row configuration
  skipRows: number;          // Skip N rows from top (metadata)
  dataStartRow: number;      // Where actual data starts (after header)
  dataEndRow: number | null; // Where data ends (null = end of file)

  // Column configuration  
  startColumn: number;       // Start from column N (0-indexed)
  endColumn: number | null;  // End at column N (null = all columns)
  excludeColumns: number[];  // Columns to exclude (0-indexed)
}

export interface MergeCell {
  startRow: number;
  endRow: number;
  startCol: number;
  endCol: number;
}

export interface ParsedTable {
  rawData: string[][];       // Raw data from file
  mergedCells: MergeCell[];  // Merged cell info
  sheetName: string;
  fileName: string;
  totalRows: number;
  totalCols: number;
}

export interface ConvertedTable {
  headers: string[];         // Flattened single-row header
  data: string[][];          // Data rows (without header rows)
  stats: {
    originalRows: number;
    originalCols: number;
    dataRows: number;
    processedCols: number;
  };
}

export interface DetectedSection {
  name: string;
  startRow: number;
  endRow: number;
}

// ============================================
// Default Config
// ============================================

export const DEFAULT_CONFIG: TumbalConfig = {
  headerRows: 2,
  separator: ' - ',
  skipRows: 0,
  dataStartRow: 0,  // 0 means auto (after headers)
  dataEndRow: null,
  startColumn: 0,
  endColumn: null,
  excludeColumns: [],
};

// ============================================
// File Parsing
// ============================================

export async function parseFile(file: File): Promise<ParsedTable> {
  const isCSV = file.name.toLowerCase().endsWith('.csv');

  if (isCSV) {
    return parseCSVFile(file);
  } else {
    return parseExcelFile(file);
  }
}

async function parseExcelFile(file: File): Promise<ParsedTable> {
  const data = await file.arrayBuffer();
  const XLSX = await import('xlsx');
  const workbook = XLSX.read(data, { type: 'array' });

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const rawData = XLSX.utils.sheet_to_json<string[]>(sheet, {
    header: 1,
    defval: '',
    blankrows: true, // Keep blank rows for accurate indexing
  });

  const mergedCells: MergeCell[] = [];
  if (sheet['!merges']) {
    for (const merge of sheet['!merges']) {
      mergedCells.push({
        startRow: merge.s.r,
        endRow: merge.e.r,
        startCol: merge.s.c,
        endCol: merge.e.c,
      });
    }
  }

  const totalRows = rawData.length;
  const totalCols = Math.max(...rawData.map(r => r?.length || 0), 0);

  return {
    rawData: rawData.map(row => (row || []).map(cell => String(cell ?? ''))),
    mergedCells,
    sheetName,
    fileName: file.name,
    totalRows,
    totalCols,
  };
}

async function parseCSVFile(file: File): Promise<ParsedTable> {
  const text = await file.text();
  const lines = text.split(/\r?\n/);

  const rawData: string[][] = [];

  for (const line of lines) {
    const row: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if ((char === ',' || char === ';') && !inQuotes) {
        row.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    row.push(current.trim());
    rawData.push(row);
  }

  const totalRows = rawData.length;
  const totalCols = Math.max(...rawData.map(r => r.length), 0);

  return {
    rawData,
    mergedCells: [],
    sheetName: 'Sheet1',
    fileName: file.name,
    totalRows,
    totalCols,
  };
}

// ============================================
// Section Detection
// ============================================

/**
 * Detect sections in the table (e.g., different categories separated by blank rows or headers)
 */
export function detectSections(rawData: string[][]): DetectedSection[] {
  const sections: DetectedSection[] = [];
  let currentSection: DetectedSection | null = null;

  for (let i = 0; i < rawData.length; i++) {
    const row = rawData[i];
    const firstCell = (row[0] || '').trim();
    const isBlankRow = row.every(cell => !cell || !cell.trim());

    // Check if this looks like a section header
    // (first cell has content, most other cells are empty)
    const nonEmptyCells = row.filter(cell => cell && cell.trim()).length;
    const isSectionHeader = firstCell && nonEmptyCells <= 2 && row.length > 3;

    if (isBlankRow) {
      // End current section on blank row
      if (currentSection) {
        currentSection.endRow = i - 1;
        if (currentSection.endRow > currentSection.startRow) {
          sections.push(currentSection);
        }
        currentSection = null;
      }
    } else if (isSectionHeader && !currentSection) {
      // Start new section
      currentSection = {
        name: firstCell,
        startRow: i,
        endRow: rawData.length - 1,
      };
    } else if (!currentSection) {
      // Start default section
      currentSection = {
        name: `Section ${sections.length + 1}`,
        startRow: i,
        endRow: rawData.length - 1,
      };
    }
  }

  // Close last section
  if (currentSection && currentSection.endRow > currentSection.startRow) {
    sections.push(currentSection);
  }

  // If no sections detected, treat entire table as one section
  if (sections.length === 0 && rawData.length > 0) {
    sections.push({
      name: 'All Data',
      startRow: 0,
      endRow: rawData.length - 1,
    });
  }

  return sections;
}

// ============================================
// Header Flattening
// ============================================

function applyMergedCells(data: string[][], mergedCells: MergeCell[]): string[][] {
  const result = data.map(row => [...row]);

  for (const merge of mergedCells) {
    const value = result[merge.startRow]?.[merge.startCol] ?? '';

    for (let r = merge.startRow; r <= merge.endRow && r < result.length; r++) {
      for (let c = merge.startCol; c <= merge.endCol; c++) {
        if (result[r]) {
          while (result[r].length <= c) {
            result[r].push('');
          }
          result[r][c] = value;
        }
      }
    }
  }

  return result;
}

/**
 * Fill empty cells in a row from left (simulates horizontal merged cells)
 * @param row - The row to fill
 * @param maxCols - Maximum columns in the table (to determine fill boundary)
 */
function fillRowFromLeft(row: string[], maxCols: number): string[] {
  // Extend row to maxCols if needed
  const filled = [...row];
  while (filled.length < maxCols) {
    filled.push('');
  }

  // Find the last non-empty cell across ALL columns to determine fill boundary
  // This ensures we fill up to where actual data exists
  let lastNonEmptyIdx = maxCols - 1;

  // But don't fill trailing empties that are beyond actual content
  for (let i = maxCols - 1; i >= 0; i--) {
    if ((filled[i] ?? '').trim()) {
      lastNonEmptyIdx = i;
      break;
    }
  }

  // Fill empty cells from left
  let lastValue = '';
  for (let i = 0; i <= lastNonEmptyIdx; i++) {
    const current = (filled[i] ?? '').trim();
    if (current) {
      lastValue = current;
    } else if (lastValue) {
      filled[i] = lastValue;
    }
  }

  return filled;
}

export function flattenHeaders(
  rawData: string[][],
  mergedCells: MergeCell[],
  config: TumbalConfig
): string[] {
  if (rawData.length === 0) return [];

  // Apply skip rows
  const dataAfterSkip = rawData.slice(config.skipRows);
  if (dataAfterSkip.length === 0) return [];

  // Apply merged cells (for Excel files)
  let dataWithMerges = applyMergedCells(dataAfterSkip, mergedCells.map(m => ({
    ...m,
    startRow: m.startRow - config.skipRows,
    endRow: m.endRow - config.skipRows,
  })));

  // Calculate column range FIRST so we know how far to fill
  const maxCols = Math.max(...dataWithMerges.map(row => row.length));

  // Get header rows
  let headerRows = dataWithMerges.slice(0, Math.min(config.headerRows, dataWithMerges.length));
  if (headerRows.length === 0) return [];

  // Apply fill-right for each header row (simulates merged cells for CSV)
  // This propagates values like "2009" across empty cells to the right
  // Use maxCols to ensure we fill up to the actual data width
  headerRows = headerRows.map(row => fillRowFromLeft(row, maxCols));

  // Calculate column range
  const startCol = config.startColumn;
  const endCol = config.endColumn !== null ? Math.min(config.endColumn, maxCols) : maxCols;
  const excludeSet = new Set(config.excludeColumns || []);

  // Flatten each column vertically (skip excluded columns)
  const headers: string[] = [];

  for (let col = startCol; col < endCol; col++) {
    // Skip excluded columns
    if (excludeSet.has(col)) continue;

    const parts: string[] = [];
    let lastValue = '';

    for (let row = 0; row < headerRows.length; row++) {
      const value = (headerRows[row]?.[col] ?? '').trim();

      // Skip empty values and duplicates from previous row
      if (value && value !== lastValue) {
        parts.push(value);
        lastValue = value;
      }
    }

    const header = parts.length > 0
      ? parts.join(config.separator)
      : `Column ${getColumnLetter(col)}`;

    headers.push(header);
  }

  return headers;
}

function getColumnLetter(index: number): string {
  let letter = '';
  let num = index;

  while (num >= 0) {
    letter = String.fromCharCode((num % 26) + 65) + letter;
    num = Math.floor(num / 26) - 1;
  }

  return letter;
}

// ============================================
// Table Conversion
// ============================================

export function convertTable(
  parsed: ParsedTable,
  config: TumbalConfig
): ConvertedTable {
  // Apply skip rows
  const dataAfterSkip = parsed.rawData.slice(config.skipRows);

  // Flatten headers (already handles excludeColumns)
  const headers = flattenHeaders(parsed.rawData, parsed.mergedCells, config);

  // Calculate data range
  const dataStart = config.dataStartRow > 0
    ? config.dataStartRow
    : config.headerRows;

  const dataEnd = config.dataEndRow !== null
    ? Math.min(config.dataEndRow - config.skipRows, dataAfterSkip.length)
    : dataAfterSkip.length;

  // Extract data rows
  let data = dataAfterSkip.slice(dataStart, dataEnd);

  // Build column indices to include (respecting startColumn, endColumn, excludeColumns)
  const maxCols = Math.max(...dataAfterSkip.map(r => r.length), 0);
  const startCol = config.startColumn;
  const endCol = config.endColumn !== null ? config.endColumn : maxCols;
  const excludeSet = new Set(config.excludeColumns || []);

  const includedCols: number[] = [];
  for (let col = startCol; col < endCol; col++) {
    if (!excludeSet.has(col)) {
      includedCols.push(col);
    }
  }

  // Extract only included columns from each row
  data = data.map(row => {
    return includedCols.map(colIdx => row[colIdx] ?? '');
  });

  // Filter out completely empty rows
  data = data.filter(row => row.some(cell => cell && cell.trim()));

  return {
    headers,
    data,
    stats: {
      originalRows: parsed.totalRows,
      originalCols: parsed.totalCols,
      dataRows: data.length,
      processedCols: headers.length,
    },
  };
}

// ============================================
// Export Functions
// ============================================

export function exportToCSV(table: ConvertedTable, filename: string): void {
  const rows = [table.headers, ...table.data];

  const csvContent = rows.map(row =>
    row.map(cell => {
      const escaped = String(cell).replace(/"/g, '""');
      if (escaped.includes(',') || escaped.includes('"') || escaped.includes('\n')) {
        return `"${escaped}"`;
      }
      return escaped;
    }).join(',')
  ).join('\n');

  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, filename.endsWith('.csv') ? filename : `${filename}.csv`);
}

export async function exportToExcel(table: ConvertedTable, filename: string): Promise<void> {
  const XLSX = await import('xlsx');
  const rows = [table.headers, ...table.data];

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  downloadBlob(blob, filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`);
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
