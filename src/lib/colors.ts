// Design system colors untuk website - using CSS variables from global.css
export const candyColors = [
  {
    bg: "bg-candy-teal/20",
    text: "text-[color:color-mix(in_srgb,var(--candy-teal),black_40%)]",
    border: "hover:border-candy-teal",
    glow: "var(--candy-teal)",
    hex: "var(--candy-teal)",
    name: "teal"
  },
  {
    bg: "bg-candy-blue/20",
    text: "text-[color:color-mix(in_srgb,var(--candy-blue),black_50%)]",
    border: "hover:border-candy-blue",
    glow: "var(--candy-blue)",
    hex: "var(--candy-blue)",
    name: "blue"
  },
  {
    bg: "bg-candy-purple/20",
    text: "text-[color:color-mix(in_srgb,var(--candy-purple),black_30%)]",
    border: "hover:border-candy-purple",
    glow: "var(--candy-purple)",
    hex: "var(--candy-purple)",
    name: "purple"
  },
  {
    bg: "bg-candy-pink/20",
    text: "text-[color:color-mix(in_srgb,var(--candy-pink),black_30%)]",
    border: "hover:border-candy-pink",
    glow: "var(--candy-pink)",
    hex: "var(--candy-pink)",
    name: "pink"
  },
  {
    bg: "bg-candy-yellow/20",
    text: "text-[color:color-mix(in_srgb,var(--candy-yellow),black_50%)]",
    border: "hover:border-candy-yellow",
    glow: "var(--candy-yellow)",
    hex: "var(--candy-yellow)",
    name: "yellow"
  }
] as const;

// Color utility functions
export const getColorByIndex = (index: number) => candyColors[index % candyColors.length];