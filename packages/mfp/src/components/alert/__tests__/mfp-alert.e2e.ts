import { newE2EPage } from '@stencil/core/testing';

describe('mfp-alert', () => {
  it('should render', async () => {
    const page = await newE2EPage({
      html: `<mfp-alert></mfp-alert>`,
    });

    const element = await page.find('mfp-alert');
    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage({
      html: `<mfp-alert></mfp-alert>`,
    });

    const element = await page.find('mfp-alert');
    expect(element.shadowRoot).not.toBeNull();
  });

  it('should render as hidden', async () => {
    const page = await newE2EPage({
      html: `<mfp-alert></mfp-alert>`,
    });

    const element = await page.find('mfp-alert');
    expect(element).toEqualAttribute('aria-hidden', 'true');
    expect(element).toHaveClass('is-hidden');
  });

  it('should render as hidden with `open="false"`', async () => {
    const page = await newE2EPage({
      html: `<mfp-alert open="false"></mfp-alert>`,
    });

    const element = await page.find('mfp-alert');
    expect(element).toEqualAttribute('aria-hidden', 'true');
    expect(element).toHaveClass('is-hidden');
  });

  it('should render as open', async () => {
    const page = await newE2EPage({
      html: `<mfp-alert open></mfp-alert>`,
    });

    const element = await page.find('mfp-alert');
    expect(element).not.toEqualAttribute('aria-hidden', 'true');
    expect(element).not.toHaveClass('is-hidden');
  });

  it('should render as open with `open="true"`', async () => {
    const page = await newE2EPage({
      html: `<mfp-alert open="true"></mfp-alert>`,
    });

    const element = await page.find('mfp-alert');
    expect(element).not.toEqualAttribute('aria-hidden', 'true');
    expect(element).not.toHaveClass('is-hidden');
  });

  it('should render basic alert', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-alert>
          Alert title
          <span slot="body">You have a new alert message</span>
        </mfp-alert>
      `,
    });

    const description = await page.find('mfp-alert >>> slot[name="body"]');
    expect(description).not.toBeNull();
  });

  it('should show alert with icon', async () => {
    const page = await newE2EPage({
      html: `<mfp-alert type="info">Alert title</mfp-alert>`,
    });

    const iconHolder = await page.find('mfp-alert >>> [part="icon-outline"]');
    expect(iconHolder).not.toBeNull();
  });

  it('should show alert with close button', async () => {
    const page = await newE2EPage({
      html: `<mfp-alert type="info">Alert title</mfp-alert>`,
    });

    const iconHolder = await page.find('mfp-alert >>> [part="btn-close"]');
    expect(iconHolder).not.toBeNull();
  });

  it('should show alert footer', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-alert>
          Alert title
          <div slot="footer">
            <mfp-button appearance="primary" type="button" variant="standard">Button</mfp-button>
            <mfp-button appearance="secondary" variant="standard">Button</mfp-button>
          </div>
        </mfp-alert>
     `,
    });

    const footerSlot = await page.find('mfp-alert >>> slot[name="footer"]');
    expect(footerSlot).not.toBeNull();
  });

  it('should call methods', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-alert>
          Alert title
          <span slot="body">You have a new alert message</span>
        </mfp-alert>
      `,
    });

    await page.$eval('mfp-alert', async (elem: HTMLMfpAlertElement) => {
      await elem.show();
    });
    await page.waitForChanges();

    const visibleAlert = await page.find('mfp-alert');
    expect(visibleAlert).toEqualAttribute('aria-hidden', 'false');
    expect(visibleAlert).toEqualAttribute('hidden', 'false');

    await page.$eval('mfp-alert', async (elem: HTMLMfpAlertElement) => {
      await elem.hide();
    });
    await page.waitForChanges();

    const hiddenAlert = await page.find('mfp-alert');
    expect(hiddenAlert).toEqualAttribute('aria-hidden', 'true');
    expect(hiddenAlert).toEqualAttribute('hidden', 'true');
  });
});
