import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import mdx from './mfp-breadcrumb.mdx';

const meta: Meta = {
  title: 'Components/Breadcrumb',
  component: 'mfp-breadcrumb',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    'aria-label': { control: 'text' },
    // Event handlers
    mfpBreadcrumbBlur: { action: 'mfpBlur' },
    mfpBreadcrumbClick: { action: 'mfpClick' },
    mfpBreadcrumbFocus: { action: 'mfpFocus' },
    // Not part of the public API, so we don't want to expose it in the docs
    text: { control: 'text', table: { disable: true } },
    htmlNode: { control: 'object', table: { disable: true } },
    useLinks: { control: 'boolean', table: { disable: true } },
  },
  args: {
    'aria-label': 'Breadcrumbs',
    text: 'text',
    htmlNode: '',
    useLinks: false,
  },
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => html`
  <mfp-breadcrumb
    @mfpBreadcrumbBlur=${args.mfpBreadcrumbBlur}
    @mfpBreadcrumbClick=${args.mfpBreadcrumbClick}
    @mfpBreadcrumbFocus=${args.mfpBreadcrumbFocus}
  >
    ${args.htmlNode}
    <mfp-breadcrumb-item
      href=${ifDefined(args.useLinks ? 'https://example.com/' : null)}
      target=${ifDefined(args.useLinks ? '_blank' : null)}
      aria-label="Home page"
    >
      <mfp-icon name="house-line" size="16"></mfp-icon>
    </mfp-breadcrumb-item>
    <mfp-breadcrumb-item
      href=${ifDefined(args.useLinks ? 'https://example.com/' : null)}
      target=${ifDefined(args.useLinks ? '_blank' : null)}
      aria-label="Men clothing"
    >
      Men's Clothing
    </mfp-breadcrumb-item>
    <mfp-breadcrumb-item
      href=${ifDefined(args.useLinks ? 'https://example.com/' : null)}
      target=${ifDefined(args.useLinks ? '_blank' : null)}
      aria-label="Shirts"
    >
      <mfp-icon name="shirt-folded" size="16"></mfp-icon>
      Shirts
    </mfp-breadcrumb-item>
    <mfp-breadcrumb-item
      href=${ifDefined(args.useLinks ? 'https://example.com/' : null)}
      target=${ifDefined(args.useLinks ? '_blank' : null)}
      aria-label="Casual shirts"
    >
      Casual shirts
    </mfp-breadcrumb-item>
  </mfp-breadcrumb>
`;

export const Default: Story = {
  render: Template,
  args: {},
};

export const CaretSeparator: Story = {
  render: Template,
  args: {
    htmlNode: Object.assign(document.createElement('mfp-icon'), { name: 'caret-right', size: '12', slot: 'separator' }),
  },
};

export const Links: Story = {
  render: Template,
  args: {
    useLinks: true,
  },
};
