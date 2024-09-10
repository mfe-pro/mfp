import { useArgs } from '@storybook/preview-api';
import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import mdx from './mfp-select.mdx';
import { INPUT_VALIDATION } from '../../input/mfp-input.types';

const meta: Meta = {
  title: 'Components/Select',
  component: 'mfp-select',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    autofocus: { control: 'boolean' },
    'clear-button-label': { control: 'text' },
    'debounce-time': { control: 'number' },
    'disable-clear': { control: 'boolean' },
    distance: { control: 'number' },
    disabled: { control: 'boolean' },
    form: { control: 'text' },
    'keep-open-on-select': { control: 'boolean' },
    name: { control: 'text' },
    'max-tags-visible': { control: 'number' },
    multiple: { control: 'boolean' },
    open: { control: 'boolean' },
    'panel-height': { control: 'text' },
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'right',
        'right-start',
        'right-end',
        'left',
        'left-start',
        'left-end',
      ],
    },
    placeholder: { control: 'text' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    'same-width': { control: 'boolean' },
    skidding: { control: 'number' },
    strategy: { control: 'select', options: ['fixed', 'absolute'] },
    'validation-status': { control: 'select', options: [...INPUT_VALIDATION] },
    value: { control: 'object' },
    // Events
    mfpBlur: { action: 'mfpBlur' },
    mfpClear: { action: 'mfpClear' },
    mfpFocus: { action: 'mfpFocus' },
    mfpSelect: { action: 'mfpSelect' },
    // Not part of the public API, so we don't want to expose it in the docs
    noLabel: { control: 'boolean', table: { disable: true } },
    hasLabelTooltip: { control: 'boolean', table: { disable: true } },
    noHelperText: { control: 'boolean', table: { disable: true } },
    optionalLabel: { control: 'boolean', table: { disable: true } },
    prefix: { control: 'boolean', table: { disable: true } },
    suffix: { control: 'boolean', table: { disable: true } },
    customTags: { control: 'boolean', table: { disable: true } },
    options: { control: 'text', table: { disable: true } },
  },
  args: {
    autofocus: false,
    'clear-button-label': 'Clear value',
    'debounce-time': 0,
    'disable-clear': false,
    distance: 8,
    disabled: false,
    form: undefined,
    'keep-open-on-select': false,
    name: 'mfp-select',
    'max-tags-visible': 2,
    multiple: false,
    open: false,
    'panel-height': undefined,
    placement: 'bottom',
    placeholder: 'Placeholder',
    'same-width': false,
    skidding: 0,
    strategy: 'absolute',
    readonly: false,
    required: false,
    'validation-status': 'none',
    customTags: false,
    value: undefined,
    // Not part of the public API, so we don't want to expose it in the docs
    options: [
      { label: 'Running', value: 'running', icon: 'sneaker-move' },
      { label: 'Hiking', value: 'hiking', icon: 'boot' },
      { label: 'Biking', value: 'biking', icon: 'person-simple-bike' },
      { label: 'Swimming', value: 'swimming', icon: 'swimming-pool' },
      { label: 'Pizza', value: 'pizza', icon: 'pizza' },
      { label: 'Hamburger', value: 'hamburger', icon: 'hamburger' },
      { label: 'Cookie', value: 'cookie', icon: 'cookie' },
      { label: 'Ice-cream', value: 'ice-cream', icon: 'ice-cream' },
    ],
  },
};
export default meta;

type Story = StoryObj;

const Template = (args: Args) => {
  const [, updateArgs] = useArgs();

  const onSelect = (event) => {
    updateArgs({ value: event.detail.value });
    args.mfpSelect(event);
  };

  const onClear = (event) => {
    updateArgs({ value: [] });
    args.mfpClear(event);
  };

  const tooltipTemplate = args.hasLabelTooltip
    ? html`
        <mfp-tooltip class="ms-xs">
          <mfp-icon name="info" slot="trigger"></mfp-icon>
          You can provide more context detail by adding a tooltip to the label.
        </mfp-tooltip>
      `
    : nothing;

  const labelTemplate = html`
    <label class="flex flex-grow items-center" slot=${ifDefined(!args.optionalLabel ? 'label' : null)}>
      Select label ${tooltipTemplate}
    </label>
  `;

  const label = !args.optionalLabel
    ? labelTemplate
    : html`
        <div slot="label" class="flex flex-1">
          ${labelTemplate}
          <span class="text-text-secondary">Optional</span>
        </div>
      `;

  const style = args.hasLabelTooltip
    ? html`
        <style>
          mfp-select {
            inline-size: 75vw;
          }
        </style>
      `
    : nothing;

  return html`
    ${style}
    <mfp-select
      ?autofocus=${args.autofocus}
      clear-button-label=${args['clear-button-label']}
      distance=${args.distance}
      debounce-time=${args['debounce-time']}
      ?disable-clear=${args['disable-clear']}
      ?disabled=${args.disabled}
      form=${ifDefined(args.form)}
      ?keep-open-on-select=${args['keep-open-on-select']}
      name=${ifDefined(args.name)}
      max-tags-visible=${args['max-tags-visible']}
      ?multiple=${args.multiple}
      ?open=${args.open}
      panel-height=${args['panel-height']}
      placeholder=${args.placeholder}
      placement=${args.placement}
      ?readonly=${args.readonly}
      ?required=${args.required}
      ?same-width=${args['same-width']}
      skidding=${args.skidding}
      strategy=${args.strategy}
      validation-status=${args['validation-status']}
      value=${args.multiple ? ifDefined(JSON.stringify(args.value)) : args.value}
      @mfpBlur=${args.mfpBlur}
      @mfpSelect=${args.customTags ? onSelect : args.mfpSelect}
      @mfpClear=${args.customTags ? onClear : args.mfpClear}
      @mfpFocus=${args.mfpFocus}
    >
      ${args.customTags
        ? html`${args.options
            .filter((option) => args.value.includes(option.value))
            .map((option, index) => {
              if (index < args['max-tags-visible'] || args['max-tags-visible'] < 0) {
                return html`<mfp-tag
                  key=${option.value}
                  size="xsmall"
                  variant="filled"
                  slot="tags"
                  class="[&::part(text)]:text-nowrap [&::part(text)]:leading-small"
                >
                  <mfp-icon name=${option.icon} slot="prefix"></mfp-icon>
                  ${option.value}
                </mfp-tag>`;
              } else if (index === args['max-tags-visible']) {
                return html`
                  <mfp-tag
                    key="more"
                    size="xsmall"
                    variant="filled"
                    slot="tags"
                    class="[&::part(text)]:text-nowrap [&::part(text)]:leading-small"
                  >
                    +${args.value.length - index}
                  </mfp-tag>
                `;
              }
              return nothing;
            })}`
        : nothing}
      ${!args.noLabel ? label : nothing}
      ${args.prefix ? html`<mfp-icon name="user-circle" slot="prefix"></mfp-icon>` : nothing}
      ${args.suffix ? html`<mfp-icon name="arrow-down" slot="suffix"></mfp-icon>` : nothing}
      ${!args.noHelperText
        ? html`
            <span class="flex items-center gap-xs" slot="helper-text">
              <mfp-icon name="star"></mfp-icon>
              Helper text
            </span>
          `
        : nothing}
      ${args.options.map(
        (option) => html`
          <mfp-option value=${option.value}>
            <mfp-icon slot="prefix" name=${option.icon}></mfp-icon> ${option.label}
          </mfp-option>
        `,
      )}
    </mfp-select>
  `;
};

export const Default: Story = {
  render: Template,
};

export const Open: Story = {
  render: Template,
  args: {
    autofocus: true,
    open: true,
  },
};

export const InitialValue: Story = {
  render: Template,
  args: {
    value: 'swimming',
  },
};

export const ReadOnly: Story = {
  render: Template,
  args: {
    readonly: true,
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    disabled: true,
  },
};

export const Multiple: Story = {
  render: Template,
  args: {
    'keep-open-on-select': true,
    multiple: true,
    value: ['running', 'biking', 'pizza'],
  },
};

export const MultipleCustomRender: Story = {
  render: Template,
  args: {
    'keep-open-on-select': true,
    multiple: true,
    customTags: true,
    value: ['running', 'biking', 'pizza'],
  },
};

export const Prefix: Story = {
  render: Template,
  args: {
    prefix: true,
  },
};

export const Suffix: Story = {
  render: Template,
  args: {
    suffix: true,
  },
};

export const Validation: Story = {
  render: (args) => html`
    <div class="grid grid-cols-1 gap-m sm:grid-cols-3">
      <!-- Error -->
      ${Template({ ...args, 'validation-status': 'error', value: 1 })}
      <!-- Warning -->
      ${Template({ ...args, 'validation-status': 'warning', value: 3 })}
      <!-- Success -->
      ${Template({ ...args, 'validation-status': 'success', value: 5 })}
    </div>
  `,
};

export const Optional: Story = {
  name: 'Label with "Optional"',
  render: Template,
  args: {
    optionalLabel: true,
    prefix: true,
  },
};

export const Tooltip: Story = {
  name: 'Label with "Info tooltip"',
  render: Template,
  args: {
    hasLabelTooltip: true,
    optionalLabel: true,
    prefix: true,
  },
  parameters: {
    layout: 'centered',
  },
};

export const Placement: Story = {
  name: 'Panel placement',
  render: Template,
  args: {
    hasLabelTooltip: true,
    placement: 'top',
    prefix: true,
  },
  parameters: {
    layout: 'centered',
  },
};

export const NoLabel: Story = {
  name: 'With no Label',
  render: Template,
  args: {
    noLabel: true,
    prefix: true,
  },
};

export const NoHelperText: Story = {
  name: 'With no Helper Text',
  render: Template,
  args: {
    noHelperText: true,
    prefix: true,
  },
};

export const WithForm: Story = {
  render: () => {
    const handleFormSubmit = (ev: Event) => {
      ev.preventDefault();
      const form = ev.target as HTMLFormElement;
      const formData = new FormData(form);
      const formValues = Object.fromEntries(formData.entries());

      const codeElement = document.getElementById('form-data');
      if (!codeElement) return;

      codeElement.textContent = JSON.stringify(formValues, null, 2);
    };

    return html`
      <link rel="stylesheet" href="https://unpkg.com/@highlightjs/cdn-assets@11.10.0/styles/night-owl.min.css" />

      <div class="grid auto-cols-auto grid-cols-1 gap-y-l sm:grid-cols-2 sm:gap-x-l">
        <mfp-card>
          <h4 class="m-be-m">User data</h4>
          <form class="flex flex-col gap-y-m" @submit=${handleFormSubmit}>
            <mfp-input name="fullName" value="Brad Bernie Beckett" autocomplete="name" required>
              <label class="flex flex-grow items-center" slot="label">Full Name</label>
            </mfp-input>
            <div class="grid grid-cols-1 gap-y-m sm:grid-cols-2 sm:gap-x-m">
              <mfp-select name="gender" value="male" autocomplete="sex" readonly>
                <label class="flex flex-grow items-center" slot="label">Gender</label>
                <mfp-option value="female">Female</mfp-option>
                <mfp-option value="male">Male</mfp-option>
                <mfp-option value="non-binary">Non-binary</mfp-option>
                <mfp-option value="other">Other</mfp-option>
              </mfp-select>
              <mfp-input name="bdayYear" type="number" value="1983" autocomplete="bday-year" required>
                <label class="flex flex-grow items-center" slot="label">Year of birth date (YYYY)</label>
              </mfp-input>
            </div>
            <mfp-select name="prevCountries" value='["ro","us"]' multiple autocomplete="country-name">
              <label class="flex flex-grow items-center" slot="label">Previous countries</label>
              <mfp-option value="au">Australia</mfp-option>
              <mfp-option value="ca">Canada</mfp-option>
              <mfp-option value="mx">Mexico</mfp-option>
              <mfp-option value="pt">Portugal</mfp-option>
              <mfp-option value="ro">Romania</mfp-option>
              <mfp-option value="us">United States</mfp-option>
              <span class="flex items-center gap-xs" slot="helper-text">
                Please select the countries you have visited before.
              </span>
            </mfp-select>
            <div class="flex justify-end gap-x-s">
              <mfp-button appearance="secondary" type="reset">Cancel</mfp-button>
              <mfp-button type="submit">Save</mfp-button>
            </div>
          </form>
        </mfp-card>
        <mfp-card class="[&::part(wrapper)]:h-full">
          <h4 class="m-be-m">Form Data</h4>
          <div class="language-javascript overflow-x-scroll whitespace-pre rounded-s">
            // Handle form submit<br />
            const form = ev.target as HTMLFormElement;<br />
            const formData = new FormData(form);<br />
            const formValues = Object.fromEntries(formData.entries());
          </div>
          <pre>
            <code id="form-data" class="rounded-s">
              { // submit the form to see the data here }
            </code>
          </pre>
        </mfp-card>
      </div>

      <script type="module">
        import hljs from 'https://unpkg.com/@highlightjs/cdn-assets@11.10.0/es/highlight.min.js';
        import javascript from 'https://unpkg.com/@highlightjs/cdn-assets@11.10.0/es/languages/javascript.min.js';

        hljs.registerLanguage('javascript', javascript);
        hljs.highlightAll();

        document.querySelectorAll('div.language-javascript').forEach((block) => {
          hljs.highlightElement(block);
        });
      </script>
    `;
  },
};
