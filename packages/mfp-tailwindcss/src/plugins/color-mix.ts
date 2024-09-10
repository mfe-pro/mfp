import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

import { blendColor } from '../helpers';

// NOTE: https://github.com/tailwindlabs/tailwindcss/discussions/6925#discussioncomment-1919382
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');

export const ColorMix: Partial<Config> = plugin(function ({ matchUtilities, theme }) {
  matchUtilities(
    {
      // Background `hover` state blend color
      'bg-hover': (value) => blendColor({ color: value, base: 'var(--mfp-hover)' }),
      // Background `active` state blend color
      'bg-active': (value) => blendColor({ color: value, base: 'var(--mfp-active)' }),
      // Border `hover` state blend color
      'border-hover': (value) => blendColor({ color: value, base: 'var(--mfp-hover)', property: 'border-color' }),
      // Border `active` state blend color
      'border-active': (value) => blendColor({ color: value, base: 'var(--mfp-active)', property: 'border-color' }),
      // Text `hover` state blend color
      'text-hover': (value) => blendColor({ color: value, base: 'var(--mfp-hover)', property: 'color' }),
      // Text `active` state blend color
      'text-active': (value) => blendColor({ color: value, base: 'var(--mfp-active)', property: 'color' }),
    },
    { values: flattenColorPalette(theme('colors')) },
  );
});
