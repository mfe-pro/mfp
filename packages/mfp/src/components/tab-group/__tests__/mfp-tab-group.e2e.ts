import { newE2EPage } from '@stencil/core/testing';

describe('mfp-tab-group', () => {
  it('should render', async () => {
    const page = await newE2EPage({
      html: `
    <mfp-tab-group value="1">
      <mfp-tab tab-id="1">Tab 1</mfp-tab>
      <mfp-tab tab-id="2">Tab 2</mfp-tab>
    </mfp-tab-group>
    `,
    });

    const element = await page.find('mfp-tab-group');

    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage({
      html: `
    <mfp-tab-group value="1">
      <mfp-tab tab-id="1">Tab 1</mfp-tab>
      <mfp-tab tab-id="2">Tab 2</mfp-tab>
    </mfp-tab-group>
    `,
    });

    const element = await page.find('mfp-tab-group');

    expect(element.shadowRoot).not.toBeNull();
  });

  it('should change size of all tabs', async () => {
    const page = await newE2EPage({
      html: `
    <mfp-tab-group value="1" size="medium">
      <mfp-tab tab-id="1">Tab 1</mfp-tab>
      <mfp-tab tab-id="2">Tab 2</mfp-tab>
    </mfp-tab-group>
    `,
    });

    const element = await page.find('mfp-tab');

    expect(await element.getProperty('size')).toBe('medium');
  });

  it('should emit mfpChange on tab click', async () => {
    const page = await newE2EPage({
      html: `
    <mfp-tab-group value="1">
      <mfp-tab tab-id="1">Tab 1</mfp-tab>
      <mfp-tab tab-id="2">Tab 2</mfp-tab>
    </mfp-tab-group>
    `,
    });

    const mfpFocus = await page.spyOnEvent('mfpFocus');
    const mfpChange = await page.spyOnEvent('mfpChange');
    const mfpBlur = await page.spyOnEvent('mfpBlur');

    const element = await page.find('mfp-tab');
    await element.click();

    expect(mfpFocus).toHaveReceivedEventTimes(1);
    expect(mfpChange).toHaveReceivedEventTimes(1);
    expect(mfpBlur).toHaveReceivedEventTimes(0);
  });

  it('should emit mfpChange on keyboard navigation', async () => {
    const page = await newE2EPage({
      html: `
    <mfp-tab-group value="1">
      <mfp-tab tab-id="1">Tab 1</mfp-tab>
      <mfp-tab tab-id="2">Tab 2</mfp-tab>
      <mfp-tab tab-id="3">Tab 3</mfp-tab>
      <mfp-tab tab-id="4">Tab 4</mfp-tab>
    </mfp-tab-group>
    `,
    });

    const mfpFocus = await page.spyOnEvent('mfpFocus');
    const mfpChange = await page.spyOnEvent('mfpChange');
    const mfpBlur = await page.spyOnEvent('mfpBlur');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Tab');

    expect(mfpFocus).toHaveReceivedEventTimes(4);
    expect(mfpChange).toHaveReceivedEventTimes(3);
    expect(mfpBlur).toHaveReceivedEventTimes(4);
  });

  it('should change active tab if value is change externally', async () => {
    const page = await newE2EPage({
      html: `
    <mfp-tab-group value="1">
      <mfp-tab tab-id="1">Tab 1</mfp-tab>
      <mfp-tab tab-id="2">Tab 2</mfp-tab>
      <mfp-tab tab-id="3">Tab 3</mfp-tab>
      <mfp-tab tab-id="4">Tab 4</mfp-tab>
    </mfp-tab-group>
      `,
    });

    const element = await page.find('mfp-tab-group');
    element.setAttribute('value', '2');

    await page.waitForChanges();

    const activeElement = await page.find('mfp-tab[active]');

    expect(activeElement).toEqualText('Tab 2');
  });
});
