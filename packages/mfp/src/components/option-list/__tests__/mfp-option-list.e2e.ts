import { newE2EPage } from '@stencil/core/testing';

describe('mfp-option-list', () => {
  it('should render', async () => {
    const page = await newE2EPage({
      html: `<mfp-option-list></mfp-option-list>`,
    });

    const element = await page.find('mfp-option-list');

    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage({
      html: `<mfp-option-list></mfp-option-list>`,
    });

    const element = await page.find('mfp-option-list');

    expect(element.shadowRoot).not.toBeNull();
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage({
      html: `<mfp-option-list></mfp-option-list>`,
    });

    const element = await page.find('mfp-option-list');

    expect(element.shadowRoot).not.toBeNull();
  });

  it('should trigger mfpSelect on click', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-option-list>
          <mfp-option></mfp-option>
        </mfp-option-list>
      `,
    });

    const mfpSelect = await page.spyOnEvent('mfpSelect');
    const element = await page.find('mfp-option');

    await element.click();

    expect(mfpSelect).toHaveReceivedEventTimes(1);
  });

  it('should trigger mfpSelect on Enter', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-option-list>
          <mfp-option></mfp-option>
        </mfp-option-list>
      `,
    });

    const mfpSelect = await page.spyOnEvent('mfpSelect');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    expect(mfpSelect).toHaveReceivedEventTimes(1);
  });
});
