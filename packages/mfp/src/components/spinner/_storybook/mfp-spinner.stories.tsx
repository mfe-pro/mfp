import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

import mdx from './mfp-spinner.mdx';
import { SPINNER_SIZE, SPINNER_TEXT_POSITION } from '../mfp-spinner.types';

const meta: Meta = {
  title: 'Components/Spinner',
  component: 'mfp-spinner',
  parameters: {
    docs: {
      page: mdx,
    },
    layout: 'centered',
  },
  argTypes: {
    animation: { control: 'boolean' },
    'text-position': { control: 'select', options: [...SPINNER_TEXT_POSITION] },
    size: { control: 'select', options: [...SPINNER_SIZE] },
    // Not part of the component, the text data is handled in a slot
    text: { control: 'text' },
  },
  args: {
    animation: true,
    'text-position': 'bellow',
    size: 'large',
    // Not part of the component
    text: 'Loading...',
  },
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => {
  return html`
    <mfp-spinner ?animation=${args.animation} size=${args.size} text-position=${args['text-position']}>
      <span>${args.text}</span>
    </mfp-spinner>
  `;
};

export const Large: Story = {
  render: Template,
};

export const Medium: Story = {
  render: Template,
  args: {
    size: 'medium',
  },
};

export const Small: Story = {
  render: Template,
  args: {
    size: 'small',
  },
};

export const CustomIcon: Story = {
  render: (args: Args) => html`
    <mfp-spinner ?animation=${args.animation} size=${args.size} text-position=${args['text-position']}>
      <mfp-icon name="spinner-gap" slot="icon"></mfp-icon>
      <span>${args.text}</span>
    </mfp-spinner>
  `,
};
