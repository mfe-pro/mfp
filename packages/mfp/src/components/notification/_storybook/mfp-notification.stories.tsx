import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit-html';

import mdx from './mfp-notification.mdx';
import { getRandomFromArray } from '../../../shared/utils';
import { NOTIFICATION_BORDER_RADIUS, NOTIFICATION_TYPE } from '../mfp-notification.types';

const meta: Meta = {
  title: 'Components/Notification',
  component: 'mfp-notification',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    'auto-dismiss': { control: 'boolean' },
    'disable-close': { control: 'boolean' },
    'hide-icon': { control: 'boolean' },
    border: { control: 'select', options: [...NOTIFICATION_BORDER_RADIUS] },
    open: { control: 'boolean' },
    time: { control: 'number' },
    type: { control: 'select', options: [...NOTIFICATION_TYPE] },
    // Events
    mfpShow: { action: 'mfpOpen' },
    mfpHide: { action: 'mfpClose' },
    mfpAfterOpen: { action: 'mfpAfterOpen' },
    mfpAfterClose: { action: 'mfpAfterClose' },
    // Not part of the component API, but used for the story
    customIcon: { control: 'boolean', table: { disable: true } },
  },
  args: {
    'auto-dismiss': false,
    'disable-close': false,
    'hide-icon': false,
    border: 's',
    open: false,
    time: 3000,
    type: 'info',
    // Not part of the component API, but used for the story
    customIcon: false,
  },
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => html`
  <div class="flex flex-row gap-4">
    <mfp-notification
      ?auto-dismiss=${args['auto-dismiss']}
      ?disable-close=${args['disable-close']}
      ?hide-icon=${args['hide-icon']}
      border=${args.border}
      ?open=${args.open}
      time=${args.time}
      type=${args.type}
      @mfpShow=${args.mfpShow}
      @mfpHide=${args.mfpHide}
      @mfpAfterOpen=${args.mfpAfterOpen}
      @mfpAfterClose=${args.mfpAfterClose}
    >
      ${args.customIcon ? html`<mfp-icon name="thumbs-up" slot="icon"></mfp-icon>` : nothing} Title
    </mfp-notification>

    <mfp-notification
      ?auto-dismiss=${args['auto-dismiss']}
      ?disable-close=${args['disable-close']}
      ?hide-icon=${args['hide-icon']}
      border=${args.border}
      ?open=${args.open}
      time=${args.time}
      type=${args.type}
      @mfpShow=${args.mfpShow}
      @mfpHide=${args.mfpHide}
      @mfpAfterOpen=${args.mfpAfterOpen}
      @mfpAfterClose=${args.mfpAfterClose}
    >
      ${args.customIcon ? html`<mfp-icon name="thumbs-up" slot="icon"></mfp-icon>` : nothing} Title
      <span slot="body">
        This is some description text text
        <a class="mfp-link" href="https://example.com">Link</a>
      </span>
    </mfp-notification>

    <mfp-notification
      ?auto-dismiss=${args['auto-dismiss']}
      ?disable-close=${args['disable-close']}
      ?hide-icon=${args['hide-icon']}
      border=${args.border}
      ?open=${args.open}
      time=${args.time}
      type=${args.type}
      @mfpShow=${args.mfpShow}
      @mfpHide=${args.mfpHide}
      @mfpAfterOpen=${args.mfpAfterOpen}
      @mfpAfterClose=${args.mfpAfterClose}
    >
      ${args.customIcon ? html`<mfp-icon name="thumbs-up" slot="icon"></mfp-icon>` : nothing} Title
      <span slot="body">
        This is some description text text
        <a class="mfp-link" href="https://example.com">Link</a>
      </span>
      <div class="flex gap-xs" slot="footer">
        <mfp-button appearance="primary" size="small"> Button </mfp-button>
        <mfp-button appearance="link" size="small"> Button </mfp-button>
      </div>
    </mfp-notification>
  </div>
`;

export const Default: Story = {
  render: Template,
  args: {
    open: true,
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

export const Neutral: Story = {
  render: Template,
  args: {
    open: true,
    type: 'neutral',
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

export const CustomIcon: Story = {
  render: Template,
  args: {
    open: true,
    customIcon: true,
  },
};

export const Stacked: Story = {
  render: (args: Args) => {
    const onButtonClick = () => {
      const [type] = getRandomFromArray(NOTIFICATION_TYPE as unknown as string[], 1);
      const notification = Object.assign(document.createElement('mfp-notification'), {
        type,
        autoDismiss: args['auto-dismiss'],
        disableClose: args['disable-close'],
        hideIcon: args['hide-icon'],
        border: args.border,
        time: args.time,
        innerHTML: `
          Title
          <span slot="body">
            Here goes the description for the <strong>${type} notification</strong><br />
            You can also add a <a class="mfp-link" href="https://example.com">Link</a>
          </span>
        `,
      });

      notification.addEventListener('mfpShow', args.mfpShow);
      notification.addEventListener('mfpHide', args.mfpHide);
      notification.addEventListener('mfpAfterOpen', args.mfpAfterOpen);
      notification.addEventListener('mfpAfterClose', args.mfpAfterClose);

      document.body.append(notification);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (notification as any).toast();
    };

    return html`
      <p class="m-be-0">
        The notification component creates and manages the notification portal, a fixed-position element that allows for
        stacking multiple notifications vertically.
      </p>
      <p class="m-be-6">
        Only one instance of the notification portal exists and it is added or removed from the DOM as required when
        notifications are displayed.
      </p>
      <mfp-button @mfpClick=${onButtonClick}>Open notification</mfp-button>
    `;
  },
  args: {
    'auto-dismiss': true,
    time: 3500,
  },
};
