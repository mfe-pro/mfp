# Wrapper React para MFP

## Instalação do pacote

- Instale o pacote:

```bash
npm install @mfp/react
```

- Atualize o pacote:

```bash
npm install @mfp/react@latest
```

Se o pacote `@mfp/core` estiver instalado, você deve atualizar ambos:

```bash
npm install @mfp/{core,react}
```

### Adicione estilos e assets do MFP

Certifique-se de que o estilo principal do MFP está importado no arquivo de estilo principal da sua aplicação:

```javascript
@import "@mfp/core/dist/mfp/mfp";
```

> ❗️Os ícones SVG são enviados em uma pasta separada. Dependendo do seu stack React, seu projeto precisará incluir `node_modules/@mfp/core/dist/mfp/svg` na build de forma que responda para: `http://<domínio>/svg`

## Uso

```javascript
import React from 'react';
import { MfpButton } from '@mfp/react';

function App() {
  const handleButtonClick = (ev: CustomEvent) => {
    console.log(ev.detail);
  };

  return (
    <MfpButton appearance="primary" onMfpClick={handleButtonClick}>
      Click Me
    </MfpButton>
  );
}

export default App;
```

## Por que isso é necessário?

React e elementos personalizados não funcionam bem juntos. O problema é descrito da melhor forma pelo [Custom Elements Everywhere](https://custom-elements-everywhere.com/#react):

> **Manipulação de dados**
>
> O React passa todos os dados para Elementos Personalizados na forma de atributos HTML. Para dados primitivos, isso funciona bem, mas o sistema se quebra ao passar dados complexos, como objetos ou arrays. Nesses casos, você acaba com valores serializados como some-attr="[object Object]", que não podem ser realmente usados.
>
> **Manipulação de eventos**
>
> Como o React implementa seu próprio sistema de eventos sintéticos, ele não pode ouvir eventos DOM que vêm de Elementos Personalizados sem o uso de uma solução alternativa. Os desenvolvedores precisam referenciar seus Elementos Personalizados usando uma ref e anexar manualmente ouvintes de eventos com addEventListener. Isso torna o trabalho com Elementos Personalizados complicado.

Essa utilidade resolve esses problemas expondo um componente React nativo que mapeia propriedades e eventos para o elemento personalizado subjacente. ✨
