/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'mat-primary': 'rgb(var(--mat-app-primary))',
        'mat-secondary': 'rgb(var(--mat-app-secondary))',
        'mat-accent': 'rgb(var(--mat-app-tertiary))',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
