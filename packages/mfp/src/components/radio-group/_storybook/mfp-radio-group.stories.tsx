import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

import mdx from './mfp-radio-group.mdx';
import { RADIO_GROUP_ORIENTATION } from '../mfp-radio-group.types';

const meta: Meta = {
  title: 'Components/Radio Group',
  component: 'mfp-radio-group',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    'background-on-hover': { control: 'boolean' },
    'debounce-time': { control: 'number' },
    disabled: { control: 'boolean' },
    fieldset: { control: 'boolean' },
    name: { control: 'text' },
    value: { control: 'text' },
    orientation: { control: 'select', options: [...RADIO_GROUP_ORIENTATION] },
    // Event handlers
    mfpChange: { action: 'mfpChange' },
    mfpFocus: { action: 'mfpFocus', table: { disable: true } },
    mfpBlur: { action: 'mfpBlur', table: { disable: true } },
    // Not part of the component
    label: { control: 'text' },
  },
  args: {
    'background-on-hover': false,
    orientation: 'vertical',
    value: 'option1',
    disabled: false,
    name: 'mfp-radio',
    fieldset: false,
    'debounce-time': 0,
  },
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => {
  return html`
    <mfp-radio-group
      ?background-on-hover=${args['background-on-hover']}
      debounce-time=${args['debounce-time']}
      ?disabled=${args.disabled}
      ?fieldset=${args.fieldset}
      name=${args.name}
      orientation=${args.orientation}
      value=${args.value}
      @mfpChange=${args.mfpChange}
      @mfpFocus=${args.mfpFocus}
      @mfpBlur=${args.mfpBlur}
    >
      <span slot="label">${args.label}</span>
      <mfp-radio value="option1"> Radio option 1 </mfp-radio>
      <mfp-radio value="option2"> Radio option 2 </mfp-radio>
      <mfp-radio value="option3"> Radio option 3 </mfp-radio>
    </mfp-radio-group>
  `;
};

export const Default: Story = {
  render: Template,
};

export const Disabled: Story = {
  render: (args: Args) => {
    return html`
      <div style="display: flex; gap: 16px">
        <mfp-radio-group
          .name=${args.name}
          .value=${args.value}
          .disabled=${args.disabled}
          .orientation=${args.orientation}
          .fieldset=${args.fieldset}
          debounce-time=${args['debounce-time']}
          @mfpChange=${args.mfpChange}
          @mfpFocus=${args.mfpFocus}
          @mfpBlur=${args.mfpBlur}
        >
          <span slot="label">${args.label}</span>
          <mfp-radio value="option1"> Radio option 1 </mfp-radio>
          <mfp-radio value="option2"> Radio option 2 </mfp-radio>
          <mfp-radio value="option3"> Radio option 3 </mfp-radio>
        </mfp-radio-group>
        <mfp-radio-group
          .name=${args.name + '1'}
          .value=${args.value}
          .orientation=${args.orientation}
          .fieldset=${args.fieldset}
          debounce-time=${args['debounce-time']}
          @mfpChange=${args.mfpChange}
          @mfpFocus=${args.mfpFocus}
          @mfpBlur=${args.mfpBlur}
        >
          <span slot="label">${args.label}</span>
          <mfp-radio value="option1"> Radio option 1 </mfp-radio>
          <mfp-radio value="option2" disabled> Radio option 2 </mfp-radio>
          <mfp-radio value="option3"> Radio option 3 </mfp-radio>
        </mfp-radio-group>
      </div>
    `;
  },
  args: {
    disabled: true,
  },
};

export const Horizontal = {
  render: Template,
  args: {
    orientation: 'horizontal',
  },
};

export const Fieldset = {
  render: Template,
  args: {
    fieldset: true,
    label: 'radio group',
  },
};
