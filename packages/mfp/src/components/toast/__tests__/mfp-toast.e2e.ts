import { newE2EPage } from '@stencil/core/testing';

import { computedStyle } from '../../../shared/test-utils/computedStyle';

describe('mfp-toast', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-toast></mfp-toast>');

    const element = await page.find('mfp-toast');

    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-toast></mfp-toast>');

    const element = await page.find('mfp-toast');

    expect(element.shadowRoot).not.toBeNull();
  });

  it('should render as hidden', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-toast></mfp-toast>');

    const element = await page.find('mfp-toast');
    expect(element).toEqualAttribute('aria-hidden', 'true');
    expect(element).toHaveClass('is-hidden');
  });

  it('should render as hidden with `open="false"`', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-toast open="false"></mfp-toast>');

    const element = await page.find('mfp-toast');
    expect(element).toEqualAttribute('aria-hidden', 'true');
    expect(element).toHaveClass('is-hidden');
  });

  it('should render as open', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-toast open></mfp-toast>');

    const element = await page.find('mfp-toast');
    expect(element).not.toEqualAttribute('aria-hidden', 'true');
    expect(element).not.toHaveClass('is-hidden');
  });

  it('should render as open with `open="true"`', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-toast open="true"></mfp-toast>');

    const element = await page.find('mfp-toast');
    expect(element).not.toEqualAttribute('aria-hidden', 'true');
    expect(element).not.toHaveClass('is-hidden');
  });

  it('should display text', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-toast>Text</mfp-toast>');

    const element = await page.find('mfp-toast');

    expect(element).toEqualText('Text');
  });

  it('should display info icon by default', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-toast>Text</mfp-toast>');

    const iconWrapper = await page.find('mfp-toast >>> mfp-icon');

    expect(iconWrapper).toEqualAttribute('name', 'info-bold');
  });

  it('should display success icon', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-toast type="success">Text</mfp-toast>');

    const iconWrapper = await page.find('mfp-toast >>> mfp-icon');

    expect(iconWrapper).toEqualAttribute('name', 'check-circle-bold');
  });

  it('should display custom icon', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <mfp-toast>
      Text
      <mfp-icon slot="icon" size="24" name="star-bold"></mfp-icon>
    </mfp-toast>
    `);

    const iconWrapperName = await page.$eval('mfp-toast', (element) => {
      const slotElement = element.shadowRoot.querySelector<HTMLSlotElement>('slot[name="icon"]');

      const assignedElements = slotElement.assignedElements({ flatten: true })[0];

      return assignedElements.getAttribute('name');
    });

    expect(iconWrapperName).toEqualText('star-bold');
  });

  it('should respect design style', async () => {
    const page = await newE2EPage();
    await page.setContent(`<mfp-toast>Text</mfp-toast>`);

    const styleProps = ['padding', 'borderRadius', 'gap'] as const;

    const style = await computedStyle(page, 'mfp-toast >>> [part="wrapper"]', styleProps);

    expect(style).toEqual({ padding: '12px 16px', borderRadius: '8px', gap: '8px' });
  });

  it('should call methods', async () => {
    const page = await newE2EPage({
      html: '<mfp-toast></mfp-toast>',
    });

    await page.$eval('mfp-toast', async (elem: HTMLMfpToastElement) => {
      await elem.show();
    });
    await page.waitForChanges();

    const visibleToast = await page.find('mfp-toast');
    expect(visibleToast).toEqualAttribute('aria-hidden', 'false');
    expect(visibleToast).toEqualAttribute('hidden', 'false');

    await page.$eval('mfp-toast', async (elem: HTMLMfpToastElement) => {
      await elem.hide();
    });
    await page.waitForChanges();

    const hiddenToast = await page.find('mfp-toast');
    expect(hiddenToast).toEqualAttribute('aria-hidden', 'true');
    expect(hiddenToast).toEqualAttribute('hidden', 'true');
  });
});
