import { Component, Element, Event, EventEmitter, h, Prop, Watch } from '@stencil/core';

import { STEP_ITEM_STATUS, TStepItemStatus } from './mfp-step-item.types';
import { isHTMLElement, validatePropValue } from '../../shared/utils';
import { STEPS_SIZE, TStepsSize, TStepsType } from '../steps/mfp-steps.types';

/**
 * @part base - The component's base wrapper.
 * @part title - The component's title.
 * @part description - The component's description.
 */
@Component({
  tag: 'mfp-step-item',
  styleUrl: './scss/mfp-step-item.scss',
  shadow: true,
})
export class MfpStepItem {
  // Own Properties
  // ====================

  // Reference to host HTML element
  // ===================================
  @Element() el!: HTMLMfpStepItemElement;

  // State() variables
  // Inlined decorator, alphabetical order
  // =======================================

  // Public Property API
  // ========================

  /** It defines prefix size */
  @Prop({ reflect: true }) size?: TStepsSize = 'medium';

  /** It defines step item appearance based on its status */
  @Prop({ reflect: true }) status?: TStepItemStatus = 'default';

  /** It defines the step item type used */
  @Prop({ reflect: true }) type?: TStepsType;

  // Prop lifecycle events
  // =======================

  @Watch('size')
  @Watch('status')
  checkPropValues() {
    validatePropValue(STEPS_SIZE, 'medium', this.el, 'size');
    validatePropValue(STEP_ITEM_STATUS, 'default', this.el, 'status');

    this.handleIconPrefix();
  }

  // Events section
  // Requires JSDocs for public API documentation
  // ==============================================

  /** Callback handler emitted when the step item is clicked */
  @Event() mfpClick: EventEmitter<{ target: HTMLMfpStepItemElement; value: string }>;

  // Component lifecycle events
  // Ordered by their natural call order
  // =====================================

  connectedCallback() {
    this.checkPropValues();
  }

  componentDidLoad() {
    this.handleIconPrefix();
  }

  // Listeners
  // ==============

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

  private get isDisabled(): boolean {
    return this.status === 'disabled';
  }

  private get isCurrent(): boolean {
    return this.status === 'current';
  }

  private handleIconPrefix = () => {
    const iconElem = this.el.querySelector('[slot="prefix"]');
    if (!iconElem || !isHTMLElement(iconElem, 'mfp-icon')) return;

    iconElem.size = this.size === 'small' ? 24 : 32;
    iconElem.weight = this.isCurrent ? 'fill' : 'regular';
  };

  // render() function
  // Always the last one in the class.
  // ===================================

  render() {
    return (
      <div
        class={{
          'mfp-step-item flex gap-s': true,
          [`mfp-step-item--${this.status}`]: true,
          'pointer-events-none opacity-60': this.isDisabled,
        }}
        part="base"
      >
        <div class={`mfp-step-item__prefix relative ${this.type} ${this.size} ${this.status}`}>
          <slot name="prefix" onSlotchange={this.handleIconPrefix} />
        </div>
        <div class="mfp-step-item__content">
          {/* TITLE */}
          <div
            class={{
              'mfp-step-item__content--title pe-xs3 text-m leading-regular text-text-primary': true,
              'pointer-events-none': this.isDisabled,
              'text-text-brand': this.isCurrent,
            }}
            part="title"
          >
            <slot />
          </div>
          {/* DESCRIPTION */}
          <div
            class={{
              'mfp-step-item__content--description text-s leading-regular opacity-60': true,
              'opacity-60': this.isDisabled,
            }}
            part="description"
          >
            <slot name="description" />
          </div>
        </div>
      </div>
    );
  }
}
