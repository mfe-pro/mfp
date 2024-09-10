import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import { default as metaInput } from './mfp-input.stories';
import mdxSearch from './mfp-search.mdx';

const meta: Meta = {
  ...metaInput,
  title: 'Components/Search',
  parameters: {
    docs: {
      page: mdxSearch,
    },
  },
  args: {
    ...metaInput.args,
    placeholder: 'Search...',
    prefix: true,
    type: 'search',
  },
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => {
  return html`
    <mfp-input
      autocapitalize=${ifDefined(args.autocapitalize)}
      autocomplete=${ifDefined(args.autocomplete)}
      autocorrect=${ifDefined(args.autocorrect)}
      ?autofocus=${args.autofocus}
      clear-button-label=${args['clear-button-label']}
      debounce-time=${args['debounce-time']}
      ?disable-clear=${args['disable-clear']}
      ?disabled=${args.disabled}
      form=${ifDefined(args.form)}
      iputmode=${args.inputmode}
      max=${ifDefined(args.max)}
      maxlength=${ifDefined(args.maxlength)}
      min=${ifDefined(args.min)}
      minlength=${ifDefined(args.minlength)}
      name=${ifDefined(args.name)}
      pattern=${ifDefined(args.pattern)}
      placeholder=${args.placeholder}
      ?readonly=${args.readonly}
      ?required=${args.required}
      step=${ifDefined(args.step)}
      type=${ifDefined(args.type)}
      validation-status=${args['validation-status']}
      value=${ifDefined(args.value)}
      @mfpBlur=${args.mfpBlur}
      @mfpChange=${args.mfpChange}
      @mfpClear=${args.mfpClear}
      @mfpFocus=${args.mfpFocus}
      @mfpInput=${args.mfpInput}
    >
      ${args.prefix ? html`<mfp-icon name="magnifying-glass" slot="prefix"></mfp-icon>` : nothing}
    </mfp-input>
  `;
};

export const Default: Story = {
  render: Template,
};

export const Value: Story = {
  render: Template,
  args: {
    value: 'Value to search',
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    disabled: true,
  },
};
