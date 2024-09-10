import { newE2EPage } from '@stencil/core/testing';

describe('mfp-textarea', () => {
  it('should render', async () => {
    const page = await newE2EPage({
      html: `<mfp-textarea></mfp-textarea>`,
    });
    const textareaElem = await page.find('mfp-textarea');

    expect(textareaElem).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage({
      html: `<mfp-textarea></mfp-textarea>`,
    });
    const textareaElem = await page.find('mfp-textarea');

    expect(textareaElem.shadowRoot).not.toBeNull();
  });

  it('should display value', async () => {
    const textValue = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.';
    const page = await newE2EPage({
      html: `<mfp-textarea value="${textValue}"></mfp-textarea>`,
    });
    const textareaElem = await page.find('mfp-textarea >>> .mfp-textarea__input');

    expect(await textareaElem.getProperty('value')).toBe(textValue);
  });

  it('should render with label content', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-textarea>
          <label slot="label">Input label</label>
        </mfp-textarea>
      `,
    });
    const labelContainerElem = await page.find('mfp-textarea >>> .mfp-textarea__label');

    expect(labelContainerElem).not.toHaveClass('hidden');
  });

  it('should render with helper text', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-textarea>
          <span slot="helper-text">Helper text</span>
        </mfp-textarea>
      `,
    });
    const helperContainerElem = await page.find('mfp-textarea >>> .mfp-textarea__helper');

    expect(helperContainerElem).not.toHaveClass('hidden');
  });

  it('should render with maxlength counter', async () => {
    const page = await newE2EPage({
      html: `<mfp-textarea maxlength="100"></mfp-textarea>`,
    });
    const helperContainerElem = await page.find('mfp-textarea >>> .mfp-textarea__helper--counter');

    expect(helperContainerElem).not.toHaveClass('!hidden');
  });

  it('should hide helper content if no helper text and maxlength counter', async () => {
    const page = await newE2EPage({
      html: `<mfp-textarea></mfp-textarea>`,
    });
    const helperContainerElem = await page.find('mfp-textarea >>> .mfp-textarea__helper');

    expect(helperContainerElem).toHaveClass('!hidden');
  });

  it('should write and emit change event', async () => {
    const value = 'Hello';
    const page = await newE2EPage({
      html: `<mfp-textarea></mfp-textarea>`,
    });
    const mfpChange = await page.spyOnEvent('mfpChange');
    const mfpTextareaElem = await page.find('mfp-textarea');
    const nativeTextareaElem = await page.find('mfp-textarea >>> .mfp-textarea__input');

    await nativeTextareaElem.type(value);
    await page.$eval('mfp-textarea >>> .mfp-textarea__input', (e: HTMLInputElement) => {
      e.blur();
    });
    await page.waitForChanges();

    expect(await mfpTextareaElem.getProperty('value')).toBe(value);
    expect(mfpChange).toHaveReceivedEventTimes(1);
  });

  it('should write and emit input event', async () => {
    const value = 'Hello';
    const page = await newE2EPage({
      html: `<mfp-textarea></mfp-textarea>`,
    });

    const mfpInput = await page.spyOnEvent('mfpInput');

    const mfpTextareaElem = await page.find('mfp-textarea');

    await page.focus('mfp-textarea >>> .mfp-textarea__input');
    await page.keyboard.type(value);
    await page.waitForChanges();

    expect(await mfpTextareaElem.getProperty('value')).toBe(value);
    expect(mfpInput).toHaveReceivedEventTimes(value.length);
  });

  it('should show and count all characters', async () => {
    const value = 'Hello';
    const maxlenght = 100;
    const page = await newE2EPage({
      html: `<mfp-textarea maxlength="${maxlenght}"></mfp-textarea>`,
    });
    const mfpTextareaElem = await page.find('mfp-textarea');
    const nativeTextareaElem = await page.find('mfp-textarea >>> .mfp-textarea__input');
    const counterElem = await page.find('mfp-textarea >>> .mfp-textarea__helper--counter');

    mfpTextareaElem.setProperty('value', value);
    await page.waitForChanges();

    expect(await nativeTextareaElem.getProperty('value')).toBe(value);
    expect(await counterElem.getProperty('innerText')).toBe(`${value.length}/${maxlenght}`);
  });

  it('should truncate text bigger than maxlenght', async () => {
    const value = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.';
    const page = await newE2EPage({
      html: `<mfp-textarea maxlength="10"></mfp-textarea>`,
    });
    const mfpTextareaElem = await page.find('mfp-textarea');
    const nativeTextareaElem = await page.find('mfp-textarea >>> .mfp-textarea__input');

    mfpTextareaElem.setProperty('value', value);
    await page.waitForChanges();

    expect(await nativeTextareaElem.getProperty('value')).toBe(value.substring(0, 10));
  });
});
