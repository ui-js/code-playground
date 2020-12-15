# code-playground

Code Playground is a web component to display an editable and executable code
section in a web page.

To use it, add a script tag pointing to the code for the component:

```html
<script type="module" src="../dist/code-playground.js"></script>
```

Then add a `<code-playground>` tag in your page:

```html
<code-playground>
    <div slot="javascript">console.log("Hello world")</div>
</code-playground>
```

Add one or more `<div>` with a `slot` attribute indicating the type of content:
"javascript", "html" or "css".

If there are multiple "slots", each will be displayed in a separate tab.

If CodeMirror is included in the page, it will be used as the editor
for the content. To include it, add these script tags to your page:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/codemirror.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/mode/javascript/javascript.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/mode/xml/xml.min.js"></script>
```

After the content is modified, pres **Run** to execute it.
To revert your changes and restore the initial content, press **Reset**.

The Javascript source code is modified before execution:

-   the `console` calls, such as `console.log()` are intercepted to be displayed
    in the web page rather than in the browser's console
-   the `document.querySelector()`, 'document.querySelectorAll()` and 'document.getElementById()`
    calls are also intercepted to respect the scope of the playground, that is
    using these calls you can also access content in the playground. This means you
    can also have multiple elements with the same ID in different playground, and
    the correct one will be selected.
-   the path of `import` directives can be modified as well. Add a `<script>` tag
    inside the component that defines a `moduleMap` variable that maps a module
    name to a URL. For example:
-   if a `style` slot is provided, its content is injected as a CSS stylesheet
    before the script execution
-   if a `preamble` slot is provided, it is inserted before the script. This
    can be used to insert linked stylesheets, for example.

```html
<code-playground>
  <script>
    moduleMap = {
      mathlive: "//unpkg.com/mathlive/dist/mathlive.mjs",
    };
  </script></code-playground>
  <div slot="javascript">import MathLive from 'mathlive';</div>
</code-playground>
```

will result in the `'mathlive'` module to be loaded from the
`'//unpkg.com/mathlive/dist/mathlive.mjs'` URL;

# Attributes and Properties

The attributes can be specified directly on the component, e.g.

```html
<code-playground layout="stack">
    <div slot="javascript">...</div>
    <div slot="html">...</div>
</code-playground>
```

There are corresponding properties for the attributes which can be
accessed via JavaScript.

| Attribute         | Property          |                                                                                                                      |
| ----------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| `layout`          |                   | `stack` (each section is displayed in a column) or `tabs` (each section is displayed in a panel with a tab selector) |
| `activetab`       | `activeTab`       | `html`, `javascript` or `css`: indicate which tab is visible                                                         |
| `showlinenumbers` | `showLineNumbers` | `true` or `false`. If true, displays line numbers in the gutter of the source code.                                  |

A stylesheet can be injected by defining a `style` slot:

```html
<code-playground layout="stack" showlinenumbers="true">
    <style slot="style">
        .grey-zone {
            background: grey;
            height: 100px;
            width: 100%;
        }
    </style>
    <div slot="html">&lt;div class="grey-zone"&gt;&lt\div&gt;</div>
</code-playground>
```
