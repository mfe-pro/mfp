import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

import mdx from './mfp-button.mdx';
import { BUTTON_APPEARANCE, BUTTON_BORDER_RADIUS, BUTTON_SIZE, BUTTON_TYPE, BUTTON_VARIANT } from '../mfp-button.types';

const meta: Meta = {
  title: 'Components/Button',
  component: 'mfp-button',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    appearance: { control: 'select', options: [...BUTTON_APPEARANCE] },
    block: { control: 'boolean' },
    border: { control: 'select', options: [...BUTTON_BORDER_RADIUS] },
    disabled: { control: 'boolean' },
    href: { control: 'text' },
    'justify-content': { control: 'select', options: ['left', 'center', 'right'] },
    loading: { control: 'boolean' },
    size: { control: 'select', options: [...BUTTON_SIZE] },
    target: { control: 'select', options: ['_blank', '_parent', '_self', '_top'] },
    type: { control: 'select', options: [...BUTTON_TYPE] },
    variant: { control: 'select', options: [...BUTTON_VARIANT] },
    // This control is not part of the component
    buttonText: { control: 'text', table: { disable: true } },
    // Event handlers
    mfpBlur: { action: 'mfpBlur' },
    mfpFocus: { action: 'mfpFocus' },
    mfpClick: { action: 'mfpClick' },
  },
  args: {
    appearance: 'primary',
    border: 'm',
    block: false,
    disabled: false,
    href: undefined,
    'justify-content': 'center',
    loading: false,
    size: 'medium',
    target: undefined,
    type: 'button',
    variant: 'standard',
  },
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => html`
  <mfp-button
    appearance=${args.appearance}
    ?block=${args.block}
    border=${args.border}
    ?disabled=${args.disabled}
    href=${args.href}
    justify-content=${args['justify-content']}
    ?loading=${args.loading}
    size=${args.size}
    target=${args.target}
    type=${args.type}
    variant=${args.variant}
    @mfpBlur=${args.mfpBlur}
    @mfpClick=${args.mfpClick}
    @mfpFocus=${args.mfpFocus}
  >
    ${args.buttonText}
  </mfp-button>
`;

export const Primary: Story = {
  render: Template,
  args: {
    buttonText: 'Primary button',
  },
};

export const Secondary: Story = {
  render: Template,
  args: {
    appearance: 'secondary',
    buttonText: 'Secondary button',
  },
};

export const Link: Story = {
  render: Template,
  args: {
    appearance: 'link',
    href: 'https://www.example.com',
    target: '_blank',
    buttonText: 'Link button',
  },
};

export const Text: Story = {
  render: Template,
  args: {
    appearance: 'text',
    buttonText: 'Text button',
  },
};

export const Loading: Story = {
  render: Template,
  args: {
    appearance: 'primary',
    loading: true,
    buttonText: 'Loading button',
  },
};

export const Block: Story = {
  render: Template,
  args: {
    block: true,
    buttonText: 'Block button',
  },
};

export const IconLeft: Story = {
  render: (args) => html`
    <mfp-button
      appearance=${args.appearance}
      ?block=${args.block}
      border=${args.border}
      ?disabled=${args.disabled}
      href=${args.href}
      justify-content=${args['justify-content']}
      ?loading=${args.loading}
      size=${args.size}
      target=${args.target}
      type=${args.type}
      variant=${args.variant}
      @mfpBlur=${args.mfpBlur}
      @mfpClick=${args.mfpClick}
      @mfpFocus=${args.mfpFocus}
    >
      <mfp-icon name="arrow-circle-left" slot="prefix"></mfp-icon>
      Go back
    </mfp-button>
  `,
};

export const IconRight: Story = {
  render: (args) => html`
    <mfp-button
      appearance=${args.appearance}
      border=${args.border}
      ?block=${args.block}
      ?disabled=${args.disabled}
      href=${args.href}
      justify-content=${args['justify-content']}
      ?loading=${args.loading}
      size=${args.size}
      target=${args.target}
      type=${args.type}
      variant=${args.variant}
      @mfpBlur=${args.mfpBlur}
      @mfpClick=${args.mfpClick}
      @mfpFocus=${args.mfpFocus}
    >
      Next step
      <mfp-icon name="arrow-circle-right" slot="suffix"></mfp-icon>
    </mfp-button>
  `,
};

export const OnlyIcon: Story = {
  render: (args) => html`
    <mfp-button
      appearance=${args.appearance}
      border=${args.border}
      ?block=${args.block}
      ?disabled=${args.disabled}
      href=${args.href}
      justify-content=${args['justify-content']}
      ?loading=${args.loading}
      size=${args.size}
      target=${args.target}
      type=${args.type}
      variant=${args.variant}
      @mfpBlur=${args.mfpBlur}
      @mfpClick=${args.mfpClick}
      @mfpFocus=${args.mfpFocus}
    >
      <mfp-icon name="bell-ringing"></mfp-icon>
    </mfp-button>
  `,
};
