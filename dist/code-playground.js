var _a;
/* tomorrow-night */
const base00 = '#35434e'; // was #1d1f21;
const base01 = '#282a2e';
const base02 = '#373b41';
const base03 = '#969896';
const base04 = '#b4b7b4';
const base05 = '#c5c8c6'; // base05
// const base06 = "#e0e0e0";
// const base07 = "#ffffff";
const base0c = '#cc6666'; // base08
const base09 = '#de935f';
const base0a = '#f0c674';
const base0b = '#b5bd68';
const base08 = '#8abeb7'; // base0c
const base0d = '#81a2be'; // base0d
const base0e = '#b294bb';
// const base0f = "#a3685a";
const RED = base0c;
const YELLOW = base0a;
// const BLUE = base0d;
// const GREEN = base0b;
const TAB_HEIGHT = 36;
const TAB_WIDTH = 150;
const DEFAULT_AUTORUN_DELAY = 1000;
const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/codemirror.min.css">
<style>
    :host {
      display: block;
      font-family:-apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Oxygen-Sans, Ubuntu, Cantarell,
        "Helvetica Neue", "Source Sans Pro", sans-serif;
      line-height: 1.5;
    }
    :host([hidden]) {
      display: none;
    }
    :host > div {
      display: flex;
      flex-flow: row;
      width: 100%;
      height: 100%;
      margin-left: 0;
      margin-right: 0;
      justify-content: center;
      align-items: center;
    }
    :host > div.stack-layout {
      display: block;
    }
    .original-content {
      display: none;
    }
    .source {
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      margin-top: 0;
      margin-bottom: 0;
      margin-right: .5em;
      width: calc(50% - .5em);
      height: 100%;
      min-width: 300px;
      padding: 8px;
      border-radius: 8px;
      background: ${base00};
    }
    textarea {
      display: block;
      border: 1px solid rgba(0,0,0,.25);
      outline: none;
      resize: vertical;
      width: 100%;
      min-height: 4em;
      font-family: 'JetBrains Mono', 'IBM Plex Mono', 'Fira Code', 'Source Code Pro',  monospace;
      font-size: 16px;
      line-height: 1.2;
    }
    #run-button {
        display: none;
    }
    #run-button.visible {
        display: inline-block;
    }
    .source textarea {
      color: ${base05};
      background: ${base00};
      border: none;
      height: 100%;
    }
    .result {
      width: calc(50% - .5em);
      margin-left: .5em;
    }
    .output {
      border-radius: 8px;
      padding: 8px;
      border: 1px solid rgba(0, 0, 0, .2);
    }
    .output textarea {
      width: calc(100% - 16px);
    }
    .stack-layout .source, .stack-layout .result {
      width: auto;
      margin: 0;
      background: transparent
    }
    .stack-layout .source {
      border: 1px solid rgba(0, 0, 0, .2);
      padding: 0;
    }
    .stack-layout .result  {
      margin-top: 2em;
    }
    .stack-layout [type=radio]:checked ~ label {
      color: #666;
    }
    .console {
      max-height: 50vh;
      padding: 8px;
      border-radius: 8px;
      overflow: auto;
      font-size: 14px;
      color: ${base05};
      background: ${base00};
      white-space: pre-wrap;
      border: 1px solid rgba(0, 0, 0, .2);
    }
    .console .sep {
      color: ${base05};
    }
    .console .index {
      color: ${base05};
      opacity: .3;
      float: left;
      width: 0;
      font-style: italic;
    }
    .console .boolean {
      color: ${base0e};
      font-weight: bold;
    }
    .console .empty {
      color: ${base0e};
      font-style: italic;
    }
    .console .null {
      color: ${base0e};
      font-style: italic;
    }
    .console .string {
      color: ${base0a};
      font-weight: bold;
    }
    .console .function {
      color: ${base0b};
    }
    .console .number {
      color: ${base0e};
    }
    .console .property {
      color: ${base0b}
    }
    .console .object {
        color: ${base0b}
      }
      .console .error {
      display: block;
      width: calc(100% - 10px);
      padding-right: 4px;
      padding-top: 8px;
      padding-bottom:8px;
      padding-left: 6px;
      background: rgba(204, 102, 102, .4);
      color: white;
      border-left:  4px solid ${RED}
    }
    .console .warning {
      color: ${YELLOW}
    }
    .console .group {
      font-weight: bold;
    }
    
    .tabs {
      position: relative;   
      display: flex;
      flex-flow: row;
      justify-content: center;
      height: 100%;
      clear: both;
      --tab-indicator-offset: 0;
    }
    .stack-layout .tabs {
      flex-flow: column;
    }
    .stack-layout .tab {
      height: auto;
      background: transparent;
    }
    .stack-layout .tab:first-of-type:after {
      display: none;
    }
    .stack-layout .tab:first-child, .stack-layout .tab:last-child {
      border: none;
      border-radius: 0;
      padding-left: 8px;
      padding-right: 8px;
      padding-bottom: .5em;
      margin-left: -8px;
      margin-right: -8px;
      margin-bottom: .5em;
      margin-top: -8px;
    }
    .stack-layout .tab:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
    }
    .stack-layout .tab:first-child {
      border-top-left-radius: 36px;
      border-top-right-radius: 36px
    }
    .stack-layout .content {
      visibility: visible;
      position: relative;
      top: auto;
      left: auto;
      bottom: auto;
      padding-left: 1em;
      background: ${base00};
      overflow: hidden;
    }
    .stack-layout .tab > label {
      display: block;
      position: relative;
      height: auto;
      text-align: left;
      padding-left: 1em;
      padding-top: 1em;
      padding-bottom: .5em;
      color: #666;
    }
    .stack-layout .tab > input[type="radio"] {
      visibility: hidden;
    }
    .tab {
      min-width: ${TAB_WIDTH}px;
      border-color: ${base02};
      background: ${base01};
      border-style: solid;
      border-top-width: 1px;
      border-bottom-width: 1px;
      height: ${TAB_HEIGHT}px;
      border-left: none;
      border-right: none;
      box-sizing: content-box;
    }

    .tab:first-child {
        border-top-left-radius: ${TAB_HEIGHT}px;
        border-bottom-left-radius: ${TAB_HEIGHT}px;
        border-left-width: 1px;
        border-left-style: solid;
        border-left-color: ${base02};
    }

    .tab:last-child {
      border-top-right-radius: ${TAB_HEIGHT}px;
      border-bottom-right-radius: ${TAB_HEIGHT}px;
      border-right-width: 1px;
      border-right-style: solid;
      border-right-color: ${base02};
    }
    .tab:first-of-type:after {
      content: '';
      display: block;
      position: relative;
      width: ${TAB_WIDTH - 6}px;
      margin: 0;
      top: 3px;
      height: ${TAB_HEIGHT - 6}px;
      left: calc(3px + var(--tab-indicator-offset));
      z-index: 0;
      border-radius: ${TAB_HEIGHT}px;
      background: ${base00};
      transition-property: left;
      transition-duration: 200ms;
      transition-timing-function: ease-in-out;
    }
    .tab label {
      position: absolute;
      width: 150px;
      height: ${TAB_HEIGHT}px;
      padding-top: 8px;
      padding-bottom: 6px;
      font-weight: 700;
      letter-spacing: 0.5px;
      font-size: 14px;
      text-transform: uppercase;
      text-align: center;
      color: ${base05};
      user-select: none;
      z-index: 1;
    }
    .tab [type=radio] {
      display: none;   
    }
    .content {
      visibility: hidden;
      position: absolute;
      top: ${TAB_HEIGHT + 2}px;
      left: 0;
      right: 0;
      bottom: 0;
      font-size: 14px;
    }
    [type=radio]:hover ~ label {
      color: #fff;
    }
    [type=radio]:checked ~ label {
      color: #fff;
      z-index: 2;
    }
    [type=radio]:checked ~ label ~ .content {
      z-index: 1;
      visibility: visible;
    }
    .buttons {
      display: none;
      justify-content: space-between;
      padding-left: 1em;
      padding-right: 1em;
      padding-bottom: .5em;
    }
    .buttons.visible {
        display: flex;
    }
    .button {
      display: inline-block;
      margin-bottom: 0.25em;
      padding: 0.5em 1em;
      font-size: 14px;
      min-height: 30px;
      margin-top: 6px;
      margin-bottom: 6px;
      font-weight: 700;
      text-align: center;
      text-decoration: none;
      border-radius: 4px;
      cursor: pointer;
      user-select: none;
      text-transform: uppercase;
      outline: none;
      background: ${base01};
      color: ${base05};
      border: 1px solid #111;
    }
    .stack-layout .button {
      color: #333;
      background: transparent;
      border: 1px solid #ccc;
    }
    .button:disabled {
      opacity: .5;
    }
    .button svg {
      height: 1em;
      width: 1em;
      margin-right: .55em;
      vertical-align: -.12em;
    }
    .button:enabled:hover, .button:enabled:active {
      color: #0066ce;
      border: 1px solid #0066ce;
    }
    .button:enabled:active {
      color: #fff;
      background: #0066ce;
      border: 1px solid #0066ce;
    }
    .mathfield {
      display: block;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: .5em;
      font-size: 2rem;
      background: #fff;
    }
    @media (max-width: 777px) { 
      :host > div {
          flex-flow: column;
      }
      .source, .result {
          width: calc(100% - 1em);
          margin-left: .5em;
          margin-right: .5em;
          margin-top: .5em;
          margin-bottom: .5em;
      }
    }


    /* Tomorrow Comment */
    .hljs-comment,
    .hljs-title {
        color: ${base04};
        font-style: italic;
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
        color: ${base0c};
    }
    
    /* Tomorrow Orange */
    .hljs-number,
    .hljs-preprocessor,
    .hljs-built_in,
    .hljs-literal,
    .hljs-params,
    .hljs-constant {
        color: ${base09};
        font-weight: normal;
    }
    
    /* Tomorrow Yellow */
    .ruby .hljs-class .hljs-title,
    .css .hljs-rules .hljs-attribute {
        color: ${base0a};
    }
    
    /* Tomorrow Green */
    .hljs-string,
    .hljs-value,
    .hljs-inheritance,
    .hljs-header,
    .ruby .hljs-symbol,
    .xml .hljs-cdata {
        color: ${base0b};
    }
    
    /* Tomorrow Aqua */
    .css .hljs-hexcolor {
        color: ${base08};
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
        color: ${base0d};
        font-weight: bold;
    }
    
    /* Tomorrow Purple */
    .hljs-keyword,
    .javascript .hljs-function {
        color: ${base0e};
        font-weight: bold;
    }
    
    .hljs {
        display: block;
        background: ${base00};
        color: ${base05};
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
      font-family: 'JetBrains Mono', 'IBM Plex Mono', 'Fira Code', 'Source Code Pro',  monospace;
    }
    .cm-s-tomorrow-night.CodeMirror { background: ${base00}; color: ${base05}; }
    .cm-s-tomorrow-night div.CodeMirror-selected { background: ${base01}; }
    .cm-s-tomorrow-night .CodeMirror-line::selection, .cm-s-tomorrow-night .CodeMirror-line > span::selection, .cm-s-tomorrow-night .CodeMirror-line > span > span::selection { background: rgba(45, 45, 45, 0.99); }
    .cm-s-tomorrow-night .CodeMirror-line::-moz-selection, .cm-s-tomorrow-night .CodeMirror-line > span::-moz-selection, .cm-s-tomorrow-night .CodeMirror-line > span > span::-moz-selection { background: rgba(45, 45, 45, 0.99); }
    .cm-s-tomorrow-night .CodeMirror-gutters { background: ${base00}; border-right: 0px; }
    .cm-s-tomorrow-night .CodeMirror-guttermarker { color: ${base0c}; }
    .cm-s-tomorrow-night .CodeMirror-guttermarker-subtle { color: ${base03}; }
    .cm-s-tomorrow-night .CodeMirror-linenumber { color: ${base04}; opacity: .4; }
    .cm-s-tomorrow-night .CodeMirror-cursor { border-left: 1px solid ${base0d}; }
    
    .cm-s-tomorrow-night span.cm-comment { color: ${base09}; }
    .cm-s-tomorrow-night span.cm-atom { color: ${base0e}; }
    .cm-s-tomorrow-night span.cm-number { color: ${base0e}; }
    
    .cm-s-tomorrow-night span.cm-property, .cm-s-tomorrow-night span.cm-attribute { color: ${base0b}; }
    .cm-s-tomorrow-night span.cm-keyword { color: ${base0c}; }
    .cm-s-tomorrow-night span.cm-string { color: ${base0a}; }
    
    .cm-s-tomorrow-night span.cm-variable { color: ${base0b}; }
    .cm-s-tomorrow-night span.cm-variable-2 { color: ${base0d}; }
    .cm-s-tomorrow-night span.cm-def { color: ${base09}; }
    .cm-s-tomorrow-night span.cm-bracket { color: ${base05}; }
    .cm-s-tomorrow-night span.cm-tag { color: ${base0c}; }
    .cm-s-tomorrow-night span.cm-link { color: ${base0e}; }
    .cm-s-tomorrow-night span.cm-error { background: ${base0c}; color: ${base03}; }
    
    .cm-s-tomorrow-night .CodeMirror-activeline-background { background: ${base02}; }
    .cm-s-tomorrow-night .CodeMirror-matchingbracket { text-decoration: underline; color: white !important; }    

  </style>
  <slot name="style"></slot><slot name="preamble"></slot>
`;
const CONSOLE_MAX_LINES = 1000;
class CodePlaygroundElement extends HTMLElement {
    constructor() {
        var _a;
        super();
        this.dirty = false;
        if (!this.id) {
            this.id = randomId();
        }
        this.moduleMap = (_a = window['moduleMap']) !== null && _a !== void 0 ? _a : {};
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
        const container = document.createElement('div');
        this.containerId = randomId();
        container.id = this.containerId;
        const containerContent = `<div class='original-content'><slot name="html"></slot><slot name="css"></slot><slot name="javascript"></slot></div>
<div class='source'><div class='tabs'></div>
<div class='buttons visible'>
<button id='reset-button' class='button' disabled><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="history" class="svg-inline--fa fa-history fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 255.532c.252 136.64-111.182 248.372-247.822 248.468-64.014.045-122.373-24.163-166.394-63.942-5.097-4.606-5.3-12.543-.443-17.4l16.96-16.96c4.529-4.529 11.776-4.659 16.555-.395C158.208 436.843 204.848 456 256 456c110.549 0 200-89.468 200-200 0-110.549-89.468-200-200-200-55.52 0-105.708 22.574-141.923 59.043l49.091 48.413c7.641 7.535 2.305 20.544-8.426 20.544H26.412c-6.627 0-12-5.373-12-12V45.443c0-10.651 12.843-16.023 20.426-8.544l45.097 44.474C124.866 36.067 187.15 8 256 8c136.811 0 247.747 110.781 248 247.532zm-167.058 90.173l14.116-19.409c3.898-5.36 2.713-12.865-2.647-16.763L280 259.778V116c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v168.222l88.179 64.13c5.36 3.897 12.865 2.712 16.763-2.647z"></path></svg>Reset</button>
<button id='run-button' class='button'><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="play" class="svg-inline--fa fa-play fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6zM48 453.5v-395c0-4.6 5.1-7.5 9.1-5.2l334.2 197.5c3.9 2.3 3.9 8 0 10.3L57.1 458.7c-4 2.3-9.1-.6-9.1-5.2z"></path></svg>Run</button>
</div></div>
<div class='result'><div class='output'></div></div></div>`;
        container.innerHTML = containerContent;
        this.shadowRoot.appendChild(container);
        // Add event handler for "run" and "reset" button
        this.shadowRoot
            .getElementById('run-button')
            .addEventListener('click', (_ev) => {
            this.runPlayground();
        });
        this.shadowRoot
            .getElementById('reset-button')
            .addEventListener('click', (_ev) => {
            this.resetPlayground();
        });
        // Track insertion/changes to slots
        this.shadowRoot
            .querySelector('.original-content')
            .addEventListener('slotchange', (_ev) => {
            this.dirty = true;
            requestAnimationFrame(() => this.update());
        });
        this.resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(() => {
                this.shadowRoot
                    .querySelectorAll('textarea + .CodeMirror')
                    .forEach((x) => { var _a; return (_a = x === null || x === void 0 ? void 0 : x['CodeMirror']) === null || _a === void 0 ? void 0 : _a.refresh(); });
            });
        });
    }
    static get observedAttributes() {
        return [
            'active-tab',
            'layout',
            'show-line-numbers',
            'button-bar-visibility',
            'autorun',
        ];
    }
    get outputStylesheets() {
        if (!this.hasAttribute('output-stylesheets'))
            return [];
        return this.getAttribute('output-stylesheets').split(' ');
    }
    set outputStylesheets(value) {
        this.setAttribute('output-stylesheets', value.join(' '));
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
        const runButton = this.shadowRoot.getElementById('run-botton');
        if (value === 'never') {
            runButton.classList.add('visible');
        }
        else {
            runButton.classList.remove('visible');
        }
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'active-tab' && oldValue !== newValue) {
            this.activateTab(newValue);
        }
        else if (name === 'layout' && oldValue !== newValue) {
            this.shadowRoot
                .querySelector(':host > div')
                .classList.toggle('tab-layout', newValue !== 'stack');
            this.shadowRoot
                .querySelector(':host > div')
                .classList.toggle('stack-layout', newValue === 'stack');
        }
        else if (name === 'show-line-numbers' && oldValue !== newValue) {
            this.shadowRoot
                .querySelectorAll('textarea + .CodeMirror')
                .forEach((x) => { var _a; return (_a = x === null || x === void 0 ? void 0 : x['CodeMirror']) === null || _a === void 0 ? void 0 : _a.setLineNumbers(this.showLineNumbers); });
        }
    }
    get buttonBarVisibility() {
        var _a;
        return (_a = this.getAttribute('button-bar-visibility')) !== null && _a !== void 0 ? _a : 'auto';
    }
    set buttonBarVisibility(value) {
        this.setAttribute('button-bar-visibility', value);
    }
    get buttonBarVisible() {
        return this.shadowRoot
            .querySelector('.buttons')
            .classList.contains('visible');
    }
    connectedCallback() {
        const styleSlot = this.shadowRoot.querySelector('slot[name=style]');
        if (styleSlot) {
            const styleContent = styleSlot
                .assignedNodes()
                .map((node) => node.innerHTML)
                .join('');
            const style = document.createElement('style');
            style.textContent = styleContent;
            this.shadowRoot.appendChild(style);
        }
        if (this.buttonBarVisibility === 'auto' ||
            this.buttonBarVisibility === 'hidden') {
            this.shadowRoot
                .querySelector('.buttons')
                .classList.remove('visible');
        }
    }
    // The content of the code section has changed. Rebuild the tabs
    update() {
        if (!this.dirty)
            return;
        this.dirty = false;
        const shadowRoot = this.shadowRoot;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        const activateTab = function (ev) {
            const tab = ev.target;
            if (tab.tagName === 'LABEL') {
                self.activateTab(tab.parentNode.dataset.name);
            }
        };
        // 1. Remove the event handlers
        shadowRoot.querySelectorAll('.tab').forEach((x) => {
            x.removeEventListener('click', activateTab);
        });
        // 2. Collect the content of each tab
        const slots = shadowRoot.querySelectorAll('.original-content slot');
        let content = '';
        slots.forEach((slot) => {
            let text = slot
                .assignedNodes()
                .map((node) => node.innerHTML)
                .join('');
            if (text) {
                // Remove empty comments. This 'trick' is used to work around
                // an issue where Eleventy ignores empty lines in HTML blocks,
                // so an empty comment is insert, but it now needs to be removed
                // so that the empty line is properly picked up by CodeMirror. Sigh.
                text = text.replace(/<!-- -->/g, '');
                const tabId = randomId();
                const language = slot.name;
                content += `<div class='tab' id="${tabId}" data-name="${language}">
        <input type="radio" id="${tabId}" name="${this.id}">
        <label for="${tabId}">${language}</label>
        <div class="content ${language.toLowerCase()}">
            <textarea data-language="${language.toLowerCase()}">${text}</textarea> 
        </div>
    </div>`;
            }
        });
        shadowRoot.querySelector('.tabs').innerHTML = content;
        // 3. Listen to tab activation
        const tabs = shadowRoot.querySelectorAll('.tab');
        if (tabs.length <= 1) {
            tabs.forEach((x) => (x.querySelector('.tab > label').style.display = 'none'));
        }
        else {
            shadowRoot.querySelectorAll('.tab label').forEach((x) => {
                x.addEventListener('click', activateTab);
            });
        }
        const firstTab = tabs[0];
        const lastTab = tabs[tabs.length - 1];
        if (tabs.length > 1) {
            firstTab.style.marginTop = '8px';
        }
        else {
            const tabContent = firstTab.querySelector('.content');
            tabContent.style.borderTopLeftRadius = '8px';
            tabContent.style.borderTopRightRadius = '8px';
        }
        if (!this.buttonBarVisible) {
            const tabContent = lastTab.querySelector('.content');
            tabContent.style.borderBottomLeftRadius = '8px';
            tabContent.style.borderBottomRightRadius = '8px';
            lastTab.style.marginBottom = '0';
            lastTab.style.paddingBottom = '0';
        }
        // 4. Setup editors
        if (typeof CodeMirror !== 'undefined') {
            this.resizeObserver.disconnect();
            shadowRoot
                .querySelectorAll('.tab .content textarea')
                .forEach((x) => {
                var _a;
                // Remove XML comments, including the <!-- htmlmin:ignore --> used to
                // indicate to terser to skip sections, so as to preserve the formatting.
                x.value = x.value.replace(/<!--.*-->\n?/g, '');
                // Watch for re-layout and invoke CodeMirror refresh when they happen
                this.resizeObserver.observe(x.parentElement);
                const lang = {
                    javascript: 'javascript',
                    css: 'css',
                    html: 'xml',
                }[(_a = x.dataset.language) !== null && _a !== void 0 ? _a : 'javascript'];
                const editor = CodeMirror.fromTextArea(x, {
                    lineNumbers: this.showLineNumbers,
                    lineWrapping: true,
                    mode: lang,
                    theme: 'tomorrow-night',
                });
                editor.setSize('100%', '100%');
                editor.on('change', () => {
                    this.editorContentChanged();
                });
            });
        }
        // 5. Activate the previously active tab, or the first one
        this.activateTab(this.activeTab || tabs[0].dataset.name);
        // 6. Run the playground
        this.runPlayground();
        // Refresh the codemirror layouts
        // (important to get the linenumbers to display correctly)
        setTimeout(() => shadowRoot
            .querySelectorAll('textarea + .CodeMirror')
            .forEach((x) => { var _a; return (_a = x === null || x === void 0 ? void 0 : x['CodeMirror']) === null || _a === void 0 ? void 0 : _a.refresh(); }), 128);
    }
    activateTab(name) {
        var _a;
        const activeTab = (_a = this.shadowRoot.querySelector(`[data-name=${name}]`)) !== null && _a !== void 0 ? _a : this.shadowRoot.querySelectorAll('.tab')[0];
        if (!activeTab)
            return;
        activeTab.querySelector('input[type="radio"]').checked = true;
        this.shadowRoot
            .querySelector('.tabs')
            .style.setProperty('--tab-indicator-offset', activeTab.offsetLeft -
            this.shadowRoot.querySelector('.tab:first-of-type').offsetLeft +
            'px');
        requestAnimationFrame(() => { var _a, _b; return (_b = (_a = activeTab
            .querySelector('textarea + .CodeMirror')) === null || _a === void 0 ? void 0 : _a['CodeMirror']) === null || _b === void 0 ? void 0 : _b.refresh(); });
    }
    runPlayground() {
        var _a, _b, _c, _d;
        const section = this.shadowRoot;
        const result = section.querySelector('.result');
        // Remove all the script tags that might be there.
        result.querySelectorAll('.result > script').forEach((x) => {
            result.removeChild(x);
        });
        // Remove all the consoles that might be there.
        result.querySelectorAll('.result > .console').forEach((x) => {
            result.removeChild(x);
        });
        // Setup the HTML in 'output'
        let htmlContent = '';
        const htmlEditor = section.querySelector('textarea[data-language="html"] + .CodeMirror');
        if (htmlEditor) {
            htmlContent = htmlEditor['CodeMirror'].getValue();
        }
        else {
            htmlContent = (_b = (_a = section.querySelector('textarea[data-language="html"]')) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '';
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
                this.pseudoConsole().error(err.message);
            }
        });
        try {
            this.outputStylesheets.forEach((x) => {
                const href = x.trim();
                if (href.length > 0) {
                    htmlContent =
                        `<link rel="stylesheet" href="${href}"></link>` +
                            htmlContent;
                }
            });
            section.querySelector('.output').innerHTML = htmlContent;
        }
        catch (e) {
            // If there's a syntax error in the markup, catch it here
            this.pseudoConsole().error(e.message);
        }
        // Add a new script tag
        const jsEditor = section.querySelector('textarea[data-language="javascript"] + .CodeMirror');
        let jsContent = '';
        if (jsEditor) {
            jsContent = jsEditor['CodeMirror'].getValue();
        }
        else {
            jsContent = (_d = (_c = section.querySelector('textarea[data-language="javascript"]')) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : '';
        }
        const newScript = document.createElement('script');
        newScript.type = 'module';
        try {
            newScript.textContent = this.processLiveCodeJavascript(jsContent);
            result.appendChild(newScript);
        }
        catch (err) {
            // If there's a syntax error in the script, catch it here
            this.pseudoConsole().error(err.message);
        }
        // Temporarily set the window error handler to catch and report
        // on syntax errors that may be present in the script
        const previousErrorHandler = window.onerror;
        window.onerror = (msg, url, line, _colno, error) => {
            if (url === window.location.href) {
                if (line === 0) {
                    if (typeof (error === null || error === void 0 ? void 0 : error.toString) === 'function') {
                        this.pseudoConsole().error(msg + error.toString());
                    }
                    else {
                        this.pseudoConsole().error(msg);
                    }
                }
                else {
                    this.pseudoConsole().error('Line ' + line + ': ' + msg);
                }
            }
        };
        setTimeout(() => {
            window.onerror = previousErrorHandler;
        }, 500);
    }
    editorContentChanged() {
        this.shadowRoot.querySelector('#reset-button').disabled = false;
        if (this.buttonBarVisibility === 'auto') {
            this.shadowRoot.querySelector('.buttons').classList.add('visible');
            const tabs = this.shadowRoot.querySelectorAll('.tab');
            const lastTab = tabs[tabs.length - 1];
            const tabContent = lastTab.querySelector('.content');
            tabContent.style.borderBottomLeftRadius = '0';
            tabContent.style.borderBottomRightRadius = '0';
            lastTab.style.marginBottom = '0.5em';
            lastTab.style.paddingBottom = '0.5em';
            if (this.autorun === 'never') {
                const runButton = this.shadowRoot.getElementById('run-botton');
                runButton.classList.add('visible');
            }
            else {
                if (this.runTimer) {
                    clearTimeout(this.runTimer);
                }
                this.runTimer = setTimeout(() => this.runPlayground(), this.autorun);
            }
        }
    }
    resetPlayground() {
        const slots = this.shadowRoot.querySelectorAll('.original-content slot');
        slots.forEach((slot) => {
            const text = slot
                .assignedNodes()
                .map((node) => node.innerText)
                .join('');
            if (text) {
                const editor = this.shadowRoot.querySelector('textarea[data-language="' + slot.name + '"] + .CodeMirror');
                editor['CodeMirror'].setValue(text);
            }
        });
    }
    pseudoConsole() {
        const shadowRoot = this.shadowRoot;
        // root ?? (document.currentScript.getRootNode() as HTMLElement);
        let console = shadowRoot.querySelector('.result .console');
        if (!console) {
            console = document.createElement('pre');
            console.classList.add('console');
            shadowRoot.querySelector('.result').appendChild(console);
        }
        const appendConsole = function (msg) {
            // @todo: support string substition (i.e. %s, %c, etc..)
            var _a;
            let lines = console.innerHTML.split('\n');
            if (lines.length > CONSOLE_MAX_LINES) {
                lines = lines.slice(lines.length - CONSOLE_MAX_LINES + 1);
            }
            console.innerHTML =
                lines.join('\n') +
                    '&nbsp;&nbsp;'.repeat((_a = parseInt(console.dataset['group-level'])) !== null && _a !== void 0 ? _a : 0) +
                    msg +
                    '\n';
            console.scrollTop = console.scrollHeight;
        };
        return {
            ...window.console,
            assert: function (condition, ...args) {
                if (!condition)
                    appendConsole(interpolate(args));
            },
            // non-standard
            catch: function (err) {
                const m = err.stack
                    .split('at ')
                    .pop()
                    .match(/:([0-9]+):([0-9]+)$/) || [];
                appendConsole('<span class="error">' +
                    (m[1] ? 'Line ' + m[1] + ': ' : '') +
                    err.message +
                    '</span>');
            },
            clear: function () {
                console.innerHTML = '';
            },
            debug: function (...args) {
                appendConsole(interpolate(args));
            },
            dir: function (...args) {
                appendConsole(interpolate(args));
            },
            error: function (...args) {
                appendConsole('<span class="error">' + interpolate(args) + '</span>');
            },
            group: function (...args) {
                var _a;
                if (arguments.length > 0)
                    appendConsole('<span class="group">' + interpolate(args) + '</span>');
                console.dataset['group-level'] = Number(((_a = parseInt(console.dataset['group-level'])) !== null && _a !== void 0 ? _a : 0) + 1).toString();
            },
            groupCollapsed: function (...args) {
                var _a;
                if (arguments.length > 0)
                    appendConsole('<span class="group">' + interpolate(args) + '</span>');
                console.dataset['group-level'] = Number(((_a = parseInt(console.dataset['group-level'])) !== null && _a !== void 0 ? _a : 0) + 1).toString();
            },
            groupEnd: function () {
                var _a;
                console.dataset['group-level'] = Number(((_a = parseInt(console.dataset['group-level'])) !== null && _a !== void 0 ? _a : 0) - 1).toString();
            },
            info: function (...args) {
                appendConsole(interpolate(args));
            },
            log: function (...args) {
                appendConsole(interpolate(args));
            },
            warn: function (...args) {
                appendConsole('<span class="warning">' + interpolate(args) + '</span>');
            },
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
        script = script.replace(/([^a-zA-Z0-9_-]?)document\s*\.\s*querySelector\s*\(/g, '$1container' + jsID + '.querySelector(');
        script = script.replace(/([^a-zA-Z0-9_-]?)document\s*\.\s*querySelectorAll\s*\(/g, '$1container' + jsID + '.querySelectorAll(');
        script = script.replace(/([^a-zA-Z0-9_-]?)document\s*\.\s*getElementById\s*\(/g, '$1container' + jsID + ".querySelector('#' + ");
        // Replace console.* with pseudoConsole.*
        script = script.replace(/([^a-zA-Z0-9_-])?console\s*\.\s*/g, '$1shadowRoot' + jsID + '.host.pseudoConsole().');
        // Extract import (can't be inside a try...catch block)
        const imports = [];
        script = script.replace(/([^a-zA-Z0-9_-]?import.*)('.*'|".*");/g, (match, p1, p2) => {
            imports.push([match, p1, p2.slice(1, p2.length - 1)]);
            return '';
        });
        // Important: keep the ${script} on a separate line. The content could
        // be "// a comment" which would result in the script failing to parse
        return (imports
            .map((x) => {
            if (this.moduleMap[x[2]]) {
                return x[1] + '"' + this.moduleMap[x[2]] + '";';
            }
            return x[0];
        })
            .join('\n') +
            `const shadowRoot${jsID} = document.querySelector("#${this.id}").shadowRoot;` +
            `const container${jsID} = shadowRoot${jsID}.querySelector("#${this.containerId} div.output");` +
            'try{\n' +
            script +
            `\n} catch(err) { shadowRoot${jsID}.host.pseudoConsole().catch(err) }`);
    }
    //
    // Property/attributes
    //
    // 'active-tab' is the name of the currently visible tab
    get activeTab() {
        var _a;
        return (_a = this.getAttribute('active-tab')) !== null && _a !== void 0 ? _a : '';
    }
    set activeTab(val) {
        if (val) {
            this.setAttribute('active-tab', val);
        }
        else {
            this.removeAttribute('active-tab');
        }
    }
    // 'showlinenumbers' is true if line numbers should be displayed
    get showLineNumbers() {
        return this.hasAttribute('show-line-numbers');
    }
    set showLineNumbers(val) {
        if (val) {
            this.setAttribute('show-line-numbers', '');
        }
        else {
            this.removeAttribute('show-line-numbers');
        }
    }
}
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
    var _a;
    (_a = options.quote) !== null && _a !== void 0 ? _a : (options.quote = '"');
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
        if (value.hasOwnProperty('toString')) {
            functionValue = escapeHTML(value.toString());
        }
        else {
            functionValue = escapeHTML(String(value));
        }
        return {
            text: `<span class="function">ƒ  ${functionValue}</span>`,
            itemCount: 1,
            lineCount: functionValue.split(/\r\n|\r|\n/).length,
        };
    }
    //
    // NULL
    //
    if (value === null) {
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
        const result = [];
        // To account for sparse array, we can't use map() (it skips over empty slots)
        for (let i = 0; i < value.length; i++) {
            if (Object.keys(value).includes(Number(i).toString())) {
                result.push(asString(depth + 1, value[i]));
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
                        .join("<span class='sep'>, </span>\n" +
                        INDENT.repeat(depth + 1)) +
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
        let result = `<${value.localName}`;
        let lineCount = 1;
        Array.from(value.attributes).forEach((x) => {
            result +=
                ' ' +
                    x.localName +
                    '="' +
                    value.getAttribute(x.localName) +
                    '"';
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
        const props = Object.keys(value);
        Object.getOwnPropertyNames(value).forEach((prop) => {
            if (!props.includes(prop)) {
                props.push(prop);
            }
        });
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
                let result = asString(depth + 1, value[key]);
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
            const result = asString(depth + 1, value[key]);
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
                    .join("</span><span class='sep'>,</span>\n" +
                    INDENT.repeat(depth + 1)) +
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
// Register the tag for the element, only if it isn't already registered
(_a = customElements.get('code-playground')) !== null && _a !== void 0 ? _a : customElements.define('code-playground', CodePlaygroundElement);

export { CodePlaygroundElement };
//# sourceMappingURL=code-playground.js.map
