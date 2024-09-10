import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import mdx from './mfp-option.mdx';

const meta: Meta = {
  title: 'Components/Option',
  component: 'mfp-option',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    hidden: { control: 'boolean' },
    selected: { control: 'boolean' },
    // Event handlers
    mfpBlur: { action: 'mfpBlur' },
    mfpFocus: { action: 'mfpFocus' },
    mfpClick: { action: 'mfpClick' },
    // Event handler of the parent component (mfp-option-list)
    mfpSelect: { action: 'mfpSelect', table: { disable: true } },
    // Not part of the public API, so we don't want to expose it in the docs
    children: { control: 'text', table: { disable: true } },
    text: { control: 'text', table: { disable: true } },
    iconPrefix: { control: 'text', table: { disable: true } },
    iconSuffix: { control: 'text', table: { disable: true } },
  },
  args: {
    disabled: false,
    hidden: false,
    selected: false,
    iconPrefix: undefined,
    iconSuffix: undefined,
  },
};
export default meta;

type Story = StoryObj;

const TemplateList = (args: Args) => html`
  <mfp-option-list @mfpSelect=${args.mfpSelect}> ${args.children} </mfp-option-list>
`;

const Template = (args: Args) => {
  const mfpIconPrefix = args.iconPrefix ? html`<mfp-icon name=${args.iconPrefix} slot="prefix"></mfp-icon>` : nothing;
  const mfpIconSuffix = args.iconSuffix ? html`<mfp-icon name=${args.iconSuffix} slot="suffix"></mfp-icon>` : nothing;

  return html`
    <mfp-option
      ?disabled=${args.disabled}
      ?hidden=${args.hidden}
      ?selected=${args.selected}
      value=${ifDefined(args.value)}
      @mfpBlur=${args.mfpBlur}
      @mfpFocus=${args.mfpFocus}
      @mfpClick=${args.mfpClick}
    >
      ${mfpIconPrefix}
      <span>${args.text}</span>
      ${mfpIconSuffix}
    </mfp-option>
  `;
};

export const Default: Story = {
  render: (args: Args) =>
    html` ${TemplateList({
      ...args,
      children: html`
        <!-- Option 1 -->
        ${Template({ ...args, text: 'User profile', iconPrefix: 'user', value: 'user' })}
        <!-- Option 2 -->
        ${Template({ ...args, text: 'Change password', iconPrefix: 'lock-simple', value: 'changepassword' })}
        <!-- Option 3 -->
        ${Template({ ...args, text: 'Close session', iconPrefix: 'sign-out', value: 'logout' })}
      `,
    })}`,
};

export const Active: Story = {
  render: (args: Args) =>
    html` ${TemplateList({
      ...args,
      children: html`
        <!-- Option 1 -->
        ${Template({ ...args, selected: true, text: 'User profile', iconPrefix: 'user', value: 'user' })}
        <!-- Option 2 -->
        ${Template({ ...args, text: 'Change password', iconPrefix: 'lock-simple', value: 'changepassword' })}
        <!-- Option 3 -->
        ${Template({ ...args, text: 'Close session', iconPrefix: 'sign-out', value: 'logout' })}
      `,
    })}`,
};

export const Disabled: Story = {
  render: (args: Args) =>
    html` ${TemplateList({
      ...args,
      children: html`
        <!-- Option 1 -->
        ${Template({ ...args, text: 'User profile', iconPrefix: 'user', value: 'user' })}
        <!-- Option 2 -->
        ${Template({ ...args, disabled: true, text: 'Admin Dashboard', iconPrefix: 'layout', value: 'admin' })}
        <!-- Option 3 -->
        ${Template({ ...args, text: 'Change password', iconPrefix: 'lock-simple', value: 'changepassword' })}
        <!-- Option 4 -->
        ${Template({ ...args, text: 'Close session', iconPrefix: 'sign-out', value: 'logout' })}
      `,
    })}`,
};

export const WithSuffix: Story = {
  render: (args) => html`
    ${TemplateList({
      ...args,
      children: html`
        <!-- Option 1 -->
        ${Template({ ...args, text: 'User profile', iconSuffix: 'user', value: 'user' })}
        <!-- Option 2 -->
        ${Template({ ...args, text: 'Admin Dashboard', iconSuffix: 'layout', value: 'admin' })}
        <!-- Option 3 -->
        ${Template({ ...args, text: 'Change password', iconSuffix: 'lock-simple', value: 'changepassword' })}
        <!-- Option 4 -->
        ${Template({ ...args, text: 'Close session', iconSuffix: 'sign-out', value: 'logout' })}
      `,
    })}
  `,
};

export const WithOptionGroup: Story = {
  render: (args) => html`
    ${TemplateList({
      ...args,
      children: html`
        <mfp-option-group>
          <span slot="header-label">Sport</span>
          <!-- Option 1 -->
          ${Template({ ...args, text: 'Running', iconPrefix: 'sneaker-move', value: 'running' })}
          <!-- Option 2 -->
          ${Template({ ...args, text: 'Hiking', iconPrefix: 'boot', value: 'hiking' })}
          <!-- Option 3 -->
          ${Template({ ...args, text: 'Biking', iconPrefix: 'person-simple-bike', value: 'biking' })}
          <!-- Option 4 -->
          ${Template({ ...args, text: 'Swimming', iconPrefix: 'swimming-pool', value: 'swimming' })}
        </mfp-option-group>
        <mfp-option-group>
          <span slot="header-label">Food</span>
          <!-- Option 1 -->
          ${Template({ ...args, text: 'Pizza', iconPrefix: 'pizza', value: 'pizza' })}
          <!-- Option 2 -->
          ${Template({ ...args, text: 'Hamburger', iconPrefix: 'hamburger', value: 'hamburger' })}
          <!-- Option 3 -->
          ${Template({ ...args, text: 'Cookie', iconPrefix: 'cookie', value: 'cookie' })}
          <!-- Option 4 -->
          ${Template({ ...args, text: 'Ice-cream', iconPrefix: 'ice-cream', value: 'ice-cream' })}
        </mfp-option-group>
      `,
    })}
  `,
};
