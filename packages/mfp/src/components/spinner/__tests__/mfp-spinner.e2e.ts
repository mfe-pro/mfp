import { newE2EPage } from '@stencil/core/testing';

import { computedStyle, setProperties } from '../../../shared/test-utils';

describe('mfp-spinner', () => {
  it('should render', async () => {
    const page = await newE2EPage({
      html: '<mfp-spinner></mfp-spinner>',
    });

    const element = await page.find('mfp-spinner');

    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage({
      html: '<mfp-spinner></mfp-spinner>',
    });

    const element = await page.find('mfp-spinner');
    expect(element.shadowRoot).not.toBeNull();
  });

  it('should handle `animation` property', async () => {
    const page = await newE2EPage({
      html: '<mfp-spinner animation></mfp-spinner>',
    });

    const element = await page.find('mfp-spinner >>> .mfp-spinner');
    expect(element.classList.contains('is-animated')).toBe(true);
  });

  it('should handle `size` property', async () => {
    const page = await newE2EPage({
      html: '<mfp-spinner></mfp-spinner>',
    });

    const shadowDOMElem = 'mfp-spinner >>> .mfp-spinner--loader';
    expect(await page.find(shadowDOMElem)).toHaveClass('medium');

    await setProperties(page, 'mfp-spinner', { size: 'large' });
    expect(await page.find(shadowDOMElem)).toHaveClass('large');

    await setProperties(page, 'mfp-spinner', { size: 'small' });
    expect(await page.find(shadowDOMElem)).toHaveClass('small');
  });

  it('should handle `text-position` property', async () => {
    const page = await newE2EPage({
      html: '<mfp-spinner text-position="above"></mfp-spinner>',
    });

    const shadowDOMElem = 'mfp-spinner >>> .mfp-spinner';
    expect(await page.find(shadowDOMElem)).toHaveClass('text-above');

    await setProperties(page, 'mfp-spinner', { textPosition: 'bellow' });
    expect(await page.find(shadowDOMElem)).toHaveClass('text-bellow');

    await setProperties(page, 'mfp-spinner', { textPosition: 'left' });
    expect(await page.find(shadowDOMElem)).toHaveClass('text-left');

    await setProperties(page, 'mfp-spinner', { textPosition: 'right' });
    expect(await page.find(shadowDOMElem)).toHaveClass('text-right');

    await setProperties(page, 'mfp-spinner', { textPosition: 'none' });

    const spinnerText = await page.find('mfp-spinner >>> .mfp-spinner--text');
    expect(spinnerText).toHaveClass('!hidden');
    expect(await page.find(shadowDOMElem)).toHaveClass('text-none');
  });

  it('should render icon slot element', async () => {
    const page = await newE2EPage({
      html: '<mfp-spinner><mfp-icon name="spinner-gap" slot="icon"></mfp-icon></mfp-spinner>',
    });

    const spinnerIcon = await page.find('mfp-spinner >>> .mfp-spinner--icon');
    const iconSlotElements = await page.$eval('mfp-spinner', (element) => {
      const slotElement = element.shadowRoot.querySelector('slot[name="icon"]');
      const assignedElements = (slotElement as HTMLSlotElement).assignedElements({ flatten: true });

      return assignedElements;
    });

    expect(spinnerIcon.classList.contains('hidden')).toBe(false);
    expect(iconSlotElements.length).toBe(1);
  });

  it('should handle invalid properties', async () => {
    const page = await newE2EPage({
      html: '<mfp-spinner></mfp-spinner>',
    });

    const console: jest.Mock<void, string[]> = jest.fn();
    page.on('console', (message) => console(message.type(), message.text()));

    // @ts-expect-error we're testing that component is handling invalid properties
    expect(await setProperties(page, 'mfp-spinner', { size: 'invalid', textPosition: 'invalid' })).toEqual({
      size: 'medium',
      textPosition: 'none',
    });

    expect(console).toHaveBeenCalledTimes(2);
    expect(console).toHaveBeenCalledWith(
      'warn',
      '[BQ-SPINNER] Please notice that "size" should be one of small|medium|large',
    );
    expect(console).toHaveBeenCalledWith(
      'warn',
      '[BQ-SPINNER] Please notice that "textPosition" should be one of none|left|right|above|bellow',
    );
  });

  it('should respect design style', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-spinner size="small" text-position="bellow"></mfp-spinner>
        <mfp-spinner size="medium" text-position="bellow"></mfp-spinner>
        <mfp-spinner size="large" text-position="bellow"></mfp-spinner>
      `,
    });

    const getLineHeightValue = (fontSize: string): string => {
      return `${(150 * parseInt(fontSize)) / 100}px`;
    };

    const sizeStyleProps = ['width', 'height'] as const;

    const smallStyle = await computedStyle(page, 'mfp-spinner[size="small"] >>> .mfp-spinner--loader', sizeStyleProps);
    const mediumStyle = await computedStyle(
      page,
      'mfp-spinner[size="medium"] >>> .mfp-spinner--loader',
      sizeStyleProps,
    );
    const largeStyle = await computedStyle(page, 'mfp-spinner[size="large"] >>> .mfp-spinner--loader', sizeStyleProps);

    const textStyleProps = ['fontSize', 'fontWeight', 'lineHeight'] as const;

    const smallTextStyle = await computedStyle(
      page,
      'mfp-spinner[size="small"] >>> .mfp-spinner--text',
      textStyleProps,
    );
    const mediumTextStyle = await computedStyle(
      page,
      'mfp-spinner[size="medium"] >>> .mfp-spinner--text',
      textStyleProps,
    );
    const largeTextStyle = await computedStyle(
      page,
      'mfp-spinner[size="large"] >>> .mfp-spinner--text',
      textStyleProps,
    );

    expect(smallStyle).toEqual({ width: '32px', height: '32px' });
    expect(mediumStyle).toEqual({ width: '48px', height: '48px' });
    expect(largeStyle).toEqual({ width: '56px', height: '56px' });

    const textStyleExpected = {
      fontSize: '16px',
      fontWeight: '500',
      lineHeight: getLineHeightValue(smallTextStyle.fontSize),
    };

    expect(smallTextStyle).toEqual(textStyleExpected);
    expect(mediumTextStyle).toEqual(textStyleExpected);
    expect(largeTextStyle).toEqual(textStyleExpected);
  });
});
