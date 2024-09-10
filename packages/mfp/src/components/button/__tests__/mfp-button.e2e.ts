import { newE2EPage } from '@stencil/core/testing';

import { computedStyle, setProperties } from '../../../shared/test-utils';

describe('mfp-button', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-button>Button</mfp-button>');

    const element = await page.find('mfp-button');

    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-button>Button</mfp-button>');

    const element = await page.find('mfp-button');

    expect(element.shadowRoot).not.toBeNull();
  });

  it('should render <a> tag', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-button href="https://www.example.com">Button</mfp-button>');

    const element = await page.find('mfp-button >>> [part="button"]');

    expect(element.tagName.toLocaleLowerCase()).toBe('a');
  });

  it('should trigger mfpClick', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-button>Button</mfp-button>');

    const mfpFocus = await page.spyOnEvent('mfpFocus');
    const mfpClick = await page.spyOnEvent('mfpClick');
    const mfpBlur = await page.spyOnEvent('mfpBlur');

    const element = await page.find('mfp-button >>> [part="button"]');

    await element.click();

    expect(mfpFocus).toHaveReceivedEventTimes(1);
    expect(mfpClick).toHaveReceivedEventTimes(1);
    expect(mfpBlur).toHaveReceivedEventTimes(0);
  });

  it('should be keyboard accessible', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-button>Button<mfp-button><mfp-button>Button</mfp-button>');

    const mfpFocus = await page.spyOnEvent('mfpFocus');
    const mfpClick = await page.spyOnEvent('mfpClick');
    const mfpBlur = await page.spyOnEvent('mfpBlur');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const focusedTagName = await page.evaluate(() => document.activeElement.tagName.toLocaleLowerCase());

    expect(mfpFocus).toHaveReceivedEventTimes(2);
    expect(mfpClick).toHaveReceivedEventTimes(0);
    expect(mfpBlur).toHaveReceivedEventTimes(1);
    expect(focusedTagName).toEqual('mfp-button');
  });

  it('should handle `disabled` property', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-button disabled>Button</mfp-button>');

    const mfpFocus = await page.spyOnEvent('mfpFocus');
    const mfpClick = await page.spyOnEvent('mfpClick');
    const mfpBlur = await page.spyOnEvent('mfpBlur');

    const element = await page.waitForSelector('mfp-button');
    await element.click();

    expect(mfpFocus).toHaveReceivedEventTimes(0);
    expect(mfpClick).toHaveReceivedEventTimes(0);
    expect(mfpBlur).toHaveReceivedEventTimes(0);
  });

  it('should render prefix element', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-button><span slot="prefix">Prefix text</span>Button</mfp-button>');

    const prefixText = await page.$eval('mfp-button', (element) => {
      const slotElement = element.shadowRoot.querySelector('slot[name="prefix"]');
      const assignedElements = (slotElement as HTMLSlotElement).assignedElements({ flatten: true })[0];

      return assignedElements.textContent;
    });

    expect(prefixText).toBe('Prefix text');
  });

  it('should render suffix element', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-button><span slot="suffix">Suffix text</span>Button</mfp-button>');

    const suffixText = await page.$eval('mfp-button', (element) => {
      const slotElement = element.shadowRoot.querySelector('slot[name="suffix"]');
      const assignedElements = (slotElement as HTMLSlotElement).assignedElements({ flatten: true })[0];

      return assignedElements.textContent;
    });

    expect(suffixText).toEqualText('Suffix text');
  });

  it('should render loading indicator', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-button loading>Button</mfp-button>');

    const spinnerIcon = await page.find('mfp-button >>> mfp-icon[name="spinner-gap"]');

    expect(spinnerIcon).toBeDefined();
  });

  it('should respect design style', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <mfp-button size="small">Button</mfp-button>
      <mfp-button size="medium">Button</mfp-button>
      <mfp-button size="large">Button</mfp-button>
    `);

    const styleProps = ['height', 'padding'] as const;

    const smallStyle = await computedStyle(page, 'mfp-button[size="small"] >>> [part="button"]', styleProps);
    const mediumStyle = await computedStyle(page, 'mfp-button[size="medium"] >>> [part="button"]', styleProps);
    const largeStyle = await computedStyle(page, 'mfp-button[size="large"] >>> [part="button"]', styleProps);

    expect(smallStyle).toEqual({ height: '32px', padding: '4px 8px' });
    expect(mediumStyle).toEqual({ height: '48px', padding: '12px 16px' });
    expect(largeStyle).toEqual({ height: '56px', padding: '16px 24px' });
  });

  it('should handle invalid properties', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<mfp-button size="small" appearance="secondary" type="submit" variant="ghost">Button</mfp-button>',
    );

    const console: jest.Mock<void, string[]> = jest.fn();
    page.on('console', (message) => console(message.type(), message.text()));

    expect(
      await setProperties(page, 'mfp-button', {
        // @ts-expect-error we're testing that component is handling invalid properties
        type: 'invalid',
        // @ts-expect-error we're testing that component is handling invalid properties
        size: 'invalid',
        // @ts-expect-error we're testing that component is handling invalid properties
        variant: 'invalid',
        // @ts-expect-error we're testing that component is handling invalid properties
        appearance: 'invalid',
      }),
    ).toEqual({
      type: 'button',
      size: 'medium',
      variant: 'standard',
      appearance: 'primary',
    });
    expect(console).toHaveBeenCalledTimes(4);
    expect(console).toHaveBeenCalledWith(
      'warn',
      '[BQ-BUTTON] Please notice that "appearance" should be one of primary|secondary|link|text',
    );
    expect(console).toHaveBeenCalledWith(
      'warn',
      '[BQ-BUTTON] Please notice that "type" should be one of button|submit|reset',
    );
    expect(console).toHaveBeenCalledWith(
      'warn',
      '[BQ-BUTTON] Please notice that "size" should be one of small|medium|large',
    );
    expect(console).toHaveBeenCalledWith(
      'warn',
      '[BQ-BUTTON] Please notice that "variant" should be one of standard|ghost|danger',
    );
  });

  it('should behave as submit button', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <form id="formId">
        <input type="text" name="test" value="test-value" />
        <mfp-button type="submit" form-id="formId">Button</mfp-button>
      </form>
    `);

    const form = await page.find('form');
    const spy = await form.spyOnEvent('submit');

    await (await page.find('mfp-button')).click();

    expect(spy).toHaveReceivedEvent();
  });

  it('should behave as reset button', async () => {
    const page = await newE2EPage();

    function getInputValue() {
      return page.$eval('input', (input) => input.value);
    }

    await page.setContent(`
      <form id="formId">
        <input type="text" name="test" value="test" />
        <mfp-button type="reset" form-id="formId">Button</mfp-button>
      </form>
    `);

    await page.type('input', 'value ');

    const inputValue = await getInputValue();

    await (await page.find('mfp-button')).click();

    expect(inputValue).toBe('value test');
    expect(await getInputValue()).toBe('test');
  });
});
