# MFP, a web component library initiative

The elements and components provided by MFP are being implemented with [Stencil](https://stenciljs.com/), a compiler that generates Web Components (more specifically, Custom Elements), combining the best concepts of the most popular frameworks into a simple build-time tool. You can read more about Stencil on their [official ](https://stenciljs.com/)website.

## Installation

MFP elements, components, patterns, utilities, etc., are available as an npm package.

### For `stable` releases

```bash
$ npm i @mfp/core
```

## Usage

MFP components are regular HTML elements, or custom elements (often referred to as "web components"). If you're using a simple HTML page, you can use them like any other element.

```html
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@nfo/core/dist/nfo/nfo.css" />
    <script type="module" src="https://cdn.jsdelivr.net/npm/@nfo/core/dist/nfo/mfp.esm.js"></script>
  </head>
  <body>
    <mfp-button>Click me!</mfp-button>
  </body>
</html>
```

> ❗️The icons SVG are shipped in a separate folder. Projects will need to include `node_modules/@mfp/core/dist/mfp/svg` in their build and try to make it in a certain way that it respond to: `http://<domain>/svg`

### Events

You can listen for standard events such as click, mouseover, etc. as you normally would. Most of the MFP components emit custom events, we highly recommend the use of those instead. They work the same way as standard events but are prefixed with `bq` to prevent collisions with standard events and other libraries.

```html
<mfp-checkbox>Checkbox label</mfp-checkbox>

<script>
  const checkbox = document.querySelector('mfp-checkbox');
  button.addEventListener('bqChange', (event) => {
    console.log('Is checked?', event.detail.checked);
  });
</script>
```
