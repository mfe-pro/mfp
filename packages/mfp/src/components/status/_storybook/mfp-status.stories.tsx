import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

import mdx from './mfp-status.mdx';
import { STATUS_TYPE } from '../mfp-status.types';

const meta: Meta = {
  title: 'Components/Status',
  component: 'mfp-status',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    type: { control: 'select', options: [...STATUS_TYPE] },
    // This control is not part of the component
    label: { control: 'text', table: { disable: true } },
  },
  args: {
    type: 'neutral',
  },
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => html` <mfp-status type=${args.type}>${args.label}</mfp-status> `;

export const Alert: Story = {
  render: Template,
  args: {
    label: 'Alert status',
    type: 'alert',
  },
};

export const Danger: Story = {
  render: Template,
  args: {
    label: 'Danger status',
    type: 'danger',
  },
};

export const Info: Story = {
  render: Template,
  args: {
    label: 'Information status',
    type: 'info',
  },
};

export const Neutral: Story = {
  render: Template,
  args: {
    label: 'Neutral status',
  },
};

export const Success: Story = {
  render: Template,
  args: {
    label: 'Success status',
    type: 'success',
  },
};
