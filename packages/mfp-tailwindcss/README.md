# MFP TailwindCSS Preset

O **MFP TailwindCSS** é um preset que adiciona a configuração opinativa do TailwindCSS do MFP à sua aplicação.

## Pré-requisitos 🧰

Antes de começar a usar o **MFP TailwindCSS**, você precisa ter instalado:

- [TailwindCSS](https://tailwindcss.com/docs/installation)

Certifique-se de que as diretivas do Tailwind CSS estão adicionadas ao seu arquivo CSS principal:

```scss
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Instalação 📦

```bash
npm i -D @mfp/tailwindcss
```

## Uso 🚀

```javascript
const mfpPreset = require('@mfp/tailwindcss');

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  presets: [mfpPreset],
  ...
}
```

ou com TypeScript:

```typescript
import { default as mfpPreset } from '@mfp/tailwindcss';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  presets: [mfpPreset],
  ...
}
```

## Reset de CSS 🧹

O preset inclui um reset de CSS que remove todos os estilos padrões do navegador. Se você quiser usar o seu próprio reset, pode adicionar seu código de reset CSS à camada `@base` do TailwindCSS:

```scss
@tailwind base;
@layer base {
  /* Seu código de reset CSS */
}
@tailwind components;
@tailwind utilities;
```

## Fontes 🖋

O preset não inclui fontes por padrão, mas você pode adicioná-las no seu arquivo de entrada CSS ou usar suas próprias fontes personalizadas:

```scss
/* Fonte Outfit do MFP */
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@100;300;400;600;700&display=swap");
```

## Tipografia 📝

O preset inclui um plugin de tipografia que adiciona um conjunto de estilos de tipografia padrão à sua aplicação. Não é ativado por padrão, então você precisa adicioná-lo ao seu arquivo `tailwind.config.js`:

```javascript
const mfpPreset = require('@mfp/tailwindcss');
const { TYPOGRAPHY_DEFAULT } = require('@mfp/tailwindcss');

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  presets: [require('@mfp/tailwindcss')],
  ...
  plugins: [
    plugin(function ({ addBase }) {
      // Usar os estilos de tipografia padrão
      addBase({ ...TYPOGRAPHY_DEFAULT });
    }),
  ],
}
```

ou via TypeScript:

```typescript
import plugin from "tailwindcss/plugin";
import { default as mfpPreset, TYPOGRAPHY_DEFAULT } from "@mfp/tailwindcss";
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  presets: [mfpPreset],
  theme: {},
  plugins: [
    plugin(function ({ addBase }) {
      // Usar os estilos de tipografia padrão
      addBase({ ...TYPOGRAPHY_DEFAULT });
    }),
  ],
  corePlugins: {
    preflight: false,
  },
} satisfies Config;
```

> Nota: você sempre pode sobrescrever esses estilos adicionando seu próprio código CSS à camada `@base` do TailwindCSS.

## Documentação 📙

Você pode encontrar mais detalhes sobre presets do TailwindCSS na [documentação oficial](https://tailwindcss.com/docs/presets).
