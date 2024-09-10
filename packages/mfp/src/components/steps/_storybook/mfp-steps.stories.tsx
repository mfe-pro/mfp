import { Args, Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import mdx from './mfp-steps.mdx';
import { STEPS_SIZE, STEPS_TYPE } from '../mfp-steps.types';

const meta: Meta = {
  title: 'Components/Steps',
  component: 'mfp-steps',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    'divider-color': { control: 'text' },
    type: { control: 'select', options: [...STEPS_TYPE] },
    size: { control: 'select', options: [...STEPS_SIZE] },
    // Not part of the public API
    children: { control: 'text', table: { disable: true } },
  },
  args: {
    'divider-color': 'stroke--primary',
    size: 'medium',
  },
};
export default meta;

const Template = (args: Args) => {
  return html`
    <mfp-steps divider-color=${args['divider-color']} type=${args.type} size=${args.size}>
      ${ifDefined(args.children) ? args.children : nothing}
    </mfp-steps>
  `;
};

export const Dots: StoryObj = {
  render: Template,
  args: {
    type: 'dot',
    children: html`
      <mfp-step-item status="default">
        <mfp-icon slot="prefix" name="circle"></mfp-icon>
        <span>Title</span>
        <span slot="description">Description</span>
      </mfp-step-item>
      <mfp-step-item status="error">
        <mfp-icon slot="prefix" name="x-circle"></mfp-icon>
        <span>Title</span>
        <span slot="description">Description</span>
      </mfp-step-item>
      <mfp-step-item status="completed">
        <mfp-icon slot="prefix" name="check-circle"></mfp-icon>
        <span>Title</span>
        <span slot="description">Description</span>
      </mfp-step-item>
      <mfp-step-item status="current">
        <mfp-icon slot="prefix" name="circle"></mfp-icon>
        <span>Title</span>
        <span slot="description">Description</span>
      </mfp-step-item>
      <mfp-step-item status="disabled">
        <mfp-icon slot="prefix" name="circle"></mfp-icon>
        <span>Title</span>
        <span slot="description">Description</span>
      </mfp-step-item>
    `,
  },
};

export const Icons: StoryObj = {
  render: Template,
  args: {
    type: 'icon',
    children: html`
      <mfp-step-item status="completed">
        <mfp-icon slot="prefix" name="airplane-takeoff"></mfp-icon>
        <span>Flight</span>
        <span slot="description">Reserve your flight</span>
      </mfp-step-item>
      <mfp-step-item status="completed">
        <mfp-icon slot="prefix" name="bed"></mfp-icon>
        <span>Accommodation</span>
        <span slot="description">Reserve your accommodation</span>
      </mfp-step-item>
      <mfp-step-item status="error">
        <mfp-icon slot="prefix" name="car"></mfp-icon>
        <span>Rent a car</span>
        <span slot="description">There was an error with your reservation</span>
      </mfp-step-item>
      <mfp-step-item status="current">
        <mfp-icon slot="prefix" name="tree-palm"></mfp-icon>
        <span>Enjoy your holidays!</span>
        <span slot="description">You're ready for your vacations</span>
      </mfp-step-item>
    `,
  },
};

export const Numbers: StoryObj = {
  render: Template,
  args: {
    type: 'numeric',
    children: html`
      <mfp-step-item status="default">
        <span slot="prefix">1</span>
        <span>Title</span>
        <span slot="description">Description</span>
      </mfp-step-item>
      <mfp-step-item status="completed">
        <span slot="prefix">2</span>
        <span>Title</span>
        <span slot="description">Description</span>
      </mfp-step-item>
      <mfp-step-item status="error">
        <span slot="prefix">3</span>
        <span>Title</span>
        <span slot="description">Description</span>
      </mfp-step-item>
      <mfp-step-item status="current">
        <span slot="prefix">4</span>
        <span>Title</span>
        <span slot="description">Description</span>
      </mfp-step-item>
      <mfp-step-item status="disabled">
        <span slot="prefix">4</span>
        <span>Title</span>
        <span slot="description">Description</span>
      </mfp-step-item>
    `,
  },
};
