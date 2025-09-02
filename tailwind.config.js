/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      // Personalizaciones de tema pueden ir aquí
      colors: {
        // Mantener compatibilidad con Angular Material
        'mat-primary': 'rgb(var(--mat-app-primary))',
        'mat-secondary': 'rgb(var(--mat-app-secondary))',
        'mat-accent': 'rgb(var(--mat-app-tertiary))',
      }
    },
  },
  plugins: [],
  // Importante: Evitar conflictos con Angular Material
  corePlugins: {
    preflight: false, // Deshabilitar reset de Tailwind para no interferir con Material
  }
}
