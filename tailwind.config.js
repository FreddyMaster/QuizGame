/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#8726c7",
          "secondary": "#3c57d1",
          "accent": "#d4f5ff",
          "neutral": "#140f00",
          "base-100": "#fff",
          "info": "#00e1ff",
          "success": "#4ade80",
          "warning": "#f59e0b",
          "error": "#ef4444",
          "background": "#92d5f0",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
