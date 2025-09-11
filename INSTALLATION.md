# 📦 Installation Guide

## Prerequisites

### Required Software Versions
- **Node.js**: v20.19.5 or higher (v20.x recommended)
- **npm**: v10.8.2 or higher (v10.x recommended)

### Verify Your Environment
```bash
# Check Node.js version
node --version  # Should output v20.19.5 or higher

# Check npm version  
npm --version   # Should output 10.8.2 or higher
```

## Installation Methods

### Method 1: Standard Installation (Recommended)
```bash
# 1. Clone the repository
git clone <repository-url>
cd admin-template-2

# 2. Install dependencies (takes ~75 seconds)
npm install

# 3. Build the project (development mode)
npx ng build --configuration=development

# 4. Start development server
npm start
```

### Method 2: Clean Installation (If Issues Occur)
```bash
# 1. Clean any existing installation
npm run clean

# 2. Fresh install
npm run fresh-install

# 3. Build and start
npx ng build --configuration=development
npm start
```

### Method 3: Using Node Version Manager (Advanced)
```bash
# If using nvm (Node Version Manager)
nvm use          # Uses version specified in .nvmrc
npm install
```

## Common Issues & Solutions

### Issue 1: npm install fails with permission errors
**Solution:**
```bash
# On macOS/Linux - fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules

# Or use nvm instead of global Node.js installation
```

### Issue 2: Node.js version too old
**Solution:**
```bash
# Update Node.js to v20+ using nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

### Issue 3: npm cache corruption
**Solution:**
```bash
# Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue 4: Network/Firewall Issues
**Solution:**
```bash
# Configure npm registry if needed
npm config set registry https://registry.npmjs.org/

# Or use alternative registry
npm config set registry https://registry.npm.taobao.org/
```

### Issue 5: "ENOENT" or "EACCES" errors
**Solution:**
```bash
# On Windows - run as Administrator
# On macOS/Linux - fix directory permissions
sudo chown -R $(whoami) $(pwd)
```

## Validation Steps

After installation, verify everything works:

```bash
# 1. Check build works
npx ng build --configuration=development

# 2. Start dev server
npm start

# 3. Open browser to http://localhost:4200/

# 4. Test authentication (optional)
# Email: admin@example.com
# Password: password
```

## Expected Warnings (Safe to Ignore)

During installation, these warnings are **normal and expected**:
- `npm warn deprecated inflight@1.0.6`
- `npm warn deprecated rimraf@3.0.2` 
- `npm warn deprecated glob@7.2.3`
- Material theme duplication warnings during build

## Troubleshooting

### If All Else Fails
1. **Delete everything and start fresh:**
   ```bash
   rm -rf node_modules package-lock.json .angular dist
   npm install
   ```

2. **Check system requirements:**
   - Ensure 4GB+ RAM available
   - Ensure 2GB+ free disk space
   - Disable antivirus during installation (Windows)

3. **Contact Support:**
   - Include output of `node --version` and `npm --version`
   - Include full error message from `npm install`
   - Specify your operating system

## Build Times Reference
- **npm install**: ~75 seconds (first time)
- **Development build**: ~10 seconds
- **Development server startup**: ~10 seconds
- **Hot reload**: ~2-5 seconds