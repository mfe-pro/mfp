import { newE2EPage } from '@stencil/core/testing';

describe('mfp-input', () => {
  it('should render', async () => {
    const page = await newE2EPage({
      html: '<mfp-input></mfp-input>',
    });

    const mfpInputElem = await page.find('mfp-input');
    expect(mfpInputElem).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage({
      html: '<mfp-input></mfp-input>',
    });

    const mfpInputElem = await page.find('mfp-input');
    expect(mfpInputElem.shadowRoot).not.toBeNull();
  });

  it('should render with prefix icon', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-input>
          <mfp-icon name="user-circle" slot="prefix"></mfp-icon>
        </mfp-input>
      `,
    });

    const prefixContainerElem = await page.find('mfp-input >>> .mfp-input--control__prefix');
    expect(prefixContainerElem).not.toHaveClass('hidden');
  });

  it('should render with suffix icon', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-input>
          <mfp-icon name="gear" slot="suffix"></mfp-icon>
        </mfp-input>
      `,
    });

    const suffixContainerElem = await page.find('mfp-input >>> .mfp-input--control__suffix');
    expect(suffixContainerElem).not.toHaveClass('hidden');
  });

  it('should render with label content', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-input>
          <label slot="label">Input label</label>
        </mfp-input>
      `,
    });

    const labelContainerElem = await page.find('mfp-input >>> .mfp-input--label');
    expect(labelContainerElem).not.toHaveClass('hidden');
  });

  it('should render with helper content', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-input>
          <span slot="helper-text">Helper text</span>
        </mfp-input>
      `,
    });

    const helperContainerElem = await page.find('mfp-input >>> .mfp-input--helper-text');
    expect(helperContainerElem).not.toHaveClass('hidden');
  });

  it('should write and emit change event', async () => {
    const inputValue = 'Hello';
    const page = await newE2EPage({
      html: '<mfp-input></mfp-input>',
    });

    const mfpChange = await page.spyOnEvent('mfpChange');

    const mfpInputElem = await page.find('mfp-input');
    const nativeInputElem = await page.find('mfp-input >>> .mfp-input--control__input');

    await nativeInputElem.type(inputValue);
    await page.$eval('mfp-input >>> .mfp-input--control__input', (e: HTMLInputElement) => {
      e.blur();
    });
    await page.waitForChanges();

    expect(await mfpInputElem.getProperty('value')).toBe(inputValue);
    expect(mfpChange).toHaveReceivedEventTimes(1);
  });

  it('should write and emit input event', async () => {
    const inputValue = 'Hello';
    const page = await newE2EPage({
      html: '<mfp-input></mfp-input>',
    });

    const mfpInput = await page.spyOnEvent('mfpInput');

    const mfpInputElem = await page.find('mfp-input');

    await page.focus('mfp-input >>> .mfp-input--control__input');
    await page.keyboard.type(inputValue);
    await page.waitForChanges();

    expect(await mfpInputElem.getProperty('value')).toBe(inputValue);
    expect(mfpInput).toHaveReceivedEventTimes(inputValue.length);
  });

  it('should clear the value and emit clear event', async () => {
    const inputValue = 'Hello';
    const page = await newE2EPage({
      html: `
        <mfp-input value="${inputValue}"></mfp-input>
      `,
    });

    const mfpClear = await page.spyOnEvent('mfpClear');

    const mfpInputElem = await page.find('mfp-input');
    const nativeInputElem = await page.find('mfp-input >>> .mfp-input--control__input');
    expect(await nativeInputElem.getProperty('value')).toBe(inputValue);

    await nativeInputElem.focus();
    await page.waitForChanges();

    const clearBtnElem = await page.find('mfp-input >>> .mfp-input--control__clear');
    await clearBtnElem.click();

    expect(mfpClear).toHaveReceivedEventTimes(1);
    expect(await mfpInputElem.getProperty('value')).toEqual('');
  });
});
