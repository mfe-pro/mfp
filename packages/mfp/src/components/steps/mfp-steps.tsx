import { Component, Element, h, Prop, Watch } from '@stencil/core';

import { STEPS_SIZE, STEPS_TYPE, TStepsSize, TStepsType } from './mfp-steps.types';
import { validatePropValue } from '../../shared/utils';

/**
 * @part container - The container wrapper of the Steps component
 * @part divider-base - The base wrapper of the divider component
 * @part divider-dash-start - The dash start wrapper of the divider component
 * @part divider-dash-end - The dash end wrapper of the divider component
 */
@Component({
  tag: 'mfp-steps',
  styleUrl: './scss/mfp-steps.scss',
  shadow: true,
})
export class MfpSteps {
  // Own Properties
  // ====================

  private stepElem: HTMLElement;

  // Reference to host HTML element
  // ===================================

  @Element() el!: HTMLMfpStepsElement;

  // State() variables
  // Inlined decorator, alphabetical order
  // =======================================

  // Public Property API
  // ========================

  /** The color of the line that connects the steps. It should be a valid declarative color token. */
  @Prop({ reflect: true }) dividerColor: string = 'stroke--primary';

  /** The size of the steps */
  @Prop({ reflect: true }) size: TStepsSize = 'medium';

  /** The type of prefix element to use on the step items */
  @Prop({ reflect: true }) type: TStepsType;

  // Prop lifecycle events
  // =======================

  @Watch('type')
  @Watch('size')
  checkPropValues() {
    validatePropValue(STEPS_SIZE, 'medium', this.el, 'size');
    validatePropValue(STEPS_TYPE, 'numeric', this.el, 'type');

    this.setStepItemProps();
  }
  // Events section
  // Requires JSDocs for public API documentation
  // ==============================================

  // Component lifecycle events
  // Ordered by their natural call order
  // =====================================

  componentDidLoad() {
    this.setStepItemProps();
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

  private get mfpSteps(): HTMLMfpStepItemElement[] {
    if (!this.stepElem) return [];

    const slot = this.stepElem.querySelector('slot');
    return [...slot.assignedElements({ flatten: true })].filter(
      (el: HTMLMfpSideMenuItemElement) => el.tagName.toLowerCase() === 'mfp-step-item',
    ) as [HTMLMfpSideMenuItemElement];
  }

  private setStepItemProps = () => {
    this.mfpSteps.forEach((mfpStepElem: HTMLMfpStepItemElement) => {
      mfpStepElem.size = this.size;
      mfpStepElem.type = this.type;
    });
  };

  // private handleChange = (event) => {
  //   this.mfpChange.emit(event);
  // }

  // render() function
  // Always the last one in the class.
  // ===================================

  render() {
    const dividerPaddingTop = this.size === 'small' ? 'p-bs-s' : 'p-bs-m';

    return (
      <div
        class="relative flex w-full items-start justify-between"
        ref={(div) => (this.stepElem = div)}
        part="container"
      >
        <slot />
        <mfp-divider
          class={`absolute -z-10 p-i-s inset-ie-0 inset-is-0 ${dividerPaddingTop}`}
          strokeColor={this.dividerColor}
          strokeThickness={2}
          exportparts="base:divider-base,dash-start:divider-dash-start,dash-end:divider-dash-end"
        />
      </div>
    );
  }
}
