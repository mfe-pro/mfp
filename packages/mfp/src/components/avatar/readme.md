# mfp-avatar



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                      | Type                                         | Default     |
| ---------- | ---------- | -------------------------------------------------------------------------------- | -------------------------------------------- | ----------- |
| `altText`  | `alt-text` | Alternate text for the avatar image if the image cannot be displayed             | `string`                                     | `undefined` |
| `image`    | `image`    | The image source to load on the avatar (this can be also a base64 encoded image) | `string`                                     | `undefined` |
| `initials` | `initials` | The text to display on avatar                                                    | `string`                                     | `undefined` |
| `label`    | `label`    | A text to use for describing the avatar on assistive devices                     | `string`                                     | `undefined` |
| `shape`    | `shape`    | The shape of the avatar                                                          | `"circle" \| "square"`                       | `'circle'`  |
| `size`     | `size`     | The size of the avatar                                                           | `"large" \| "medium" \| "small" \| "xsmall"` | `'medium'`  |


## Shadow Parts

| Part     | Description                                                       |
| -------- | ----------------------------------------------------------------- |
| `"base"` | The component's internal wrapper.                                 |
| `"img"`  | The `<image>` tag element that load the image source.             |
| `"text"` | The `<span>` tag element that renderd the `Initials` text string. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
