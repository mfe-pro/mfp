import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ThemeSwapper from 'tailwindcss-theme-swapper';

import { ColorMix, LogicalProperties } from './plugins';
import {
  CSS_COLORS,
  DECLARATIVE_COLORS,
  DefaultDarkTheme,
  DefaultLightTheme,
  DefaultRootTheme,
  PRIMITIVE_COLORS,
  reset,
  TYPOGRAPHY_DEFAULT,
} from './theme';

export default {
  theme: {
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      /* -------------------------------------------------------------------------- */
      /*                         Default Theme (Declarative)                        */
      /* -------------------------------------------------------------------------- */
      ...DECLARATIVE_COLORS,
      /* -------------------------------------------------------------------------- */
      /*                         Extended colors (Primitive)                        */
      /* -------------------------------------------------------------------------- */
      ...PRIMITIVE_COLORS,
    },
    borderRadius: {
      none: 'var(--mfp-radius--none)',
      xs2: 'var(--mfp-radius--xs2)',
      xs: 'var(--mfp-radius--xs)',
      s: 'var(--mfp-radius--s)',
      m: 'var(--mfp-radius--m)',
      l: 'var(--mfp-radius--l)',
      full: 'var(--mfp-radius--full)',
    },
    borderWidth: {
      0: '0',
      s: 'var(--mfp-stroke-s)',
      m: 'var(--mfp-stroke-m)',
      l: 'var(--mfp-stroke-l)',
    },
    boxShadow: {
      xs: 'var(--mfp-box-shadow--xs)',
      s: 'var(--mfp-box-shadow--s)',
      m: 'var(--mfp-box-shadow--m)',
      l: 'var(--mfp-box-shadow--l)',
    },
    fontFamily: {
      default: 'var(--mfp-font-family)',
      outfit: 'var(--mfp-font-family--outfit)',
      poppins: 'var(--mfp-font-family--poppins)',
    },
    fontSize: {
      xs: 'var(--mfp-font-size--xs)',
      s: 'var(--mfp-font-size--s)',
      m: 'var(--mfp-font-size--m)',
      l: 'var(--mfp-font-size--l)',
      xl: 'var(--mfp-font-size--xl)',
      xxl: 'var(--mfp-font-size--xxl)',
      xxl2: 'var(--mfp-font-size--xxl2)',
      xxl3: 'var(--mfp-font-size--xxl3)',
      xxl4: 'var(--mfp-font-size--xxl4)',
      xxl5: 'var(--mfp-font-size--xxl5)',
    },
    fontWeight: {
      thin: 'var(--mfp-font-weight--thin)',
      light: 'var(--mfp-font-weight--light)',
      regular: 'var(--mfp-font-weight--regular)',
      medium: 'var(--mfp-font-weight--medium)',
      semibold: 'var(--mfp-font-weight--semibold)',
      bold: 'var(--mfp-font-weight--bold)',
    },
    lineHeight: {
      small: 'var(--mfp-font-line-height--small)',
      regular: 'var(--mfp-font-line-height--regular)',
      large: 'var(--mfp-font-line-height--large)',
    },
    strokeWidth: {
      none: '0',
      s: 'var(--mfp-stroke-s)',
      m: 'var(--mfp-stroke-m)',
      l: 'var(--mfp-stroke-l)',
    },
    extend: {
      height: {
        // Details: https://web.dev/viewport-units/#the-need-for-new-viewport-units
        'dynamic-vh': '100dvh',
      },
      content: {
        empty: "''",
      },
      spacing: {
        xs3: 'var(--mfp-spacing-xs3)',
        xs2: 'var(--mfp-spacing-xs2)',
        xs: 'var(--mfp-spacing-xs)',
        s: 'var(--mfp-spacing-s)',
        m: 'var(--mfp-spacing-m)',
        l: 'var(--mfp-spacing-l)',
        xl: 'var(--mfp-spacing-xl)',
        xxl: 'var(--mfp-spacing-xxl)',
        xxl2: 'var(--mfp-spacing-xxl2)',
        xxl3: 'var(--mfp-spacing-xxl3)',
        xxl4: 'var(--mfp-spacing-xxl4)',
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, theme }) {
      addBase({
        // CSS variables
        ':root, ::backdrop': { ...CSS_COLORS },
        // CSS reset
        ...reset,
      });
      addComponents({
        /**
         * Common `FOCUS` state that should be used within `focus-visible` Tailwind CSS utility
         * Examples of usage:
         *
         *  class="focus-visible:focus"
         *
         *  @apply focus-visible:focus
         *
         *  &:focus-visible {
         *    @apply focus;
         *  }
         */
        '.focus': {
          outline: `var(--mfp-ring-width, 2px) solid var(--mfp-ring-color-focus, ${String(theme('colors.focus'))})`,
          outlineOffset: 'var(--mfp-ring-offset-width, 1px)',
        },
      });
    }),
    // Local Custom Plugins
    ColorMix,
    LogicalProperties,
    // Tailwind CSS Theme Swapper
    ThemeSwapper({
      themes: [
        {
          name: 'root',
          selectors: [':root'],
          theme: { ...DefaultRootTheme },
        },
        {
          name: 'light',
          selectors: [':root', '.light', '.mfp.light', '[mfp-mode="light"]'],
          theme: { ...DefaultLightTheme },
        },
        {
          name: 'dark',
          selectors: ['.dark', '.mfp.dark', '[mfp-mode="dark"]'],
          theme: { ...DefaultDarkTheme },
        },
      ],
    }),
  ],
} satisfies Partial<Config>;

export {
  CSS_COLORS,
  DECLARATIVE_COLORS,
  DefaultDarkTheme,
  DefaultLightTheme,
  DefaultRootTheme,
  PRIMITIVE_COLORS,
  TYPOGRAPHY_DEFAULT,
};
