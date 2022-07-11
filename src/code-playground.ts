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
const base09 = '#ec9c65';
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
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/codemirror.min.css">
<style>
  :host {
    display: block;
    font-family: var(--ui-font, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen-Sans, Ubuntu, Cantarell,
      "Helvetica Neue", "Source Sans Pro", sans-serif);
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
    background: var(--base-00, ${base00});
  }
  textarea {
    display: block;
    border: var(--ui-border, 1px solid rgba(0,0,0,.25));
    outline: none;
    resize: vertical;
    width: 100%;
    min-height: 4em;
    font-family: var(--monospace-font, 'JetBrains Mono', 'IBM Plex Mono', 'Fira Code', 'Source Code Pro'),  monospace;
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
    color: var(--base-05, ${base05});
    background: var(--base-00, ${base00});
    border: none;
    height: 100%;
  }
  .result {
    width: calc(50% - .5em);
    margin-left: .5em;
  }
  div.result > div.output {
    display: none;
  }
  .output {
    border-radius: 8px;
    padding: 8px;
    border: var(--ui-border, 1px solid rgba(0, 0, 0, .2));
  }
  div.result > div.output.visible {
    display:  block;
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
    border: var(--ui-border, 1px solid rgba(0, 0, 0, .2));
    padding: 0;
  }
  .stack-layout .result  {
    margin-top: 2em;
  }
  .stack-layout [type=radio]:checked ~ label {
    color: #666;
  }
  div.result > pre.console {
    display: none;
    max-height: 50vh;
    padding: 8px 8px 8px 1em;
    border-radius: 8px;
    overflow: auto;
    font-size: 1em;
    color: var(--base-05, ${base05});
    background: var(--base-00, ${base00});
    white-space: pre-wrap;
    border: var(--ui-border, 1px solid rgba(0, 0, 0, .2));
  }
  div.result > pre.console.visible {
    display: block;
  }
  .console .sep {
    color: var(--base-05, ${base05});
  }
  .console .index {
    color: var(--base-05, ${base05});
    opacity: .3;
    float: left;
    width: 0;
    font-style: italic;
  }
  .console .boolean {
    color: var(--base-0e, ${base0e});
    font-weight: bold;
  }
  .console .empty {
    color: var(--base-0e, ${base0e});
    font-style: italic;
  }
  .console .null {
    color: var(--base-0e, ${base0e});
    font-style: italic;
  }
  .console .string {
    color: var(--base-0a, ${base0a});
    font-weight: bold;
  }
  .console .function {
    color: var(--base-0b, ${base0b});
  }
  .console .number {
    color: var(--base-0e, ${base0e});
  }
  .console .property {
    color: var(--base-0b, ${base0b});
  }
  .console .object {
    color: var(--base-0b, ${base0b});
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
    border-left: 4px solid var(--semantic-red, ${RED});
  }
  .console .warning {
    color: var(--semantic-orange, ${YELLOW});
  }
  .console .log {
    color: var(--blue--200);
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
    padding: 8px 8px 8px 1em;
    background: var(--base-00, ${base00});
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
    border-color: var(--base-02, ${base02});
    background: var(--base-01, ${base01});
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
      border-left-color: var(--base-02,  ${base02});
  }

  .tab:last-child {
    border-top-right-radius: ${TAB_HEIGHT}px;
    border-bottom-right-radius: ${TAB_HEIGHT}px;
    border-right-width: 1px;
    border-right-style: solid;
    border-right-color: var(--base-02, ${base02});
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
    background: var(--base-00, ${base00});
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
    color: var(--base-005, ${base05});
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
    font-size: 1em;
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
    background: var(--base-01, ${base01});
    color: var(--base-05, ${base05});
    border: 1px solid #111;
  }
  .stack-layout .button {
    color: #333;
    background: transparent;
    border: var(--ui-border, 1px solid #ccc);
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
    color: var(--primary-color, #0066ce);
    border: 1px solid var(--primary-color, #0066ce);
  }
  .button:enabled:active {
    color: #fff;
    background: var(--primary-color, #0066ce);
    border: 1px solid var(--primary-color, #0066ce);
  }
  .mathfield {
    display: block;
    border: var(--ui-border, 1px solid #ccc);
    border-radius: 8px;
    padding: .5em;
    font-size: 2rem;
    background: var(--ui-background, #fff);
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
      color: var(--base-04, ${base04});
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
    color: var(--base-0c, ${base0c});
  }
  
  /* Tomorrow Orange */
  .hljs-number,
  .hljs-preprocessor,
  .hljs-built_in,
  .hljs-literal,
  .hljs-params,
  .hljs-constant {
    color: var(--base-09, ${base09});
    font-weight: normal;
  }
  
  /* Tomorrow Yellow */
  .ruby .hljs-class .hljs-title,
  .css .hljs-rules .hljs-attribute {
      color: var(--base-0a, ${base0a});
  }
  
  /* Tomorrow Green */
  .hljs-string,
  .hljs-value,
  .hljs-inheritance,
  .hljs-header,
  .ruby .hljs-symbol,
  .xml .hljs-cdata {
    color: var(--base-0b, ${base0b});
  }
  
  /* Tomorrow Aqua */
  .css .hljs-hexcolor {
    color: var(--base-08, ${base08});
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
    color: var(--base-0d, ${base0d});
    font-weight: bold;
  }
  
  /* Tomorrow Purple */
  .hljs-keyword,
  .javascript .hljs-function {
    color: var(--base-0e, ${base0e});
    font-weight: bold;
  }
  
  .hljs {
    display: block;
    background: var(--base-00, ${base00});
    color: var(--base-05, ${base05});
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
    font-family: var(--monospace-font,'JetBrains Mono', 'IBM Plex Mono', 'Fira Code', 'Source Code Pro', monospace);
  }
  .cm-s-tomorrow-night.CodeMirror { background: var(--base-00, ${base00}); color: var(--base-05, ${base05}); }
  .cm-s-tomorrow-night div.CodeMirror-selected { background: var(--base-01, ${base01}); }
  .cm-s-tomorrow-night .CodeMirror-line::selection, .cm-s-tomorrow-night .CodeMirror-line > span::selection, .cm-s-tomorrow-night .CodeMirror-line > span > span::selection { background: rgba(45, 45, 45, 0.99); }
  .cm-s-tomorrow-night .CodeMirror-line::-moz-selection, .cm-s-tomorrow-night .CodeMirror-line > span::-moz-selection, .cm-s-tomorrow-night .CodeMirror-line > span > span::-moz-selection { background: rgba(45, 45, 45, 0.99); }
  .cm-s-tomorrow-night .CodeMirror-gutters { background: var(--base-00, ${base00}); border-right: 0px; }
  .cm-s-tomorrow-night .CodeMirror-guttermarker { color: var(--base-0c, ${base0c}); }
  .cm-s-tomorrow-night .CodeMirror-guttermarker-subtle { color: var(--base-03, ${base03}); }
  .cm-s-tomorrow-night .CodeMirror-linenumber { color: var(--base-04, ${base04}); opacity: .4; }
  .cm-s-tomorrow-night .CodeMirror-cursor { border-left: 1px solid ${base0d}; }
  
  .cm-s-tomorrow-night span.cm-comment { color: var(--base-09, ${base09}); }
  .cm-s-tomorrow-night span.cm-atom { color: var(--base-0e, ${base0e}); }
  .cm-s-tomorrow-night span.cm-number { color: var(--base-0e, ${base0e}); }
  
  .cm-s-tomorrow-night span.cm-property, .cm-s-tomorrow-night span.cm-attribute { color: var(--base-0b, ${base0b}); }
  .cm-s-tomorrow-night span.cm-keyword { color: var(--base-0c, ${base0c}); }
  .cm-s-tomorrow-night span.cm-string { color: var(--base-0a, ${base0a}); }
  
  .cm-s-tomorrow-night span.cm-variable { color: var(--base-0b, ${base0b}); }
  .cm-s-tomorrow-night span.cm-variable-2 { color: var(--base-0d, ${base0d}); }
  .cm-s-tomorrow-night span.cm-def { color: var(--base-09, ${base09}); }
  .cm-s-tomorrow-night span.cm-bracket { color: var(--base-05, ${base05}); }
  .cm-s-tomorrow-night span.cm-tag { color: var(--base-0c, ${base0c}); }
  .cm-s-tomorrow-night span.cm-link { color: var(--base-0e, ${base0e}); }
  .cm-s-tomorrow-night span.cm-error { background: var(--base-0c, ${base0c}); color: var(--base-03, ${base03}); }
  
  .cm-s-tomorrow-night .CodeMirror-activeline-background { background: var(--base-02, ${base02}); }
  .cm-s-tomorrow-night .CodeMirror-matchingbracket { text-decoration: underline; color: white !important; }    

</style>
<slot name="style"></slot><slot name="preamble"></slot>
`;

const CONSOLE_MAX_LINES = 1000;

// declare class ResizeObserver {
//   constructor(callback: ResizeObserverCallback);
//   observe: (target: Element, options?: ResizeObserverOptions) => void;
//   unobserve: (target: Element) => void;
//   disconnect: () => void;
// }

// type ResizeObserverBoxOptions =
//   | 'border-box'
//   | 'content-box'
//   | 'device-pixel-content-box';

// interface ResizeObserverOptions {
//   box?: ResizeObserverBoxOptions;
// }

// type ResizeObserverCallback = (
//   entries: ResizeObserverEntry[],
//   observer: ResizeObserver
// ) => void;

// interface ResizeObserverEntry {
//   readonly target: Element;
//   readonly contentRect: DOMRectReadOnly;
//   readonly borderBoxSize: ResizeObserverSize[];
//   readonly contentBoxSize: ResizeObserverSize[];
//   readonly devicePixelContentBoxSize: ResizeObserverSize[];
// }

// interface ResizeObserverSize {
//   readonly inlineSize: number;
//   readonly blockSize: number;
// }

export class CodePlaygroundElement extends HTMLElement {
  private dirty = false;
  private containerId: string;
  private moduleMap: { [module: string]: string };
  private resizeObserver: ResizeObserver;
  private runTimer: number;

  static get observedAttributes(): string[] {
    return [
      'active-tab',
      'layout',
      'show-line-numbers',
      'button-bar-visibility',
      'autorun',
    ];
  }

  get outputStylesheets(): string[] {
    if (!this.hasAttribute('output-stylesheets')) return [];
    return this.getAttribute('output-stylesheets').split(' ');
  }
  set outputStylesheets(value: string[]) {
    this.setAttribute('output-stylesheets', value.join(' '));
  }

  get autorun(): 'never' | number {
    if (!this.hasAttribute('autorun')) return DEFAULT_AUTORUN_DELAY;
    const value = this.getAttribute('autorun');
    if (value === 'never') return 'never';
    if (isFinite(parseFloat(value))) return parseFloat(value);
    return DEFAULT_AUTORUN_DELAY;
  }
  set autorun(value: 'never' | number) {
    this.setAttribute('autorun', value.toString());
    const runButton = this.shadowRoot.getElementById('run-botton');
    if (value === 'never') {
      runButton.classList.add('visible');
    } else {
      runButton.classList.remove('visible');
    }
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    if (name === 'active-tab' && oldValue !== newValue) {
      this.activateTab(newValue);
    } else if (name === 'layout' && oldValue !== newValue) {
      this.shadowRoot
        .querySelector<HTMLElement>(':host > div')
        .classList.toggle('tab-layout', newValue !== 'stack');
      this.shadowRoot
        .querySelector<HTMLElement>(':host > div')
        .classList.toggle('stack-layout', newValue === 'stack');
    } else if (name === 'show-line-numbers' && oldValue !== newValue) {
      this.shadowRoot
        .querySelectorAll('textarea + .CodeMirror')
        .forEach((x) =>
          x?.['CodeMirror']?.setLineNumbers(this.showLineNumbers)
        );
    }
  }
  constructor() {
    super();
    if (!this.id) this.id = randomId();

    this.moduleMap = window['moduleMap'] ?? {};
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
          .forEach((x) => x?.['CodeMirror']?.refresh());
      });
    });
  }

  get buttonBarVisibility(): string {
    return this.getAttribute('button-bar-visibility') ?? 'auto';
  }
  set buttonBarVisibility(value: string) {
    this.setAttribute('button-bar-visibility', value);
  }

  get buttonBarVisible(): boolean {
    return this.shadowRoot
      .querySelector('.buttons')
      .classList.contains('visible');
  }

  connectedCallback(): void {
    const styleSlot =
      this.shadowRoot.querySelector<HTMLSlotElement>('slot[name=style]');
    if (styleSlot) {
      const styleContent = styleSlot
        .assignedNodes()
        .map((node: HTMLElement) => node.innerHTML)
        .join('');
      const style = document.createElement('style');
      style.textContent = styleContent;
      this.shadowRoot.appendChild(style);
    }
    if (
      this.buttonBarVisibility === 'auto' ||
      this.buttonBarVisibility === 'hidden'
    ) {
      this.shadowRoot.querySelector('.buttons').classList.remove('visible');
    }
  }

  // The content of the code section has changed. Rebuild the tabs
  update(): void {
    if (!this.dirty) return;
    this.dirty = false;

    const shadowRoot = this.shadowRoot;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    const activateTab = function (ev: Event) {
      const tab = ev.target as HTMLElement;
      if (tab.tagName === 'LABEL') {
        self.activateTab((tab.parentNode as HTMLElement).dataset.name);
      }
    };

    // 1. Remove the event handlers
    shadowRoot.querySelectorAll('.tab').forEach((x) => {
      x.removeEventListener('click', activateTab);
    });

    // 2. Collect the content of each tab
    const slots = shadowRoot.querySelectorAll('.original-content slot');
    let content = '';
    slots.forEach((slot: HTMLSlotElement) => {
      let text = slot
        .assignedNodes()
        .map((node: HTMLElement) => node.innerHTML)
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
        <div part="editor" class="content ${language.toLowerCase()}">
            <textarea data-language="${language.toLowerCase()}">${text}</textarea> 
        </div>
    </div>`;
      }
    });
    shadowRoot.querySelector('.tabs').innerHTML = content;

    // 3. Listen to tab activation
    const tabs = shadowRoot.querySelectorAll<HTMLElement>('.tab');
    if (tabs.length <= 1) {
      tabs.forEach(
        (x) =>
          (x.querySelector<HTMLElement>('.tab > label').style.display = 'none')
      );
    } else {
      shadowRoot.querySelectorAll('.tab label').forEach((x) => {
        x.addEventListener('click', activateTab);
      });
    }
    const firstTab = tabs[0];
    const lastTab = tabs[tabs.length - 1];
    if (tabs.length > 1) {
      firstTab.style.marginTop = '8px';
    } else {
      const tabContent = firstTab.querySelector<HTMLElement>('.content');
      tabContent.style.borderTopLeftRadius = '8px';
      tabContent.style.borderTopRightRadius = '8px';
    }
    if (!this.buttonBarVisible) {
      const tabContent = lastTab.querySelector<HTMLElement>('.content');
      tabContent.style.borderBottomLeftRadius = '8px';
      tabContent.style.borderBottomRightRadius = '8px';
      lastTab.style.marginBottom = '0';
      lastTab.style.paddingBottom = '0';
    }

    // 4. Setup editors
    if (CodeMirror !== undefined) {
      this.resizeObserver.disconnect();
      shadowRoot
        .querySelectorAll<HTMLTextAreaElement>('.tab .content textarea')
        .forEach((x: HTMLTextAreaElement) => {
          // Remove XML comments, including the <!-- htmlmin:ignore --> used to
          // indicate to terser to skip sections, so as to preserve the formatting.
          let value = x.value.replace(/<!--.*-->\n?/g, '');

          // Remove lines with only a `//`
          value = value
            .split('\n')
            .map((x) => (x.trim() === '//' ? '' : x))
            .join('\n');

          // Watch for re-layout and invoke CodeMirror refresh when they happen
          this.resizeObserver.observe(x.parentElement);

          const lang = {
            javascript: 'javascript',
            json: { name: 'javascript', json: true },
            css: 'css',
            html: { name: 'xml', htmlMode: true },
          }[x.dataset.language];

          const editor = CodeMirror.fromTextArea(x, {
            lineNumbers: this.showLineNumbers,
            lineWrapping: true,
            mode: lang ?? 'javascript',
            theme: 'tomorrow-night',
          });
          editor.setValue(value);
          editor.setSize('100%', '100%');
          editor.on('change', () => this.editorContentChanged());
        });
    }

    // 5. Activate the previously active tab, or the first one
    this.activateTab(this.activeTab || tabs[0].dataset.name);

    // 6. Run the playground
    this.runPlayground();

    // Refresh the codemirror layouts
    // (important to get the linenumbers to display correctly)
    setTimeout(
      () =>
        shadowRoot
          .querySelectorAll('textarea + .CodeMirror')
          .forEach((x) => x?.['CodeMirror']?.refresh()),
      128
    );
  }

  activateTab(name: string): void {
    const activeTab: HTMLElement =
      this.shadowRoot.querySelector<HTMLElement>(`[data-name=${name}]`) ??
      this.shadowRoot.querySelectorAll<HTMLElement>('.tab')[0];

    if (!activeTab) return;

    activeTab.querySelector<HTMLInputElement>('input[type="radio"]').checked =
      true;

    this.shadowRoot
      .querySelector<HTMLElement>('.tabs')
      .style.setProperty(
        '--tab-indicator-offset',
        activeTab.offsetLeft -
          this.shadowRoot.querySelector<HTMLElement>('.tab:first-of-type')
            .offsetLeft +
          'px'
      );
    requestAnimationFrame(() =>
      activeTab
        .querySelector('textarea + .CodeMirror')
        ?.['CodeMirror']?.refresh()
    );
  }

  runPlayground(): void {
    const section = this.shadowRoot;
    const result = section.querySelector('.result');

    // Remove all the script tags that might be there.
    result
      .querySelectorAll('.result > script')
      .forEach((x) => result.removeChild(x));

    // Remove all the consoles that might be there.
    // result
    //   .querySelectorAll('.result > .console')
    //   .forEach((x) => result.removeChild(x));

    // Setup the HTML in 'output'
    let htmlContent = '';
    const htmlEditor = section.querySelector(
      'textarea[data-language="html"] + .CodeMirror'
    );
    if (htmlEditor) {
      htmlContent = htmlEditor['CodeMirror'].getValue();
    } else {
      htmlContent =
        section.querySelector<HTMLTextAreaElement>(
          'textarea[data-language="html"]'
        )?.value ?? '';
    }
    // If the HTML content contains any <script> tags, extract them
    const scriptTags = htmlContent.match(/<script.*>.*?<\/script>/g);
    scriptTags?.forEach((x) => {
      const m = x.match(/<script([^>]*?)>(.*)<\/script>/);
      const regex = new RegExp(
        '[\\s\\r\\t\\n]*([a-z0-9\\-_]+)[\\s\\r\\t\\n]*=[\\s\\r\\t\\n]*([\'"])((?:\\\\\\2|(?!\\2).)*)\\2',
        'ig'
      );
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
      } catch (err) {
        // If there's a syntax error in the script, catch it here
        this.pseudoConsole().error(err.message);
      }
    });

    try {
      this.outputStylesheets.forEach((x) => {
        const href = x.trim();
        if (href.length > 0) {
          htmlContent =
            `<link rel="stylesheet" href="${href}"></link>` + htmlContent;
        }
      });
      const outputElement = section.querySelector('div.result > div.output');
      if (htmlContent) outputElement.classList.add('visible');
      else outputElement.classList.remove('visible');
      outputElement.innerHTML = htmlContent;
    } catch (e) {
      // If there's a syntax error in the markup, catch it here
      this.pseudoConsole().error(e.message);
    }

    // Add a new script tag
    const jsEditor = section.querySelector(
      'textarea[data-language="javascript"] + .CodeMirror'
    );
    let jsContent = '';
    if (jsEditor) {
      jsContent = jsEditor['CodeMirror'].getValue();
    } else {
      jsContent =
        section.querySelector<HTMLTextAreaElement>(
          'textarea[data-language="javascript"]'
        )?.value ?? '';
    }
    const newScript = document.createElement('script');
    newScript.type = 'module';
    this.pseudoConsole().clear();
    try {
      newScript.textContent = this.processLiveCodeJavascript(jsContent);
      result.appendChild(newScript);
    } catch (err) {
      // If there's a syntax error in the script, catch it here
      this.pseudoConsole().error(err.message);
    }
    // Temporarily set the window error handler to catch and report
    // on syntax errors that may be present in the script
    const previousErrorHandler = window.onerror;
    window.onerror = (msg, url, line, _colno, error) => {
      if (url === window.location.href) {
        if (line === 0) {
          if (typeof error?.toString === 'function') {
            this.pseudoConsole().error(msg + error.toString());
          } else {
            this.pseudoConsole().error(msg);
          }
        } else {
          this.pseudoConsole().error('Line ' + line + ': ' + msg);
        }
      }
    };
    setTimeout(() => {
      window.onerror = previousErrorHandler;
    }, 500);
  }

  editorContentChanged(): void {
    this.shadowRoot.querySelector<HTMLButtonElement>('#reset-button').disabled =
      false;
    if (this.buttonBarVisibility === 'auto') {
      this.shadowRoot.querySelector('.buttons').classList.add('visible');
      const tabs = this.shadowRoot.querySelectorAll<HTMLElement>('.tab');
      const lastTab = tabs[tabs.length - 1];
      const tabContent = lastTab.querySelector<HTMLElement>('.content');
      tabContent.style.borderBottomLeftRadius = '0';
      tabContent.style.borderBottomRightRadius = '0';
      lastTab.style.marginBottom = '0.5em';
      lastTab.style.paddingBottom = '0.5em';

      if (this.autorun === 'never') {
        const runButton = this.shadowRoot.getElementById('run-botton');
        runButton.classList.add('visible');
      } else {
        if (this.runTimer) {
          clearTimeout(this.runTimer);
        }
        this.runTimer = setTimeout(() => this.runPlayground(), this.autorun);
      }
    }
  }

  resetPlayground(): void {
    const slots = this.shadowRoot.querySelectorAll('.original-content slot');
    slots.forEach((slot: HTMLSlotElement) => {
      const text = slot
        .assignedNodes()
        .map((node: HTMLElement) => node.innerText)
        .join('');
      if (text) {
        const editor = this.shadowRoot.querySelector(
          `textarea[data-language="${slot.name}"] + .CodeMirror`
        );
        editor['CodeMirror'].setValue(text);
      }
    });
  }

  pseudoConsole(): Console & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch: (err: any) => void;
  } {
    const shadowRoot = this.shadowRoot;
    // root ?? (document.currentScript.getRootNode() as HTMLElement);
    let console = shadowRoot.querySelector<HTMLElement>('.result .console');
    if (!console) {
      console = document.createElement('pre');
      console.classList.add('console');
      shadowRoot.querySelector('.result').appendChild(console);
    }
    const appendConsole = (msg: string) => {
      let lines = console.innerHTML.split('\n');
      if (lines.length > CONSOLE_MAX_LINES)
        lines = lines.slice(lines.length - CONSOLE_MAX_LINES + 1);

      console.innerHTML =
        lines.join('\n') +
        '&nbsp;&nbsp;'.repeat(parseInt(console.dataset['group-level']) ?? 0) +
        msg +
        '\n';
      console.scrollTop = console.scrollHeight;

      console.classList.add('visible');
    };
    return {
      ...window.console,
      assert: (condition: boolean, ...args) => {
        if (!condition) appendConsole(interpolate(args));
      },
      // non-standard
      catch: (err) => {
        const m =
          err.stack
            .split('at ')
            .pop()
            .match(/:([0-9]+):([0-9]+)$/) || [];
        appendConsole(
          '<span class="error">' +
            (m[1] ? 'Line ' + (parseInt(m[1]) - 2) + ': ' : '') +
            err.message +
            '</span>'
        );
      },
      clear: () => {
        console.innerHTML = '';
        console.classList.remove('visible');
      },
      debug: (...args) => appendConsole(interpolate(args)),
      dir: (...args) => appendConsole(interpolate(args)),
      error: (...args) =>
        appendConsole('<span class="error">' + interpolate(args) + '</span>'),
      group: (...args) => {
        if (arguments.length > 0)
          appendConsole('<span class="group">' + interpolate(args) + '</span>');
        console.dataset['group-level'] = Number(
          (parseInt(console.dataset['group-level']) ?? 0) + 1
        ).toString();
      },
      groupCollapsed: (...args) => {
        if (arguments.length > 0)
          appendConsole('<span class="group">' + interpolate(args) + '</span>');
        console.dataset['group-level'] = Number(
          (parseInt(console.dataset['group-level']) ?? 0) + 1
        ).toString();
      },
      groupEnd: () => {
        console.dataset['group-level'] = Number(
          (parseInt(console.dataset['group-level']) ?? 0) - 1
        ).toString();
      },
      info: (...args) =>
        appendConsole(`<span class="info">${interpolate(args)}</span>`),
      log: (...args) =>
        appendConsole(`<span class="log">${interpolate(args)}</span>`),
      warn: (...args) =>
        appendConsole(`<span class="warning">${interpolate(args)}</span>`),
    };
  }

  /**
   * Process a script fragment to be able to run inside the playground
   * - replace querySelector/querySelectoAll calls
   * - replace `console.*` calls
   * - extract imports
   * - wrap in a try/catch block
   */
  processLiveCodeJavascript(script: string): string {
    if (!script) return '';
    const jsID = randomJavaScriptId();
    // Replace document.querySelector.* et al with section.querySelector.*
    script = script.replace(
      /([^a-zA-Z0-9_-]?)document\s*\.\s*querySelector\s*\(/g,
      '$1output' + jsID + '.querySelector('
    );
    script = script.replace(
      /([^a-zA-Z0-9_-]?)document\s*\.\s*querySelectorAll\s*\(/g,
      '$1output' + jsID + '.querySelectorAll('
    );

    script = script.replace(
      /([^a-zA-Z0-9_-]?)document\s*\.\s*getElementById\s*\(/g,
      '$1output' + jsID + ".querySelector('#' + "
    );

    // Replace console.* with pseudoConsole.*
    script = script.replace(
      /([^a-zA-Z0-9_-])?console\s*\.\s*/g,
      '$1console' + jsID + '.'
    );

    // Extract import (can't be inside a try...catch block)
    const imports = [];
    script = script.replace(
      /([^a-zA-Z0-9_-]?import.*)('.*'|".*");/g,
      (match, p1, p2) => {
        imports.push([match, p1, p2.slice(1, p2.length - 1)]);
        return '';
      }
    );

    // Important: keep the ${script} on a separate line. The content could
    // be "// a comment" which would result in the script failing to parse
    return (
      imports
        .map((x) => {
          if (this.moduleMap[x[2]]) return `${x[1]} "${this.moduleMap[x[2]]}";`;
          return x[0];
        })
        .join('\n') +
      `const playground${jsID} = document.getElementById("${this.id}").shadowRoot;` +
      `const console${jsID} = playground${jsID}.host.pseudoConsole();` +
      `const output${jsID} = playground${jsID}.querySelector("div.result > div.output");` +
      'try{(function() {\n' +
      script +
      `\n}());} catch(err) { console${jsID}.catch(err) }`
    );
  }

  //
  // Property/attributes
  //

  // 'active-tab' is the name of the currently visible tab
  get activeTab(): string {
    return this.getAttribute('active-tab') ?? '';
  }

  set activeTab(val: string) {
    if (val) {
      this.setAttribute('active-tab', val);
    } else {
      this.removeAttribute('active-tab');
    }
  }

  // 'showlinenumbers' is true if line numbers should be displayed
  get showLineNumbers(): boolean {
    return this.hasAttribute('show-line-numbers');
  }

  set showLineNumbers(val: boolean) {
    if (val) {
      this.setAttribute('show-line-numbers', '');
    } else {
      this.removeAttribute('show-line-numbers');
    }
  }
}

function randomId() {
  return (
    'i' +
    (Date.now().toString(36).slice(-2) +
      Math.floor(Math.random() * 0x186a0).toString(36))
  );
}

function randomJavaScriptId() {
  return (
    Date.now().toString(26).slice(-2) +
    Math.floor(Math.random() * 0x186a0).toString(26)
  );
}

const INDENT = '  ';

/**
 * Convert a basic type or an object into a HTML string
 */
function asString(
  depth: number,
  value: unknown,
  options: { quote?: string; ancestors?: Record<string, any>[] } = {}
): { text: string; itemCount: number; lineCount: number } {
  options.quote ??= '"';
  options.ancestors ??= [];

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
      text: `<span class="string">${escapeHTML(
        options.quote + value + options.quote
      )}</span>`,
      itemCount: 1,
      lineCount: value.split(/\r\n|\r|\n/).length,
    };
  }

  //
  // FUNCTION
  //
  if (typeof value === 'function') {
    let functionValue = '';
    if ('toString' in value) functionValue = escapeHTML(value.toString());
    else functionValue = escapeHTML(String(value));

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
        result.push(
          asString(depth + 1, value[i], {
            ancestors: [...options.ancestors, value],
          })
        );
      } else {
        result.push({
          text: '<span class="empty">empty</span>',
          itemCount: 1,
          lineCount: 1,
        });
      }
    }
    const itemCount = result.reduce((acc, val) => acc + val.itemCount, 0);
    const lineCount = result.reduce(
      (acc, val) => Math.max(acc, val.lineCount),
      0
    );
    if (itemCount > 5 || lineCount > 1) {
      return {
        text:
          "<span class='sep'>[</span>\n" +
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
      text:
        "<span class='sep'>[</span>" +
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
      result +=
        ' ' + x.localName + '="' + value.getAttribute(x.localName) + '"';
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
        text:
          "<span class='sep'>{</span>" +
          propStrings
            .map((x) => x.text)
            .join("</span><span class='sep'>, </span>") +
          "<span class='sep'>}</span>",
        itemCount,
        lineCount,
      };
    }
    return {
      text:
        "<span class='sep'>{</span>\n" +
        INDENT.repeat(depth + 1) +
        propStrings
          .map((x) => x.text)
          .join(
            "</span><span class='sep'>,</span>\n" + INDENT.repeat(depth + 1)
          ) +
        '\n' +
        INDENT.repeat(depth) +
        "<span class='sep'>}</span>",
      itemCount: itemCount,
      lineCount: lineCount + 2,
    };
  }
  return { text: String(value), itemCount: 1, lineCount: 1 };
}

function interpolate(args: unknown[]): string {
  const format = args[0];
  const rest = args.slice(1);

  if (typeof format === 'string' && format.includes('%') && rest.length) {
    const string = format.replace(
      /(%[oscdif]|%(\d*)\.(\d*)[dif])/g,
      (all, key, width = '', dp): string => {
        if (key === '%o') {
          // object
          return asString(0, rest.shift()).text;
        }

        if (key === '%s') {
          // string
          return rest.shift() as string;
        }

        if (key === '%c') {
          return `</span><span style="${rest.shift()}">`;
        }

        const value = rest.shift();
        let res = null;

        if (key.substr(-1) === 'f' && typeof value === 'number') {
          if (isNaN(parseInt(dp, 10))) {
            res = value;
          } else {
            res = value.toFixed(dp);
          }
        } else if (typeof value === 'string') {
          res = parseInt(value, 10);
        }

        if (width === '') {
          return res;
        }

        return asString(0, res).text.padStart(width, ' ');
      }
    );

    return string;
  }

  return args.map((x) => asString(0, x, { quote: '' }).text).join(' ');
}

function escapeHTML(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Register the tag for the element, only if it isn't already registered
customElements.get('code-playground') ??
  customElements.define('code-playground', CodePlaygroundElement);
