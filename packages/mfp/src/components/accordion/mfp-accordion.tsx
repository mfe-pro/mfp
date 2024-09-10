import { Component, Element, Event, EventEmitter, h, Listen, Prop, State, Watch } from '@stencil/core';

import { Accordion } from './helper';
import { ACCORDION_APPEARANCE, ACCORDION_SIZE, TAccordionAppearance, TAccordionSize } from './mfp-accordion.types';
import { hasSlotContent, validatePropValue } from '../../shared/utils';

/**
 * @part base - The `<details>` that holds the accordion content
 * @part header - The `<summary>` that holds the accordion header content
 * @part prefix - The `<div>` that holds the accordion text prefix icon / avatar
 * @part text - The `<div>` that holds the accordion header text
 * @part suffix - The `<div>` that holds the accordion text suffix icon
 * @part panel - The `<div>` that holds the accordion panel content
 */
@Component({
  tag: 'mfp-accordion',
  styleUrl: './scss/mfp-accordion.scss',
  shadow: true,
})
export class MfpAccordion {
  // Own Properties
  // ====================

  private accordion: Accordion;
  private prefixElem: HTMLDivElement;
  private suffixElem: HTMLDivElement;
  private detailsElem: HTMLDetailsElement;

  // Reference to host HTML element
  // ===================================

  @Element() el!: HTMLMfpAccordionElement;

  // State() variables
  // Inlined decorator, alphabetical order
  // =======================================

  @State() private hasPrefix = false;
  @State() private hasSuffix = false;

  // Public Property API
  // ========================

  /** The appearance style of accordion */
  @Prop({ reflect: true, mutable: true }) appearance: TAccordionAppearance = 'filled';

  /** If true accordion is disabled */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** If true accordion is expanded */
  @Prop({ reflect: true, mutable: true }) expanded: boolean = false;

  /**
   * Animation is set through JS when the browser does not support CSS calc-size()
   * If true, the accordion animation, will be disabled. No animation will be applied.
   */
  @Prop({ reflect: true }) noAnimation: boolean = false;

  /** If true accordion expand icon is rotate 180deg when expanded */
  @Prop({ reflect: true }) rotate: boolean = false;

  /** The size of accordion */
  @Prop({ reflect: true, mutable: true }) size: TAccordionSize = 'medium';

  // Prop lifecycle events
  // =======================

  @Watch('size')
  checkPropValues() {
    validatePropValue(ACCORDION_SIZE, 'medium', this.el, 'size');
    validatePropValue(ACCORDION_APPEARANCE, 'filled', this.el, 'appearance');
  }

  @Watch('expanded')
  handleExpandedChange() {
    const event = this.expanded ? this.mfpOpen.emit(this.el) : this.mfpClose.emit(this.el);
    if (event.defaultPrevented) {
      this.expanded = !this.expanded;
      return;
    }

    this.expanded ? this.accordion?.open() : this.accordion?.close();
    if (!this.isCssCalcSizeSupported) return;

    // NOTE: This is a workaround to trigger the transitionEnd event
    // when the open/close animation is handled via CSS instead of JS
    setTimeout(() => {
      this.el.dispatchEvent(new CustomEvent('accordionTransitionEnd', { bubbles: false, composed: true }));
    }, 200);
  }

  @Watch('disabled')
  handleDisabledChange() {
    if (!this.disabled) return;

    this.expanded = false;
  }

  @Watch('noAnimation')
  handleJsAnimation() {
    if (this.isCssCalcSizeSupported) return;

    console.warn(
      `[mfp-accordion] calc-size() is not supported and animation will be set through JS
        For vertical layout, consider using the 'noAnimation' prop ('no-animation' attribute) to disable it`,
    );
    this.accordion = !this.noAnimation ? new Accordion(this.detailsElem) : null;
  }

  // Events section
  // Requires JSDocs for public API documentation
  // ==============================================

  /** Handler to be called when the accordion loses focus */
  @Event() mfpBlur: EventEmitter<HTMLMfpAccordionElement>;

  /** Handler to be called when the accordion gets focus */
  @Event() mfpFocus: EventEmitter<HTMLMfpAccordionElement>;

  /** Handler to be called when the accordion is opened */
  @Event() mfpOpen: EventEmitter<HTMLMfpAccordionElement>;

  /** Handler to be called after the accordion is opened */
  @Event() mfpAfterOpen: EventEmitter<HTMLMfpAccordionElement>;

  /** Handler to be called when the accordion is closed */
  @Event() mfpClose: EventEmitter<HTMLMfpAccordionElement>;

  /** Handler to be called after the accordion is closed */
  @Event() mfpAfterClose: EventEmitter<HTMLMfpAccordionElement>;

  /** @internal Handler to be called when the accordion is clicked */
  @Event() mfpClick: EventEmitter<HTMLMfpAccordionElement>;

  // Component lifecycle events
  // Ordered by their natural call order
  // =====================================

  componentWillLoad() {
    this.checkPropValues();
  }

  componentDidLoad() {
    this.handleJsAnimation();
    this.handleExpandedChange();
  }

  // Listeners
  // ==============

  @Listen('accordionTransitionEnd')
  onAccordionTransitionEnd(event: CustomEvent) {
    event.stopPropagation();
    if (event.target !== this.el) return;

    this.expanded ? this.mfpAfterOpen.emit(this.el) : this.mfpAfterClose.emit(this.el);
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

  private handleClick = (event: MouseEvent) => {
    event.preventDefault();

    if (this.disabled) return;

    this.mfpClick.emit(this.el);
    this.expanded = !this.expanded;
  };

  private handleFocus = () => {
    if (this.disabled) return;

    this.mfpFocus.emit(this.el);
  };

  private handleBlur = () => {
    this.mfpBlur.emit(this.el);
  };

  private handlePrefixSlotChange = () => {
    this.hasPrefix = hasSlotContent(this.prefixElem, 'prefix');
  };

  private handleSuffixSlotChange = () => {
    this.hasSuffix = hasSlotContent(this.suffixElem, 'suffix');
  };

  private get open() {
    return this.expanded && !this.disabled;
  }

  private get isCssCalcSizeSupported() {
    return window.CSS?.supports('(block-size: calc-size(auto))');
  }

  // render() function
  // Always the last one in the class.
  // ===================================

  render() {
    return (
      <details
        class={{
          [`mfp-accordion overflow-hidden ${this.size} ${this.appearance}`]: true,
          'no-animation': this.noAnimation,
          disabled: this.disabled,
        }}
        ref={(detailsElem: HTMLDetailsElement) => (this.detailsElem = detailsElem)}
        open={this.open}
        part="base"
      >
        <summary
          class="mfp-accordion__header"
          onClick={this.handleClick}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          aria-expanded={this.expanded}
          aria-disabled={this.disabled}
          aria-controls="mfp-accordion__body"
          tabindex={this.disabled ? -1 : 0}
          part="header"
        >
          <div
            ref={(element) => (this.prefixElem = element)}
            class={{ 'mfp-accordion__header--prefix': true, '!hidden': !this.hasPrefix }}
            part="prefix"
          >
            <slot name="prefix" onSlotchange={this.handlePrefixSlotChange} />
          </div>
          <div class="mfp-accordion__header--text" part="text">
            <slot name="header" />
          </div>
          <div
            ref={(element) => (this.suffixElem = element)}
            class={{ 'mfp-accordion__header--suffix': true, '!hidden': !this.hasSuffix }}
            part="suffix"
          >
            <slot name="suffix" onSlotchange={this.handleSuffixSlotChange} />
          </div>
          <div
            class={{
              'flex items-center justify-center transition-transform duration-300 ease-in-out': true,
              '!hidden': this.open && !this.rotate,
              'rotate-180': this.rotate && this.open,
            }}
          >
            <slot name="expand">
              <mfp-icon name="plus" />
            </slot>
          </div>
          <div
            class={{ 'flex items-center justify-center': true, '!hidden': (!this.open && !this.rotate) || this.rotate }}
          >
            <slot name="collapse">
              <mfp-icon name="minus" />
            </slot>
          </div>
        </summary>
        <div id="mfp-accordion__body" class="mfp-accordion__body overflow-hidden" part="panel">
          <slot />
        </div>
      </details>
    );
  }
}
