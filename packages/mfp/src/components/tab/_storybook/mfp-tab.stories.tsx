import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

import mdx from './mfp-tab.mdx';
import { TAB_ORIENTATION, TAB_PLACEMENT, TAB_SIZE } from '../mfp-tab.types';

const meta: Meta = {
  title: 'Components/Tabs/Tab',
  component: 'mfp-tab',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: [...TAB_SIZE] },
    orientation: { control: 'select', options: [...TAB_ORIENTATION] },
    position: { control: 'select', options: [...TAB_PLACEMENT] },
    // Not part of the component
    text: { control: 'text', table: { disable: true } },
  },
  args: {
    text: 'Tab',
    active: false,
    disabled: false,
    divider: false,
    size: 'medium',
    orientation: 'horizontal',
    position: 'start',
  },
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => {
  return html`
    <mfp-tab
      .size=${args.size}
      .orientation=${args.orientation}
      .position=${args.position}
      ${args.active}
      ?disabled=${args.disabled}
    >
      ${args.text}
    </mfp-tab>
  `;
};

export const Default: Story = {
  render: Template,
};

export const Icon: Story = {
  render: (args: Args) => html`
    <mfp-tab
      .size=${args.size}
      .orientation=${args.orientation}
      .position=${args.position}
      ?active=${args.active}
      ?disabled=${args.disabled}
    >
      <mfp-icon name="arrow-circle-left" slot="icon"></mfp-icon>
      ${args.text}
    </mfp-tab>
  `,
};
