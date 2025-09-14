/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'background': 'var(--mat-sys-color-background)',
        'on-background': 'var(--mat-sys-color-on-background)',
        'surface': 'var(--mat-sys-color-surface)',
        'on-surface': 'var(--mat-sys-color-on-surface)',
        'surface-variant': 'var(--mat-sys-color-surface-variant)',
        'on-surface-variant': 'var(--mat-sys-color-on-surface-variant)',
        'primary': 'var(--mat-sys-color-primary)',
        'on-primary': 'var(--mat-sys-color-on-primary)',
        'secondary': 'var(--mat-sys-color-secondary)',
        'on-secondary': 'var(--mat-sys-color-on-secondary)',
        'tertiary': 'var(--mat-sys-color-tertiary)',
        'on-tertiary': 'var(--mat-sys-color-on-tertiary)',
        'error': 'var(--mat-sys-color-error)',
        'on-error': 'var(--mat-sys-color-on-error)',
        'outline': 'var(--mat-sys-color-outline)',
        'shadow': 'var(--mat-sys-color-shadow)',
        'scrim': 'var(--mat-sys-color-scrim)',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
