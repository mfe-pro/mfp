import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import mdx from '../../accordion/_storybook/mfp-accordion.mdx';
import { ACCORDION_APPEARANCE, ACCORDION_SIZE } from '../../accordion/mfp-accordion.types';

const meta: Meta = {
  title: 'Components/Accordion',
  component: 'mfp-accordion-group',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    appearance: { control: 'select', options: [...ACCORDION_APPEARANCE] },
    'expand-all': { control: 'boolean' },
    'no-animation': { control: 'boolean' },
    multiple: { control: 'boolean' },
    size: { control: 'select', options: [...ACCORDION_SIZE] },
    text: { control: 'text', table: { disable: true } },
  },
  args: {
    appearance: 'filled',
    'expand-all': false,
    'no-animation': false,
    multiple: false,
    size: 'medium',
    text: 'Header',
  },
};
export default meta;

type Story = StoryObj;

export const Group: Story = {
  render: (args: Args) => html`
    <mfp-accordion-group
      appearance=${ifDefined(args.appearance)}
      ?expand-all=${args['expand-all']}
      ?no-animation=${args['no-animation']}
      ?multiple=${args.multiple}
      size=${ifDefined(args.size)}
    >
      <mfp-accordion size=${args.size}>
        <span slot="header">${args.text}</span>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque magnam corporis perferendis, architecto vel
          ullam officia officiis necessitatibus optio nam soluta labore libero debitis? Delectus enim quaerat laboriosam
          consequatur ea.
        </div>
      </mfp-accordion>
      <mfp-accordion expanded>
        <span slot="header">${args.text}</span>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque magnam corporis perferendis, architecto vel
          ullam officia officiis necessitatibus optio nam soluta labore libero debitis? Delectus enim quaerat laboriosam
          consequatur ea.
        </div>
      </mfp-accordion>
      <mfp-accordion disabled>
        <span slot="header">${args.text}</span>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque magnam corporis perferendis, architecto vel
          ullam officia officiis necessitatibus optio nam soluta labore libero debitis? Delectus enim quaerat laboriosam
          consequatur ea.
        </div>
      </mfp-accordion>
      <mfp-accordion>
        <span slot="header">${args.text}</span>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque magnam corporis perferendis, architecto vel
          ullam officia officiis necessitatibus optio nam soluta labore libero debitis? Delectus enim quaerat laboriosam
          consequatur ea.
        </div>
      </mfp-accordion>
    </mfp-accordion-group>
  `,
  args: {},
};
