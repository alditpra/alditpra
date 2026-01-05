/**
 * Mesh Gradient Colors Configuration
 * Centralized color constants for MeshGradient component
 */

interface GradientOrb {
    color: string;
    opacity: string;
    size: string;
}

// Light mode gradient orbs
export const LIGHT_MODE_ORBS: GradientOrb[] = [
    // Top orbs
    { color: '#7f73ff', opacity: '20', size: 'w-96 h-96' },
    { color: '#35e2c3', opacity: '15', size: 'w-80 h-80' },
    { color: '#14d0f0', opacity: '20', size: 'w-96 h-96' },
    { color: '#f093fb', opacity: '15', size: 'w-72 h-72' },
    { color: '#4facfe', opacity: '20', size: 'w-96 h-96' },
    // Middle left & right orbs
    { color: '#a8edea', opacity: '20', size: 'w-80 h-80' },
    { color: '#fed6e3', opacity: '15', size: 'w-72 h-72' },
    { color: '#fbc2eb', opacity: '15', size: 'w-72 h-72' },
    { color: '#a6c1ee', opacity: '20', size: 'w-80 h-80' },
    // Bottom orbs
    { color: '#f093fb', opacity: '20', size: 'w-96 h-96' },
    { color: '#14d0f0', opacity: '15', size: 'w-80 h-80' },
    { color: '#35e2c3', opacity: '20', size: 'w-96 h-96' },
    { color: '#7f73ff', opacity: '15', size: 'w-72 h-72' },
    { color: '#a8edea', opacity: '20', size: 'w-96 h-96' },
];

// Dark mode gradient orbs
export const DARK_MODE_ORBS: GradientOrb[] = [
    // Top orbs - darker tones
    { color: '#5a4fcf', opacity: '15', size: 'w-96 h-96' },
    { color: '#2bb19a', opacity: '10', size: 'w-80 h-80' },
    { color: '#0ea5c7', opacity: '15', size: 'w-96 h-96' },
    { color: '#c772d8', opacity: '10', size: 'w-72 h-72' },
    { color: '#3a89d4', opacity: '15', size: 'w-96 h-96' },
    // Middle left & right orbs
    { color: '#7fc4c0', opacity: '15', size: 'w-80 h-80' },
    { color: '#d8a5b8', opacity: '10', size: 'w-72 h-72' },
    { color: '#d89ec4', opacity: '10', size: 'w-72 h-72' },
    { color: '#8298c8', opacity: '15', size: 'w-80 h-80' },
    // Bottom orbs
    { color: '#c772d8', opacity: '15', size: 'w-96 h-96' },
    { color: '#0ea5c7', opacity: '10', size: 'w-80 h-80' },
    { color: '#2bb19a', opacity: '15', size: 'w-96 h-96' },
    { color: '#5a4fcf', opacity: '10', size: 'w-72 h-72' },
    { color: '#7fc4c0', opacity: '15', size: 'w-96 h-96' },
];

// Base gradient overlays
export const LIGHT_MODE_BASE_OVERLAY = 'bg-gradient-to-br from-indigo-50/40 via-purple-50/30 to-cyan-50/40';
export const DARK_MODE_BASE_OVERLAY = 'bg-transparent';

// Common styles
export const ORB_BASE_CLASSES = 'rounded-full blur-3xl mix-blend-multiply';
export const ORB_DARK_CLASSES = 'rounded-full blur-3xl mix-blend-screen';
