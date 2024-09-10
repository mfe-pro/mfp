import { resolve } from 'path';

import { Config } from '@stencil/core';
import { reactOutputTarget as react } from '@stencil/react-output-target';
import { sass } from '@stencil/sass';
import tailwind, { PluginConfigOpts, tailwindHMR } from 'stencil-tailwind-plugin';

import { generateCustomElementsJson } from './src/tools';
import tailwindConf from '../../tailwind.config';

const tailwindOpts: PluginConfigOpts = {
  postcss: resolve(__dirname, '../../postcss.config.js').replace(/\\/g, '/'),
  tailwindConf: tailwindConf,
  stripComments: true,
};

const namespace = 'mfp';
const componentCorePackage = `@${namespace}/core`;
const customElementsDir = 'dist/components';

export const config: Config = {
  namespace,
  taskQueue: 'async',
  buildDist: true,
  enableCache: true,
  globalScript: resolve(__dirname, './src/global/scripts/global.ts').replace(/\\/g, '/'),
  globalStyle: resolve(__dirname, './src/global/styles/default.scss').replace(/\\/g, '/'),
  plugins: [
    sass({
      includePaths: [
        resolve(__dirname, '../../node_modules').replace(/\\/g, '/'),
        resolve(__dirname, 'src/global/styles').replace(/\\/g, '/'),
      ],
      injectGlobalPaths: [resolve(__dirname, 'src/global/styles/mixins/index.scss').replace(/\\/g, '/')],
      outputStyle: 'compressed',
      sourceMap: true,
      sourceMapEmbed: true,
      sourceMapContents: true,
    }),
    tailwind(tailwindOpts),
    tailwindHMR({ tailwindConf }),
  ],
  outputTargets: [
    { type: 'docs-readme' },
    { type: 'docs-custom', generator: generateCustomElementsJson },
    { type: 'docs-vscode', file: 'custom-elements.json' },
    { type: 'dist', copy: [{ src: '../README.md' }] },
    { type: 'dist-hydrate-script', dir: 'dist/hydrate' },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'single-export-module',
      dir: customElementsDir,
      minify: true,
    },
    {
      type: 'www',
      copy: [
        { src: 'global/assets', dest: 'assets' },
        { src: 'global/scripts', dest: 'scripts' },
      ],
      serviceWorker: null, // disable service workers
    },
    react({
      componentCorePackage,
      proxiesFile: resolve(__dirname, '../mfp-react/src/components.ts').replace(/\\/g, '/'),
      includeImportCustomElements: true,
      customElementsDir,
    }),
  ],
  extras: {
    /**
     * Details:
     * https://stenciljs.com/docs/config-extras
     */
    enableImportInjection: true,
    experimentalScopedSlotChanges: true,
    experimentalSlotFixes: true,
  },
  preamble: 'Built by MFEPRO\n© https://mfe-pro.app - Apache 2 License.',
  watchIgnoredRegex: /(custom-elements\.)((d\.ts)|(json))$/g,
  devServer: {
    openBrowser: false,
    port: 8001,
    reloadStrategy: 'pageReload',
  },
};
