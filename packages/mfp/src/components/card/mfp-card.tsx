import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';

import { CARD_TYPE, TCardBorderRadius, TCardType } from './mfp-card.types';
import { validatePropValue } from '../../shared/utils';

/**
 *  @part wrapper - The wrapper container `<div>` of the element inside the shadow DOM
 */
@Component({
  tag: 'mfp-card',
  styleUrl: './scss/mfp-card.scss',
  shadow: true,
})
export class MfpCard {
  // Own Properties
  // ====================

  // Reference to host HTML element
  // ===================================

  @Element() el!: HTMLMfpCardElement;

  // State() variables
  // Inlined decorator, alphabetical order
  // =======================================

  // Public Property API
  // ========================

  /** Type of card component */
  @Prop({ reflect: true }) type: TCardType = 'default';

  /** The corner radius of the card component */
  @Prop({ reflect: true }) border: TCardBorderRadius = 'm';

  // Prop lifecycle events
  // =======================

  @Watch('type')
  checkPropValue() {
    validatePropValue(CARD_TYPE, 'default', this.el, 'type');
  }

  // Events section
  // Requires JSDocs for public API documentation
  // ==============================================

  // Component lifecycle events
  // Ordered by their natural call order
  // =====================================

  componentWillLoad() {
    this.checkPropValue();
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

  // render() function
  // Always the last one in the class.
  // ===================================

  render() {
    const style = {
      ...(this.border && { '--mfp-card--borderRadius': `var(--mfp-radius--${this.border})` }),
    };
    return (
      <Host style={style}>
        <div
          class={{
            'mfp-card rounded-[--mfp-card--borderRadius] border-[length:--mfp-card--borderWidth] border-[color:--mfp-card--borderColor] bg-[--mfp-card--background]':
              true,
            'p-b-[--mfp-card--padding] p-i-[--mfp-card--padding]': this.type === 'default',
            // Remove padding for minimal card type
            'p-b-0 p-i-0': this.type === 'minimal',
          }}
          part="wrapper"
        >
          <slot />
        </div>
      </Host>
    );
  }
}
