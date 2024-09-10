import { newE2EPage } from '@stencil/core/testing';

describe('mfp-breadcrumb', () => {
  it('should render', async () => {
    const page = await newE2EPage({
      html: '<mfp-breadcrumb></mfp-breadcrumb>',
    });

    const element = await page.find('mfp-breadcrumb');
    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage({
      html: '<mfp-breadcrumb></mfp-breadcrumb>',
    });

    const element = await page.find('mfp-breadcrumb');
    expect(element.shadowRoot).not.toBeNull();
  });

  it('should trigger mfpBreadcrumbClick', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-breadcrumb>
          <mfp-breadcrumb-item>Home</mfp-breadcrumb-item>
        </mfp-breadcrumb>
      `,
    });

    const mfpBlur = await page.spyOnEvent('mfpBreadcrumbBlur');
    const mfpFocus = await page.spyOnEvent('mfpBreadcrumbFocus');
    const mfpClick = await page.spyOnEvent('mfpBreadcrumbClick');
    const element = await page.find('mfp-breadcrumb-item');

    await element.click();

    expect(mfpFocus).toHaveReceivedEventTimes(1);
    expect(mfpClick).toHaveReceivedEventTimes(1);
    expect(mfpBlur).toHaveReceivedEventTimes(0);
  });

  it('should be keyboard accessible', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-breadcrumb>
          <mfp-breadcrumb-item>Home</mfp-breadcrumb-item>
        </mfp-breadcrumb>
      `,
    });

    const mfpBlur = await page.spyOnEvent('mfpBreadcrumbBlur');
    const mfpFocus = await page.spyOnEvent('mfpBreadcrumbFocus');
    const mfpClick = await page.spyOnEvent('mfpBreadcrumbClick');

    await page.keyboard.press('Tab');

    expect(mfpFocus).toHaveReceivedEventTimes(1);
    expect(mfpClick).toHaveReceivedEventTimes(0);
    expect(mfpBlur).toHaveReceivedEventTimes(0);
  });

  it('should trigger mfpBreadcrumbClick on Enter', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-breadcrumb>
          <mfp-breadcrumb-item>Home</mfp-breadcrumb-item>
        </mfp-breadcrumb>
      `,
    });

    const mfpBlur = await page.spyOnEvent('mfpBreadcrumbBlur');
    const mfpFocus = await page.spyOnEvent('mfpBreadcrumbFocus');
    const mfpClick = await page.spyOnEvent('mfpBreadcrumbClick');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    expect(mfpFocus).toHaveReceivedEventTimes(1);
    expect(mfpClick).toHaveReceivedEventTimes(1);
    expect(mfpBlur).toHaveReceivedEventTimes(0);
  });

  it('should render custom separator ', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-breadcrumb>
          <mfp-icon name="caret-right" slot="separator" size="12"></mfp-icon>
          <mfp-breadcrumb-item>
            <mfp-icon name="house-line" size="16"></mfp-icon>
            <span>Home</span>
          </mfp-breadcrumb-item>
          <mfp-breadcrumb-item>Application Center</mfp-breadcrumb-item>
        </mfp-breadcrumb>
      `,
    });

    const separator = await page.find('mfp-breadcrumb mfp-icon[slot="separator"]');
    expect(separator).toBeDefined();
  });
});
