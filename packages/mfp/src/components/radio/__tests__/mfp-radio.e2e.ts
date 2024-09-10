import { newE2EPage } from '@stencil/core/testing';

import { computedStyle } from '../../../shared/test-utils';

describe('mfp-radio', () => {
  it('should render', async () => {
    const page = await newE2EPage({
      html: '<mfp-radio></mfp-radio>',
    });

    const element = await page.find('mfp-radio');
    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage({
      html: '<mfp-radio></mfp-radio>',
    });

    const element = await page.find('mfp-radio');
    expect(element.shadowRoot).not.toBeNull();
  });

  it('should display label', async () => {
    const page = await newE2EPage({
      html: '<mfp-radio><p>Label</p></mfp-radio>',
    });

    const labelText = await page.$eval('mfp-radio', (element) => {
      const slotElement = element.shadowRoot.querySelector('slot');
      const assignedElements = slotElement.assignedElements({ flatten: true })[0];

      return assignedElements.textContent;
    });
    expect(labelText).toEqualText('Label');
  });

  it('should check', async () => {
    const page = await newE2EPage({
      html: '<mfp-radio value="value" name="option">Label</mfp-radio>',
    });

    const mfpFocus = await page.spyOnEvent('mfpFocus');
    const mfpClick = await page.spyOnEvent('mfpClick');
    const mfpBlur = await page.spyOnEvent('mfpBlur');

    const element = await page.find('mfp-radio');

    await element.click();

    expect(mfpFocus).toHaveReceivedEventTimes(1);
    expect(mfpClick).toHaveReceivedEventTimes(1);

    await element.click();

    expect(mfpFocus).toHaveReceivedEventTimes(1);
    expect(mfpClick).toHaveReceivedEventTimes(2);
    expect(mfpBlur).toHaveReceivedEventTimes(0);
    expect(await page.$eval('mfp-radio', (mfpRadio) => mfpRadio.checked)).toBe(true);
  });

  it('should be keyboard accessible', async () => {
    const page = await newE2EPage({
      html: `
      <mfp-radio name="option" value="1">option 1</mfp-radio>
      <mfp-radio name="option" value="2">option 2</mfp-radio>
      <mfp-radio name="option" value="3">option 3</mfp-radio>
    `,
    });

    const mfpFocus = await page.spyOnEvent('mfpFocus');
    const mfpClick = await page.spyOnEvent('mfpClick');
    const mfpBlur = await page.spyOnEvent('mfpBlur');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const focusedTagName = await page.evaluate(() => document.activeElement.tagName.toLocaleLowerCase());

    expect(mfpFocus).toHaveReceivedEventTimes(2);
    expect(mfpClick).toHaveReceivedEventTimes(0);
    expect(mfpBlur).toHaveReceivedEventTimes(1);
    expect(focusedTagName).toEqual('mfp-radio');
  });

  it('should handle keydown', async () => {
    const page = await newE2EPage({
      html: '<mfp-radio name="option" value="1">option 1</mfp-radio>',
    });

    const mfpFocus = await page.spyOnEvent('mfpFocus');
    const mfpClick = await page.spyOnEvent('mfpClick');
    const mfpBlur = await page.spyOnEvent('mfpBlur');
    const mfpKeyDown = await page.spyOnEvent('mfpKeyDown');

    await page.keyboard.press('Tab');
    await page.keyboard.press('0');

    const focusedTagName = await page.evaluate(() => document.activeElement.tagName.toLocaleLowerCase());

    expect(mfpFocus).toHaveReceivedEventTimes(1);
    expect(mfpClick).toHaveReceivedEventTimes(0);
    expect(mfpBlur).toHaveReceivedEventTimes(0);
    expect(mfpKeyDown).toHaveReceivedEventTimes(1);
    expect(focusedTagName).toEqual('mfp-radio');
  });

  it('should respect design style', async () => {
    const page = await newE2EPage({
      html: '<mfp-radio name="option" value="1">option 1</mfp-radio>',
    });

    const style = await computedStyle(page, 'mfp-radio >>> [part="base"]', ['height', 'gap', 'borderRadius']);
    expect(style).toEqual({ height: '40px', gap: '8px', borderRadius: '8px' });
  });
});
