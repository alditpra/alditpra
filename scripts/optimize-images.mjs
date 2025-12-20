#!/usr/bin/env node

/**
 * Image Optimization Script
 * Compresses and optimizes images for better PageSpeed performance
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');

async function optimizeImage(inputPath, outputPath, options = {}) {
    try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        console.log(`Processing: ${path.basename(inputPath)} (${metadata.width}x${metadata.height}, ${metadata.format})`);

        await image
            .resize(options.width, options.height, {
                fit: options.fit || 'inside',
                withoutEnlargement: true,
            })
            .webp({
                quality: options.quality || 85,
                effort: 6,
            })
            .toFile(outputPath);

        const inputStats = await fs.stat(inputPath);
        const outputStats = await fs.stat(outputPath);
        const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

        console.log(`✓ Saved: ${path.basename(outputPath)} (${(outputStats.size / 1024).toFixed(1)}KB, ${reduction}% reduction)`);

        return {
            input: inputPath,
            output: outputPath,
            originalSize: inputStats.size,
            newSize: outputStats.size,
            reduction: parseFloat(reduction),
        };
    } catch (error) {
        console.error(`✗ Error processing ${inputPath}:`, error.message);
        throw error;
    }
}

async function main() {
    console.log('🖼️  Starting image optimization...\n');

    const optimizations = [];

    // Optimize og-image.png (381KB → target 80KB)
    optimizations.push(
        optimizeImage(
            path.join(publicDir, 'og-image.png'),
            path.join(publicDir, 'og-image.webp'),
            { width: 1200, height: 630, quality: 80 }
        )
    );

    // Create favicon in multiple sizes
    const faviconInput = path.join(publicDir, 'favicon.ico');

    // Generate optimized favicon sizes
    optimizations.push(
        optimizeImage(
            faviconInput,
            path.join(publicDir, 'favicon-32.webp'),
            { width: 32, height: 32, quality: 90 }
        ),
        optimizeImage(
            faviconInput,
            path.join(publicDir, 'favicon-128.webp'),
            { width: 128, height: 128, quality: 85 }
        )
    );

    // Ensure avatar.webp is optimized
    const avatarPath = path.join(publicDir, 'avatar.webp');
    try {
        await fs.access(avatarPath);
        const stats = await fs.stat(avatarPath);
        if (stats.size > 10000) { // If > 10KB, optimize further
            optimizations.push(
                optimizeImage(
                    avatarPath,
                    path.join(publicDir, 'avatar-optimized.webp'),
                    { width: 230, height: 230, quality: 85 }
                )
            );
        }
    } catch (e) {
        console.log('Avatar already optimized or not found');
    }

    const results = await Promise.all(optimizations);

    console.log('\n📊 Optimization Summary:');
    console.log('========================');

    const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
    const totalNew = results.reduce((sum, r) => sum + r.newSize, 0);
    const totalReduction = ((1 - totalNew / totalOriginal) * 100).toFixed(1);

    console.log(`Total original size: ${(totalOriginal / 1024).toFixed(1)}KB`);
    console.log(`Total new size: ${(totalNew / 1024).toFixed(1)}KB`);
    console.log(`Total reduction: ${totalReduction}%`);
    console.log('\n✅ Image optimization complete!\n');
}

main().catch(console.error);
