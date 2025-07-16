# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript-based web component library that provides a `<code-playground>` custom element for displaying editable and executable code in web pages. The component supports JavaScript, HTML, and CSS editing with optional CodeMirror integration for syntax highlighting.

## Development Commands

### Build
- `npm run build` - Development build (outputs to `build/`)
- `npm run dist` - Production build (outputs to `dist/`)

### Linting
- `npm run lint` - Format code with Prettier using config/prettierrc.yaml

### Testing
- **Interactive Test Playground**: `test-playground.html` - Comprehensive testing environment
- **Manual Testing**: Open `test-playground.html` in browser after running `npm run build`
- **No formal test suite**: No automated testing framework configured

### Other
- `npm run preversion` - Runs production build before versioning

## Architecture

### Core Component
- **Main file**: `src/code-playground.ts` - Single TypeScript file containing the entire web component
- **Custom Element**: `CodePlaygroundElement` extends `HTMLElement` and implements the `<code-playground>` web component
- **Shadow DOM**: Component uses Shadow DOM for encapsulation with styles and functionality

### Key Features
1. **Multi-language Support**: Supports JavaScript, HTML, and CSS editing in separate slots
2. **CodeMirror Integration**: Optional integration with CodeMirror for enhanced editing
3. **Live Execution**: JavaScript code is executed in a sandboxed environment
4. **Console Emulation**: Intercepts console calls and displays output within the component
5. **Module Mapping**: Supports custom module resolution via `moduleMap`
6. **Theming**: Built-in tomorrow-night theme with CSS custom properties

### Component Structure
- **Slots**: Uses named slots for different code types (html, javascript, css, style)
- **Button Bar**: Run/Reset buttons with configurable visibility
- **Output Area**: Displays HTML output and console messages
- **Pseudo Console**: Custom console implementation that captures and displays output

### Build System
- **Rollup**: Uses Rollup for bundling with TypeScript plugin
- **Dual Output**: Generates both minified and unminified versions
- **Source Maps**: Enabled for development builds
- **Terser**: Used for minification in production builds

## Configuration Files

### TypeScript
- `tsconfig.json` - TypeScript configuration targeting ES2019 with DOM types
- Includes CodeMirror types, allows UMD global access
- Source maps enabled, strict null checks disabled

### Prettier
- Uses `@cortex-js/prettier-config` package configuration
- Ignores `/demo` and `/dist` directories (see `.prettierignore`)

### Build Configuration
- `rollup.config.js` - Rollup configuration for bundling
- `scripts/build.sh` - Build script that handles development/production builds
- Automatically installs dependencies if `node_modules` missing

## Development Notes

### Code Execution Model
The component processes JavaScript code by:
1. **Isolated Execution**: Each script runs in its own isolated function scope
2. **DOM Scoping**: Intercepting `document.querySelector*` calls to scope them to the component's output area
3. **Console Interception**: Replacing `console.*` calls with custom pseudo-console that displays within the component
4. **Error Handling**: Comprehensive error handling including async/uncaught errors
5. **Module Support**: Handling ES module imports with optional module mapping
6. **Global Function Access**: Functions can be made globally accessible via `window.functionName` for onclick handlers

### Styling System
- Uses CSS custom properties for theming
- Tomorrow-night color scheme as default
- Extensive CodeMirror styling integration
- Responsive design with proper mobile support

### Component Attributes
- `layout`: "stack" or "tabs" for display mode
- `autorun`: "never" or millisecond delay for auto-execution
- `show-line-numbers`: Enable/disable line numbers
- `button-bar-visibility`: "visible", "hidden", or "auto"
- Line marking attributes for highlighting specific lines

## File Structure
```
src/
  code-playground.ts    # Main component implementation
scripts/
  build.sh             # Build script
demo/
  index.html          # Basic demo page
test-playground.html   # Interactive testing environment
build/                 # Development build output
dist/                  # Production build output (when built)
```

## Testing Infrastructure

### Interactive Test Playground
The `test-playground.html` file provides a comprehensive testing environment with:

1. **Console Debug Test**: Tests console interception and output formatting
2. **Basic Console Output**: Tests various console methods (log, warn, error, info)
3. **Interactive Elements**: Tests button click handlers and DOM manipulation
4. **Multi-language Support**: Tests HTML + CSS + JavaScript integration with tabs
5. **Manual Run Mode**: Tests `autorun="never"` functionality
6. **Performance Testing**: Tests timing functions and large operations
7. **Error Handling**: Tests both caught and uncaught error display

### Usage Instructions
```bash
# Build the component
npm run build

# Open test-playground.html in browser
open test-playground.html
```

### Test Scenarios
Each test section includes:
- **Reset/Run buttons**: Manual control over script execution
- **Debug capabilities**: Browser console debugging for component internals
- **Visual feedback**: Console output displayed within each playground
- **Interactive elements**: Working buttons and UI components
- **Error isolation**: Each playground handles its own errors independently

### Key Testing Features
- **Console Interception**: All console output appears in pseudo-console, not browser console
- **Error Isolation**: Errors in one playground don't affect others
- **Async Error Handling**: Even `setTimeout` errors are captured correctly
- **Global Function Access**: Functions can be made globally accessible for onclick handlers
- **Monospace Fonts**: Consistent typography for code and console output

## Development Best Practices

### Console Output
- Use `console.log()`, `console.warn()`, `console.error()` etc. - they will appear in the pseudo-console
- Objects and arrays are properly formatted and displayed
- Timing functions (`console.time`/`console.timeEnd`) work correctly

### Interactive Elements
- Make functions globally accessible: `window.myFunction = function() { ... }`
- Use `onclick="myFunction()"` in HTML for event handlers
- Access DOM elements with `document.getElementById()` (automatically scoped)

### Error Handling
- Both synchronous and asynchronous errors are captured
- Errors appear in the correct playground's pseudo-console
- No cross-contamination between different playground instances

## Known Limitations
- No formal automated test suite
- CodeMirror integration is optional and loaded externally
- Browser compatibility depends on ES2019 features
- Some TypeScript strict mode options are disabled for flexibility