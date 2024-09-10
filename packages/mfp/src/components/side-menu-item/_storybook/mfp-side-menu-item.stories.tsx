import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

import mdx from './mfp-side-menu-item.mdx';

const meta: Meta = {
  title: 'Components/Side menu/Side menu item',
  component: 'mfp-side-menu-item',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
    collapse: { control: 'boolean' },
    // Not part of the component
    text: { control: 'text', table: { disable: true } },
    // Event handlers
    mfpBlur: { action: 'mfpBlur' },
    mfpFocus: { action: 'mfpFocus' },
    mfpClick: { action: 'mfpClick' },
  },
  args: {
    active: false,
    disabled: false,
    collapse: false,
    // Not part of the component
    text: 'Menu item',
  },
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => html`
  <mfp-side-menu-item
    ?active=${args.active}
    ?disabled=${args.disabled}
    ?collapse=${args.collapse}
    @mfpBlur=${args.mfpBlur}
    @mfpClick=${args.mfpClick}
    @mfpFocus=${args.mfpFocus}
  >
    <mfp-icon name="star-four" slot="prefix"></mfp-icon>
    ${args.text}
    <mfp-badge class="ml-auto" slot="suffix"> 5 </mfp-badge>
  </mfp-side-menu-item>
`;

export const Default: Story = {
  render: Template,
  args: {},
};
