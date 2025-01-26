var _a;
/* tomorrow-night */
const base00 = '#35434e'; // was #1d1f21;
const base01 = '#282a2e';
const base02 = '#373b41';
const base03 = '#969896';
const base04 = '#b4b7b4';
const base05 = '#c5c8c6'; // base05
const base06 = '#e0e0e0';
const base07 = '#ffffff';
const base0c = '#cc6666'; // base08
const base09 = '#ec9c65';
const base0a = '#f0c674';
const base0b = '#b5bd68';
const base08 = '#8abeb7'; // base0c
const base0d = '#81a2be'; // base0d
const base0e = '#b294bb';
const base0f = '#a3685a';
const RED = base0c;
const YELLOW = base0a;
// const BLUE = base0d;
// const GREEN = base0b;
const DEFAULT_AUTORUN_DELAY = 1000;
const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.css">
<style>

:host {
    display: block;
    font-family: var(--ui-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen-Sans, Ubuntu, Cantarell,
      "Helvetica Neue", "Source Sans Pro"), sans-serif;
    line-height: 1.5;
    margin-top: 8px;
    --_base-00: var(--base-00, ${base00});
    --_base-01: var(--base-01, ${base01});
    --_base-02: var(--base-02, ${base02});
    --_base-03: var(--base-03, ${base03});
    --_base-04: var(--base-04, ${base04});
    --_base-05: var(--base-05, ${base05});
    --_base-06: var(--base-06, ${base06});
    --_base-07: var(--base-07, ${base07});
    --_base-08: var(--base-08, ${base08});
    --_base-09: var(--base-09, ${base09});
    --_base-0a: var(--base-0a, ${base0a});
    --_base-0b: var(--base-0b, ${base0b});
    --_base-0c: var(--base-0c, ${base0c});
    --_base-0d: var(--base-0d, ${base0d});
    --_base-0e: var(--base-0e, ${base0e});
    --_base-0f: var(--base-0f, ${base0f});
    --_semantic-red: var(--semantic-red, ${RED});
    --_semantic-orange: var(--semantic-orange, ${YELLOW});

  }
  :host([hidden]) {
    display: none;
  }

  slot { display: none; }

  .original-content {
    display: none;
  }

  .editors.hidden {
    display: none;
  }

  .__code-playground-container {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    height: 100%;
    min-width: 300px;
    border-radius: 8px;
    width: 100%;
    margin: 0;
    background: transparent
  }

  .__code-playground-editor {
    border: 1px solid #ccc;
    background: var(--base-00);
    color: var(--base-05);
  }

  .__code-playground-container textarea {
    display: block;

    color: var(--text-color);
    background: var(--ui-background);

    min-height: 4em;
    height: 100%;
    width: 100%;

    resize: vertical;

    border: var(--ui-border, 1px solid rgba(0,0,0,.25));
    outline: none;
    font-family: var(--monospace-font-family), 'Berkeley Mono', 'JetBrains Mono', 'IBM Plex Mono', 'Fira Code', monospace;
    font-size: 16px;
    line-height: 1.2;
  }


  .__code-playground-container label {
    display: block;
    font-weight: 700;
    padding-top: 4px;
    padding-bottom: 4px;
}


  :host div.__code-playground-button-bar:not(.visible) {
    display: none !important;
  }

  button svg {
    height: 1em;
    width: 1em;
    margin-right: .55em;
    vertical-align: -.12em;
  }
  

  #run-button:not(.visible) {
    display: none !important;
  }

  .__code-playground-result {
    width: 100%;
    margin: .5em 0 0 0;
  }


  .__code-playground-output {
    display:  flex;
    flex-flow: column;
  }

  .__code-playground-output:not(.visible) {
    display: none !important;
  }

  .__code-playground-output textarea {
    width: calc(100% - 16px);
  }


  .__code-playground-console {
    display: block;
    max-height: 50vh;
    margin: .5em 0 0 0;
    overflow: auto;

    padding: 8px 8px 8px 1em;
    border-radius: 8px;

    color: var(--_base-05);
    background: var(--_base-00);
    border: var(--ui-border, 1px solid rgba(0, 0, 0, .2));

    font-family: var(--monospace-font-family), 'Berkeley Mono', 'JetBrains Mono', 'IBM Plex Mono', 'Fira Code', monospace;
    font-size: 1em;

    white-space: pre-wrap;
  }

  .__code-playground-console:not(.visible) {
    display: none !important;
  }


  .__code-playground-console::selection, 
  .__code-playground-console *::selection {
    background: var(--selection-background, var(--_base-01));
    color: var(--selection-color, inherit);
  }


  .__code-playground-console .sep {
    color: var(--_base-05);
  }
  .__code-playground-console .index {
    color: var(--_base-05);
    opacity: .3;
    float: left;
    width: 0;
    font-style: italic;
  }
  .__code-playground-console .boolean {
    color: var(--_base-0e);
    font-weight: bold;
  }
  .__code-playground-console .empty {
    color: var(--_base-0e);
    font-style: italic;
  }
  .__code-playground-console .null {
    color: var(--_base-0e);
    font-style: italic;
  }
  .__code-playground-console .string {
    color: var(--_base-0a);
    font-weight: bold;
  }
  .__code-playground-console .function {
    color: var(--_base-0b);
  }
  .__code-playground-console .number {
    color: var(--_base-0e);
  }
  .__code-playground-console .property {
    color: var(--_base-0b);
  }
  .__code-playground-console .object {
    color: var(--_base-0b);
  }
  .__code-playground-console .error {
    display: block;
    width: calc(100% + 16px);
    padding-right: 4px;
    padding-top: 8px;
    padding-bottom:8px;
    padding-left: 6px;
    margin: -8px -20px;
    background: var(--red-800);
    color: white;
    border-left: 8px solid var(--_semantic-red);
  }
  .__code-playground-console .warning {
    color: var(--_semantic-orange);
  }
  .__code-playground-console .log {
    color: var(--blue--200);
  }
  .__code-playground-console .group {
    font-weight: bold;
  }
  



@media (prefers-color-scheme: dark) {
  :root {
    --selection-background: var(--primary-color);
    --selection-color: #fff;
  }
}
  

/* Tomorrow Comment */
.hljs-comment {
    color: var(--_base-04);
}

/* Function (JS) and tag (HTML) names */
.hljs-tag, .hljs-title {
    color: var(--_base-0a);
}
  
/* Tomorrow Red */
.hljs-variable,
.hljs-attribute,
.hljs-tag,
.hljs-regexp,
.ruby .hljs-constant,
.xml .hljs-tag .hljs-title,
.xml .hljs-pi,
.xml .hljs-doctype,
.html .hljs-doctype,
.css .hljs-id,
.css .hljs-class,
.css .hljs-pseudo {
  color: var(--_base-0c);
}

/* Tomorrow Orange */
.hljs-number,
.hljs-preprocessor,
.hljs-built_in,
.hljs-literal,
.hljs-params,
.hljs-constant {
  color: var(--_base-09);
  font-weight: normal;
}

/* Tomorrow Yellow */
.ruby .hljs-class .hljs-title,
.css .hljs-rules .hljs-attribute {
    color: var(--_base-0a);
}

/* Tomorrow Green */
.hljs-string,
.hljs-value,
.hljs-inheritance,
.hljs-header,
.ruby .hljs-symbol,
.xml .hljs-cdata {
  color: var(--_base-0b);
}

/* Tomorrow Aqua */
.css .hljs-hexcolor {
  color: var(--_base-08);
}

/* Tomorrow Blue */
.hljs-function,
.python .hljs-decorator,
.python .hljs-title,
.ruby .hljs-function .hljs-title,
.ruby .hljs-title .hljs-keyword,
.perl .hljs-sub,
.javascript .hljs-title,
.coffeescript .hljs-title {
  color: var(--_base-0d);
  font-weight: bold;
}

/* Tomorrow Purple */
.hljs-keyword,
.javascript .hljs-function {
  color: var(--_base-0e);
  font-weight: bold;
}

.hljs {
  display: block;
  background: var(--_base-00);
  color: var(--_base-05);
  padding: 0.5em;
}

.coffeescript .javascript,
.javascript .xml,
.tex .hljs-formula,
.xml .javascript,
.xml .vbscript,
.xml .css,
.xml .hljs-cdata {
    opacity: 0.5;
}

// Rouge typographic adjustments.
// See https://github.com/rouge-ruby/rouge/wiki/List-of-tokens

.highlight .c1,     // Single line comment
.highlight .cm      // Multiline comment
  {
    font-style: italic;
}

.highlight .k,       // keywords
.highlight .kc,       // keywords constant
.highlight .kd,       // keywords declaration
.highlight .kn,       // keywords namespace
.highlight .kp,       // keywords pseudi
.highlight .kr,       // keywords reserved
.highlight .kt,       // keywords type
.highlight .kv       // keywords variable
{
  font-weight: bold;
}

.CodeMirror {
  font-family: var(--monospace-font-family), 'Berkeley Mono', 'JetBrains Mono', 'IBM Plex Mono', 'Fira Code', monospace;
  color: inherit;
}
.cm-s-tomorrow-night.CodeMirror { background: transparent; }
.cm-s-tomorrow-night div.CodeMirror-selected { background: var(--selection-background, var(--_base-01)); color: var(--selection-color, inherit);}

.cm-s-tomorrow-night .CodeMirror-line::selection, .cm-s-tomorrow-night .CodeMirror-line > span::selection, .cm-s-tomorrow-night .CodeMirror-line > span > span::selection { background: var(--selection-background, rgba(45, 45, 45, 0.99)); color: var(--selection-color, inherit);}

.cm-s-tomorrow-night .CodeMirror-line::-moz-selection, .cm-s-tomorrow-night .CodeMirror-line > span::-moz-selection, .cm-s-tomorrow-night .CodeMirror-line > span > span::-moz-selection { background: var(--selection-background, rgba(45, 45, 45, 0.99)); color: var(--selection-color, inherit);}

.cm-s-tomorrow-night .CodeMirror-gutters { background: transparent; border-right: 0px; }
.cm-s-tomorrow-night .CodeMirror-guttermarker { color: var(--_base-0c); }
.cm-s-tomorrow-night .CodeMirror-guttermarker-subtle { color: var(--_base-03); }
.cm-s-tomorrow-night .CodeMirror-linenumber { color: var(--_base-04); opacity: .7; }
.cm-s-tomorrow-night .CodeMirror-cursor { border-left: 1px solid var(--_base-0d); }

.cm-s-tomorrow-night span.cm-comment { color: var(--_base-04); }
.cm-s-tomorrow-night span.cm-atom { color: var(--_base-0e); }
.cm-s-tomorrow-night span.cm-number { color: var(--_base-0e); }

.cm-s-tomorrow-night span.cm-property, .cm-s-tomorrow-night span.cm-attribute { color: var(--_base-0a); }
.cm-s-tomorrow-night span.cm-keyword { color: var(--_base-0c); }
.cm-s-tomorrow-night span.cm-string { color: var(--_base-0b); }

.cm-s-tomorrow-night span.cm-variable { color: var(--_base-0b); }
.cm-s-tomorrow-night span.cm-variable-2 { color: var(--_base-0d); }
.cm-s-tomorrow-night span.cm-def { color: var(--_base-09); }
.cm-s-tomorrow-night span.cm-bracket { color: var(--_base-05); }
.cm-s-tomorrow-night span.cm-tag { color: var(--_base-0a); }
.cm-s-tomorrow-night span.cm-link { color: var(--_base-0e); }
.cm-s-tomorrow-night span.cm-error { background: var(--_base-0c); color: var(--_base-03); }

.cm-s-tomorrow-night .CodeMirror-activeline-background { background: var(--_base-02); }
.cm-s-tomorrow-night .CodeMirror-matchingbracket { text-decoration: underline; color: white !important; }    


.CodeMirror .marked div.CodeMirror-linenumber {
  opacity: 1;
  color: var(--base-07, #fff);
}

.CodeMirror .marked pre.CodeMirror-line::before {
  content: "";
  position: absolute;
  top: 0; 
  left: 0;
  width: 100%; 
  height: 100%;  
  opacity: .5; 
  z-index: -1;
  background: var(--editor-marked-line, var(--cyan-700, #0c6abe)) !important;
}
</style>
<slot name="style"></slot>
`;
const CONSOLE_MAX_LINES = 1000;
class CodePlaygroundElement extends HTMLElement {
    static get observedAttributes() {
        return Object.values(CodePlaygroundElement.attributes);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        const attributes = CodePlaygroundElement.attributes;
        if (name === attributes.markLine ||
            name === attributes.markJavascriptLine) {
            mark(this.shadowRoot, 'javascript', newValue);
        }
        else if (name === attributes.markHtmlLine) {
            mark(this.shadowRoot, 'html', newValue);
        }
        else if (name === attributes.showLineNumbers) {
            this.shadowRoot
                .querySelectorAll('textarea + .CodeMirror')
                .forEach((x) => { var _a; return (_a = x === null || x === void 0 ? void 0 : x['CodeMirror']) === null || _a === void 0 ? void 0 : _a.setLineNumbers(this.showLineNumbers); });
        }
    }
    constructor() {
        var _a;
        super();
        this.dirty = false;
        // True if the user has made some changes to one of the editor
        this.edited = false;
        this.resetting = false;
        this.moduleMap = (_a = window['moduleMap']) !== null && _a !== void 0 ? _a : {};
        this.attachShadow({ mode: 'open', delegatesFocus: true });
    }
    disconnectedCallback() {
        var _a;
        (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        this.resizeObserver = null;
        this.shadowRoot.innerHTML = '';
        this.dirty = true;
        if (this.runTimer)
            clearTimeout(this.runTimer);
        if (this.consoleUpdateTimer)
            clearTimeout(this.consoleUpdateTimer);
        this.edited = false;
        this.resetting = false;
    }
    connectedCallback() {
        const shadowRoot = this.shadowRoot;
        if (!this.id)
            this.id = randomId();
        shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
        const styleSlot = shadowRoot.querySelector('slot[name=style]');
        if (styleSlot) {
            const styleContent = styleSlot
                .assignedNodes()
                .map((node) => node.innerHTML)
                .join('')
                .trim();
            if (styleContent) {
                const style = document.createElement('style');
                style.innerHTML = styleContent;
                shadowRoot.appendChild(style);
            }
        }
        const container = document.createElement('div');
        this.containerId = randomId();
        container.id = this.containerId;
        const containerContent = `<div inert class="original-content" translate="no"><slot name="html"></slot><slot name="javascript"></slot></div>

  <div class="__code-playground-container" translate="no">
  
    <div class="editors hidden" part="editors"></div>

    <div class="__code-playground-button-bar" part="button-bar">
      <button id="reset-button" part="button" disabled><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="history" class="svg-inline--fa fa-history fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 255.532c.252 136.64-111.182 248.372-247.822 248.468-64.014.045-122.373-24.163-166.394-63.942-5.097-4.606-5.3-12.543-.443-17.4l16.96-16.96c4.529-4.529 11.776-4.659 16.555-.395C158.208 436.843 204.848 456 256 456c110.549 0 200-89.468 200-200 0-110.549-89.468-200-200-200-55.52 0-105.708 22.574-141.923 59.043l49.091 48.413c7.641 7.535 2.305 20.544-8.426 20.544H26.412c-6.627 0-12-5.373-12-12V45.443c0-10.651 12.843-16.023 20.426-8.544l45.097 44.474C124.866 36.067 187.15 8 256 8c136.811 0 247.747 110.781 248 247.532zm-167.058 90.173l14.116-19.409c3.898-5.36 2.713-12.865-2.647-16.763L280 259.778V116c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v168.222l88.179 64.13c5.36 3.897 12.865 2.712 16.763-2.647z"></path></svg>Reset</button>

      <button id="run-button" part="button"><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="play" class="svg-inline--fa fa-play fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6zM48 453.5v-395c0-4.6 5.1-7.5 9.1-5.2l334.2 197.5c3.9 2.3 3.9 8 0 10.3L57.1 458.7c-4 2.3-9.1-.6-9.1-5.2z"></path></svg>Run</button>
    </div>

    <div class="__code-playground-result" translate="no">
      <div class="__code-playground-output" part="output" translate="no"></div>
    </div>

  </div>`;
        container.innerHTML = containerContent;
        shadowRoot.appendChild(container);
        // Add event handler for "run" and "reset" button
        shadowRoot
            .getElementById('run-button')
            .addEventListener('click', () => this.run());
        shadowRoot
            .getElementById('reset-button')
            .addEventListener('click', () => this.reset());
        // Track insertion/changes to slots
        shadowRoot.addEventListener('slotchange', () => {
            this.dirty = true;
            requestAnimationFrame(() => this.update());
        });
        this.resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(() => {
                shadowRoot
                    .querySelectorAll('textarea + .CodeMirror')
                    .forEach((x) => { var _a; return (_a = x === null || x === void 0 ? void 0 : x['CodeMirror']) === null || _a === void 0 ? void 0 : _a.refresh(); });
            });
        });
        this.updateButtonBar();
    }
    get outputStylesheets() {
        if (!this.hasAttribute('outputStylesheets'))
            return [];
        return this.getAttribute('outputStylesheets').split(' ');
    }
    set outputStylesheets(value) {
        this.setAttribute('outputStylesheets', value.join(' '));
    }
    get autorun() {
        if (!this.hasAttribute('autorun'))
            return DEFAULT_AUTORUN_DELAY;
        const value = this.getAttribute('autorun');
        if (value === 'never')
            return 'never';
        if (isFinite(parseFloat(value)))
            return parseFloat(value);
        return DEFAULT_AUTORUN_DELAY;
    }
    set autorun(value) {
        this.setAttribute('autorun', value.toString());
        this.updateButtonBar();
    }
    get buttonBarVisibility() {
        var _a, _b;
        const val = (_b = (_a = this.getAttribute('button-bar-visibility')) !== null && _a !== void 0 ? _a : this.getAttribute('buttonBarVisibility')) !== null && _b !== void 0 ? _b : 'auto';
        if (val === 'auto') {
            // Auto = show only when needed (some changes have been made to
            // the content)
            if (this.edited || this.autorun === 'never')
                return 'visible';
            return 'hidden';
        }
        return val;
    }
    set buttonBarVisibility(value) {
        this.setAttribute('buttonBarVisibility', value);
    }
    get buttonBarVisible() {
        var _a, _b;
        return ((_b = (_a = this.shadowRoot
            .querySelector('.__code-playground-button-bar')) === null || _a === void 0 ? void 0 : _a.classList.contains('visible')) !== null && _b !== void 0 ? _b : false);
    }
    updateButtonBar() {
        const buttonBarVisibility = this.buttonBarVisibility;
        const buttonBar = this.shadowRoot.querySelector('.__code-playground-button-bar');
        if (!buttonBar)
            return;
        const resetButton = this.shadowRoot.getElementById('reset-button');
        if (resetButton)
            resetButton.disabled = !this.edited;
        const runButton = this.shadowRoot.getElementById('run-button');
        if (runButton)
            runButton.disabled = false;
        runButton === null || runButton === void 0 ? void 0 : runButton.classList.toggle('visible', this.autorun === 'never');
        buttonBar === null || buttonBar === void 0 ? void 0 : buttonBar.classList.toggle('visible', buttonBarVisibility === 'visible');
    }
    // The content of the code section has changed. Rebuild the editors
    update() {
        var _a;
        if (!this.dirty)
            return;
        this.dirty = false;
        // 1. Update the button bar
        this.updateButtonBar();
        const shadowRoot = this.shadowRoot;
        const editors = shadowRoot.querySelector('.editors');
        // In some cases, update is triggered but the editors are not yet
        // available.
        if (!editors)
            return;
        // 2. Collect the content of each editor
        const slots = [
            ...shadowRoot.querySelectorAll('.original-content slot'),
        ];
        let content = '';
        for (const slot of slots) {
            let text = slot
                .assignedNodes()
                .map((node) => node.innerHTML)
                .join('');
            if (text) {
                // Remove empty comments. This 'trick' is used to work around
                // an issue where Eleventy ignores empty lines in HTML blocks,
                // so an empty comment is inserted, but it now needs to be removed
                // so that the empty line is properly picked up by CodeMirror. Sigh.
                text = text.replace(/<!-- -->/g, '');
                const language = slot.name.toLowerCase();
                content += `<label part="label">${(_a = { html: 'HTML', javascript: 'JavaScript', css: 'CSS', json: 'JSON' }[language]) !== null && _a !== void 0 ? _a : language}</label>
        <div part="editor" class="__code-playground-editor ${language}">
            <textarea spellcheck="false" autocorrect="off"  autocapitalize="off" data-language="${language}">${text}</textarea> 
        </div>`;
            }
        }
        editors.innerHTML = content;
        // 3. Setup editors
        // @todo: migrate to CodeMirror 6: https://codemirror.net/docs/migration/
        // @todo: bundle CodeMirror library with rollup
        // @todo: replace .fromTextArea() with new EditorView()
        // @todo: update CSS (see DOM Structure)
        if ('CodeMirror' in window && window.CodeMirror !== undefined) {
            this.resizeObserver.disconnect();
            shadowRoot
                .querySelectorAll('.editors textarea')
                .forEach((x) => {
                var _a;
                // Watch for re-layout and invoke CodeMirror refresh when they happen
                this.resizeObserver.observe(x.parentElement);
                const lang = (_a = {
                    ts: 'typescript',
                    typescript: 'typescript',
                    js: 'javascript',
                    javascript: 'javascript',
                    json: { name: 'javascript', json: true },
                    css: 'css',
                    html: { name: 'xml', htmlMode: true },
                }[x.dataset.language]) !== null && _a !== void 0 ? _a : 'javascript';
                const editor = CodeMirror.fromTextArea(x, {
                    lineNumbers: this.showLineNumbers,
                    lineWrapping: true,
                    mode: lang,
                    theme: 'tomorrow-night',
                });
                editor.setValue(sanitizeInput(x.value));
                editor.setSize('100%', '100%');
                if (x.dataset.language === 'javascript')
                    mark(shadowRoot, 'javascript', this.getAttribute('markLine'));
                mark(shadowRoot, x.dataset.language, this.getAttribute(`mark${toTitleCase(x.dataset.language)}Line`));
                editor.on('change', () => this.editorContentChanged());
            });
            editors.classList.remove('hidden');
        }
        // 4. Run the playground
        if (this.autorun !== 'never')
            this.run();
        // Refresh the codemirror layouts
        // (important to get the linenumbers to display correctly)
        if ('CodeMirror' in window && window.CodeMirror !== undefined) {
            setTimeout(() => shadowRoot
                .querySelectorAll('textarea + .CodeMirror')
                .forEach((x) => { var _a; return (_a = x === null || x === void 0 ? void 0 : x['CodeMirror']) === null || _a === void 0 ? void 0 : _a.refresh(); }), 128);
        }
    }
    async run() {
        var _a, _b, _c, _d, _e, _f;
        const shadowRoot = this.shadowRoot;
        const result = shadowRoot.querySelector('.__code-playground-result');
        if (!result)
            return;
        // Remove all the script tags that might be there.
        // (This includes the script tags that were added by the previous run)
        result
            .querySelectorAll('.__code-playground-result > script')
            .forEach((x) => result.removeChild(x));
        // Remove all the consoles that might be there.
        // result
        //   .querySelectorAll('.__code-playground-result >.__code-playground-console')
        //   .forEach((x) => result.removeChild(x));
        this.pseudoConsole.clear();
        // Setup the HTML in 'output'
        let htmlContent = '';
        const htmlEditor = shadowRoot.querySelector('textarea[data-language="html"] + .CodeMirror');
        if (htmlEditor) {
            htmlContent = (_a = htmlEditor['CodeMirror']) === null || _a === void 0 ? void 0 : _a.getValue();
        }
        else {
            htmlContent =
                (_c = (_b = shadowRoot.querySelector('textarea[data-language="html"]')) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : '';
        }
        // If the HTML content contains any <script> tags, extract them
        const scriptTags = htmlContent.match(/<script.*>.*?<\/script>/g);
        scriptTags === null || scriptTags === void 0 ? void 0 : scriptTags.forEach((x) => {
            const m = x.match(/<script([^>]*?)>(.*)<\/script>/);
            const regex = new RegExp('[\\s\\r\\t\\n]*([a-z0-9\\-_]+)[\\s\\r\\t\\n]*=[\\s\\r\\t\\n]*([\'"])((?:\\\\\\2|(?!\\2).)*)\\2', 'ig');
            const attributes = {};
            let match;
            while ((match = regex.exec(m[1]))) {
                attributes[match[1]] = match[3];
            }
            const newScript = document.createElement('script');
            Object.keys(attributes).forEach((x) => (newScript[x] = attributes[x]));
            try {
                newScript.textContent = this.processLiveCodeJavascript(m[2]);
                result.appendChild(newScript);
            }
            catch (err) {
                // If there's a syntax error in the script, catch it here
                this.pseudoConsole.error(err.message);
            }
        });
        try {
            this.outputStylesheets.forEach((x) => {
                const href = x.trim();
                if (href.length > 0) {
                    htmlContent = `<link rel="stylesheet" href="${href}"></link>${htmlContent}`;
                }
            });
            const outputElement = shadowRoot.querySelector('div.__code-playground-result > div.__code-playground-output');
            if (outputElement) {
                if (htmlContent)
                    outputElement.classList.add('visible');
                else
                    outputElement.classList.remove('visible');
                outputElement.innerHTML = htmlContent;
            }
        }
        catch (e) {
            // If there's a syntax error in the markup, catch it here
            this.pseudoConsole.error(e.message);
        }
        // Add a new script tag
        const jsEditor = shadowRoot.querySelector('textarea[data-language="javascript"] + .CodeMirror');
        let jsContent = '';
        if (jsEditor) {
            jsContent = (_d = jsEditor['CodeMirror']) === null || _d === void 0 ? void 0 : _d.getValue();
        }
        else {
            jsContent =
                (_f = (_e = shadowRoot.querySelector('textarea[data-language="javascript"]')) === null || _e === void 0 ? void 0 : _e.value) !== null && _f !== void 0 ? _f : '';
        }
        // If there are any custom elements in the HTML wait for them to be
        // defined before executing the script which may refer to them
        for (const x of htmlContent.matchAll(/\<([a-zA-Z0-9]+\-[a-zA-Z0-9]*)[^\>]*\>/g)) {
            await customElements.whenDefined(x[1]);
        }
        const newScript = document.createElement('script');
        newScript.type = 'module';
        try {
            newScript.textContent = this.processLiveCodeJavascript(jsContent);
            // The script is executed when it is inserted in the DOM
            result.appendChild(newScript);
        }
        catch (err) {
            // If there's a syntax error in the script, catch it here
            this.pseudoConsole.error(err.message);
        }
        // Temporarily set the window error handler to catch and report
        // on syntax errors that may be present in the script
        const previousErrorHandler = window.onerror;
        window.onerror = (msg, url, line, _colno, error) => {
            if (url === window.location.href) {
                if (line === 0) {
                    if (typeof (error === null || error === void 0 ? void 0 : error.toString) === 'function') {
                        this.pseudoConsole.error(msg + error.toString());
                    }
                    else {
                        this.pseudoConsole.error(msg);
                    }
                }
                else {
                    this.pseudoConsole.error('Line ' + (line - 1) + '\n   ' + msg);
                }
            }
        };
        setTimeout(() => {
            window.onerror = previousErrorHandler;
        }, 500);
    }
    editorContentChanged() {
        if (this.resetting)
            return;
        this.edited = true;
        this.updateButtonBar();
        if (this.autorun !== 'never') {
            if (this.runTimer)
                clearTimeout(this.runTimer);
            if (this.autorun === 0)
                this.run();
            else
                this.runTimer = setTimeout(() => this.run(), this.autorun);
        }
    }
    reset() {
        this.resetting = true;
        if (this.runTimer)
            clearTimeout(this.runTimer);
        const slots = this.shadowRoot.querySelectorAll('.original-content slot');
        slots.forEach((slot) => {
            var _a;
            const text = slot
                .assignedNodes()
                .map((node) => node.innerText)
                .join('');
            if (text) {
                const editor = this.shadowRoot.querySelector(`textarea[data-language="${slot.name}"] + .CodeMirror`);
                if (editor) {
                    (_a = editor['CodeMirror']) === null || _a === void 0 ? void 0 : _a.setValue(sanitizeInput(text));
                    if (slot.name === 'javascript')
                        mark(this.shadowRoot, 'javascript', this.markLine);
                    else {
                        mark(this.shadowRoot, slot.name, this.getAttribute(`mark-${slot.name}-line`));
                    }
                }
                else {
                    const textarea = this.shadowRoot.querySelector(`textarea[data-language="${slot.name}"]`);
                    if (textarea)
                        textarea.value = sanitizeInput(text);
                }
            }
        });
        this.updateButtonBar();
        this.run();
        this.edited = false;
        this.resetting = false;
        this.updateButtonBar();
    }
    get outputElement() {
        return this.shadowRoot.querySelector('div.__code-playground-output');
    }
    get pseudoConsole() {
        const shadowRoot = this.shadowRoot;
        // root ?? (document.currentScript.getRootNode() as HTMLElement);
        let console = shadowRoot.querySelector('.__code-playground-console');
        if (!console) {
            const result = shadowRoot.querySelector('.__code-playground-result');
            if (!result)
                return { ...window.console, catch: () => { } };
            console = document.createElement('pre');
            console.classList.add('__code-playground-console');
            console.setAttribute('part', 'console');
            result.appendChild(console);
        }
        const updateConsole = () => {
            if (this.consoleUpdateTimer)
                clearTimeout(this.consoleUpdateTimer);
            this.consoleUpdateTimer = setTimeout(() => {
                console.innerHTML = this.consoleContent;
                if (this.consoleContent)
                    console.classList.add('visible');
                else
                    console.classList.remove('visible');
                console.scrollTop = console.scrollHeight;
            }, 100);
        };
        const appendConsole = (msg, cls) => {
            var _a, _b;
            let lines = (_b = (_a = this.consoleContent) === null || _a === void 0 ? void 0 : _a.split('\n')) !== null && _b !== void 0 ? _b : [];
            if (lines.length > CONSOLE_MAX_LINES)
                lines = lines.slice(lines.length - CONSOLE_MAX_LINES + 1);
            // Simulate a slow teleprinter
            if (this.consoleUpdateTimer)
                clearTimeout(this.consoleUpdateTimer);
            console.classList.add('visible');
            const that = this;
            echo(msg + '\n', (s) => {
                var _a;
                that.consoleContent =
                    (cls ? `<span class="${cls}">` : '') +
                        lines.join('\n') +
                        '&nbsp;&nbsp;'.repeat((_a = parseInt(console.dataset['group-level'])) !== null && _a !== void 0 ? _a : 0) +
                        s +
                        (cls ? '</span>' : '');
                console.innerHTML = that.consoleContent;
                console.scrollTop = console.scrollHeight;
            }, () => updateConsole());
            // msg += '\n';
            // this.consoleContent =
            //   (cls ? `<span class="${cls}">` : '') +
            //   lines.join('\n') +
            //   '&nbsp;&nbsp;'.repeat(parseInt(console.dataset['group-level']) ?? 0) +
            //   msg +
            //   (cls ? '</span>' : '');
            // updateConsole();
        };
        return {
            ...window.console,
            assert: (condition, ...args) => {
                if (!condition) {
                    let msg = interpolate(args);
                    if (msg.length > 0)
                        msg = ':\n   ' + msg;
                    appendConsole('Assertion failed' + msg, 'error');
                }
            },
            // non-standard
            catch: (err) => {
                const m = err.stack.split('at ')[1].match(/:([0-9]+):([0-9]+)/) || [];
                appendConsole('<span class="error">' +
                    (m[1] ? 'Line ' + parseInt(m[1]) + '\n   ' : '') +
                    err.message +
                    '</span>');
            },
            clear: () => {
                this.consoleContent = '';
                updateConsole();
            },
            debug: (...args) => appendConsole(interpolate(args)),
            dir: (...args) => appendConsole(interpolate(args)),
            error: (...args) => appendConsole(interpolate(args), 'error'),
            group: (...args) => {
                var _a;
                if (arguments.length > 0)
                    appendConsole(interpolate(args), 'group');
                console.dataset['group-level'] = Number(((_a = parseInt(console.dataset['group-level'])) !== null && _a !== void 0 ? _a : 0) + 1).toString();
            },
            groupCollapsed: (...args) => {
                var _a;
                if (arguments.length > 0)
                    appendConsole(interpolate(args), 'group');
                console.dataset['group-level'] = Number(((_a = parseInt(console.dataset['group-level'])) !== null && _a !== void 0 ? _a : 0) + 1).toString();
            },
            groupEnd: () => {
                var _a;
                console.dataset['group-level'] = Number(((_a = parseInt(console.dataset['group-level'])) !== null && _a !== void 0 ? _a : 0) - 1).toString();
            },
            info: (...args) => appendConsole(interpolate(args), 'info'),
            log: (...args) => appendConsole(interpolate(args), 'log'),
            warn: (...args) => appendConsole(interpolate(args), 'warning'),
        };
    }
    /**
     * Process a script fragment to be able to run inside the playground
     * - replace querySelector/querySelectoAll calls
     * - replace `console.*` calls
     * - extract imports
     * - wrap in a try/catch block
     */
    processLiveCodeJavascript(script) {
        if (!script)
            return '';
        const jsID = randomJavaScriptId();
        // Replace document.querySelector.* et al with section.querySelector.*
        script = script.replace(/([^a-zA-Z0-9_-]?)document(\s*\.\s*querySelector\s*\()/g, '$1output' + jsID + '$2');
        script = script.replace(/([^a-zA-Z0-9_-]?)document(\s*\.\s*querySelectorAll\s*\))/g, '$1output' + jsID + '$2');
        script = script.replace(/([^a-zA-Z0-9_-]?)document(\s*\.\s*)getElementById\s*\(/g, '$1output' + jsID + '$2' + "querySelector('#'+");
        // Replace console.* with pseudoConsole.*
        // script = script.replace(
        //   /([^a-zA-Z0-9_-])?console(\s*\.\s*)/g,
        //   '$1console' + jsID + '$2'
        // );
        // Extract import (can't be inside a try...catch block)
        const imports = [];
        script = script.replace(/([^a-zA-Z0-9_-]?import.*)('.*'|".*");/g, (match, p1, p2) => {
            imports.push([match, p1, p2.slice(1, p2.length - 1)]);
            return `/* ${p1}${p2} */`;
        });
        // Important: keep the ${script} on a separate line. The content could
        // be "// a comment" which would result in the script failing to parse
        //
        // Note: the function is marked `async` so that await can be used in its body
        return (imports
            .map((x) => {
            if (this.moduleMap[x[2]])
                return `${x[1]} "${this.moduleMap[x[2]]}";`;
            return x[0];
        })
            .join('') +
            `const playground${jsID} = document.getElementById("${this.id}").shadowRoot.host;` +
            `const console${jsID} = window.console; window.console = playground${jsID}.pseudoConsole;` +
            `const output${jsID} = playground${jsID}.outputElement;` +
            '(async function() {try {\n' +
            script +
            `\n} catch(err) { typeof console.catch === 'function' ? console.catch(err) : console.error(err) }}()); window.console = console${jsID};`);
    }
    //
    // Property/attributes
    //
    // 'showLineNumbers' is true if line numbers should be displayed
    get showLineNumbers() {
        return (this.hasAttribute('show-line-numbers') ||
            this.hasAttribute('showLineNumbers'));
    }
    set showLineNumbers(val) {
        this.removeAttribute('showLineNumbers');
        if (val)
            this.setAttribute('show-line-numbers', '');
        else
            this.removeAttribute('show-line-numbers');
    }
    get markLine() {
        return (this.getAttribute('mark-line') ||
            this.getAttribute('markLine') ||
            this.getAttribute('mark-javascript-line') ||
            this.getAttribute('markJavaScriptLine'));
    }
    set markLine(val) {
        this.removeAttribute('markLine');
        this.setAttribute('mark-line', val);
    }
}
/** The name of the attributes use the dash convention, as per HTML5 spec:
 *
 * > Any namespace-less attribute that is relevant to the element's
 * > functioning, as determined by the element's author, may be specified on
 * > an autonomous custom element, so long as the attribute name is
 * > XML-compatible and contains no ASCII upper alphas.
 *
 * However, React properties expect camelCase names, so we also
 * support those (read-only).
 *
 */
CodePlaygroundElement.attributes = {
    showLineNumbers: 'show-line-numbers',
    buttonBarVisibility: 'button-bar-visibility',
    autorun: 'autorun',
    markLine: 'mark-line',
    markJavascriptLine: 'mark-javascript-line',
    markHtmlLine: 'mark-html-line',
};
function randomId() {
    return ('i' +
        (Date.now().toString(36).slice(-2) +
            Math.floor(Math.random() * 0x186a0).toString(36)));
}
function randomJavaScriptId() {
    return (Date.now().toString(26).slice(-2) +
        Math.floor(Math.random() * 0x186a0).toString(26));
}
const INDENT = '  ';
/**
 * Convert a basic type or an object into a HTML string
 */
function asString(depth, value, options = {}) {
    var _a, _b;
    (_a = options.quote) !== null && _a !== void 0 ? _a : (options.quote = '"');
    (_b = options.ancestors) !== null && _b !== void 0 ? _b : (options.ancestors = []);
    //
    // BOOLEAN
    //
    if (typeof value === 'boolean') {
        return {
            text: `<span class="boolean">${escapeHTML(String(value))}</span>`,
            itemCount: 1,
            lineCount: 1,
        };
    }
    //
    // NUMBER
    //
    if (typeof value === 'number') {
        return {
            text: `<span class="number">${escapeHTML(String(value))}</span>`,
            itemCount: 1,
            lineCount: 1,
        };
    }
    //
    // STRING
    //
    if (typeof value === 'string') {
        if (options.quote.length === 0) {
            return {
                text: escapeHTML(value),
                itemCount: 1,
                lineCount: value.split(/\r\n|\r|\n/).length,
            };
        }
        return {
            text: `<span class="string">${escapeHTML(options.quote + value + options.quote)}</span>`,
            itemCount: 1,
            lineCount: value.split(/\r\n|\r|\n/).length,
        };
    }
    //
    // FUNCTION
    //
    if (typeof value === 'function') {
        let functionValue = '';
        if ('toString' in value)
            functionValue = escapeHTML(value.toString());
        else
            functionValue = escapeHTML(String(value));
        return {
            text: `<span class="function">ƒ  ${functionValue}</span>`,
            itemCount: 1,
            lineCount: functionValue.split(/\r\n|\r|\n/).length,
        };
    }
    //
    // NULL/UNDEFINED
    //
    if (value === null || value === undefined) {
        return {
            text: `<span class="null">${escapeHTML(String(value))}</span>`,
            itemCount: 1,
            lineCount: 1,
        };
    }
    // Avoid infinite recursions (e.g. `window.window`)
    if (depth > 20) {
        return {
            text: '<span class="sep">(...)</span>',
            itemCount: 1,
            lineCount: 1,
        };
    }
    //
    // ARRAY
    //
    if (Array.isArray(value)) {
        if (options.ancestors.includes(value))
            return {
                text: '<span class="sep">[...]</span>',
                itemCount: 1,
                lineCount: 1,
            };
        const result = [];
        // To account for sparse array, we can't use map() (it skips over empty slots)
        for (let i = 0; i < value.length; i++) {
            if (Object.keys(value).includes(Number(i).toString())) {
                result.push(asString(depth + 1, value[i], {
                    ancestors: [...options.ancestors, value],
                }));
            }
            else {
                result.push({
                    text: '<span class="empty">empty</span>',
                    itemCount: 1,
                    lineCount: 1,
                });
            }
        }
        const itemCount = result.reduce((acc, val) => acc + val.itemCount, 0);
        const lineCount = result.reduce((acc, val) => Math.max(acc, val.lineCount), 0);
        if (itemCount > 5 || lineCount > 1) {
            return {
                text: "<span class='sep'>[</span>\n" +
                    INDENT.repeat(depth + 1) +
                    result
                        .map((x, i) => '<span class="index">' + i + '</span>' + x.text)
                        .join("<span class='sep'>, </span>\n" + INDENT.repeat(depth + 1)) +
                    '\n' +
                    INDENT.repeat(depth) +
                    "<span class='sep'>]</span>",
                itemCount,
                lineCount: 2 + result.reduce((acc, val) => acc + val.lineCount, 0),
            };
        }
        return {
            text: "<span class='sep'>[</span>" +
                result.map((x) => x.text).join("<span class='sep'>, </span>") +
                "<span class='sep'>]</span>",
            itemCount: Math.max(1, itemCount),
            lineCount: 1,
        };
    }
    //
    // HTMLElement
    //
    if (value instanceof Element) {
        if (options.ancestors.includes(value))
            return {
                text: '<span class="object">Element...</span>',
                itemCount: 1,
                lineCount: 1,
            };
        let result = `<${value.localName}`;
        let lineCount = 1;
        Array.from(value.attributes).forEach((x) => {
            result += ' ' + x.localName;
            const val = value.getAttribute(x.localName);
            if (val.length > 0)
                result += '="' + val + '"';
        });
        result += '>';
        if (value.innerHTML) {
            let content = value.innerHTML.split('\n');
            if (content.length > 4) {
                content = [...content.slice(0, 5), '(...)\n'];
            }
            result += content.join('\n');
            lineCount += content.length;
        }
        result += `</${value.localName}>`;
        return {
            text: `<span class="object">${escapeHTML(result)}</span>`,
            itemCount: 1,
            lineCount: lineCount,
        };
    }
    //
    // OBJECT
    //
    if (typeof value === 'object') {
        if (options.ancestors.includes(value))
            return {
                text: '<span class="sep">{...}</span>',
                itemCount: 1,
                lineCount: 1,
            };
        if (value instanceof Map) {
            const kv = Object.fromEntries(value);
            const result = asString(depth, kv, {
                ancestors: [...options.ancestors, value],
            });
            return { ...result, text: '<span class=object>Map</span>' + result.text };
        }
        if (value instanceof Set) {
            const elts = Array.from(value);
            const result = asString(depth, elts, {
                ancestors: [...options.ancestors, value],
            });
            return { ...result, text: '<span class=object>Set</span>' + result.text };
        }
        if ('toString' in value) {
            const s = value.toString();
            if (s !== '[object Object]')
                return {
                    text: escapeHTML(s),
                    itemCount: 1,
                    lineCount: 1,
                };
        }
        let props = Object.keys(value);
        Object.getOwnPropertyNames(value).forEach((prop) => {
            if (!props.includes(prop)) {
                props.push(prop);
            }
        });
        // If this is not a plain literal object, filter out properties that
        // start with an underscore
        if (Object.getPrototypeOf(value) !== Object.prototype)
            props = props.filter((x) => !x.startsWith('_'));
        if (props.length === 0 && typeof props.toString === 'function') {
            const result = value.toString();
            if (result === '[object Object]')
                return {
                    text: '<span class="sep">{}</span>',
                    itemCount: 1,
                    lineCount: 1,
                };
            return {
                text: result,
                itemCount: 1,
                lineCount: result.split(/\r\n|\r|\n/).length,
            };
        }
        const propStrings = props.sort().map((key) => {
            if (typeof value[key] === 'object' && value[key] !== null) {
                let result = asString(depth + 1, value[key], {
                    ancestors: [...options.ancestors, value],
                });
                if (result.itemCount > 500) {
                    result = {
                        text: "<span class='sep'>(...)</span>",
                        itemCount: 1,
                        lineCount: 1,
                    };
                }
                return {
                    text: `<span class="property">${key}</span><span class='sep'>: </span>${result.text}`,
                    itemCount: result.itemCount,
                    lineCount: result.lineCount,
                };
            }
            if (typeof value[key] === 'function') {
                return {
                    text: `<span class="property">${key}</span></span><span class='sep'>: </span><span class='function'>ƒ (...)</span>`,
                    itemCount: 1,
                    lineCount: 1,
                };
            }
            const result = asString(depth + 1, value[key], {
                ancestors: [...options.ancestors, value],
            });
            return {
                text: `<span class="property">${key}</span></span><span class='sep'>: </span>${result.text}`,
                itemCount: result.itemCount,
                lineCount: result.lineCount,
            };
        });
        const itemCount = propStrings.reduce((acc, val) => acc + val.itemCount, 0);
        const lineCount = propStrings.reduce((acc, val) => acc + val.lineCount, 0);
        if (itemCount < 5) {
            return {
                text: "<span class='sep'>{</span>" +
                    propStrings
                        .map((x) => x.text)
                        .join("</span><span class='sep'>, </span>") +
                    "<span class='sep'>}</span>",
                itemCount,
                lineCount,
            };
        }
        return {
            text: "<span class='sep'>{</span>\n" +
                INDENT.repeat(depth + 1) +
                propStrings
                    .map((x) => x.text)
                    .join("</span><span class='sep'>,</span>\n" + INDENT.repeat(depth + 1)) +
                '\n' +
                INDENT.repeat(depth) +
                "<span class='sep'>}</span>",
            itemCount: itemCount,
            lineCount: lineCount + 2,
        };
    }
    return { text: String(value), itemCount: 1, lineCount: 1 };
}
function interpolate(args) {
    const format = args[0];
    const rest = args.slice(1);
    if (typeof format === 'string' && format.includes('%') && rest.length) {
        const string = format.replace(/(%[oscdif]|%(\d*)\.(\d*)[dif])/g, (all, key, width = '', dp) => {
            if (key === '%o') {
                // object
                return asString(0, rest.shift()).text;
            }
            if (key === '%s') {
                // string
                return rest.shift();
            }
            if (key === '%c') {
                return `</span><span style="${rest.shift()}">`;
            }
            const value = rest.shift();
            let res = null;
            if (key.substr(-1) === 'f' && typeof value === 'number') {
                if (isNaN(parseInt(dp, 10))) {
                    res = value;
                }
                else {
                    res = value.toFixed(dp);
                }
            }
            else if (typeof value === 'string') {
                res = parseInt(value, 10);
            }
            if (width === '') {
                return res;
            }
            return asString(0, res).text.padStart(width, ' ');
        });
        return string;
    }
    return args.map((x) => asString(0, x, { quote: '' }).text).join(' ');
}
function escapeHTML(s) {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
function sanitizeInput(s) {
    s = s.trim();
    // Remove XML comments, including the <!-- htmlmin:ignore --> used to
    // indicate to terser to skip sections, so as to preserve the formatting.
    s = s.replace(/<!--.*-->\n?/g, '');
    // Remove lines with only a `//`
    s = s
        .split('\n')
        .map((x) => (x.trim() === '//' ? '' : x))
        .join('\n');
    return s;
}
function mark(root, language, arg) {
    var _a;
    if (arg === undefined)
        return;
    const editor = (_a = root.querySelector(`textarea[data-language="${language}"] + .CodeMirror`)) === null || _a === void 0 ? void 0 : _a['CodeMirror'];
    if (!editor)
        return;
    // Remove any marked lines
    for (let i = editor.doc.firstLine(); i <= editor.doc.lastLine(); i++)
        editor.doc.removeLineClass(i, 'wrap', 'marked');
    // Mark the lines
    // Either "5", or "5-6", or "5, 7, 9", or "5-7, 9"
    if (typeof arg === 'string') {
        for (let item of arg.split(',')) {
            item = item.trim();
            if (item === '' || item === 'none')
                continue;
            if (/\d+-\d+/.test(item)) {
                let [, from, to] = arg.match(/(\d+)-(\d+)/);
                for (let i = parseInt(from); i <= Math.max(parseInt(from), parseInt(to)); i++)
                    editor.doc.addLineClass(i - 1, 'wrap', 'marked');
                return;
            }
            else {
                editor.doc.addLineClass(parseInt(arg) - 1, 'wrap', 'marked');
            }
        }
    }
}
// Register the tag for the element, only if it isn't already registered
(_a = customElements.get('code-playground')) !== null && _a !== void 0 ? _a : customElements.define('code-playground', CodePlaygroundElement);
function echo(rest, tty, finalize, output) {
    tty(output !== null && output !== void 0 ? output : '' + rest);
    finalize();
    // if (!rest) {
    //   finalize();
    //   return;
    // }
    // let delay = 4;
    // setTimeout(
    //   () =>
    //     requestAnimationFrame(() => {
    //       tty((output ?? '') + rest[0]);
    //       echo(rest.substring(1), tty, finalize, (output ?? '') + rest[0]);
    //     }),
    //   delay
    // );
}
function toTitleCase(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export { CodePlaygroundElement };
//# sourceMappingURL=code-playground.js.map
