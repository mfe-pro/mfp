import { Component, Element, Event, EventEmitter, h, Method, Prop } from '@stencil/core';

/**
 * @part base - The component's internal wrapper of the radio component.
 * @part input - The native HTML `<input type="radio">` used under the hood.
 * @part radio - The component's internal wrapper of the radio component.
 * @part label - The `<span>` element that holds the text content.
 */
@Component({
  tag: 'mfp-radio',
  styleUrl: './scss/mfp-radio.scss',
  shadow: true,
})
export class MfpRadio {
  // Own Properties
  // ====================
  private inputElement: HTMLInputElement;

  // Reference to host HTML element
  // ===================================

  @Element() el!: HTMLMfpRadioElement;

  // State() variables
  // Inlined decorator, alphabetical order
  // =======================================

  // Public Property API
  // ========================

  /** If true radio input is checked */
  @Prop({ reflect: true, mutable: true }) checked?: boolean;

  /** If true radio input is disabled */
  @Prop({ reflect: true }) disabled? = false;

  /** If true radio displays background on hover */
  @Prop({ reflect: true }) backgroundOnHover? = false;

  /** The form ID that the radio input is associated with */
  @Prop({ reflect: true }) formId?: string;

  /** Name of the HTML input form control. Submitted with the form as part of a name/value pair.  */
  @Prop({ reflect: true }) name!: string;

  /** If `true`, it will indicate that the user must specify a value for the radio before the owning form can be submitted */
  @Prop({ reflect: true }) required?: boolean;

  /** A string representing the value of the radio. */
  @Prop({ reflect: true }) value!: string;

  // Prop lifecycle events
  // =======================

  // Events section
  // Requires JSDocs for public API documentation
  // ==============================================

  /** Handler to be called when the radio state changes */
  @Event() mfpClick: EventEmitter<HTMLMfpRadioElement>;

  /** Handler to be called when the radio gets focus */
  @Event() mfpFocus: EventEmitter<HTMLMfpRadioElement>;

  /** Handler to be called when the radio loses focus */
  @Event() mfpBlur: EventEmitter<HTMLMfpRadioElement>;

  /** Handler to be called when the radio key is pressed */
  @Event() mfpKeyDown: EventEmitter<KeyboardEvent>;

  // Component lifecycle events
  // Ordered by their natural call order
  // =====================================

  // Listeners
  // ==============

  // Public methods API
  // These methods are exposed on the host element.
  // Always use two lines.
  // Public Methods must be async.
  // Requires JSDocs for public API documentation.
  // ===============================================

  /**
   * Simulate a click event on the native `<input>` HTML element used under the hood.
   * Use this method instead of the global `element.click()`.
   */
  @Method()
  async vClick() {
    this.inputElement?.click();
  }

  /**
   * Sets focus on the native `<input>` HTML element used under the hood.
   * Use this method instead of the global `element.focus()`.
   */
  @Method()
  async vFocus() {
    this.inputElement?.focus();
  }

  /**
   * Remove focus from the native `<input>` HTML element used under the hood.
   * Use this method instead of the global `element.blur()`.
   */
  @Method()
  async vBlur() {
    this.inputElement?.blur();
  }

  // Local methods
  // Internal business logic.
  // These methods cannot be called from the host element.
  // =======================================================

  private handleClick = () => {
    this.checked = true;
    this.mfpClick.emit(this.el);
  };

  private handleOnFocus = () => {
    this.mfpFocus.emit(this.el);
  };

  private handleOnBlur = () => {
    this.mfpBlur.emit(this.el);
  };

  private handleOnKeyDown = (event: KeyboardEvent) => {
    this.mfpKeyDown.emit(event);
  };

  private get tabindex(): string {
    // NOTE: this.checked is undefined when is not part of mfp-radio-group
    return `${-1 + +(this.checked ?? 1)}`;
  }

  /**
   * This method prevents label to steal the focus and trigger input blur
   * details https://stackoverflow.com/a/73364174
   */
  private onLabelMouseDown = (event: MouseEvent) => {
    event.preventDefault();
  };

  // render() function
  // Always the last one in the class.
  // ===================================

  render() {
    return (
      <label
        class={{
          'mfp-radio group': true,
          'is-disabled !cursor-not-allowed': this.disabled,
          'is-checked': this.checked,
          'has-background': this.backgroundOnHover,
        }}
        part="base"
        onMouseDown={this.onLabelMouseDown}
      >
        <div class="mfp-radio__control">
          <input
            class="mfp-radio__input"
            ref={(element) => (this.inputElement = element)}
            type="radio"
            form={this.formId}
            name={this.name}
            value={this.value}
            required={this.required}
            disabled={this.disabled}
            onBlur={this.handleOnBlur}
            onClick={this.handleClick}
            onFocus={this.handleOnFocus}
            onKeyDown={this.handleOnKeyDown}
            aria-checked={this.checked ? 'true' : 'false'}
            aria-disabled={this.disabled ? 'true' : 'false'}
            tabindex={this.tabindex}
            part="input"
          />
          <div class="mfp-radio__circle" part="radio">
            <div class="mfp-radio__checked" />
          </div>
        </div>
        <span
          class="mfp-radio__label group-hover:text-text-primary-hover group-[.is-disabled]:text-text-primary-disabled"
          part="label"
        >
          <slot></slot>
        </span>
      </label>
    );
  }
}
