import { newE2EPage } from '@stencil/core/testing';

describe('mfp-switch', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-switch></mfp-switch>');

    const element = await page.find('mfp-switch');
    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-switch></mfp-switch>');

    const element = await page.find('mfp-switch');
    expect(element.shadowRoot).not.toBeNull();
  });

  it('should load checked', async () => {
    const page = await newE2EPage();
    await page.setContent(`<mfp-switch checked></mfp-switch>`);

    const input = await page.find('mfp-switch >>> input.mfp-switch--input');
    expect(input.getAttribute('aria-checked')).toEqual('true');
  });

  it('should display label text', async () => {
    const label = 'Toggle me!';
    const page = await newE2EPage();
    await page.setContent(`<mfp-switch>${label}</mfp-switch>`);

    const element = await page.waitForSelector('mfp-switch');
    const labelText = await element.evaluate((el) => el.textContent);

    expect(labelText).toEqualText(label);
  });

  it('should toggle on click', async () => {
    const page = await newE2EPage({
      html: '<mfp-switch></mfp-switch>',
    });

    const mfpChange = await page.spyOnEvent('mfpChange');

    const element = await page.find('mfp-switch');
    expect(element).not.toHaveAttribute('checked');

    await element.click();

    expect(await page.find('mfp-switch')).toHaveAttribute('checked');
    expect(mfpChange).toHaveReceivedEventTimes(1);
  });

  it('should do nothing if disabled', async () => {
    const page = await newE2EPage();
    await page.setContent(`<mfp-switch disabled></mfp-switch>`);

    const mfpChange = await page.spyOnEvent('mfpChange');

    const element = await page.find('mfp-switch');
    await element.click();

    expect(mfpChange).toHaveReceivedEventTimes(0);
    expect(element).not.toHaveAttribute('checked');
  });

  it('should render inner icon labels', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <mfp-switch inner-label="icon">Toggle me!</mfp-switch>
    `);

    const switchControl = await page.find('mfp-switch >>> .mfp-switch--control');
    expect(switchControl).not.toBe(undefined);

    const pkIcons = await switchControl.findAll('mfp-icon.mfp-switch--control__icon');
    expect(pkIcons).toHaveLength(2);
  });

  it('should change the content order', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <mfp-switch reverse-order>Toggle me!</mfp-switch>
    `);

    const elementBase = await page.find('mfp-switch >>> label.mfp-switch');
    expect(elementBase).toHaveClass('flex-row-reverse');
  });
});
