# AdminTemplate

Modern Angular 19 admin template with authentication system, Material Design 3, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js v20.19.5+ (specified in `.nvmrc`)
- npm v10.8.2+

### Installation
```bash
# 1. Install dependencies (takes ~75 seconds)
npm install

# 2. Build the project (development mode)
npx ng build --configuration=development

# 3. Start development server
npm start
```

### Demo Credentials
- **Email**: `admin@example.com`
- **Password**: `password`

📖 **For detailed installation instructions and troubleshooting, see [INSTALLATION.md](./INSTALLATION.md)**

## Features

- ✅ **Authentication System**: Login/logout with JWT simulation
- ✅ **Route Protection**: Auth guards with automatic redirects
- ✅ **Material Design 3**: Modern UI components and theming
- ✅ **Dark/Light Themes**: Toggle between color schemes
- ✅ **Responsive Design**: Mobile-first approach with Tailwind CSS
- ✅ **Lazy Loading**: Optimized feature modules
- ✅ **TypeScript**: Full type safety and modern Angular patterns
- ✅ **Multi-language Support (i18n)**: English and Spanish locales

## Internationalization (i18n)

The application supports multiple languages using Angular's native `@angular/localize` package with JSON translation files.

### Supported Languages
- **English (en-US)** - Default source language
- **Spanish (es)** - Complete translation available

### Available Scripts
```bash
# Extract all translatable text from the application
npm run extract-i18n

# Build separate bundles for each language
npm run build:i18n

# Serve specific language versions in development
npm run serve:en    # English version
npm run serve:es    # Spanish version
```

### Building for Different Locales
```bash
# Build English version
npx ng build --configuration=en-US

# Build Spanish version  
npx ng build --configuration=es

# Build all locales (production)
npm run build:i18n
```

### Language Switching
The application includes a language selector in the header that allows users to switch between available languages. The selector:
- Shows the current language flag
- Lists all available languages in a dropdown menu
- Redirects to the appropriate language-specific build
- Remembers user preference in localStorage

### File Structure
```
src/
├── locale/
│   ├── messages.json     # English translations (auto-generated)
│   └── messages.es.json  # Spanish translations
└── app/
    ├── core/services/
    │   └── common-translations.service.ts  # Centralized common strings
    └── shared/components/atoms/
        └── language-selector/              # Language switcher component
```

### Adding New Translations

#### Step 1: Mark Text for Translation
Add `i18n` attributes to HTML elements with unique IDs:
```html
<h1 i18n="@@page.title">Page Title</h1>
<button i18n="@@common.button.save">Save</button>
<input placeholder="Enter name" i18n-placeholder="@@form.name.placeholder">
```

#### Step 2: Extract Translatable Text
```bash
npm run extract-i18n
```
This updates `src/locale/messages.json` with new strings.

#### Step 3: Add Spanish Translations
Update `src/locale/messages.es.json` with the Spanish equivalents:
```json
{
  "locale": "es",
  "translations": {
    "page.title": "Título de la Página",
    "common.button.save": "Guardar",
    "form.name.placeholder": "Ingrese nombre"
  }
}
```

#### Step 4: Test Both Languages
```bash
npm run serve:en    # Test English
npm run serve:es    # Test Spanish
```

### Common Translations Service
The application includes a centralized service for common UI strings like buttons, form labels, and status messages. This ensures consistency and avoids duplication:

```typescript
// Usage example
constructor(private commonTranslations: CommonTranslationsService) {}

// Access common translations
getSaveButtonText() {
  return $localize`:@@common.button.save:Save`;
}
```

### Translation Guidelines
1. **Use Unique IDs**: Always use `@@` followed by a descriptive, hierarchical ID
2. **Namespace Properly**: Group related translations (e.g., `common.button.*`, `dashboard.stats.*`)
3. **Be Descriptive**: IDs should clearly indicate the content and context
4. **Test Thoroughly**: Always test both language versions after adding new translations
5. **Update Documentation**: Keep translation files and documentation in sync

### Adding New Languages
To add a new language (e.g., French):

1. Update `angular.json` to add the new locale configuration
2. Create `src/locale/messages.fr.json` with French translations
3. Add the language to the `LanguageSelectorComponent`
4. Update build scripts in `package.json`
5. Test the new language build

### Technical Details
- **Format**: All translation files use JSON format (no .xlf files)
- **Build Output**: Each language generates a separate build in `dist/admin-template/{locale}/`
- **Base Href**: Each locale uses its own base href (e.g., `/es/`, `/en-US/`)
- **Bundle Size**: Language-specific builds only include their respective translations
## Architecture

- `src/locale/messages.xlf` - Extracted source messages (auto-generated)
- `src/locale/messages.es.json` - Spanish translations (manually maintained)

### Common Translations Service

The `CommonTranslationsService` provides centralized translations for frequently used strings:

- **Buttons**: Save, Cancel, Edit, Delete, etc.
- **Forms**: Field labels, validation messages
- **Navigation**: Menu items, breadcrumbs
- **Tables**: Headers, actions, search
- **Status**: Loading, error, success messages
- **Time**: Relative time expressions

This ensures consistency and reduces duplication across the application.

## Development server

To start a local development server, run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
# Development build (recommended)
npx ng build --configuration=development

# Production build (may fail in restricted environments due to Google Fonts)
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Testing

Unit tests are configured with Karma + Jasmine but no test files exist yet:

```bash
ng test  # Will show "No inputs were found in config file"
```

## Architecture

The project follows a **Hybrid Architecture** pattern:

- **`src/app/core/`** - Singleton services (AuthService, guards, interceptors)
- **`src/app/features/`** - Business feature modules (lazy-loaded)
- **`src/app/layout/`** - App shell components (Header, Sidebar, Footer)  
- **`src/app/shared/`** - Reusable components following Atomic Design
- **`src/themes/`** - SCSS theme files and Material Design setup

## Troubleshooting

If you encounter installation issues:

1. **Clear everything**: `npm run clean && npm run fresh-install`
2. **Check Node.js version**: `node --version` (should be v20+)
3. **See detailed guide**: [INSTALLATION.md](./INSTALLATION.md)

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
