# mfp-breadcrumb



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                                   | Type     | Default         |
| ----------- | ------------ | ------------------------------------------------------------- | -------- | --------------- |
| `ariaLabel` | `aria-label` | The `aria-label` attribute to describe the type of navigation | `string` | `'Breadcrumbs'` |


## Events

| Event                | Description                                                                         | Type                                        |
| -------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------- |
| `mfpBreadcrumbBlur`  | Handler to be called when `mfp-breadcrumb-item` item loses focus.                   | `CustomEvent<HTMLMfpBreadcrumbItemElement>` |
| `mfpBreadcrumbClick` | Handler to be called when `mfp-breadcrumb-item` is selected (on click/enter press). | `CustomEvent<HTMLMfpBreadcrumbItemElement>` |
| `mfpBreadcrumbFocus` | Handler to be called when `mfp-breadcrumb-item` item gets focus.                    | `CustomEvent<HTMLMfpBreadcrumbItemElement>` |


## Shadow Parts

| Part           | Description                                   |
| -------------- | --------------------------------------------- |
| `"navigation"` | The `nav` tag that loads the breadcrumb items |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
