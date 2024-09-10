import { Component, Element, h, Listen, Prop, Watch } from '@stencil/core';

import { isHTMLElement, isNil } from '../../shared/utils';
import { TAccordionAppearance, TAccordionSize } from '../accordion/mfp-accordion.types';

/**
 * @part base - The component's base wrapper.
 */
@Component({
  tag: 'mfp-accordion-group',
  styleUrl: './scss/mfp-accordion-group.scss',
  shadow: true,
})
export class MfpAccordionGroup {
  // Own Properties
  // ====================

  // Reference to host HTML element
  // ===================================

  @Element() el!: HTMLMfpAccordionGroupElement;

  // State() variables
  // Inlined decorator, alphabetical order
  // =======================================

  // Public Property API
  // ========================

  /** The appearance style of accordion to be applied to all accordions */
  @Prop({ reflect: true, mutable: true }) appearance: TAccordionAppearance = 'filled';

  /** If true all accordions are expanded */
  @Prop({ reflect: true }) expandAll: boolean;

  /**
   * Animation is set through JS when the browser does not support CSS calc-size()
   * If true, the accordion animation, will be disabled. No animation will be applied.
   */
  @Prop({ reflect: true }) noAnimation: boolean = false;

  /** If true multiple accordions can be expanded at the same time */
  @Prop({ reflect: true }) multiple: boolean = false;

  /** The size of accordion to be applied to all accordions */
  @Prop({ reflect: true, mutable: true }) size: TAccordionSize = 'medium';

  // Prop lifecycle events
  // =======================

  @Watch('appearance')
  @Watch('expandAll')
  @Watch('noAnimation')
  @Watch('size')
  checkPropValues() {
    this.mfpAccordionElements.forEach((mfpAccordionElement) => {
      // NOTE: if expandAll is nil we will keep accordion default state
      if (!isNil(this.expandAll)) {
        mfpAccordionElement.expanded = this.expandAll;
      }
      mfpAccordionElement.appearance = this.appearance;
      mfpAccordionElement.noAnimation = this.noAnimation;
      mfpAccordionElement.size = this.size;
    });
  }

  // Events section
  // Requires JSDocs for public API documentation
  // ==============================================

  @Listen('mfpClick', { passive: true })
  onMfpClick(event: CustomEvent<HTMLMfpAccordionElement>) {
    const { detail: mfpElem } = event;
    // Make sure the event is coming from a mfp-accordion element and its a child of the mfp-accordion-group
    if (!isHTMLElement(mfpElem, 'mfp-accordion') || !this.el.contains(mfpElem)) return;
    // We keep default behavior if multiple accordion can be expanded
    if (this.multiple) return;

    this.mfpAccordionElements.forEach((mfpAccordionElement) => {
      if (mfpAccordionElement === event.detail) return;

      mfpAccordionElement.expanded = false;
    });
  }

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

  // Local methods
  // Internal business logic.
  // These methods cannot be called from the host element.
  // =======================================================

  private get mfpAccordionElements(): HTMLMfpAccordionElement[] {
    return Array.from(this.el.querySelectorAll('mfp-accordion'));
  }
  // render() function
  // Always the last one in the class.
  // ===================================

  render() {
    return (
      <div class="flex flex-col gap-[--mfp-accordion-group--gap]" part="base">
        <slot />
      </div>
    );
  }
}
