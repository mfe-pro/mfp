# MFP Icons: Plugin personalizado para baixar os SVGs dos ícones

O Plugin de `icons` fará o download dos arquivos SVG da [biblioteca Phosphor icons](https://phosphoricons.com/) e os colocará nos assets do MFP.

## Executando

Embora o plugin seja instanciado antes dos scripts de build e start, ele também pode ser acionado executando o seguinte comando no terminal:

```bash
  npx nx run mfp:generate-icons
```

Durante a execução, veremos diferentes saídas para cada uma das etapas:

```json lines
  - Download da biblioteca Phosphor-icon
  ✔ Download da biblioteca Phosphor-icon
  - Extrair e copiar todos os arquivos de ícones SVG para a pasta de assets do componente de ícones
  ✔ Extrair e copiar todos os arquivos de ícones SVG para a pasta de assets do componente de ícones
  - Gerar o arquivo helper `icons-set.ts`
  ✔ Gerar o arquivo helper `icons-set.ts`
```

## Opções

O executor local precisa de certas opções para funcionar como esperado. Você pode encontrar todas as opções disponíveis neste [arquivo schema.d.ts](./src/executors/generate-icons/schema.d.ts).

```json lines
  assetsFolder: string; // Nome da pasta de assets dentro do pacote .zip

  downloadPath: string; // Caminho para salvar o pacote .zip baixado

  extractToPath: string; // Caminho para extrair o pacote .zip

  fileName: string; // Nome do arquivo .zip a ser baixado

  helperFile: string; // Nome do arquivo .ts helper a ser criado listando todos os nomes de ícones disponíveis

  outputDir: string; // Diretório de saída onde colocar o arquivo helper .ts criado

  sourceDir: string; // Diretório de origem de onde listar todos os arquivos de ícones SVG disponíveis

  sourceUrl: string; // URL de origem de onde baixar o pacote de ícones

  svgFolder: string; // Nome da pasta SVG dentro do pacote .zip
```

Essas opções são configuradas no alvo `icons` dentro do [arquivo mfp/project.json](../packages/mfp/project.json):

```json
  "icons": {
    "executor": "@mfp/tools:icons",
    "outputs": ["{options.downloadPath}", "{options.extractToPath}", "{options.outputDir}"],
    "options": {
      "assetsFolder": "assets",
      "downloadPath": "packages/mfp-icons/temp",
      "extractToPath": "packages/mfp/src/components/icon/svg",
      "fileName": "master.zip",
      "helperFile": "icons-set.ts",
      "outputDir": "packages/mfp/src/components/icon/helper",
      "sourceDir": "packages/mfp/src/components/icon/svg/regular",
      "svgFolder": "web-master",
      "sourceUrl": "https://github.com/phosphor-icons/phosphor-icons/archive/refs/heads"
    }
  },
```

📖 Para mais detalhes sobre os executores locais do Nx, consulte a documentação oficial: https://nx.dev/recipes/executors/creating-custom-executors
