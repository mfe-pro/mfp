import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import mdx from './mfp-slider.mdx';

const meta: Meta = {
  title: 'Components/Slider',
  component: 'mfp-slider',
  parameters: {
    docs: {
      page: mdx,
    },
    layout: 'centered',
  },
  argTypes: {
    'debounce-time': { control: 'number' },
    disabled: { control: 'boolean' },
    'enable-value-indicator': { control: 'boolean' },
    'enable-tooltip': { control: 'boolean' },
    'tooltip-always-visible': { control: 'boolean' },
    gap: { control: 'number' },
    max: { control: 'number' },
    min: { control: 'number' },
    step: { control: 'number' },
    type: { control: 'inline-radio', options: ['single', 'range'] },
    value: { control: 'object' },
    // Events
    mfpBlur: { action: 'mfpBlur' },
    mfpChange: { action: 'mfpChange' },
    mfpFocus: { action: 'mfpFocus' },
  },
  args: {
    'debounce-time': 0,
    disabled: false,
    'enable-value-indicator': false,
    'enable-tooltip': false,
    'tooltip-always-visible': false,
    gap: 0,
    max: 100,
    min: 0,
    step: 1,
    type: 'single',
    value: undefined,
  },
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => html`
  <div class="is-96">
    <mfp-slider
      debounce-time=${ifDefined(args['debounce-time'])}
      ?disabled=${args.disabled}
      ?enable-value-indicator=${args['enable-value-indicator']}
      ?enable-tooltip=${args['enable-tooltip']}
      ?tooltip-always-visible=${args['tooltip-always-visible']}
      gap=${ifDefined(args.gap)}
      max=${ifDefined(args.max)}
      min=${ifDefined(args.min)}
      step=${ifDefined(args.step)}
      type=${ifDefined(args.type)}
      value=${ifDefined(JSON.stringify(args.value))}
      @mfpBlur=${args.mfpBlur}
      @mfpChange=${args.mfpChange}
      @mfpFocus=${args.mfpFocus}
    >
      ${args.text}
    </mfp-slider>
  </div>
`;

export const Default: Story = {
  render: Template,
  args: {
    value: 30,
  },
};

export const Range: Story = {
  render: Template,
  args: {
    value: [30, 70],
    type: 'range',
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    disabled: true,
    value: [30, 70],
    type: 'range',
  },
};

export const ValueIndicator: Story = {
  render: Template,
  args: {
    'enable-value-indicator': true,
    value: [30, 70],
    type: 'range',
  },
};

export const MinMaxStep: Story = {
  name: 'Min, Max, Step',
  render: Template,
  args: {
    'enable-value-indicator': true,
    max: 10,
    min: 0,
    step: 1.25,
    value: 3,
  },
};

export const Gap: Story = {
  render: Template,
  args: {
    'enable-value-indicator': true,
    gap: 10,
    max: 100,
    min: 0,
    step: 5,
    type: 'range',
    value: [30, 70],
  },
};

export const DecimalValues: Story = {
  render: Template,
  args: {
    'enable-value-indicator': true,
    max: 1,
    min: 0,
    type: 'range',
    step: 0.05,
    value: [0.3, 0.7],
  },
};

export const WithTooltip: Story = {
  render: Template,
  args: {
    'enable-tooltip': true,
    gap: 10,
    max: 100,
    min: 0,
    step: 1,
    type: 'range',
    value: [30, 70],
  },
};
