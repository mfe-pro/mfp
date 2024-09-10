# mfp-empty-state



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                           | Type                             | Default    |
| -------- | --------- | ------------------------------------- | -------------------------------- | ---------- |
| `size`   | `size`    | The size of the empty state component | `"large" \| "medium" \| "small"` | `'medium'` |


## Shadow Parts

| Part          | Description                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------------- |
| `"body"`      | The container `<div>` that wraps the alert description content                                                      |
| `"footer"`    | The container `<div>` that wraps the alert footer content                                                           |
| `"icon"`      | The `<mfp-icon>` element used to render a predefined icon size based on the empty state size (small, medium, large) |
| `"thumbnail"` | The container `<div>` that wraps the thumbnail element                                                              |
| `"title"`     | The container `<div>` that wraps the empty state title content                                                      |
| `"wrapper"`   | The wrapper container `<div>` of the element inside the shadow DOM                                                  |


## Dependencies

### Depends on

- [mfp-icon](../icon)

### Graph
```mermaid
graph TD;
  mfp-empty-state --> mfp-icon
  style mfp-empty-state fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
