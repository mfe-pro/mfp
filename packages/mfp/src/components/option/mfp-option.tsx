import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop, State } from '@stencil/core';

import { hasSlotContent } from '../../shared/utils';

/**
 * @part base - The component's internal wrapper.
 * @part label - The `span` element in which the label text is displayed.
 * @part prefix - The `span` element in which the prefix is displayed (generally `mfp-icon`).
 * @part suffix - The `span` element in which the suffix is displayed (generally `mfp-icon`).
 */
@Component({
  tag: 'mfp-option',
  styleUrl: './scss/mfp-option.scss',
  shadow: true,
})
export class MfpOption {
  // Own Properties
  // ====================

  private prefixElem: HTMLElement;
  private suffixElem: HTMLElement;

  // Reference to host HTML element
  // ===================================

  @Element() el!: HTMLMfpOptionElement;

  // State() variables
  // Inlined decorator, alphabetical order
  // =======================================

  @State() hasPrefix: boolean = false;
  @State() hasSuffix: boolean = false;

  // Public Property API
  // ========================

  /** If true, the option is hidden. */
  @Prop({ reflect: true }) hidden: boolean = false;

  /** If true, the option is disabled. */
  @Prop({ reflect: true }) disabled?: boolean = false;

  /** A string representing the value of the option. Can be used to identify the item */
  @Prop({ reflect: true }) value?: string;

  /** If true, the option is selected and active. */
  @Prop({ reflect: true }) selected: boolean = false;

  // Prop lifecycle events
  // =======================

  // Events section
  // Requires JSDocs for public API documentation
  // ==============================================

  /** Handler to be called when item loses focus */
  @Event() mfpBlur: EventEmitter<HTMLMfpOptionElement>;

  /** Handler to be called when item is focused */
  @Event() mfpFocus: EventEmitter<HTMLMfpOptionElement>;

  /** Handler to be called when item is clicked */
  @Event() mfpClick: EventEmitter<HTMLMfpOptionElement>;

  /** Handler to be called on enter key press */
  @Event() mfpEnter: EventEmitter<HTMLMfpOptionElement>;

  // Component lifecycle events
  // Ordered by their natural call order
  // =====================================

  // Listeners
  // ==============

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter') return;
    this.mfpEnter.emit(this.el);
  }

  // Public methods API
  // These methods are exposed on the host element.
  // Always use two lines.
  // Public Methods must be async.
  // Requires JSDocs for public API documentation.
  // ===============================================

  // Local methods
  // Internal business logic.
  // These methods cannot be called from the host element.
  // =======================================================

  private onBlur = (event: Event) => {
    if (this.isDisabledOrHidden) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.mfpBlur.emit(this.el);
  };

  private onFocus = (event: Event) => {
    if (this.isDisabledOrHidden) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.mfpFocus.emit(this.el);
  };

  private onClick = (event: Event) => {
    if (this.isDisabledOrHidden) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.mfpClick.emit(this.el);
  };

  private onSlotChange = () => {
    this.hasPrefix = hasSlotContent(this.prefixElem, 'prefix');
  };

  private handleSuffixSlotChange = () => {
    this.hasSuffix = hasSlotContent(this.suffixElem, 'suffix');
  };

  private get isDisabledOrHidden() {
    return this.disabled || this.hidden;
  }

  // render() function
  // Always the last one in the class.
  // ===================================

  render() {
    return (
      <Host
        aria-disabled={this.isDisabledOrHidden ? 'true' : 'false'}
        aria-hidden={this.hidden ? 'true' : 'false'}
        aria-selected={this.selected ? 'true' : 'false'}
        role="option"
      >
        <div
          class={{
            'mfp-option': true,
            disabled: this.disabled,
            active: !this.disabled && this.selected,
          }}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onClick={this.onClick}
          tabindex={this.isDisabledOrHidden ? '-1' : '0'}
          role="button"
          part="base"
        >
          <span
            class={{
              'mfp-option__prefix me-[--mfp-option--gap-start] flex items-center': true,
              '!hidden': !this.hasPrefix,
            }}
            ref={(elem) => (this.prefixElem = elem)}
            part="prefix"
          >
            <slot name="prefix" onSlotchange={this.onSlotChange} />
          </span>
          <span class="mfp-option__label" part="label">
            <slot />
          </span>
          <span
            class={{
              'mfp-option__suffix ml-auto ms-[--mfp-option--gap-end] flex items-center': true,
              '!hidden': !this.hasSuffix,
            }}
            ref={(elem) => (this.suffixElem = elem)}
            part="suffix"
          >
            <slot name="suffix" onSlotchange={this.handleSuffixSlotChange} />
          </span>
        </div>
      </Host>
    );
  }
}
