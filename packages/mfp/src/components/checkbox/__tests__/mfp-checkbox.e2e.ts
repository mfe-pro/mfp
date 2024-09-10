import { newE2EPage } from '@stencil/core/testing';

import { computedStyle } from '../../../shared/test-utils';

describe('mfp-checkbox', () => {
  it('should render', async () => {
    const page = await newE2EPage({
      html: '<mfp-checkbox></mfp-checkbox>',
    });

    const element = await page.find('mfp-checkbox');
    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage({
      html: '<mfp-checkbox></mfp-checkbox>',
    });

    const element = await page.find('mfp-checkbox');
    expect(element.shadowRoot).not.toBeNull();
  });

  it('should display text', async () => {
    const page = await newE2EPage({
      html: '<mfp-checkbox><p>Label</p></mfp-checkbox>',
    });

    const labelText = await page.$eval('mfp-checkbox', (element) => {
      const slotElement = element.shadowRoot.querySelector('slot');
      const assignedElements = slotElement.assignedElements({ flatten: true })[0];

      return assignedElements.textContent;
    });
    expect(labelText).toEqualText('Label');
  });

  it('should be keyboard accessible', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-checkbox>Checkbox</mfp-checkbox>
        <mfp-checkbox>Checkbox 1</mfp-checkbox>
      `,
    });

    const mfpFocus = await page.spyOnEvent('mfpFocus');
    const mfpChange = await page.spyOnEvent('mfpChange');
    const mfpBlur = await page.spyOnEvent('mfpBlur');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const focusedTagName = await page.evaluate(() => document.activeElement.tagName.toLocaleLowerCase());

    expect(mfpFocus).toHaveReceivedEventTimes(2);
    expect(mfpChange).toHaveReceivedEventTimes(0);
    expect(mfpBlur).toHaveReceivedEventTimes(1);
    expect(focusedTagName).toEqual('mfp-checkbox');
  });

  it('should not be checked by default', async () => {
    const page = await newE2EPage({
      html: '<mfp-checkbox>Label</mfp-checkbox>',
    });

    const checkMark = await page.find('mfp-checkbox >>> [part="checkbox"]');

    expect(checkMark.innerHTML).toBe('');
  });

  it('should render check mark', async () => {
    const page = await newE2EPage({
      html: '<mfp-checkbox>Label</mfp-checkbox>',
    });

    const mfpChange = await page.spyOnEvent('mfpChange');
    const element = await page.find('mfp-checkbox >>> [part="input"]');

    await element.click();

    const checkMark = await page.find('mfp-checkbox >>> [part="checkbox"]');
    expect(mfpChange).toHaveReceivedEventTimes(1);
    expect(checkMark.innerHTML).not.toBe('');
  });

  it('should render indeterminate', async () => {
    const page = await newE2EPage({
      html: '<mfp-checkbox indeterminate>Label</mfp-checkbox>',
    });

    const indeterminateMark = await page.find('mfp-checkbox >>> [part="checkbox"]');
    expect(indeterminateMark.innerHTML).not.toBe('');
  });

  it('should respect design style', async () => {
    const page = await newE2EPage({
      html: '<mfp-checkbox>Label</mfp-checkbox>',
    });

    const baseStyle = await computedStyle(page, 'mfp-checkbox >>> [part="base"]', ['height']);
    const checkboxStyle = await computedStyle(page, 'mfp-checkbox >>> [part="checkbox"]', [
      'borderWidth',
      'borderRadius',
    ]);

    expect(baseStyle).toEqual({ height: '40px' });
    expect(checkboxStyle).toEqual({ borderWidth: '2px', borderRadius: '4px' });
  });
});
