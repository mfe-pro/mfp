import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import mdx from './mfp-alert.mdx';
import { ALERT_BORDER_RADIUS, ALERT_TYPE } from '../mfp-alert.types';

const meta: Meta = {
  title: 'Components/Alert',
  component: 'mfp-alert',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    'auto-dismiss': { control: 'boolean' },
    'disable-close': { control: 'boolean' },
    'hide-icon': { control: 'boolean' },
    border: { control: 'select', options: [...ALERT_BORDER_RADIUS] },
    sticky: { control: 'boolean' },
    open: { control: 'boolean' },
    time: { control: 'number' },
    type: { control: 'select', options: [...ALERT_TYPE] },
    // Events
    mfpShow: { action: 'mfpShow' },
    mfpAfterShow: { action: 'mfpAfterShow' },
    mfpHide: { action: 'mfpHide' },
    mfpAfterHide: { action: 'mfpAfterHide' },
  },
  args: {
    'auto-dismiss': false,
    'disable-close': false,
    'hide-icon': false,
    border: 's',
    sticky: false,
    open: false,
    time: 3000,
    type: 'default',
  },
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => html`
  <div class="flex flex-row gap-4">
    <mfp-alert
      ?auto-dismiss=${args['auto-dismiss']}
      ?disable-close=${args['disable-close']}
      ?hide-icon=${args['hide-icon']}
      border=${ifDefined(args.border)}
      ?open=${args.open}
      time=${ifDefined(args.time)}
      type=${ifDefined(args.type)}
      @mfpShow=${args.mfpShow}
      @mfpAfterShow=${args.mfpAfterShow}
      @mfpHide=${args.mfpHide}
      @mfpAfterHide=${args.mfpAfterHide}
    >
      ${args.type === 'default' ? html`<mfp-icon name="star" slot="icon"></mfp-icon>` : nothing} Title
    </mfp-alert>

    <mfp-alert
      ?auto-dismiss=${args['auto-dismiss']}
      ?disable-close=${args['disable-close']}
      ?hide-icon=${args['hide-icon']}
      border=${ifDefined(args.border)}
      ?open=${args.open}
      time=${ifDefined(args.time)}
      type=${ifDefined(args.type)}
      @mfpShow=${args.mfpShow}
      @mfpAfterShow=${args.mfpAfterShow}
      @mfpHide=${args.mfpHide}
      @mfpAfterHide=${args.mfpAfterHide}
    >
      ${args.type === 'default' ? html`<mfp-icon name="star" slot="icon"></mfp-icon>` : nothing} Title
      <span slot="body">
        Description
        <a class="mfp-link" href="https://example.com">Link</a>
      </span>
    </mfp-alert>

    <mfp-alert
      ?auto-dismiss=${args['auto-dismiss']}
      ?disable-close=${args['disable-close']}
      ?hide-icon=${args['hide-icon']}
      border=${ifDefined(args.border)}
      ?open=${args.open}
      time=${ifDefined(args.time)}
      type=${ifDefined(args.type)}
      @mfpShow=${args.mfpShow}
      @mfpAfterShow=${args.mfpAfterShow}
      @mfpHide=${args.mfpHide}
      @mfpAfterHide=${args.mfpAfterHide}
    >
      ${args.type === 'default' ? html`<mfp-icon name="star" slot="icon"></mfp-icon>` : nothing} Title
      ${!args.sticky
        ? html`
            <span slot="body">
              Description
              <a class="mfp-link" href="https://example.com">Link</a>
            </span>
            <div class="flex gap-xs" slot="footer">
              <mfp-button appearance="primary" size="small"> Button </mfp-button>
              <mfp-button appearance="link" size="small"> Button </mfp-button>
            </div>
          `
        : nothing}
    </mfp-alert>
  </div>
`;

const TemplateSticky = (args: Args) => html`
  <mfp-alert
    ?auto-dismiss=${args['auto-dismiss']}
    ?disable-close=${args['disable-close']}
    ?hide-icon=${args['hide-icon']}
    ?sticky=${args['sticky']}
    border=${ifDefined(args.border)}
    ?open=${args.open}
    time=${ifDefined(args.time)}
    type=${ifDefined(args.type)}
    @mfpShow=${args.mfpShow}
    @mfpAfterShow=${args.mfpAfterShow}
    @mfpHide=${args.mfpHide}
    @mfpAfterHide=${args.mfpAfterHide}
  >
    ${args.type === 'default' ? html`<mfp-icon name="star" slot="icon"></mfp-icon>` : nothing} Title
    <mfp-button appearance="link" size="small"> Button </mfp-button>
  </mfp-alert>
  <main class="grid grid-cols-1 p-b-m p-i-m">
    <h1 class="m-be-l">Dashboard</h1>
    <div class="border border-dashed border-stroke-primary bg-[--mfp-ui--alt] bs-80 is-full"></div>
  </main>
`;

export const Default: Story = {
  render: Template,
  args: {
    open: true,
  },
};

export const Info: Story = {
  render: Template,
  args: {
    open: true,
    type: 'info',
  },
};

export const Success: Story = {
  render: Template,
  args: {
    open: true,
    type: 'success',
  },
};

export const Warning: Story = {
  render: Template,
  args: {
    open: true,
    type: 'warning',
  },
};

export const ErrorType: Story = {
  name: 'Error',
  render: Template,
  args: {
    open: true,
    type: 'error',
  },
};

export const Sticky: Story = {
  render: TemplateSticky,
  args: {
    open: true,
    sticky: true,
    type: 'error',
  },
};

export const WithTrigger: Story = {
  render: (args: Args) => {
    const handleFormSubmit = async (ev: Event) => {
      ev.preventDefault();

      const mfpAlertElem = document.querySelector('mfp-alert');
      if (!mfpAlertElem) return;

      await mfpAlertElem.show();
    };

    const handleFormReset = async () => {
      const mfpAlertElem = document.querySelector('mfp-alert');
      if (!mfpAlertElem) return;

      await mfpAlertElem.hide();
    };

    return html`
      <mfp-card>
        <form id="change-password" class="flex flex-col gap-y-m" @submit=${handleFormSubmit} @reset=${handleFormReset}>
          <!-- Alert -->
          <mfp-alert
            ?auto-dismiss=${args['auto-dismiss']}
            ?disable-close=${args['disable-close']}
            ?hide-icon=${args['hide-icon']}
            ?sticky=${args['sticky']}
            border=${args.border}
            ?open=${args.open}
            time=${args.time}
            type=${args.type}
            @mfpShow=${args.mfpShow}
            @mfpAfterShow=${args.mfpAfterShow}
            @mfpHide=${args.mfpHide}
            @mfpAfterHide=${args.mfpAfterHide}
          >
            There were 2 errors with your submission
            <span slot="body">
              <ul class="ps-m m-be-0 m-bs-0">
                <li>Your password must be at least 8 characters</li>
                <li>Your password must include at least one pro wrestling finishing move</li>
              </ul>
            </span>
          </mfp-alert>
          <mfp-input name="password" type="password" required>
            <label class="flex flex-grow items-center" slot="label">Password</label>
          </mfp-input>
          <mfp-input name="confirm-password" type="password" required>
            <label class="flex flex-grow items-center" slot="label">Confirm Password</label>
          </mfp-input>
          <div class="flex justify-end gap-x-m">
            <mfp-button appearance="secondary" type="reset">Cancel</mfp-button>
            <mfp-button type="submit">Save</mfp-button>
          </div>
        </form>
      </mfp-card>
    `;
  },
  args: {
    type: 'error',
  },
};
