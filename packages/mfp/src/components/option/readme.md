# mfp-option



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                     | Type      | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------- | --------- | ----------- |
| `disabled` | `disabled` | If true, the option is disabled.                                                | `boolean` | `false`     |
| `hidden`   | `hidden`   | If true, the option is hidden.                                                  | `boolean` | `false`     |
| `selected` | `selected` | If true, the option is selected and active.                                     | `boolean` | `false`     |
| `value`    | `value`    | A string representing the value of the option. Can be used to identify the item | `string`  | `undefined` |


## Events

| Event      | Description                                | Type                                |
| ---------- | ------------------------------------------ | ----------------------------------- |
| `mfpBlur`  | Handler to be called when item loses focus | `CustomEvent<HTMLMfpOptionElement>` |
| `mfpClick` | Handler to be called when item is clicked  | `CustomEvent<HTMLMfpOptionElement>` |
| `mfpEnter` | Handler to be called on enter key press    | `CustomEvent<HTMLMfpOptionElement>` |
| `mfpFocus` | Handler to be called when item is focused  | `CustomEvent<HTMLMfpOptionElement>` |


## Shadow Parts

| Part       | Description                                                                 |
| ---------- | --------------------------------------------------------------------------- |
| `"base"`   | The component's internal wrapper.                                           |
| `"label"`  | The `span` element in which the label text is displayed.                    |
| `"prefix"` | The `span` element in which the prefix is displayed (generally `mfp-icon`). |
| `"suffix"` | The `span` element in which the suffix is displayed (generally `mfp-icon`). |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
