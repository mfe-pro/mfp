import { Component, Element, Event, EventEmitter, h, Listen, Prop, Watch } from '@stencil/core';

import { RADIO_GROUP_ORIENTATION, TRadioGroupOrientation } from './mfp-radio-group.types';
import { debounce, isHTMLElement, isNil, TDebounce, validatePropValue } from '../../shared/utils';
/**
 * @part base - The component's internal wrapper of the radio components.
 * @part label - The `<legend>` element that holds the text content.
 * @part group - The `<div>` element that holds the radio inputs.
 */
@Component({
  tag: 'mfp-radio-group',
  styleUrl: './scss/mfp-radio-group.scss',
  shadow: true,
})
export class MfpRadioGroup {
  // Own Properties
  // ====================

  private focusedMfpRadio: HTMLMfpRadioElement | null = null;

  private debouncedMfpChange: TDebounce<{ value: string; target: HTMLMfpRadioElement }>;

  // Reference to host HTML element
  // ===================================

  @Element() el!: HTMLMfpRadioGroupElement;

  // State() variables
  // Inlined decorator, alphabetical order
  // =======================================

  // Public Property API
  // ========================

  /** If true, all radio inputs in the group will display a background on hover */
  @Prop({ reflect: true }) backgroundOnHover? = false;

  /** Name of the HTML input form control. Submitted with the form as part of a name/value pair.  */
  @Prop({ reflect: true }) name!: string;

  /** A string representing the value of the radio. */
  @Prop({ reflect: true, mutable: true }) value?: string;

  /** If true radio inputs are disabled */
  @Prop({ reflect: true }) disabled? = false;

  /** If true displays fieldset */
  @Prop({ reflect: true }) fieldset? = false;

  /** The display orientation of the radio inputs */
  @Prop({ reflect: true, mutable: true }) orientation: TRadioGroupOrientation = 'vertical';

  /** A number representing the delay time (in milliseconds) that `mfpChange` event handler gets triggered once the value change */
  @Prop({ reflect: true, mutable: true }) debounceTime = 0;

  // Prop lifecycle events
  // =======================

  @Watch('backgroundOnHover')
  @Watch('disabled')
  @Watch('name')
  @Watch('value')
  handleGroupProperties() {
    if (!this.mfpRadioElements) return;

    this.mfpRadioElements.forEach((mfpRadio) => {
      mfpRadio.backgroundOnHover = this.backgroundOnHover;
      mfpRadio.disabled = this.disabled;
      mfpRadio.name = this.name;
      mfpRadio.checked = !isNil(this.value) ? mfpRadio.value === this.value : false;
    });
  }

  @Watch('orientation')
  checkPropValues() {
    validatePropValue(RADIO_GROUP_ORIENTATION, 'vertical', this.el, 'orientation');
  }

  @Watch('debounceTime')
  checkDebounceChange() {
    if (this.debounceTime < 0) {
      this.debounceTime = Math.max(0, this.debounceTime);
    }

    if (this.debouncedMfpChange) {
      this.debouncedMfpChange.cancel();
    }

    this.debouncedMfpChange = debounce((event: Parameters<typeof this.debouncedMfpChange>[0]) => {
      this.mfpChange.emit(event);
    }, this.debounceTime);
  }

  // Events section
  // Requires JSDocs for public API documentation
  // ==============================================

  /** Handler to be called when the radio state changes */
  @Event() mfpChange: EventEmitter<{ value: string; target: HTMLMfpRadioElement }>;

  // Component lifecycle events
  // Ordered by their natural call order
  // =====================================

  componentWillLoad() {
    this.checkPropValues();
    this.checkDebounceChange();
  }

  componentDidLoad() {
    this.handleGroupProperties();
  }

  // Listeners
  // ==============

  @Listen('mousedown', { target: 'body', passive: true })
  onMouseDown(event: MouseEvent) {
    if (!isNil(this.focusedMfpRadio) && isHTMLElement(event.target, 'mfp-radio') && this.el.contains(event.target)) {
      this.focusedMfpRadio = event.target;
    }
  }

  @Listen('mfpClick')
  onMfpClick(event: CustomEvent<HTMLMfpRadioElement>) {
    if (isNil(this.focusedMfpRadio)) {
      this.focusedMfpRadio = event.detail;
    }

    if (event.detail.value === this.value) return;

    const target = event.detail;
    this.mfpRadioElements.forEach((mfpRadioElement) => (mfpRadioElement.checked = mfpRadioElement === target));
    this.checkRadioInput(event.detail);
  }

  @Listen('mfpKeyDown')
  onMfpKeyDown(event: CustomEvent<KeyboardEvent>) {
    const { target } = event;

    if (!isHTMLElement(target, 'mfp-radio')) return;

    switch (event.detail.key) {
      case 'ArrowDown':
      case 'ArrowRight': {
        this.focusRadioInputSibbling(target, true);
        break;
      }

      case 'ArrowUp':
      case 'ArrowLeft': {
        this.focusRadioInputSibbling(target, false);
        break;
      }

      default:
    }
  }

  @Listen('mfpFocus', { capture: true })
  onMfpFocus(event: CustomEvent<HTMLMfpRadioElement>) {
    if (event.detail !== this.focusedMfpRadio) return;

    event.stopPropagation();
  }

  @Listen('mfpBlur', { capture: true })
  onMfpBlur(event: CustomEvent<HTMLMfpRadioElement>) {
    if (!isNil(this.focusedMfpRadio) && event.detail !== this.focusedMfpRadio) {
      event.stopPropagation();
    } else {
      this.focusedMfpRadio = null;
    }
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

  private get mfpRadioElements(): HTMLMfpRadioElement[] {
    return Array.from(this.el.querySelectorAll('mfp-radio'));
  }

  private focusRadioInputSibbling(currentTarget: HTMLMfpRadioElement, next: boolean): void {
    this.mfpRadioElements.forEach((mfpRadioElement, index, elements) => {
      if (mfpRadioElement === currentTarget) {
        const target = this.getNextRadioElement(elements, index, next);

        currentTarget.checked = false;

        target.vFocus();
        this.checkRadioInput(target);
      }
    });
  }

  private getNextRadioElement(elements: HTMLMfpRadioElement[], index: number, forward = true): HTMLMfpRadioElement {
    let element = null;
    let elementIndex = index;

    do {
      elementIndex = (elements.length + (elementIndex + (forward ? 1 : -1))) % elements.length;
      element = elements[elementIndex];
    } while (element.disabled);

    return element;
  }

  private checkRadioInput(target: HTMLMfpRadioElement): void {
    const { value } = target;
    target.checked = true;
    this.value = value;
    this.focusedMfpRadio = target;
    this.debouncedMfpChange({ value, target });
  }

  // render() function
  // Always the last one in the class.
  // ===================================

  render() {
    return (
      <fieldset class={{ 'mfp-radio-group': true, 'has-fieldset': this.fieldset }} role="radiogroup" part="base">
        <legend part="label">
          <slot name="label" />
        </legend>
        <div class={`mfp-radio-group--${this.orientation}`} part="group">
          <slot />
        </div>
      </fieldset>
    );
  }
}
