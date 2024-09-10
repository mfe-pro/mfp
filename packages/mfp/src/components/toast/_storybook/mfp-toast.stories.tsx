import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

import mdx from './mfp-toast.mdx';
import { getRandomFromArray } from '../../../shared/utils';
import { TOAST_BORDER_RADIUS, TOAST_PLACEMENT, TOAST_TYPE } from '../mfp-toast.types';

const meta: Meta = {
  title: 'Components/Toast',
  component: 'mfp-toast',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    border: { control: 'select', options: [...TOAST_BORDER_RADIUS] },
    type: { control: 'select', options: [...TOAST_TYPE] },
    placement: { control: 'select', options: [...TOAST_PLACEMENT] },
    'hide-icon': { control: 'boolean' },
    open: { control: 'boolean' },
    time: { control: 'number' },
    text: { control: 'text', table: { disable: true } },
    // Event handlers
    mfpShow: { action: 'mfpShow' },
    mfpHide: { action: 'mfpHide' },
  },
  args: {
    border: 's',
    type: 'info',
    placement: 'bottom-center',
    'hide-icon': false,
    open: false,
    time: 3000,
    text: 'This is a message',
  },
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => {
  const onToastHide = (event) => {
    args.mfpHide(event);
    event.preventDefault();
  };

  return html`${TOAST_TYPE.map(
    (type) => html`
      <div class="m-be-xs2">
        <mfp-toast
          border=${args.border}
          type=${type}
          hide-icon=${args['hide-icon']}
          open=${args.open}
          time=${args.time}
          placement=${args.placement}
          @mfpShow=${args.mfpShow}
          @mfpHide=${onToastHide}
        >
          ${args.text} ${type === 'custom' ? html`<mfp-icon slot="icon" size="24" name="star-bold"></mfp-icon>` : null}
        </mfp-toast>
      </div>
    `,
  )} `;
};

export const Default: Story = {
  render: Template,
  argTypes: {
    type: { control: 'select', table: { disable: true } },
    time: { control: 'number', table: { disable: true } },
    open: { control: 'boolean', table: { disable: true } },
  },
  args: {
    open: true,
  },
};

const CustomIconTemplate = (args: Args) => {
  const onToastHide = (event) => {
    args.mfpHide(event);
    event.preventDefault();
  };

  return html`
    <mfp-toast
      border=${args.border}
      type=${args.type}
      hide-icon=${args['hide-icon']}
      open=${args.open}
      time=${args.time}
      placement=${args.placement}
      @mfpShow=${args.mfpShow}
      @mfpHide=${onToastHide}
    >
      ${args.text}
      <mfp-icon slot="icon" size="24" name="star-bold"></mfp-icon>
    </mfp-toast>
  `;
};

export const Custom: Story = {
  render: CustomIconTemplate,
  args: {
    type: 'success',
    open: true,
  },
};

const StackableTemplate = (args: Args) => {
  const toggleToast = async () => {
    const toast = document.createElement('mfp-toast');

    const [type] = getRandomFromArray(TOAST_TYPE as unknown as unknown[], 1);

    Object.assign(toast, {
      border: args.border,
      type: type,
      hideIcon: args['hide-icon'],
      time: args.time,
      open: args.open,
      placement: args.placement,
      innerHTML: args.text,
    });

    document.body.append(toast);

    await toast.toast();
  };

  return html` <mfp-button @mfpClick=${toggleToast}>Toggle toast</mfp-button> `;
};

export const Stackable: Story = {
  render: StackableTemplate,
  argTypes: {
    type: { control: 'select', table: { disable: true } },
    open: { control: 'boolean', table: { disable: true } },
  },
  args: {},
};
