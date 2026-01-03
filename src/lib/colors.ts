// Design system colors untuk website - using CSS variables from global.css
export const candyColors = [
  {
    bg: "bg-candy-purple/20",
    text: "text-[color:color-mix(in_srgb,var(--candy-purple),black_30%)] dark:text-[color:color-mix(in_srgb,var(--candy-purple),white_40%)]",
    border: "hover:border-candy-purple",
    glow: "var(--candy-purple)",
    hex: "var(--candy-purple)",
    name: "purple"
  },
  {
    bg: "bg-candy-blue/20",
    text: "text-[color:color-mix(in_srgb,var(--candy-blue),black_50%)] dark:text-[color:color-mix(in_srgb,var(--candy-blue),white_40%)]",
    border: "hover:border-candy-blue",
    glow: "var(--candy-blue)",
    hex: "var(--candy-blue)",
    name: "blue"
  },
  {
    bg: "bg-candy-pink/20",
    text: "text-[color:color-mix(in_srgb,var(--candy-pink),black_30%)] dark:text-[color:color-mix(in_srgb,var(--candy-pink),white_40%)]",
    border: "hover:border-candy-pink",
    glow: "var(--candy-pink)",
    hex: "var(--candy-pink)",
    name: "pink"
  },
  {
    bg: "bg-candy-orange/20",
    text: "text-[color:color-mix(in_srgb,var(--candy-orange),black_50%)] dark:text-[color:color-mix(in_srgb,var(--candy-orange),white_40%)]",
    border: "hover:border-candy-orange",
    glow: "var(--candy-orange)",
    hex: "var(--candy-orange)",
    name: "orange"
  },
  {
    bg: "bg-candy-teal/20",
    text: "text-[color:color-mix(in_srgb,var(--candy-teal),black_40%)] dark:text-[color:color-mix(in_srgb,var(--candy-teal),white_40%)]",
    border: "hover:border-candy-teal",
    glow: "var(--candy-teal)",
    hex: "var(--candy-teal)",
    name: "teal"
  }
] as const;

// Color utility functions
export const getColorByIndex = (index: number) => candyColors[index % candyColors.length];