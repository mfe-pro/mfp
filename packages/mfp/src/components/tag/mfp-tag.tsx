import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';

import { iconSize, textColor } from './helper';
import { TAG_COLOR, TAG_SIZE, TAG_VARIANT, TTagBorderRadius, TTagColor, TTagSize, TTagVariant } from './mfp-tag.types';
import { getColorCSSVariable, hasSlotContent, validatePropValue } from '../../shared/utils';

/**
 * @part wrapper - The wrapper container `<div>` of the element inside the shadow DOM.
 * @part prefix - The `<span>` tag element that acts as prefix container (when icon exists in front of tag).
 * @part text - The `<div>` element containing the text of the tag component.
 * @part btn-close - The close button element to remove the tag component.
 */
@Component({
  tag: 'mfp-tag',
  styleUrl: './scss/mfp-tag.scss',
  shadow: {
    delegatesFocus: true,
  },
})
export class MfpTag {
  // Own Properties
  // ====================

  private prefixElem: HTMLElement;

  // Reference to host HTML element
  // ===================================

  @Element() el!: HTMLMfpTagElement;

  // State() variables
  // Inlined decorator, alphabetical order
  // =======================================

  @State() private hasPrefix = false;

  // Public Property API
  // ========================

  /** The corner radius of the Tag (will override size's predefined border) */
  @Prop({ reflect: true }) border: TTagBorderRadius;

  /** If true, the Tag can be clickable */
  @Prop({ reflect: true }) clickable: boolean = false;

  /** The color style of the Tag */
  @Prop({ reflect: true }) color: TTagColor;

  /** If true, the Tag will be disabled (only if clickable = `true`, no interaction allowed) */
  @Prop({ reflect: true }) disabled?: boolean = false;

  /** If true, the Tag component will hidden (only if removable = `true`) */
  @Prop({ reflect: true, mutable: true }) hidden: boolean;

  /** If true, the Tag component can be removed */
  @Prop({ reflect: true }) removable: boolean = false;

  /** If true, the Tag is selected (only if clickable = `true`) */
  @Prop({ reflect: true, mutable: true }) selected: boolean = false;

  /** The size of the Tag component */
  @Prop({ reflect: true }) size: TTagSize = 'medium';

  /** The variant of Tag to apply on top of the variant */
  @Prop({ reflect: true }) variant: TTagVariant = 'filled';

  // Prop lifecycle events
  // =======================

  @Watch('size')
  @Watch('variant')
  checkPropValues() {
    validatePropValue(TAG_SIZE, 'medium', this.el, 'size');
    validatePropValue(TAG_VARIANT, 'filled', this.el, 'variant');
  }

  // Events section
  // Requires JSDocs for public API documentation
  // ==============================================

  /** Callback handler to be called when the tag is close/hidden  */
  @Event() mfpClose: EventEmitter;

  /** Callback handler to be called when the tag is not open/shown */
  @Event() mfpOpen: EventEmitter;

  /** Handler to be called when tag loses focus */
  @Event() mfpBlur: EventEmitter<HTMLMfpTagElement>;

  /** Handler to be called when tag is clicked */
  @Event() mfpClick: EventEmitter<HTMLMfpTagElement>;

  /** Handler to be called when tag is focused */
  @Event() mfpFocus: EventEmitter<HTMLMfpTagElement>;

  // Component lifecycle events
  // Ordered by their natural call order
  // =====================================

  componentWillLoad() {
    this.checkPropValues();
  }

  // Listeners
  // ==============

  // Public methods API
  // These methods are exposed on the host element.
  // Always use two lines.
  // Public Methods must be async.
  // Requires JSDocs for public API documentation.
  // ===============================================

  /** Method to be called to remove the tag component */
  @Method()
  async hide(): Promise<void> {
    this.handleHide();
  }

  /** Method to be called to show the tag component */
  @Method()
  async show(): Promise<void> {
    this.handleShow();
  }

  // Local methods
  // Internal business logic.
  // These methods cannot be called from the host element.
  // =======================================================

  private handleHide = () => {
    if (!this.isRemovable) return;

    const ev = this.mfpClose.emit(this.el);
    if (!ev.defaultPrevented) {
      this.hidden = true;
    }
  };

  private handleShow = () => {
    if (!this.isRemovable) return;

    const ev = this.mfpOpen.emit(this.el);
    if (!ev.defaultPrevented) {
      this.hidden = false;
    }
  };

  private handleClick = () => {
    // If the tag is not clickable or the tag is disabled, we don't want to handle the click
    if (!this.isClickable || this.disabled) return;

    // Emit a click event on the element
    const ev = this.mfpClick.emit(this.el);
    // If the event was not prevented, toggle the clickable state
    if (!ev.defaultPrevented) {
      this.selected = !this.selected;
    }
  };

  private handleBlur = () => {
    if (!this.isClickable) return;

    this.mfpBlur.emit(this.el);
  };

  private handleFocus = () => {
    if (!this.isClickable) return;

    this.mfpFocus.emit(this.el);
  };

  private handleSlotChange = () => {
    this.hasPrefix = hasSlotContent(this.prefixElem, 'prefix');
  };

  private get isClickable(): boolean {
    return this.clickable && !this.color && !this.hasCustomColor && !this.removable;
  }

  private get isRemovable(): boolean {
    return this.removable && !this.isClickable;
  }

  private get isHidden(): boolean {
    return this.isRemovable && this.hidden;
  }

  private get hasCustomColor(): boolean {
    return this.color !== undefined ? !TAG_COLOR.includes(this.color) : false;
  }

  // render() function
  // Always the last one in the class.
  // ===================================

  render() {
    const style = {
      '--mfp-tag--icon-prefix-size': `${iconSize(this.size)}px`,
      ...(this.border && { '--mfp-tag--border-radius': `var(--mfp-radius--${this.border})` }),
      ...(this.color && { '--mfp-tag--background-color': getColorCSSVariable(this.color) ?? this.color }),
      ...(this.hasCustomColor && { '--mfp-text--primary': `var(--mfp-text--alt)` }),
    };

    return (
      <Host style={style} aria-hidden={this.isHidden ? 'true' : 'false'} hidden={this.isHidden ? 'true' : 'false'}>
        <button
          class={{
            [`mfp-tag mfp-tag__${this.size}`]: true,
            [`mfp-tag__${this.color || 'default'} mfp-tag__${this.variant}`]: !this.hasCustomColor,
            'is-clickable': this.isClickable,
            'is-removable': this.removable,
            // Active/Selected state when clickable
            active: this.isClickable && this.selected,
            // Fixed border radius
            'has-border': !!this.border,
          }}
          disabled={this.disabled}
          onBlur={this.handleBlur}
          onClick={this.handleClick}
          onFocus={this.handleFocus}
          tabindex={this.isClickable ? 0 : -1}
          part="wrapper"
        >
          <span
            class={{ 'mfp-tag__prefix inline-flex': true, '!hidden': !this.hasPrefix }}
            ref={(spanElem) => (this.prefixElem = spanElem)}
            part="prefix"
          >
            <slot name="prefix" onSlotchange={this.handleSlotChange} />
          </span>
          <div
            class={{
              'text-xs': this.size === 'xsmall',
              'text-s': this.size === 'small',
              'text-m': this.size === 'medium',
            }}
            part="text"
          >
            <slot />
          </div>
          {this.isRemovable && !this.disabled && (
            <mfp-button
              class="mfp-tag__close"
              appearance="text"
              size="small"
              onClick={this.handleHide}
              part="btn-close"
            >
              <mfp-icon
                size={iconSize(this.size)}
                name="x-circle"
                color={this.color && !this.hasCustomColor ? textColor(this.color)[this.variant] : 'text--primary'}
              />
            </mfp-button>
          )}
        </button>
      </Host>
    );
  }
}
