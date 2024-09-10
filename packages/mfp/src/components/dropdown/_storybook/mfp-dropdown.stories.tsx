import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

import mdx from './mfp-dropdown.mdx';

const meta: Meta = {
  title: 'Components/Dropdown',
  component: 'mfp-dropdown',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    distance: { control: 'number' },
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'right',
        'right-start',
        'right-end',
        'left',
        'left-start',
        'left-end',
      ],
    },
    open: { control: 'boolean' },
    'panel-height': { control: 'text' },
    'keep-open-on-select': { control: 'boolean' },
    'same-width': { control: 'boolean' },
    skidding: { control: 'number' },
    strategy: { control: 'select', options: ['fixed', 'absolute'] },
    // Event handlers
    mfpSelect: { action: 'mfpSelect', table: { disable: true } },
    // Not part of the public API, so we don't want to expose it in the
    trigger: { control: 'text', table: { disable: true } },
    enableOptionGroup: { control: 'boolean', table: { disable: true } },
  },
  args: {
    disabled: false,
    distance: 4,
    placement: 'bottom-start',
    open: false,
    'panel-height': undefined,
    'keep-open-on-select': false,
    'same-width': false,
    skidding: 0,
    strategy: 'fixed',
  },
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => {
  const optionItems = html`
    <mfp-option value="users">
      <mfp-icon name="users" slot="prefix"></mfp-icon>
      <span>Users</span>
    </mfp-option>

    <mfp-option value="user">
      <mfp-icon name="user" slot="prefix"></mfp-icon>
      <span>My profile</span>
    </mfp-option>

    <mfp-option value="dashboard">
      <mfp-icon name="sliders" slot="prefix"></mfp-icon>
      <span>Dashboard</span>
    </mfp-option>

    <mfp-option value="settings">
      <span>Settings</span>
      <mfp-icon name="gear" slot="prefix"></mfp-icon>
    </mfp-option>

    <mfp-option value="logout">
      <span>Logout</span>
      <mfp-icon name="sign-out" slot="suffix"></mfp-icon>
    </mfp-option>
  `;

  const options = args.enableOptionGroup
    ? html`
        <mfp-option-group>
          <span slot="header-label">Configuration</span>
          ${optionItems}
        </mfp-option-group>
      `
    : optionItems;

  return html`
    <mfp-dropdown
      ?disabled=${args.disabled}
      distance=${args.distance}
      placement=${args.placement}
      ?open=${args.open}
      panel-height=${args['panel-height']}
      ?keep-open-on-select=${args['keep-open-on-select']}
      ?same-width=${args['same-width']}
      skidding=${args.skidding}
      strategy=${args.strategy}
      @mfpSelect=${args.mfpSelect}
    >
      <!-- TRIGGER ELEMENT -->
      ${args.trigger}

      <mfp-option-list> ${options} </mfp-option-list>
    </mfp-dropdown>
  `;
};

export const Default: Story = {
  render: (args: Args) => html`
    ${Template({
      ...args,
      trigger: html`
        <mfp-button slot="trigger">
          Dropdown
          <mfp-icon name="caret-down" slot="suffix"></mfp-icon>
        </mfp-button>
      `,
    })}
  `,
  args: {
    open: true,
  },
};

export const Placement: Story = {
  render: (args: Args) => html`
    <div class="grid grid-cols-1 place-items-center gap-m m-bs-xxl3 sm:grid-cols-2">
      <!-- Bottom end -->
      ${Template({
        ...args,
        trigger: html`
          <mfp-button slot="trigger">
            Dropdown
            <mfp-icon name="caret-down" slot="suffix"></mfp-icon>
          </mfp-button>
        `,
      })}
      <!-- Bottom end -->
      ${Template({
        ...args,
        placement: 'bottom-end',
        trigger: html`
          <mfp-button slot="trigger">
            Dropdown
            <mfp-icon name="caret-down" slot="suffix"></mfp-icon>
          </mfp-button>
        `,
      })}
    </div>
  `,
  args: {
    open: true,
  },
};

export const CustomTrigger: Story = {
  render: (args: Args) => html`
    <div class="grid grid-cols-1 place-items-center gap-m m-bs-xxl3 sm:grid-cols-2">
      <!-- Button icon -->
      ${Template({
        ...args,
        trigger: html`
          <mfp-button appearance="secondary" size="medium" type="button" variant="standard" slot="trigger">
            <span class="flex items-center gap-1">
              <mfp-icon name="dots-three-vertical"></mfp-icon>
            </span>
          </mfp-button>
        `,
      })}
      <!-- Avatar -->
      ${Template({
        ...args,
        trigger: html`
          <mfp-avatar
            alt-text="User profile"
            image="https://images.unsplash.com/photo-1524593689594-aae2f26b75ab?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80"
            label="Avatar component label"
            slot="trigger"
          ></mfp-avatar>
        `,
      })}
    </div>
  `,
  args: {
    open: true,
    placement: 'bottom',
  },
};

export const KeepOpen: Story = {
  render: (args: Args) => html`
    <div class="rounded-m border-s border-solid border-stroke-success bg-ui-success-alt p-b-m p-i-m m-be-l">
      <p class="text-m font-bold m-be-xs">💡 NOTE:</p>
      If <code class="text-text-danger">keepOpenOnSelect</code> is set, the dropdown will remain open after a selection
      is made.
    </div>
    ${Template({
      ...args,
      trigger: html`
        <mfp-button slot="trigger">
          Dropdown
          <mfp-icon name="caret-down" slot="suffix"></mfp-icon>
        </mfp-button>
      `,
    })}
  `,
  args: {
    'keep-open-on-select': true,
    open: true,
  },
};

export const WithOptionGroup: Story = {
  render: (args: Args) => html`
    ${Template({
      ...args,
      trigger: html`
        <mfp-button slot="trigger">
          Dropdown
          <mfp-icon name="caret-down" slot="suffix"></mfp-icon>
        </mfp-button>
      `,
    })}
  `,
  args: {
    open: true,
    enableOptionGroup: true,
  },
};
