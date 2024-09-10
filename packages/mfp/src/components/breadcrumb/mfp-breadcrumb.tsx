import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop } from '@stencil/core';

import { isHTMLElement } from '../../shared/utils';

/**
 * @part navigation - The `nav` tag that loads the breadcrumb items
 */
@Component({
  tag: 'mfp-breadcrumb',
  styleUrl: './scss/mfp-breadcrumb.scss',
  shadow: true,
})
export class MfpBreadcrumb {
  // Own Properties
  // ====================

  private spanElem: HTMLElement;

  // Reference to host HTML element
  // ===================================

  @Element() el!: HTMLMfpBreadcrumbElement;

  // State() variables
  // Inlined decorator, alphabetical order
  // =======================================

  // Public Property API
  // ========================

  /** The `aria-label` attribute to describe the type of navigation */
  @Prop({ reflect: true }) ariaLabel: string = 'Breadcrumbs';

  // Prop lifecycle events
  // =======================

  // Events section
  // Requires JSDocs for public API documentation
  // ==============================================

  /** Handler to be called when `mfp-breadcrumb-item` item loses focus. */
  @Event() mfpBreadcrumbBlur: EventEmitter<HTMLMfpBreadcrumbItemElement>;

  /** Handler to be called when `mfp-breadcrumb-item` item gets focus. */
  @Event() mfpBreadcrumbFocus: EventEmitter<HTMLMfpBreadcrumbItemElement>;

  /** Handler to be called when `mfp-breadcrumb-item` is selected (on click/enter press). */
  @Event() mfpBreadcrumbClick: EventEmitter<HTMLMfpBreadcrumbItemElement>;

  // Component lifecycle events
  // Ordered by their natural call order
  // =====================================

  // Listeners
  // ==============

  @Listen('mfpBlur', { passive: true })
  onBlur(event: CustomEvent<HTMLElement>) {
    if (isHTMLElement(event.detail, 'mfp-breadcrumb-item')) this.mfpBreadcrumbBlur.emit(event.detail);
  }

  @Listen('mfpFocus', { passive: true })
  onFocus(event: CustomEvent<HTMLElement>) {
    if (isHTMLElement(event.detail, 'mfp-breadcrumb-item')) this.mfpBreadcrumbFocus.emit(event.detail);
  }

  @Listen('mfpClick', { passive: true })
  onClick(event: CustomEvent<HTMLElement>) {
    if (isHTMLElement(event.detail, 'mfp-breadcrumb-item')) this.mfpBreadcrumbClick.emit(event.detail);
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

  private setSeparator = (): void => {
    this.breadcrumbItems.forEach((item, index, arr) => {
      item.isLastItem = index === arr.length - 1;
      !item.isLastItem && item.append(this.getSeparatorElem());
    });
  };

  /**
   * clone original element and add slot attr
   * @returns cloned separator element
   */
  private getSeparatorElem = (): HTMLElement => {
    const clone = this.separatorFromSlot.cloneNode(true) as HTMLElement;
    clone.slot = 'separator';

    return clone;
  };

  private get breadcrumbItems(): HTMLMfpBreadcrumbItemElement[] {
    return Array.from(this.el.querySelectorAll('mfp-breadcrumb-item'));
  }

  private get separatorFromSlot() {
    return this.spanElem
      .querySelector<HTMLSlotElement>('slot[name="separator"]')
      .assignedElements({ flatten: true })[0] as HTMLElement;
  }

  // render() function
  // Always the last one in the class.
  // ===================================

  render() {
    return (
      <Host>
        <nav class="flex items-center" aria-label={this.ariaLabel} part="navigation">
          <slot onSlotchange={this.setSeparator}></slot>
        </nav>

        <span hidden aria-hidden="true" ref={(element) => (this.spanElem = element)}>
          <slot name="separator">
            <span class="flex items-center justify-center is-3">/</span>
          </slot>
        </span>
      </Host>
    );
  }
}
