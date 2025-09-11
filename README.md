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
