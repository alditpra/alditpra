/**
 * Security utilities for the application
 */

// Error types for better error handling
export enum ErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  PARSE_ERROR = 'PARSE_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export interface AppError {
  type: ErrorType;
  message: string;
  originalError?: unknown;
  context?: Record<string, unknown>;
}

export class DataFetchError extends Error {
  public readonly type: ErrorType;
  public readonly context?: Record<string, unknown>;

  constructor(type: ErrorType, message: string, context?: Record<string, unknown>) {
    super(message);
    this.name = 'DataFetchError';
    this.type = type;
    this.context = context;
  }
}

// Error parsing utility
export function parseError(error: unknown): AppError {
  if (error instanceof DataFetchError) {
    return {
      type: error.type,
      message: error.message,
      originalError: error,
      context: error.context
    };
  }

  if (error instanceof Error) {
    if (error.name === 'AbortError') {
      return {
        type: ErrorType.TIMEOUT_ERROR,
        message: 'Request timeout. Silakan coba lagi.',
        originalError: error
      };
    }

    if (error.message.includes('Failed to fetch')) {
      return {
        type: ErrorType.NETWORK_ERROR,
        message: 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
        originalError: error
      };
    }

    return {
      type: ErrorType.UNKNOWN_ERROR,
      message: error.message || 'Terjadi kesalahan yang tidak diketahui.',
      originalError: error
    };
  }

  return {
    type: ErrorType.UNKNOWN_ERROR,
    message: 'Terjadi kesalahan yang tidak diketahui.',
    originalError: error
  };
}

// Fallback data generator
export function getFallbackLinks() {
  return [
    {
      id: 'fallback-1',
      name: 'Konten Tidak Tersedia',
      description: 'Terjadi kesalahan saat memuat konten. Silakan refresh halaman.',
      icon: 'alert-triangle',
      category: 'lainnya',
      level: 0,
      active: 1,
      order: 999
    }
  ];
}

export function getFallbackCategories() {
  return [
    {
      id: 'lainnya',
      title: 'Lainnya',
      description: 'Konten tidak tersedia',
      icon: 'alert-triangle',
      order: 99,
      active: 1
    }
  ];
}

// Retry mechanism with exponential backoff
export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (attempt === maxRetries) {
        break;
      }

      // Calculate delay with exponential backoff
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}