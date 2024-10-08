# mfp-tag



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                                            | Type                                                     | Default     |
| ----------- | ----------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------- | ----------- |
| `border`    | `border`    | The corner radius of the Tag (will override size's predefined border)                  | `"full" \| "l" \| "m" \| "none" \| "s" \| "xs" \| "xs2"` | `undefined` |
| `clickable` | `clickable` | If true, the Tag can be clickable                                                      | `boolean`                                                | `false`     |
| `color`     | `color`     | The color style of the Tag                                                             | `"error" \| "gray" \| "info" \| "success" \| "warning"`  | `undefined` |
| `disabled`  | `disabled`  | If true, the Tag will be disabled (only if clickable = `true`, no interaction allowed) | `boolean`                                                | `false`     |
| `hidden`    | `hidden`    | If true, the Tag component will hidden (only if removable = `true`)                    | `boolean`                                                | `undefined` |
| `removable` | `removable` | If true, the Tag component can be removed                                              | `boolean`                                                | `false`     |
| `selected`  | `selected`  | If true, the Tag is selected (only if clickable = `true`)                              | `boolean`                                                | `false`     |
| `size`      | `size`      | The size of the Tag component                                                          | `"medium" \| "small" \| "xsmall"`                        | `'medium'`  |
| `variant`   | `variant`   | The variant of Tag to apply on top of the variant                                      | `"filled" \| "outline"`                                  | `'filled'`  |


## Events

| Event      | Description                                                  | Type                             |
| ---------- | ------------------------------------------------------------ | -------------------------------- |
| `mfpBlur`  | Handler to be called when tag loses focus                    | `CustomEvent<HTMLMfpTagElement>` |
| `mfpClick` | Handler to be called when tag is clicked                     | `CustomEvent<HTMLMfpTagElement>` |
| `mfpClose` | Callback handler to be called when the tag is close/hidden   | `CustomEvent<any>`               |
| `mfpFocus` | Handler to be called when tag is focused                     | `CustomEvent<HTMLMfpTagElement>` |
| `mfpOpen`  | Callback handler to be called when the tag is not open/shown | `CustomEvent<any>`               |


## Methods

### `hide() => Promise<void>`

Method to be called to remove the tag component

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Method to be called to show the tag component

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description                                                                                |
| ------------- | ------------------------------------------------------------------------------------------ |
| `"btn-close"` | The close button element to remove the tag component.                                      |
| `"prefix"`    | The `<span>` tag element that acts as prefix container (when icon exists in front of tag). |
| `"text"`      | The `<div>` element containing the text of the tag component.                              |
| `"wrapper"`   | The wrapper container `<div>` of the element inside the shadow DOM.                        |


## Dependencies

### Used by

 - [mfp-select](../select)

### Depends on

- [mfp-button](../button)
- [mfp-icon](../icon)

### Graph
```mermaid
graph TD;
  mfp-tag --> mfp-button
  mfp-tag --> mfp-icon
  mfp-button --> mfp-icon
  mfp-select --> mfp-tag
  style mfp-tag fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
