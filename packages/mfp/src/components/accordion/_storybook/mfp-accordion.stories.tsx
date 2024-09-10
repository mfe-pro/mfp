import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import mdx from './mfp-accordion.mdx';
import { ACCORDION_APPEARANCE, ACCORDION_SIZE } from '../mfp-accordion.types';

const meta: Meta = {
  title: 'Components/Accordion',
  component: 'mfp-accordion',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    appearance: { control: 'select', options: [...ACCORDION_APPEARANCE] },
    disabled: { control: 'boolean' },
    expanded: { control: 'boolean' },
    'no-animation': { control: 'boolean' },
    rotate: { control: 'boolean' },
    size: { control: 'select', options: [...ACCORDION_SIZE] },
    // Event handlers
    mfpBlur: { action: 'mfpBlur' },
    mfpFocus: { action: 'mfpFocus' },
    mfpClick: { action: 'mfpClick' },
    mfpOpen: { action: 'mfpOpen' },
    mfpAfterOpen: { action: 'mfpAfterOpen' },
    mfpClose: { action: 'mfpClose' },
    mfpAfterClose: { action: 'mfpAfterClose' },
    // Not part of the component
    header: { control: 'text', table: { disable: true } },
  },
  args: {
    appearance: 'filled',
    disabled: false,
    expanded: false,
    'no-animation': false,
    rotate: false,
    size: 'medium',
    // Not part of the component
    header: 'Header',
  },
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => html`
  <mfp-accordion
    appearance=${args.appearance}
    ?disabled=${args.disabled}
    ?expanded=${args.expanded}
    ?no-animation=${args['no-animation']}
    ?rotate=${args.rotate}
    size=${args.size}
    @mfpBlur=${args.mfpBlur}
    @mfpFocus=${args.mfpFocus}
    @mfpClick=${args.mfpClick}
    @mfpOpen=${args.mfpOpen}
    @mfpAfterOpen=${args.mfpAfterOpen}
    @mfpClose=${args.mfpClose}
    @mfpAfterClose=${args.mfpAfterClose}
  >
    ${ifDefined(args.prefix) ? args.prefix : nothing}
    <span slot="header">${args.header}</span>
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque magnam corporis perferendis, architecto vel ullam
      officia officiis necessitatibus optio nam soluta labore libero debitis? Delectus enim quaerat laboriosam
      consequatur ea.
    </div>
    ${ifDefined(args.suffix) ? args.suffix : nothing}
    <!-- Custom collapse/expand icon -->
    ${ifDefined(args.collapse) ? args.collapse : nothing}
  </mfp-accordion>
`;

export const Default: Story = {
  render: Template,
};

export const Expanded: Story = {
  render: Template,
  args: {
    expanded: true,
  },
};

export const Ghost: Story = {
  render: Template,
  args: {
    appearance: 'ghost',
    expanded: true,
  },
};

export const Prefix: Story = {
  render: Template,
  argTypes: {
    prefix: { control: 'text', table: { disable: true } },
  },
  args: {
    prefix: html`<mfp-icon name="heart" slot="prefix"></mfp-icon>`,
  },
};

export const Avatar: Story = {
  render: Template,
  argTypes: {
    prefix: { control: 'text', table: { disable: true } },
  },
  args: {
    prefix: html`
      <mfp-avatar
        size="xsmall"
        image="https://images.unsplash.com/photo-1524593689594-aae2f26b75ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
        slot="prefix"
      ></mfp-avatar>
    `,
  },
};

export const Suffix: Story = {
  render: Template,
  argTypes: {
    suffix: { control: 'text', table: { disable: true } },
  },
  args: {
    suffix: html`<mfp-icon name="gear" slot="suffix"></mfp-icon>`,
  },
};

export const CustomCollapseExpand: Story = {
  render: Template,
  argTypes: {
    collapse: { control: 'text', table: { disable: true } },
  },
  args: {
    collapse: html`<mfp-icon name="caret-up" slot="expand"></mfp-icon>`,
    rotate: true,
  },
};
