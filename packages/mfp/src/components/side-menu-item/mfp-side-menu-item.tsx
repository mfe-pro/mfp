import { Component, Element, Event, EventEmitter, h, Prop, State } from '@stencil/core';

import { getTextContent } from '../../shared/utils';

/**
 * @part base - The component wrapper container inside the shadow DOM
 * @part label - The label slot
 * @part prefix - The prefix slot
 * @part suffix - The suffix slot
 * @part panel - The `<div>` container that holds the tooltip content (when the side menu is collapsed)
 * @part trigger - The `<div>` container that holds the element which displays tooltip on hover (when the side menu is collapsed)
 */
@Component({
  tag: 'mfp-side-menu-item',
  styleUrl: './scss/mfp-side-menu-item.scss',
  shadow: true,
})
export class MfpSideMenuItem {
  // Own Properties
  // ====================

  private labelElem: HTMLElement;

  // Reference to host HTML element
  // ===================================

  @Element() el!: HTMLMfpSideMenuItemElement;

  // State() variables
  // Inlined decorator, alphabetical order
  // =======================================

  @State() textContent: string;

  // Public Property API
  // ========================

  /** If true, the menu item will be shown as active/selected. */
  @Prop() active: boolean = false;

  /** If true, the item label and suffix will be hidden and the with will be reduce according to its parent */
  @Prop() collapse: boolean = false;

  /** If true, the menu item will be disabled (no interaction allowed) */
  @Prop() disabled: boolean = false;

  // Prop lifecycle events
  // =======================

  // Events section
  // Requires JSDocs for public API documentation
  // ==============================================

  /** Handler to be called when the button loses focus */
  @Event() mfpBlur: EventEmitter<HTMLMfpSideMenuItemElement>;

  /** Handler to be called when the button is clicked */
  @Event() mfpFocus: EventEmitter<HTMLMfpSideMenuItemElement>;

  /** Handler to be called when button gets focus */
  @Event() mfpClick: EventEmitter<HTMLMfpSideMenuItemElement>;

  // Component lifecycle events
  // Ordered by their natural call order
  // =====================================

  componentDidLoad() {
    this.handleSlotChange();
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

  private handleSlotChange = () => {
    if (!this.labelElem) return;
    this.textContent = getTextContent(this.labelElem.querySelector('slot'));
  };

  handleBlur = (ev: Event) => {
    if (this.disabled) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }

    this.mfpBlur.emit(this.el);
  };

  handleFocus = (ev: Event) => {
    if (this.disabled) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }

    this.mfpFocus.emit(this.el);
  };

  handleClick = (ev: Event) => {
    if (this.disabled) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }

    this.mfpClick.emit(this.el);
  };

  // render() function
  // Always the last one in the class.
  // ===================================

  private menuItem = () => (
    <a
      class={{
        'mfp-side-menu__item': true,
        active: this.active,
        disabled: this.disabled,
        'is-collapsed': this.collapse,
      }}
      onBlur={this.handleBlur}
      onFocus={this.handleFocus}
      onClick={this.handleClick}
      aria-disabled={this.disabled ? 'true' : 'false'}
      role="menuitem"
      tabindex={this.disabled ? -1 : 0}
      slot="trigger"
      part="base"
    >
      <div class="mfp-side-menu__item--prefix flex items-center" part="prefix">
        <slot name="prefix" />
      </div>
      <div
        class="mfp-side-menu__item--label overflow-hidden text-ellipsis whitespace-nowrap"
        ref={(labelElem) => (this.labelElem = labelElem)}
      >
        <slot onSlotchange={this.handleSlotChange} />
      </div>
      <div class="mfp-side-menu__item--suffix ml-auto flex items-center" part="suffix">
        <slot name="suffix" />
      </div>
    </a>
  );

  render() {
    return !this.collapse ? (
      this.menuItem()
    ) : (
      <mfp-tooltip class="mfp-side-menu__item--tooltip block" placement="right" exportparts="trigger, panel">
        {this.textContent}
        {this.menuItem()}
      </mfp-tooltip>
    );
  }
}
