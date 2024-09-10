import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop, Watch } from '@stencil/core';

import { debounce, getNextElement, isHTMLElement, isNil, TDebounce, validatePropValue } from '../../shared/utils';
import {
  TAB_ORIENTATION,
  TAB_PLACEMENT,
  TAB_SIZE,
  TTabOrientation,
  TTabPlacement,
  TTabSize,
} from '../tab/mfp-tab.types';

/**
 * @part base - The HTML div wrapper inside the shadow DOM.
 * @part tabs - The HTML div used to hold the tab buttons.
 */
@Component({
  tag: 'mfp-tab-group',
  styleUrl: './scss/mfp-tab-group.scss',
  shadow: true,
})
export class MfpTabGroup {
  // Own Properties
  // ====================

  private debouncedMfpChange: TDebounce<{ value: string; target: HTMLMfpTabElement }>;

  // Reference to host HTML element
  // ===================================

  @Element() el!: HTMLMfpTabGroupElement;

  // State() variables
  // Inlined decorator, alphabetical order
  // =======================================

  // Public Property API
  // ========================

  /** A string representing the id of the selected tab. */
  @Prop({ reflect: true, mutable: true }) value: string;

  /** The size of the tab */
  @Prop({ reflect: true }) size: TTabSize = 'medium';

  /** The direction that tab should be render */
  @Prop({ reflect: true }) orientation?: TTabOrientation = 'horizontal';

  /** The placement that tab should be render */
  @Prop({ reflect: true }) placement?: TTabPlacement = 'start';

  /** A number representing the delay value applied to mfpChange event handler */
  @Prop({ reflect: true, mutable: true }) debounceTime = 0;

  /** If true, the underline divider below the tabs won't be shown  */
  @Prop({ reflect: true }) disableDivider = false;

  // Prop lifecycle events
  // =======================

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

  @Watch('size')
  @Watch('value')
  @Watch('orientation')
  @Watch('placement')
  checkPropValues() {
    validatePropValue(TAB_SIZE, 'medium', this.el, 'size');
    validatePropValue(TAB_ORIENTATION, 'horizontal', this.el, 'orientation');
    validatePropValue(TAB_PLACEMENT, 'start', this.el, 'placement');

    this.mfpTabElements.forEach((mfpTabElement) => {
      mfpTabElement.size = this.size;
      mfpTabElement.orientation = this.orientation;
      mfpTabElement.placement = this.placement;
      mfpTabElement.active = !isNil(this.value) ? mfpTabElement.tabId === this.value : false;
    });
  }

  // Events section
  // Requires JSDocs for public API documentation
  // ==============================================

  /** Handler to be called when the tab value changes */
  @Event() mfpChange: EventEmitter<{ target: HTMLMfpTabElement; value: string }>;

  // Component lifecycle events
  // Ordered by their natural call order
  // =====================================

  componentWillLoad() {
    this.checkDebounceChange();
    this.checkPropValues();
  }

  componentDidLoad() {
    this.checkPropValues();
  }

  // Listeners
  // ==============

  @Listen('keyup', { target: 'body', passive: true, capture: true })
  onKeyUp(event: KeyboardEvent) {
    const { target } = event;
    if (!isHTMLElement(target, 'mfp-tab')) return;

    this.makeTabsFocusable();
  }

  @Listen('mfpClick', { passive: true })
  onMfpClick(event: CustomEvent<HTMLMfpTabElement>) {
    const { detail: target } = event;
    this.mfpTabElements.forEach((mfpTabElement) => (mfpTabElement.active = mfpTabElement === target));
    this.debouncedMfpChange({ value: target.tabId, target });
    this.selectTab(target);
  }

  @Listen('mfpKeyDown', { passive: true })
  async onMfpKeyDown(event: CustomEvent<KeyboardEvent>) {
    const { target } = event;

    // NOTE: ensures the target is an HTML element with the tag name 'mfp-tab'
    if (!isHTMLElement(target, 'mfp-tab')) return;

    const keyActions: { [key: string]: 'forward' | 'backward' } = {
      ArrowDown: 'forward',
      ArrowRight: 'forward',
      ArrowUp: 'backward',
      ArrowLeft: 'backward',
    };

    // NOTE: gets the direction based on key pressed
    const direction = keyActions[event.detail.key];

    if (!direction) return;

    await this.focusTabSibling(target, direction);
  }

  @Listen('mfpBlur', { capture: true, passive: true })
  onMfpBlur() {
    this.restoreTabsFocus();
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

  private focusTabSibling = async (
    currentTarget: HTMLMfpTabElement,
    direction: 'forward' | 'backward',
  ): Promise<void> => {
    let target: HTMLMfpTabElement | null = null;

    this.mfpTabElements.forEach((mfpTabElement, index, elements) => {
      mfpTabElement.active = false;

      if (mfpTabElement === currentTarget) {
        target = getNextElement(elements, index, direction);
      }
    });

    if (target) {
      await target.vFocus();
      this.selectTab(target);
    }
  };

  private makeTabsFocusable = (): void => {
    this.mfpTabElements.forEach((mfpTabElement) => {
      if (mfpTabElement.disabled) return;

      /**
       * This is a "fire and forget" operation. The callback itself doesn't do anything special
       * with the asynchronous code (doesn't await it or do anything with the result)
       * Details: https://stackoverflow.com/a/63488201
       */
      (async () => {
        await mfpTabElement.enableFocus(true);
      })();
    });
  };

  private restoreTabsFocus = (): void => {
    this.mfpTabElements.forEach((mfpTabElement) => {
      if (mfpTabElement.disabled || mfpTabElement.active) return;

      /** @See line #173 */
      (async () => {
        await mfpTabElement.enableFocus(false);
      })();
    });
  };

  private get mfpTabElements(): HTMLMfpTabElement[] {
    return Array.from(this.el.querySelectorAll('mfp-tab'));
  }

  private selectTab = (target: HTMLMfpTabElement): void => {
    const { tabId } = target;
    target.active = true;
    this.value = tabId;
    this.debouncedMfpChange({ value: tabId, target });
  };

  // render() function
  // Always the last one in the class.
  // ===================================

  render() {
    return (
      <Host class={{ 'inline-block': this.orientation === 'vertical' }}>
        <div
          class={{
            [`mfp-tab-group mfp-tab-group--${this.orientation}-${this.placement} flex is-full`]: true,
            'no-divider': this.disableDivider,
          }}
          part="base"
        >
          <div
            class={{
              'mfp-tab-group--container flex overflow-x-auto': true,
              'flex-col': this.orientation !== 'horizontal',
            }}
            role="tablist"
            part="tabs"
          >
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
