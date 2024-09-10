import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit-html';

import mdx from './mfp-tab-group.mdx';
import { TAB_ORIENTATION, TAB_PLACEMENT, TAB_SIZE } from '../../tab/mfp-tab.types';

const meta: Meta = {
  title: 'Components/Tabs',
  component: 'mfp-tab-group',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    size: { control: 'select', options: [...TAB_SIZE] },
    orientation: { control: 'select', options: [...TAB_ORIENTATION] },
    placement: { control: 'select', options: [...TAB_PLACEMENT] },
    'disable-divider': { control: 'boolean' },
    tabs: { control: 'text', table: { disable: true } },
    icons: { control: 'text', table: { disable: true } },
    // Event handlers
    mfpChange: { action: 'mfpChange' },
    mfpFocus: { action: 'mfpFocus', table: { disable: true } },
    mfpBlur: { action: 'mfpBlur', table: { disable: true } },
  },
  args: {
    size: 'medium',
    orientation: 'horizontal',
    placement: 'start',
    'disable-divider': false,
    // Not part of the public API, so we don't want to expose it in the docs
    tabs: [
      { id: 1, label: 'Tab' },
      { id: 2, label: 'Tab' },
      { id: 3, label: 'Long Tab name' },
      { id: 4, label: 'Tab', disabled: true },
      { id: 5, label: 'Tab' },
      { id: 6, label: 'Tab' },
      { id: 7, label: 'Tab' },
      { id: 8, label: 'Tab' },
    ],
  },
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => {
  return html`
    <main
      class=${classMap({
        flex: args.orientation === 'vertical',
        'flex-row-reverse': args.placement === 'end',
        'gap-xs2': true,
      })}
    >
      <mfp-tab-group
        value="5"
        .size=${args.size}
        .orientation=${args.orientation}
        .placement=${args.placement}
        ?disable-divider=${args['disable-divider']}
        @mfpChange=${args.mfpChange}
        @mfpFocus=${args.mfpFocus}
        @mfpBlur=${args.mfpBlur}
      >
        ${args.tabs.map(
          (tab, index) => html`
            <mfp-tab tab-id=${tab.id}>
              ${tab.label}
              ${args.icons
                ? html`<mfp-icon name="${args.icons[index % args.icons.length]}" slot="icon"> </mfp-icon> `
                : null}
            </mfp-tab>
          `,
        )}
      </mfp-tab-group>
      <div class="border h-80 w-full flex-1 border-dashed border-stroke-primary bg-[--mfp-ui--alt]">
        <h3 class="m-l">Tab content</h3>
      </div>
    </main>
  `;
};

export const Default: Story = {
  render: Template,
};

export const Vertical: Story = {
  render: Template,
  args: {
    orientation: 'vertical',
  },
};

export const Icon: Story = {
  render: Template,
  args: {
    icons: [
      'pulse',
      'bell',
      'airplane-in-flight',
      'airplane-tilt',
      'align-right-simple',
      'anchor',
      'anchor-simple',
      'android-logo',
    ],
  },
};
