import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import mdx from './mfp-dialog.mdx';
import { DIALOG_BORDER_RADIUS, DIALOG_FOOTER_APPEARANCE, DIALOG_SIZE } from '../mfp-dialog.types';

const meta: Meta = {
  title: 'Components/Dialog',
  component: 'mfp-dialog',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    'disable-backdrop': { control: 'boolean' },
    'disable-close-click-outside': { control: 'boolean' },
    'disable-close-esc-keydown': { control: 'boolean' },
    'footer-appearance': { control: 'inline-radio', options: [...DIALOG_FOOTER_APPEARANCE] },
    'hide-close-button': { control: 'boolean' },
    border: { control: 'select', options: [...DIALOG_BORDER_RADIUS] },
    open: { control: 'boolean' },
    size: { control: 'select', options: [...DIALOG_SIZE] },
    // Events
    mfpCancel: { action: 'mfpCancel' },
    mfpClose: { action: 'mfpClose' },
    mfpOpen: { action: 'mfpOpen' },
    mfpAfterOpen: { action: 'mfpAfterOpen' },
    mfpAfterClose: { action: 'mfpAfterClose' },
    // Not part of the public API
    noContent: { control: 'boolean', table: { disable: true } },
    noFooter: { control: 'boolean', table: { disable: true } },
    customClose: { control: 'text', table: { disable: true } },
  },
  args: {
    'disable-backdrop': false,
    'disable-close-click-outside': false,
    'disable-close-esc-keydown': false,
    'hide-close-button': false,
    'footer-appearance': 'standard',
    border: 'm',
    open: false,
    size: 'medium',
    // Not part of the public API
    noContent: false,
    noFooter: false,
  },
};

export default meta;

type Story = StoryObj;

const Template = (args: Args) => {
  const handleOpenDialog = async () => {
    const dialogElem = document.querySelector('mfp-dialog');
    await dialogElem.show();
  };

  return html`
    <mfp-button @mfpClick=${handleOpenDialog}>Open Dialog</mfp-button>
    <mfp-dialog
      ?disable-backdrop=${args['disable-backdrop']}
      ?disable-close-esc-keydown=${args['disable-close-esc-keydown']}
      ?disable-close-click-outside=${args['disable-close-click-outside']}
      footer-appearance=${args['footer-appearance']}
      ?hide-close-button=${args['hide-close-button']}
      border=${args.border}
      ?open=${args.open}
      size=${args.size}
      @mfpCancel=${args.mfpCancel}
      @mfpClose=${args.mfpClose}
      @mfpOpen=${args.mfpOpen}
      @mfpAfterOpen=${args.mfpAfterOpen}
      @mfpAfterClose=${args.mfpAfterClose}
    >
      ${ifDefined(args.customClose)}
      <h5 class="bold flex items-center gap-s" slot="title">
        <mfp-icon name="info" size="30" color="text--accent" role="img" title="Info"></mfp-icon>
        Title
      </h5>
      ${!args.noContent
        ? html`
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>
          `
        : nothing}
      ${!args.noFooter
        ? html`
            <div class="flex gap-xs" slot="footer">
              <mfp-button appearance="link"> Button </mfp-button>
              <mfp-button variant="ghost"> Button </mfp-button>
              <mfp-button variant="standard" slot="footer"> Button </mfp-button>
            </div>
          `
        : nothing}
    </mfp-dialog>
  `;
};

export const Default: Story = {
  render: Template,
  args: {
    open: true,
  },
};

export const HighlightFooter: Story = {
  render: Template,
  args: {
    open: true,
    'footer-appearance': 'highlight',
  },
};

export const NoFooter: Story = {
  render: Template,
  args: {
    open: true,
    noFooter: true,
  },
};

export const NoBackdrop: Story = {
  render: Template,
  args: {
    open: true,
    'disable-backdrop': true,
  },
};

export const CustomCloseButton: Story = {
  render: Template,
  args: {
    open: true,
    customClose: html`
      <style>
        mfp-button[slot='button-close']::part(button) {
          border-radius: var(--mfp-radius--full);
          /* Paddings */
          padding-block: 0;
          padding-inline: 0;
          /* Size (width/height) */
          block-size: var(--mfp-spacing-xl);
          inline-size: var(--mfp-spacing-xl);
        }
      </style>
      <mfp-button appearance="text" size="small" slot="button-close">
        <mfp-icon class="cursor-pointer" name="x" role="img" title="Close"></mfp-icon>
      </mfp-button>
    `,
  },
};

const ConfirmTemplate = (args: Args) => {
  const handleOpenDialog = async () => {
    const dialogElem = document.querySelector('mfp-dialog');
    await dialogElem.show();
  };

  const handleDialogConfirm = async () => {
    const dialogElem = document.querySelector('mfp-dialog');
    await dialogElem.hide();
    alert('Account deactivated');
  };

  const handleDialogCancel = async () => {
    const dialogElem = document.querySelector('mfp-dialog');
    await dialogElem.cancel();
  };

  return html`
    <mfp-button variant="ghost" @mfpClick=${handleOpenDialog}>Deactivate account</mfp-button>
    <mfp-dialog
      ?disable-backdrop=${args['disable-backdrop']}
      ?disable-close-esc-keydown=${args['disable-close-esc-keydown']}
      ?disable-close-click-outside=${args['disable-close-click-outside']}
      footer-appearance=${args['footer-appearance']}
      ?hide-close-button=${args['hide-close-button']}
      border=${args.border}
      ?open=${args.open}
      size=${args.size}
      @mfpCancel=${args.mfpCancel}
      @mfpClose=${args.mfpClose}
      @mfpOpen=${args.mfpOpen}
      @mfpAfterOpen=${args.mfpAfterOpen}
      @mfpAfterClose=${args.mfpAfterClose}
    >
      <h5 class="bold flex items-center gap-s" slot="title">
        <mfp-icon name="info" size="30" color="icon--danger" role="img" title="Danger"></mfp-icon>
        Deactivate account
      </h5>
      <p>Are your sure you want to deactivate your account? All of your data will be permanently removed.</p>
      <span class="text-s text-text-secondary"> This action cannot be undone </span>
      <div class="flex gap-xs" slot="footer">
        <mfp-button appearance="secondary" @mfpClick=${handleDialogCancel}> Cancel </mfp-button>
        <mfp-button variant="danger" @mfpClick=${handleDialogConfirm}> Yes, deactivate </mfp-button>
      </div>
    </mfp-dialog>
  `;
};

export const DialogConfirm: Story = {
  render: ConfirmTemplate,
  args: {
    'disable-close-click-outside': true,
    'disable-close-esc-keydown': true,
    'hide-close-button': true,
  },
};
