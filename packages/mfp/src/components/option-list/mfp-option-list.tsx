import { Component, Element, Event, EventEmitter, h, Listen, Prop } from '@stencil/core';

import { isEventTargetChildOfElement, isHTMLElement } from '../../shared/utils';

/**
 * @part base - The component's internal wrapper.
 */
@Component({
  tag: 'mfp-option-list',
  styleUrl: './scss/mfp-option-list.scss',
  shadow: true,
})
export class MfpOptionList {
  // Own Properties
  // ====================

  // Reference to host HTML element
  // ===================================

  @Element() el!: HTMLMfpOptionListElement;

  // State() variables
  // Inlined decorator, alphabetical order
  // =======================================

  // Public Property API
  // ========================

  // Prop lifecycle events
  // =======================

  /** Aria label for the list. */
  @Prop({ reflect: true }) ariaLabel: string = 'Options';

  // Events section
  // Requires JSDocs for public API documentation
  // ==============================================

  /** Handler to be called when `mfp-option` is selected (on click/enter press). */
  @Event() mfpSelect: EventEmitter<{ value: string; item: HTMLMfpOptionElement }>;

  // Component lifecycle events
  // Ordered by their natural call order
  // =====================================

  componentDidLoad() {
    this.el.setAttribute('role', 'listbox');
  }

  // Listeners
  // ==============

  @Listen('mfpClick', { passive: true })
  @Listen('mfpEnter', { passive: true })
  onMfpSelect(event: CustomEvent<HTMLElement>) {
    const { target: item } = event;
    if (!isHTMLElement(item, 'mfp-option') || !isEventTargetChildOfElement(event, this.el)) return;

    this.mfpSelect.emit({ item, value: item.value });
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

  // render() function
  // Always the last one in the class.
  // ===================================

  render() {
    return (
      <div class="mfp-option__list flex flex-col gap-y-[--mfp-option-group--gapY-list]" part="base">
        <slot />
      </div>
    );
  }
}
