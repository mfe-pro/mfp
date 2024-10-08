# mfp-breadcrumb-item



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute      | Description                                                                                                                                                                    | Type                                         | Default                 |
| ------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- | ----------------------- |
| `ariaLabel`  | `aria-label`   | The aria-label that corresponds to the full title of the destination page. This won't be shown in the page, but it will be used by screen readers and other assistive devices. | `string`                                     | `undefined`             |
| `href`       | `href`         | If set, the breadcrumb item will be rendered as an `<a>` with this `href`, otherwise, a `<button>` will be rendered.                                                           | `string`                                     | `undefined`             |
| `isLastItem` | `is-last-item` | If true, the item is the last element inside breadcrumb                                                                                                                        | `boolean`                                    | `false`                 |
| `rel`        | `rel`          | Where to display the link in the browser context. Relevant only if `href` is set.                                                                                              | `string`                                     | `'noreferrer noopener'` |
| `target`     | `target`       | Where to display the link in the browser context. Relevant only if `href` is set.                                                                                              | `"_blank" \| "_parent" \| "_self" \| "_top"` | `undefined`             |


## Events

| Event      | Description                                | Type                                        |
| ---------- | ------------------------------------------ | ------------------------------------------- |
| `mfpBlur`  | Handler to be called when item loses focus | `CustomEvent<HTMLMfpBreadcrumbItemElement>` |
| `mfpClick` | Handler to be called when item is clicked  | `CustomEvent<HTMLMfpBreadcrumbItemElement>` |
| `mfpFocus` | Handler to be called when item is focused  | `CustomEvent<HTMLMfpBreadcrumbItemElement>` |


## Shadow Parts

| Part          | Description                                |
| ------------- | ------------------------------------------ |
| `"base"`      | The component wrapper container            |
| `"content"`   | The `span` tag that loads the content item |
| `"item"`      |                                            |
| `"separator"` | The `span` tag that loads the separator    |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
