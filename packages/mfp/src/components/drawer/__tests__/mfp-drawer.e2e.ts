import { newE2EPage } from '@stencil/core/testing';

describe('mfp-drawer', () => {
  it('should render', async () => {
    const page = await newE2EPage({
      html: '<mfp-drawer></mfp-drawer>',
    });
    const element = await page.find('mfp-drawer');

    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage({
      html: '<mfp-drawer></mfp-drawer>',
    });
    const element = await page.find('mfp-drawer');

    expect(element.shadowRoot).not.toBeNull();
  });

  it('should render as hidden', async () => {
    const page = await newE2EPage({
      html: `<mfp-drawer></mfp-drawer>`,
    });

    const element = await page.find('mfp-drawer >>> [part="panel"]');
    expect(element).toEqualAttribute('aria-hidden', 'true');
  });

  it('should render as hidden with `open="false"`', async () => {
    const page = await newE2EPage({
      html: `<mfp-drawer open="false"></mfp-drawer>`,
    });

    const element = await page.find('mfp-drawer >>> [part="panel"]');
    expect(element).toEqualAttribute('aria-hidden', 'true');
  });

  it('should render as open', async () => {
    const page = await newE2EPage({
      html: `<mfp-drawer open></mfp-drawer>`,
    });

    const element = await page.find('mfp-drawer >>> [part="panel"]');
    expect(element).toEqualAttribute('aria-hidden', 'false');
    expect(element).not.toHaveClass('hidden');
  });

  it('should render as open with `open="true"`', async () => {
    const page = await newE2EPage({
      html: `<mfp-drawer open="true"></mfp-drawer>`,
    });

    const element = await page.find('mfp-drawer >>> [part="panel"]');
    expect(element).toEqualAttribute('aria-hidden', 'false');
    expect(element).not.toHaveClass('hidden');
  });

  it('should display drawer title', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-drawer>
          <div slot="title">Drawer Title</div>
        </mfp-drawer>
      `,
    });

    const element = await page.find('mfp-drawer');
    expect(element).toEqualText('Drawer Title');
  });

  it('should render basic body drawer slot', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-drawer>
          <div slot>Slot</div>
        </mfp-drawer>
      `,
    });

    const description = await page.find('mfp-drawer >>> slot');
    expect(description).not.toBeNull();
  });

  it('should render footer drawer slot', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-drawer>
          <div slot="footer">Footer slot</div>
        </mfp-drawer>
      `,
    });

    const description = await page.find('mfp-drawer >>> slot[name="footer"]');
    expect(description).not.toBeNull();
  });

  it('should call `show` method', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-drawer>
          <div slot="title">Drawer Title</div>
        </mfp-drawer>
      `,
    });

    const closedDrawer = await page.find('mfp-drawer >>> [part="panel"]');
    expect(closedDrawer.getAttribute('aria-hidden')).toBe('true');
    expect(closedDrawer).toHaveAttribute('hidden');

    await page.$eval('mfp-drawer', async (elem: HTMLMfpDrawerElement) => {
      await elem.show();
    });
    await page.waitForChanges();

    const openDrawer = await page.find('mfp-drawer >>> [part="panel"]');
    expect(openDrawer.getAttribute('aria-hidden')).toBe('false');
    expect(openDrawer).not.toHaveAttribute('hidden');
  });

  it('should call `hide` method', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-drawer open>
          <div slot="title">Drawer Title</div>
        </mfp-drawer>
      `,
    });

    const openDrawer = await page.find('mfp-drawer >>> [part="panel"]');
    expect(openDrawer.getAttribute('aria-hidden')).toBe('false');
    expect(openDrawer).not.toHaveAttribute('hidden');

    await page.$eval('mfp-drawer', async (elem: HTMLMfpDrawerElement) => {
      await elem.hide();
    });
    await page.waitForChanges();

    const closedDrawer = await page.find('mfp-drawer >>> [part="panel"]');
    expect(closedDrawer.getAttribute('aria-hidden')).toBe('true');
    expect(closedDrawer).toHaveAttribute('hidden');
  });
});
