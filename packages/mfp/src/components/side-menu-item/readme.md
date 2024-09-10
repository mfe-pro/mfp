# mfp-side-menu-item



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                           | Type      | Default |
| ---------- | ---------- | ----------------------------------------------------------------------------------------------------- | --------- | ------- |
| `active`   | `active`   | If true, the menu item will be shown as active/selected.                                              | `boolean` | `false` |
| `collapse` | `collapse` | If true, the item label and suffix will be hidden and the with will be reduce according to its parent | `boolean` | `false` |
| `disabled` | `disabled` | If true, the menu item will be disabled (no interaction allowed)                                      | `boolean` | `false` |


## Events

| Event      | Description                                      | Type                                      |
| ---------- | ------------------------------------------------ | ----------------------------------------- |
| `mfpBlur`  | Handler to be called when the button loses focus | `CustomEvent<HTMLMfpSideMenuItemElement>` |
| `mfpClick` | Handler to be called when button gets focus      | `CustomEvent<HTMLMfpSideMenuItemElement>` |
| `mfpFocus` | Handler to be called when the button is clicked  | `CustomEvent<HTMLMfpSideMenuItemElement>` |


## Shadow Parts

| Part        | Description                                                                                                    |
| ----------- | -------------------------------------------------------------------------------------------------------------- |
| `"base"`    | The component wrapper container inside the shadow DOM                                                          |
| `"label"`   | The label slot                                                                                                 |
| `"panel"`   | The `<div>` container that holds the tooltip content (when the side menu is collapsed)                         |
| `"prefix"`  | The prefix slot                                                                                                |
| `"suffix"`  | The suffix slot                                                                                                |
| `"trigger"` | The `<div>` container that holds the element which displays tooltip on hover (when the side menu is collapsed) |


## Dependencies

### Depends on

- [mfp-tooltip](../tooltip)

### Graph
```mermaid
graph TD;
  mfp-side-menu-item --> mfp-tooltip
  style mfp-side-menu-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
