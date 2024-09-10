import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import mdx from './mfp-drawer.mdx';
import { DRAWER_POSITIONS } from '../mfp-drawer.types';

const meta: Meta = {
  title: 'Components/Drawer',
  component: 'mfp-drawer',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    'enable-backdrop': { control: 'boolean' },
    'close-on-click-outside': { control: 'boolean' },
    'close-on-esc': { control: 'boolean' },
    open: { control: 'boolean' },
    position: { control: 'inline-radio', options: [...DRAWER_POSITIONS] },
    // Events
    mfpOpen: { action: 'mfpOpen' },
    mfpClose: { action: 'mfpClose' },
    mfpAfterOpen: { action: 'mfpAfterOpen' },
    mfpAfterClose: { action: 'mfpAfterClose' },
    // Not part of the component API
    noFooter: { control: 'boolean', table: { disable: true } },
    customFooterDivider: { control: 'boolean', table: { disable: true } },
    customCloseIcon: { control: 'text', table: { disable: true } },
  },
  args: {
    open: false,
    position: 'end',
    'close-on-click-outside': false,
    'close-on-esc': false,
    'enable-backdrop': false,
  },
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => {
  const handleOpenDrawer = async () => {
    const drawerElem = document.querySelector('mfp-drawer');
    await drawerElem.show();
  };

  const customFooterDivider = args.customFooterDivider
    ? html`
        <mfp-divider
          slot="footer-divider"
          class="block m-be-m"
          stroke-color="stroke--primary"
          stroke-thickness="1"
        ></mfp-divider>
      `
    : nothing;

  return html`
    <mfp-button @mfpClick=${handleOpenDrawer}>Open Drawer</mfp-button>
    <mfp-drawer
      ?close-on-click-outside=${args['close-on-click-outside']}
      ?close-on-esc=${args['close-on-esc']}
      ?enable-backdrop=${args['enable-backdrop']}
      ?open=${args.open}
      position=${args.position}
      @mfpClose=${args.mfpClose}
      @mfpOpen=${args.mfpOpen}
      @mfpAfterOpen=${args.mfpAfterOpen}
      @mfpAfterClose=${args.mfpAfterClose}
    >
      ${ifDefined(args.customCloseIcon) ? args.customCloseIcon : nothing}
      <div class="flex gap-xs" slot="title">
        <mfp-icon name="user-circle" weight="bold" role="img" title="Info"></mfp-icon>
        Title
      </div>
      <div
        class="flex items-center justify-center rounded-xs border-s border-dashed border-stroke-brand bg-red-100 bs-full"
      >
        Slot
      </div>
      ${!args.noFooter
        ? html`
            ${customFooterDivider}
            <div class="flex flex-1 justify-center gap-xs" slot="footer">
              <mfp-button appearance="primary" block size="small"> Button </mfp-button>
              <mfp-button appearance="link" block size="small"> Button </mfp-button>
            </div>
          `
        : nothing}
    </mfp-drawer>
  `;
};

export const Default: Story = {
  render: Template,
};

export const NoFooter: Story = {
  render: Template,
  args: {
    noFooter: true,
  },
};

export const Position: Story = {
  render: Template,
  args: {
    open: false,
    position: 'start',
  },
};

export const WithBackdrop: Story = {
  render: Template,
  args: {
    'enable-backdrop': true,
  },
};

export const WithCustomFooterDivider: Story = {
  render: Template,
  args: {
    'enable-backdrop': true,
    customFooterDivider: true,
  },
};

export const WithCustomCloseIcon: Story = {
  render: Template,
  args: {
    'enable-backdrop': true,
    customCloseIcon: html`<mfp-icon
      name="arrow-fat-lines-right"
      role="img"
      title="Close"
      slot="button-close"
    ></mfp-icon>`,
  },
};
