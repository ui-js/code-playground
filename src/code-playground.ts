/* tomorrow-night */
const base00 = "#35434e"; // was #1d1f21;
const base01 = "#282a2e";
const base02 = "#373b41";
const base03 = "#969896";
const base04 = "#b4b7b4";
const base05 = "#c5c8c6"; // base05
const base06 = "#e0e0e0";
const base07 = "#ffffff";
const base0c = "#cc6666"; // base08
const base09 = "#de935f";
const base0a = "#f0c674";
const base0b = "#b5bd68";
const base08 = "#8abeb7"; // base0c
const base0d = "#81a2be"; // base0d
const base0e = "#b294bb";
const base0f = "#a3685a";

const RED = base0c;
const YELLOW = base0a;
const BLUE = base0d;
const GREEN = base0b;

const TAB_HEIGHT = 36;
const TAB_WIDTH = 150;

const template = document.createElement("template");
template.innerHTML = `
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
      color: ${base05};
      background: ${base00};
      border: none;
      outline: none;
      resize: vertical;
      width: 100%;
      height: 100%;
    }
    .result {
      width: calc(50% - .5em);
      margin-left: .5em;
    }
    .stack-layout .source, .stack-layout .result {
      width: auto;
      margin: 0;
    }
    .stack-layout .result  {
      margin-top: 2em;
    }
    .console {
      max-height: 300px;
      padding: 8px;
      border-radius: 8px;
      overflow: auto;
      font-size: 14px;
      color: ${base09};
      background: ${base00};
      white-space: pre-wrap;
    }
    .console .sep {
      color: ${base05};
    }
    .console .boolean {
      color: ${base0e};
      font-weight: bold;
    }
    .console .null {
      color: ${base0e};
      font-weight: bold;
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
    .console .error {
      display: block;
      width: calc(100% - 8px);
      padding: 4px;
      background: ${RED};
      color: white;
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
      min-height: 200px;
      height: 100%;
      clear: both;
      --tab-indicator-offset: 0;
    }
    .stack-layout .tabs {
      /* position: absolute; */
      flex-flow: column;
      /* height: max-content; */
      /* min-height: min-content; */
    }
    .stack-layout .tab {
      height: auto;
    }
    .stack-layout .tab:first-of-type:after {
      display: none;
    }
    .stack-layout .tab:first-child, .stack-layout .tab:last-child {
      border: none;
      border-radius: 0;
      background: ${base02};
      padding-left: 8px;
      padding-right: 8px;
      padding-bottom: .5em;
      margin-left: -8px;
      margin-right: -8px;
      margin-bottom: .5em;
      margin-top: -8px;
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
    }
    .stack-layout .tab > label {
      display: block;
      position: relative;
      height: 2em;
      text-align: left;
      padding-left: .5em;
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
    .button {
      display: inline-block;
      margin-bottom: 0.25em;
      padding: 0.5em 1em;
      font-size: 1rem;
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
      color: #fff;
    }
    .button:enabled:active {
        background: ${base00};
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
    
    // Roughe typographic adjustments.
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
    .cm-s-tomorrow-night .CodeMirror-linenumber { color: ${base04}; }
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
`;

const CONSOLE_MAX_LINES = 1000;

// TODO: add styling for :host:not(:defined) to handle
// the case where JavaScript is not enabled

export class CodeSection extends HTMLElement {
  dirty = false;
  containerId: string;
  moduleMap: { [module: string]: string };

  static get observedAttributes(): string[] {
    return ["activetab", "layout"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    if (name === "activetab" && oldValue !== newValue) {
      this.activateTab(newValue);
    } else if (name === "layout" && oldValue !== newValue) {
      this.shadowRoot
        .querySelector<HTMLElement>(":host > div")
        .classList.toggle("tab-layout", newValue !== "stack");
      this.shadowRoot
        .querySelector<HTMLElement>(":host > div")
        .classList.toggle("stack-layout", newValue === "stack");
    }
  }
  constructor() {
    super();
    if (!this.id) {
      this.id = randomId();
    }
    this.moduleMap = window["moduleMap"] ?? {};
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const container = document.createElement("div");
    this.containerId = randomId();
    container.id = this.containerId;
    container.innerHTML = `
      <div class='original-content'><slot name="html"></slot><slot name="css"></slot><slot name="javascript"></slot></div>
      <div class='source'><div class='tabs'></div>
      <div class='buttons'>
        <button id='reset-button' class='button' disabled><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="history" class="svg-inline--fa fa-history fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 255.532c.252 136.64-111.182 248.372-247.822 248.468-64.014.045-122.373-24.163-166.394-63.942-5.097-4.606-5.3-12.543-.443-17.4l16.96-16.96c4.529-4.529 11.776-4.659 16.555-.395C158.208 436.843 204.848 456 256 456c110.549 0 200-89.468 200-200 0-110.549-89.468-200-200-200-55.52 0-105.708 22.574-141.923 59.043l49.091 48.413c7.641 7.535 2.305 20.544-8.426 20.544H26.412c-6.627 0-12-5.373-12-12V45.443c0-10.651 12.843-16.023 20.426-8.544l45.097 44.474C124.866 36.067 187.15 8 256 8c136.811 0 247.747 110.781 248 247.532zm-167.058 90.173l14.116-19.409c3.898-5.36 2.713-12.865-2.647-16.763L280 259.778V116c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v168.222l88.179 64.13c5.36 3.897 12.865 2.712 16.763-2.647z"></path></svg>Reset</button>
        <button id='run-button' class='button'><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="play" class="svg-inline--fa fa-play fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6zM48 453.5v-395c0-4.6 5.1-7.5 9.1-5.2l334.2 197.5c3.9 2.3 3.9 8 0 10.3L57.1 458.7c-4 2.3-9.1-.6-9.1-5.2z"></path></svg>Run</button>
      </div></div>
      <div class='result'>
          <div class='output'></div>
      </div></div>`;
    this.shadowRoot.appendChild(container);

    // Add event handler for "run" and "reset" button
    this.shadowRoot
      .getElementById("run-button")
      .addEventListener("click", (_ev) => {
        this.runPlayground();
      });
    this.shadowRoot
      .getElementById("reset-button")
      .addEventListener("click", (_ev) => {
        this.resetPlayground();
      });

    // Track insertion/changes to slots
    this.shadowRoot
      .querySelector(".original-content")
      .addEventListener("slotchange", (_ev) => {
        this.dirty = true;
        requestAnimationFrame(() => this.update());
      });
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
      if (tab.tagName === "LABEL") {
        self.activateTab((tab.parentNode as HTMLElement).dataset.name);
      }
    };

    // 1. Remove the event handlers
    shadowRoot.querySelectorAll(".tab").forEach((x) => {
      x.removeEventListener("click", activateTab);
    });

    // 2. Collect the content of each tab
    const slots = shadowRoot.querySelectorAll(".original-content slot");
    let content = "";
    slots.forEach((slot: HTMLSlotElement) => {
      const text = slot
        .assignedNodes()
        .map((node: HTMLElement) => node.innerHTML)
        .join("");
      if (text) {
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
    shadowRoot.querySelector(".tabs").innerHTML = content;

    // 3. Listen to tab activation
    const tabs = shadowRoot.querySelectorAll<HTMLElement>(".tab");
    if (tabs.length <= 1) {
      tabs.forEach((x: HTMLElement) => (x.style.visibility = "hidden"));
      shadowRoot.querySelector<HTMLElement>(".tab .content").style.top = "0";
    } else {
      shadowRoot.querySelectorAll(".tab label").forEach((x) => {
        x.addEventListener("click", activateTab);
      });
    }

    // 4. Activate the previously active tab, or the first one
    this.activateTab(this.activeTab || tabs[0].dataset.name);

    // 5. Setup editors
    if (typeof CodeMirror !== "undefined") {
      shadowRoot
        .querySelectorAll<HTMLTextAreaElement>(".tab .content textarea")
        .forEach((x: HTMLTextAreaElement) => {
          // Remove XML comments, including the <!-- htmlmin:ignore --> used to
          // indicate to terser to skip sections, so as to preserve the formatting.
          x.value = x.value.replace(/<!--.*-->\n?/g, "");

          const lang = {
            javascript: "javascript",
            css: "css",
            html: "xml",
          }[x.dataset.language ?? "javascript"];
          const editor = CodeMirror.fromTextArea(x, {
            lineNumbers: false,
            lineWrapping: true,
            mode: lang,
            theme: "tomorrow-night",
          });
          editor.setSize("100%", "100%");
          editor.on("change", () => {
            this.editorContentChanged();
          });
        });
    }

    // 6. Run the playground
    this.runPlayground();
  }

  activateTab(name) {
    const activeTab: HTMLElement =
      this.shadowRoot.querySelector<HTMLElement>(`[data-name=${name}]`) ??
      this.shadowRoot.querySelectorAll<HTMLElement>(".tab")[0];
    if (!activeTab) return;
    activeTab.querySelector<HTMLInputElement>(
      'input[type="radio"]'
    ).checked = true;
    this.shadowRoot
      .querySelector<HTMLElement>(".tabs")
      .style.setProperty(
        "--tab-indicator-offset",
        activeTab.offsetLeft -
          this.shadowRoot.querySelector<HTMLElement>(".tab:first-of-type")
            .offsetLeft +
          "px"
      );
  }

  runPlayground(): void {
    const section = this.shadowRoot;
    const result = section.querySelector(".result");

    // Remove all the script tags that might be there.
    result.querySelectorAll("script").forEach((x) => {
      result.removeChild(x);
    });

    // Remove all the consoles that might be there.
    result.querySelectorAll(".console").forEach((x) => {
      result.removeChild(x);
    });

    // Setup the HTML in 'output'
    let htmlContent = "";
    const htmlEditor = section.querySelector(
      'textarea[data-language="html"] + .CodeMirror'
    );
    if (htmlEditor) {
      htmlContent = htmlEditor["CodeMirror"].getValue();
    } else {
      htmlContent =
        section.querySelector<HTMLTextAreaElement>(
          'textarea[data-language="html"]'
        )?.value ?? "";
    }
    section.querySelector(".output").innerHTML = htmlContent;

    // Add a new script tag
    const jsEditor = section.querySelector(
      'textarea[data-language="javascript"] + .CodeMirror'
    );
    let jsContent = "";
    if (jsEditor) {
      jsContent = jsEditor["CodeMirror"].getValue();
    } else {
      jsContent =
        section.querySelector<HTMLTextAreaElement>(
          'textarea[data-language="javascript"]'
        )?.value ?? "";
    }
    const newScript = document.createElement("script");
    newScript.type = "module";
    try {
      newScript.appendChild(
        document.createTextNode(this.processLiveCodeJavascript(jsContent))
      );
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
          if (typeof error.toString === "function") {
            this.pseudoConsole().error(msg + error.toString());
          } else {
            this.pseudoConsole().error(msg);
          }
        } else {
          this.pseudoConsole().error("Line " + line + ": " + msg);
        }
      }
    };
    setTimeout(() => {
      window.onerror = previousErrorHandler;
    }, 500);
  }

  editorContentChanged(): void {
    this.shadowRoot.querySelector<HTMLButtonElement>(
      "#reset-button"
    ).disabled = false;
  }

  resetPlayground(): void {
    const slots = this.shadowRoot.querySelectorAll(".original-content slot");
    slots.forEach((slot: HTMLSlotElement) => {
      const text = slot
        .assignedNodes()
        .map((node: HTMLElement) => node.innerText)
        .join("");
      if (text) {
        const editor = this.shadowRoot.querySelector(
          'textarea[data-language="' + slot.name + '"] + .CodeMirror'
        );
        editor["CodeMirror"].setValue(text);
      }
    });
  }

  pseudoConsole() {
    const shadowRoot = this.shadowRoot;
    // root ?? (document.currentScript.getRootNode() as HTMLElement);
    let console: HTMLElement = shadowRoot.querySelector(".result .console");
    if (!console) {
      console = document.createElement("pre");
      console.classList.add("console");
      shadowRoot.querySelector(".result").appendChild(console);
    }
    const appendConsole = function (msg: string) {
      // @todo: support string substition (i.e. %s, %c, etc..)

      let lines = console.innerHTML.split("\n");
      if (lines.length > CONSOLE_MAX_LINES) {
        lines = lines.slice(lines.length - CONSOLE_MAX_LINES + 1);
      }
      console.innerHTML =
        lines.join("\n") +
        "&nbsp;&nbsp;".repeat(parseInt(console.dataset["group-level"]) ?? 0) +
        msg +
        "\n";
      console.scrollTop = console.scrollHeight;
    };
    return {
      assert: function (condition: boolean, ...args) {
        if (!condition) appendConsole(interpolate(args));
      },
      // non-standard
      catch: function (err) {
        const m =
          err.stack
            .split("at ")
            .pop()
            .match(/:([0-9]+):([0-9]+)$/) || [];
        appendConsole(
          '<span class="error">' +
            (m[1] ? "Line " + m[1] + ": " : "") +
            err.message +
            "</span>"
        );
      },
      clear: function () {
        console.innerHTML = "";
      },
      debug: function (...args) {
        appendConsole(interpolate(args));
      },
      error: function (...args) {
        appendConsole('<span class="error">' + interpolate(args) + "</span>");
      },
      group: function (...args) {
        if (arguments.length > 0)
          appendConsole('<span class="group">' + interpolate(args) + "</span>");
        console.dataset["group-level"] = Number(
          (parseInt(console.dataset["group-level"]) ?? 0) + 1
        ).toString();
      },
      groupCollapsed: function (...args) {
        if (arguments.length > 0)
          appendConsole('<span class="group">' + interpolate(args) + "</span>");
        console.dataset["group-level"] = Number(
          (parseInt(console.dataset["group-level"]) ?? 0) + 1
        ).toString();
      },
      groupEnd: function () {
        console.dataset["group-level"] = Number(
          (parseInt(console.dataset["group-level"]) ?? 0) - 1
        ).toString();
      },
      info: function (...args) {
        appendConsole(interpolate(args));
      },
      log: function (...args) {
        appendConsole(interpolate(args));
      },
      warn: function (...args) {
        appendConsole('<span class="warning">' + interpolate(args) + "</span>");
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
  processLiveCodeJavascript(script: string): string {
    // Replace document.querySelector.* et al with section.querySelector.*
    script = script.replace(
      /([^a-zA-Z0-9_-]?)document.querySelector\s*\(/g,
      "$1container.querySelector("
    );
    script = script.replace(
      /([^a-zA-Z0-9_-]?)document.querySelectorAll\s*\(/g,
      "$1container.querySelectorAll("
    );

    script = script.replace(
      /([^a-zA-Z0-9_-]?)document.getElementById\s*\(/g,
      "$1container.querySelector('#' + "
    );

    // Replace console.* with pseudoConsole.*
    script = script.replace(
      /([^a-zA-Z0-9_-])?console\./g,
      "$1host.pseudoConsole()."
    );

    // Extract import (can't be inside a try...catch block)
    const imports = [];
    script = script.replace(
      /([^a-zA-Z0-9_-]?import.*)('.*'|".*");/g,
      (match, p1, p2) => {
        imports.push([match, p1, p2.slice(1, p2.length - 1)]);
        return "";
      }
    );

    return (
      imports
        .map((x) => {
          if (this.moduleMap[x[2]]) {
            return x[1] + '"' + this.moduleMap[x[2]] + '";';
          }
          return x[0];
        })
        .join("\n") +
      `const shadowRoot = document.querySelector("#${this.id}").shadowRoot;` +
      `const host = shadowRoot.host;` +
      `const container = shadowRoot.getElementById("${this.containerId}");` +
      `try{${script}} catch(err) { host.pseudoConsole().catch(err) }`
    );
  }

  //
  // Property/attributes
  //

  // 'activetab' is a the name of the currently visible tab
  get activeTab(): string {
    return this.hasAttribute("activetab") ? this.getAttribute("activetab") : "";
  }

  set activeTab(val: string) {
    // Reflect the value of the activeTab property as an HTML attribute.
    if (val) {
      this.setAttribute("activetab", val);
    } else {
      this.removeAttribute("activetab");
    }
  }
}

function randomId() {
  return (
    Date.now().toString(36).slice(-2) +
    Math.floor(Math.random() * 0x186a0).toString(36)
  );
}

function asString(
  depth: number,
  value: any,
  options: { quote?: string } = {}
): string {
  if (depth > 5) return '<span class="sep">(...)</span>';

  options.quote ??= '"';
  if (typeof value === "boolean") {
    return `<span class="boolean">${escapeHTML(String(value))}</span>`;
  }
  if (typeof value === "number") {
    return `<span class="number">${escapeHTML(String(value))}</span>`;
  }
  if (typeof value === "string") {
    if (options.quote.length === 0) {
      return escapeHTML(value);
    }
    return `<span class="string">${escapeHTML(
      options.quote + value + options.quote
    )}</span>`;
  }
  if (Array.isArray(value)) {
    return (
      "<span class='sep'>[</span>" +
      value
        .map((x) => asString(depth + 1, x))
        .join("<span class='sep'>, </span>") +
      "<span class='sep'>]</span>"
    );
  }
  if (typeof value === "function") {
    let functionValue = "";
    if (value.hasOwnProperty("toString")) {
      functionValue = escapeHTML(value.toString());
    } else {
      functionValue = escapeHTML(String(value));
    }
    return `<span class="function">ƒ  ${functionValue}</span>`;
  }
  if (value === null) {
    return `<span class="null">${escapeHTML(String(value))}</span>`;
  }
  if (typeof value === "object") {
    const props = Object.keys(value);

    Object.getOwnPropertyNames(value).forEach((prop) => {
      if (!props.includes(prop)) {
        props.push(prop);
      }
    });
    if (props.length === 0 && typeof props.toString === "function") {
      const result = value.toString();
      if (result === "[object Object]") return '<span class="sep">{}</span>';
      return result;
    }
    const propStrings = props.sort().map((key) => {
      if (typeof value[key] === "object" && value[key] !== null) {
        let result = asString(depth + 1, value[key]);
        if (result.length > 80) {
          result = "<span class='sep'>(...)</span>";
        }
        return `<span class="property">${key}</span><span class='sep'>: </span>${result}`;
      }
      if (typeof value[key] === "function") {
        return `<span class="property">${key}</span></span><span class='sep'> : </span><span class='function'>ƒ (...)</span>`;
      }
      return `<span class="property">${key}</span></span><span class='sep'> : </span>${asString(
        depth + 1,
        value[key]
      )}`;
    });
    if (propStrings.length < 5) {
      return (
        "</span><span class='sep'>{</span>" +
        propStrings.join("</span><span class='sep'>, </span>") +
        "</span><span class='sep'>}</span>"
      );
    }
    return (
      "</span><span class='sep'>{</span>\n    " +
      propStrings.join("</span><span class='sep'>,</span>\n    ") +
      "\n</span><span class='sep'>}</span>"
    );
  }
  return String(value);
}

function interpolate(args: any[]): string {
  const format = args[0];
  const rest = args.slice(1);

  if (typeof format === "string" && format.includes("%") && rest.length) {
    const string = format.replace(
      /(%[oscdif]|%(\d*)\.(\d*)[dif])/g,
      (all, key, width = "", dp) => {
        if (key === "%0") {
          // string
          return asString(0, rest.shift());
        }

        if (key === "%s") {
          // string
          return rest.shift();
        }

        if (key === "%c") {
          return `</span><span style="${rest.shift()}">`;
        }

        const value = rest.shift();
        let res = null;

        if (key.substr(-1) === "f") {
          if (isNaN(parseInt(dp, 10))) {
            res = value;
          } else {
            res = value.toFixed(dp);
          }
        } else {
          res = parseInt(value, 10);
        }

        if (width === "") {
          return res;
        }

        return asString(0, res).padStart(width, " ");
      }
    );

    return string;
  }

  if (rest.length) {
    return (
      asString(0, format, { quote: "" }) +
      rest.map((x) => asString(0, x, { quote: "" })).join("")
    );
  }
  return asString(0, format, { quote: "" });
}

function escapeHTML(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Register the tag for the element, only if it isn't already registered
customElements.get("code-playground") ??
  customElements.define("code-playground", CodeSection);
