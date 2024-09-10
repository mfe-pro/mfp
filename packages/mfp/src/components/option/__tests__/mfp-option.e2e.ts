import { newE2EPage } from '@stencil/core/testing';

describe('mfp-option', () => {
  it('should render', async () => {
    const page = await newE2EPage({
      html: '<mfp-option>Option label</mfp-option>',
    });
    const element = await page.find('mfp-option');

    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage({
      html: '<mfp-option>Option label</mfp-option>',
    });
    const element = await page.find('mfp-option');

    expect(element.shadowRoot).not.toBeNull();
  });

  it('should display text', async () => {
    const text = 'Option label';
    const page = await newE2EPage({
      html: `<mfp-option>${text}</mfp-option>`,
    });
    const element = await page.find('mfp-option');

    expect(element).toEqualText(text);
  });

  it('should trigger mfpClick', async () => {
    const page = await newE2EPage({
      html: '<mfp-option>Option label</mfp-option>',
    });

    const mfpFocus = await page.spyOnEvent('mfpFocus');
    const mfpBlur = await page.spyOnEvent('mfpBlur');
    const mfpClick = await page.spyOnEvent('mfpClick');

    const element = await page.find('mfp-option');
    await element.click();

    expect(mfpFocus).toHaveReceivedEventTimes(1);
    expect(mfpBlur).toHaveReceivedEventTimes(0);
    expect(mfpClick).toHaveReceivedEventTimes(1);
  });

  it('should be keyboard accessible', async () => {
    const page = await newE2EPage({
      html: '<mfp-option>Option label</mfp-option>',
    });

    const mfpFocus = await page.spyOnEvent('mfpFocus');
    const mfpBlur = await page.spyOnEvent('mfpBlur');
    const mfpClick = await page.spyOnEvent('mfpClick');
    await page.keyboard.press('Tab');

    expect(mfpFocus).toHaveReceivedEventTimes(1);
    expect(mfpClick).toHaveReceivedEventTimes(0);
    expect(mfpBlur).toHaveReceivedEventTimes(0);
  });

  it('should handle Enter', async () => {
    const page = await newE2EPage({
      html: '<mfp-option>Option label</mfp-option>',
    });

    const mfpFocus = await page.spyOnEvent('mfpFocus');
    const mfpBlur = await page.spyOnEvent('mfpBlur');
    const mfpClick = await page.spyOnEvent('mfpClick');
    const mfpEnter = await page.spyOnEvent('mfpEnter');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    expect(mfpFocus).toHaveReceivedEventTimes(1);
    expect(mfpClick).toHaveReceivedEventTimes(0);
    expect(mfpBlur).toHaveReceivedEventTimes(0);
    expect(mfpEnter).toHaveReceivedEventTimes(1);
  });

  it('should handle `disabled` property', async () => {
    const page = await newE2EPage({
      html: '<mfp-option disabled="true">Option label</mfp-option>',
    });
    const mfpFocus = await page.spyOnEvent('mfpFocus');
    const mfpBlur = await page.spyOnEvent('mfpBlur');
    const mfpClick = await page.spyOnEvent('mfpClick');

    await page.$eval('mfp-option', async (elem: HTMLMfpOptionElement) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Property 'click' does not exist on type 'Element'.
      elem.shadowRoot.querySelector('div[part="base"]').click();
    });
    await page.waitForChanges();

    expect(mfpFocus).toHaveReceivedEventTimes(0);
    expect(mfpClick).toHaveReceivedEventTimes(0);
    expect(mfpBlur).toHaveReceivedEventTimes(0);
  });

  it('should render prefix element', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <mfp-option value="option1">
        <span slot="prefix">Prefix</span>
        <span>Option label</span>
      </mfp-option>
    `);

    const prefixText = await page.$eval('mfp-option', (element) => {
      const slotElement = element.shadowRoot.querySelector('slot[name="prefix"]');
      const assignedElements = (slotElement as HTMLSlotElement).assignedElements({ flatten: true })[0];

      return assignedElements.textContent;
    });

    expect(prefixText).toBe('Prefix');
  });

  it('should render suffix element', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-option value="option1">
          <span>Option label</span>
          <span slot="suffix">Suffix</span>
        </mfp-option>
      `,
    });

    const suffixText = await page.$eval('mfp-option', (element) => {
      const slotElement = element.shadowRoot.querySelector('slot[name="suffix"]');
      const assignedElements = (slotElement as HTMLSlotElement).assignedElements({ flatten: true })[0];

      return assignedElements.textContent;
    });

    expect(suffixText).toEqualText('Suffix');
  });

  it('should handle `selected` property', async () => {
    const page = await newE2EPage({
      html: '<mfp-option selected="true">Option 1</mfp-option>',
    });

    const mfpOption = await page.find('mfp-option >>> div');

    expect(mfpOption).toHaveClass('active');
  });
});
