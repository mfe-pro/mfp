# mfp-drawer



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute                | Description                                                                                  | Type                | Default     |
| --------------------- | ------------------------ | -------------------------------------------------------------------------------------------- | ------------------- | ----------- |
| `closeOnClickOutside` | `close-on-click-outside` | If true, the drawer will not close when clicking outside the panel                           | `boolean`           | `false`     |
| `closeOnEsc`          | `close-on-esc`           | If true, the dialog will not close when the [Esc] key is pressed                             | `boolean`           | `false`     |
| `enableBackdrop`      | `enable-backdrop`        | If true, the backdrop overlay will be shown when the drawer opens                            | `boolean`           | `false`     |
| `open`                | `open`                   | If true, the drawer component will be shown                                                  | `boolean`           | `undefined` |
| `placement`           | `placement`              | <span style="color:red">**[DEPRECATED]**</span> Defines the position of the drawer<br/><br/> | `"left" \| "right"` | `'right'`   |
| `position`            | `position`               | Defines the position of the drawer                                                           | `"end" \| "start"`  | `'end'`     |


## Events

| Event           | Description                                                    | Type               |
| --------------- | -------------------------------------------------------------- | ------------------ |
| `mfpAfterClose` | Callback handler to be called after the drawer has been closed | `CustomEvent<any>` |
| `mfpAfterOpen`  | Callback handler to be called after the drawer has been opened | `CustomEvent<any>` |
| `mfpClose`      | Callback handler to be called when the drawer is closed        | `CustomEvent<any>` |
| `mfpOpen`       | Callback handler to be called when the drawer is opened        | `CustomEvent<any>` |


## Methods

### `hide() => Promise<void>`

Method to be called to hide the drawer component

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Method to be called to show the drawer component

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part                    | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| `"backdrop"`            | The `<div>` that holds the backdrop overlay                  |
| `"body"`                | The `<main>` that holds the drawer body content              |
| `"button-close"`        | The MfpButton that closes the drawer                         |
| `"button-close__btn"`   | The native button used under the hood that closes the drawer |
| `"button-close__label"` | The text inside the native button that closes the drawer     |
| `"footer"`              | The `<footer>` that holds footer content                     |
| `"header"`              | The `<header>` that holds the icon, title, and close button  |
| `"panel"`               | The `<div>` that holds the drawer entire content             |
| `"title"`               | The `<div>` that holds the title content                     |


## Dependencies

### Depends on

- [mfp-button](../button)
- [mfp-icon](../icon)
- [mfp-divider](../divider)

### Graph
```mermaid
graph TD;
  mfp-drawer --> mfp-button
  mfp-drawer --> mfp-icon
  mfp-drawer --> mfp-divider
  mfp-button --> mfp-icon
  style mfp-drawer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
