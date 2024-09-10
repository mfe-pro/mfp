import './assets/css/stories.css';

import type { DecoratorFunction } from '@storybook/csf';
import type { Preview, WebComponentsRenderer } from '@storybook/web-components';
import { createElement } from 'react';
import { DocsContainer } from '@storybook/blocks';
import { setCustomElementsManifest } from '@storybook/web-components';

import customElements from '../custom-elements.json';

setCustomElementsManifest(customElements);

const withThemeProvider: DecoratorFunction<WebComponentsRenderer, { [x: string]: unknown }> = (storyFn, context) => {
  const {
    globals: { theme, mode },
  } = context;
  const body = document.querySelector('body.sb-show-main');
  if (!(body instanceof HTMLElement)) return storyFn();

  body.setAttribute('mfp-theme', theme || 'mfp');
  body.setAttribute('mfp-mode', mode || 'light');
  return storyFn();
};

const preview: Preview = {
  decorators: [withThemeProvider],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Theme for MFP components',
      defaultValue: 'mfp',
      toolbar: {
        icon: 'globe',
        items: [{ value: 'mfp', title: 'Theme: MFP' }],
        dynamicTitle: true,
      },
    },
    mode: {
      name: 'Mode',
      description: 'Theme mode for MFP components',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: '☀️ Light' },
          { value: 'dark', title: '🌘 Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: { expanded: true, hideNoControlsWarning: true },
    docs: {
      story: {
        inline: true,
        height: '250px',
      },
      container: (props: any) => {
        const {
          globals: { theme, mode },
        } = props.context.store.globals;

        const body = document.querySelector('body');
        body!.setAttribute('mfp-theme', theme.toLowerCase() ?? 'mfp');
        body!.setAttribute('mfp-mode', mode.toLowerCase() ?? 'light');

        return createElement(DocsContainer, props);
      },
    },
    html: {
      removeComments: true,
      removeEmptyComments: true,
      highlighter: {
        showLineNumbers: true,
        wrapLines: true,
      },
      prettier: {
        htmlWhitespaceSensitivity: 'ignore',
        tabWidth: 2,
        printWidth: 80,
        useTabs: false,
      },
      root: '#root-inner',
    },
    options: {
      storySort: {
        order: ['Welcome', "What's new", 'Foundation', 'Components'],
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
