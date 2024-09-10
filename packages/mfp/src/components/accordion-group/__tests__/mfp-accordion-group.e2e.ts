import { newE2EPage } from '@stencil/core/testing';

describe('mfp-accordion-group', () => {
  it('should render', async () => {
    const page = await newE2EPage({
      html: `
      <mfp-accordion-group>
        <mfp-accordion></mfp-accordion>
        <mfp-accordion></mfp-accordion>
      </mfp-accordion-group>
      `,
    });

    const element = await page.find('mfp-accordion-group');

    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage({
      html: `
      <mfp-accordion-group>
        <mfp-accordion></mfp-accordion>
        <mfp-accordion></mfp-accordion>
      </mfp-accordion-group>
      `,
    });

    const element = await page.find('mfp-accordion-group');

    expect(element.shadowRoot).not.toBeNull();
  });

  it('should expand all accordions', async () => {
    const page = await newE2EPage({
      html: `
      <mfp-accordion-group expand-all>
        <mfp-accordion></mfp-accordion>
        <mfp-accordion></mfp-accordion>
        <mfp-accordion></mfp-accordion>
      </mfp-accordion-group>
      `,
    });

    const elements = await page.findAll('mfp-accordion[expanded]');

    expect(elements).toHaveLength(3);
  });

  it('should colapse all accordions', async () => {
    const page = await newE2EPage({
      html: `
      <mfp-accordion-group expand-all>
        <mfp-accordion></mfp-accordion>
        <mfp-accordion></mfp-accordion>
        <mfp-accordion></mfp-accordion>
      </mfp-accordion-group>
      `,
    });

    const element = await page.find('mfp-accordion-group');
    element.setProperty('expandAll', false);
    await page.waitForChanges();

    const elements = await page.findAll('mfp-accordion[expanded]');

    expect(elements).toHaveLength(0);
  });

  it('should change appearance to all accordions', async () => {
    const page = await newE2EPage({
      html: `
      <mfp-accordion-group>
        <mfp-accordion></mfp-accordion>
        <mfp-accordion></mfp-accordion>
        <mfp-accordion></mfp-accordion>
      </mfp-accordion-group>
      `,
    });

    expect(await page.findAll('mfp-accordion[appearance="ghost"]')).toHaveLength(0);

    const element = await page.find('mfp-accordion-group');
    element.setProperty('appearance', 'ghost');
    await page.waitForChanges();

    expect(await page.findAll('mfp-accordion[appearance="ghost"]')).toHaveLength(3);
  });

  it('should change size to all accordions', async () => {
    const page = await newE2EPage({
      html: `
      <mfp-accordion-group>
        <mfp-accordion></mfp-accordion>
        <mfp-accordion></mfp-accordion>
        <mfp-accordion></mfp-accordion>
      </mfp-accordion-group>
      `,
    });

    expect(await page.findAll('mfp-accordion[size="small"]')).toHaveLength(0);

    const element = await page.find('mfp-accordion-group');
    element.setProperty('size', 'small');
    await page.waitForChanges();

    expect(await page.findAll('mfp-accordion[size="small"]')).toHaveLength(3);
  });

  it('should emit mfpClick on accordion click', async () => {
    const page = await newE2EPage({
      html: `
      <mfp-accordion-group>
        <mfp-accordion></mfp-accordion>
        <mfp-accordion></mfp-accordion>
        <mfp-accordion></mfp-accordion>
      </mfp-accordion-group>
      `,
    });

    const mfpFocus = await page.spyOnEvent('mfpFocus');
    const mfpClick = await page.spyOnEvent('mfpClick');
    const mfpBlur = await page.spyOnEvent('mfpBlur');

    const element = await page.find('mfp-accordion');
    await element.click();

    expect(await element.getProperty('expanded')).toBe(true);
    expect(mfpFocus).toHaveReceivedEventTimes(1);
    expect(mfpClick).toHaveReceivedEventTimes(1);
    expect(mfpBlur).toHaveReceivedEventTimes(0);
  });

  it('should have only one accordion expanded', async () => {
    const page = await newE2EPage({
      html: `
      <mfp-accordion-group expand-all>
        <mfp-accordion></mfp-accordion>
        <mfp-accordion></mfp-accordion>
        <mfp-accordion></mfp-accordion>
      </mfp-accordion-group>
      `,
    });

    const mfpFocus = await page.spyOnEvent('mfpFocus');
    const mfpClick = await page.spyOnEvent('mfpClick');
    const mfpBlur = await page.spyOnEvent('mfpBlur');

    await page.click('mfp-accordion', { count: 2 });
    await page.waitForChanges();

    const elements = await page.findAll('mfp-accordion[expanded]');

    expect(elements).toHaveLength(1);
    expect(mfpFocus).toHaveReceivedEventTimes(1);
    expect(mfpClick).toHaveReceivedEventTimes(2);
    expect(mfpBlur).toHaveReceivedEventTimes(0);
  });

  it('should be keyboard navigable', async () => {
    const page = await newE2EPage({
      html: `
      <mfp-accordion-group expand-all>
        <mfp-accordion></mfp-accordion>
        <mfp-accordion></mfp-accordion>
        <mfp-accordion></mfp-accordion>
      </mfp-accordion-group>
      `,
    });

    const mfpFocus = await page.spyOnEvent('mfpFocus');
    const mfpClick = await page.spyOnEvent('mfpClick');
    const mfpBlur = await page.spyOnEvent('mfpBlur');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const focusedTagName = await page.evaluate(() => document.activeElement.tagName.toLocaleLowerCase());

    expect(mfpFocus).toHaveReceivedEventTimes(3);
    expect(mfpClick).toHaveReceivedEventTimes(0);
    expect(mfpBlur).toHaveReceivedEventTimes(2);
    expect(focusedTagName).toEqual('mfp-accordion');
  });
});
