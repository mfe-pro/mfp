import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

import mdx from './mfp-empty-state.mdx';
import { EMPTY_STATE_SIZE } from '../mfp-empty-state.types';

const meta: Meta = {
  title: 'Components/Empty state',
  component: 'mfp-empty-state',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    size: { control: 'select', options: [...EMPTY_STATE_SIZE] },
  },
  args: {
    size: 'medium',
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: Args) => html` <mfp-empty-state size=${args.size}> Title </mfp-empty-state> `,
};

export const WithBody: Story = {
  render: (args: Args) => html`
    <div class="flex flex-row gap-20">
      <mfp-empty-state size=${args.size}>
        Title
        <span slot="body"> Description </span>
      </mfp-empty-state>
      <mfp-empty-state size=${args.size}>
        Title <span slot="body"> Description <a class="mfp-link" href="https://example.com">Link</a> </span>
      </mfp-empty-state>
    </div>
  `,
};

export const WithCallToAction: Story = {
  render: (args: Args) => html`
    <div class="flex flex-row gap-20">
      <mfp-empty-state size=${args.size}>
        Title <span slot="body"> Description <a class="mfp-link" href="https://example.com">Link</a> </span>
        <div class="flex gap-xs" slot="footer">
          <mfp-button appearance="primary" size="small"> Button </mfp-button>
        </div>
      </mfp-empty-state>
      <mfp-empty-state size=${args.size}>
        Title <span slot="body"> Description <a class="mfp-link" href="https://example.com">Link</a> </span>
        <div class="flex gap-xs" slot="footer">
          <mfp-button size="small" variant="ghost"> Button </mfp-button>
        </div>
      </mfp-empty-state>
      <mfp-empty-state size=${args.size}>
        Title <span slot="body"> Description <a class="mfp-link" href="https://example.com">Link</a> </span>
        <div class="flex gap-xs" slot="footer">
          <mfp-button size="small" variant="ghost"> Button </mfp-button>
          <mfp-button appearance="primary" size="small"> Button </mfp-button>
        </div>
      </mfp-empty-state>
    </div>
  `,
};
