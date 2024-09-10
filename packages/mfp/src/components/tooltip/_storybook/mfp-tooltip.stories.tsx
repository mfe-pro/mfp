import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

import mdx from './mfp-tooltip.mdx';
import { TOOLTIP_PLACEMENT } from '../mfp-tooltip.types';

const meta: Meta = {
  title: 'Components/Tooltip',
  component: 'mfp-tooltip',
  parameters: {
    docs: {
      page: mdx,
    },
    layout: 'centered',
  },
  argTypes: {
    'always-visible': { control: 'boolean' },
    distance: { control: 'number' },
    'display-on': { control: 'inline-radio', options: ['click', 'hover'] },
    'hide-arrow': { control: 'boolean' },
    placement: { control: 'select', options: TOOLTIP_PLACEMENT },
    'same-width': { control: 'boolean' },
    visible: { control: 'boolean' },
    // This control is not part of the component
    text: { control: 'text', table: { disable: true } },
  },
  args: {
    'always-visible': false,
    distance: 10,
    'display-on': 'hover',
    'hide-arrow': false,
    placement: 'top',
    visible: false,
    'same-width': false,
  },
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => html`
  <mfp-tooltip
    always-visible=${args['always-visible']}
    distance=${args.distance}
    display-on=${args['display-on']}
    ?hide-arrow=${args['hide-arrow']}
    placement=${args.placement}
    same-width=${args['same-width']}
    ?visible=${args.visible}
  >
    ${args.text}
    <mfp-button slot="trigger">Hover me!</mfp-button>
  </mfp-tooltip>
`;

export const Default: Story = {
  render: Template,
  args: {
    text: "Yuhu! I'm a tooltip 🙃",
    visible: true,
  },
};

export const Bottom: Story = {
  render: Template,
  args: {
    text: "Yuhu! I'm a tooltip 🙃",
    placement: 'bottom',
    visible: true,
  },
};

export const Right: Story = {
  render: Template,
  args: {
    text: "Yuhu! I'm a tooltip 🙃",
    placement: 'right',
    visible: true,
  },
};

export const Left: Story = {
  render: Template,
  args: {
    text: "Yuhu! I'm a tooltip 🙃",
    placement: 'left',
    visible: true,
  },
};

export const NoArrow: Story = {
  render: Template,
  args: {
    text: "Yuhu! I'm a tooltip 🙃",
    'hide-arrow': true,
    visible: true,
  },
};

export const SameWidth: Story = {
  render: Template,
  args: {
    text: 'Tooltip',
    'same-width': true,
    visible: true,
  },
};

export const LongContent: Story = {
  render: Template,
  args: {
    text: "Yuhu! I'm a tooltip 🙃, and I'm a long text that probably shouldn't be shown here but 'ce sa fac'",
    visible: true,
  },
};

export const AlwaysVisible: Story = {
  render: Template,
  args: {
    text: "Yuhu! I'm a tooltip 🙃, and I'm a long text that probably shouldn't be shown here but 'ce sa fac'",
    'always-visible': true,
  },
};

export const DisplayOnClick: Story = {
  render: (args: Args) => html`
    <mfp-tooltip
      distance=${args.distance}
      display-on=${args['display-on']}
      ?hide-arrow=${args['hide-arrow']}
      placement=${args.placement}
      same-width=${args['same-width']}
      ?visible=${args.visible}
    >
      ${args.text}
      <mfp-button slot="trigger">
        <mfp-icon name="mouse" slot="prefix"></mfp-icon>
        Click me!
      </mfp-button>
    </mfp-tooltip>
  `,
  args: {
    'display-on': 'click',
    text: "Yuhu! I'm a tooltip 🙃",
    visible: true,
  },
};
