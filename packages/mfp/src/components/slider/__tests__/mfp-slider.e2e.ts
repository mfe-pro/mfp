import { newE2EPage } from '@stencil/core/testing';

import { computedStyle, setProperties, sleep } from '../../../shared/test-utils';

describe('mfp-slider', () => {
  it('should render', async () => {
    const page = await newE2EPage({
      html: '<mfp-slider value="30"></mfp-slider>',
    });

    const element = await page.find('mfp-slider');

    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage({
      html: '<mfp-slider value="30"></mfp-slider>',
    });

    const element = await page.find('mfp-slider');

    expect(element.shadowRoot).not.toBeNull();
  });

  it('should handle `disabled` property', async () => {
    const page = await newE2EPage({
      html: '<mfp-slider type="range" value="[30,70]" disabled></mfp-slider>',
    });

    const mfpFocus = await page.spyOnEvent('mfpFocus');
    const mfpBlur = await page.spyOnEvent('mfpBlur');
    const mfpChange = await page.spyOnEvent('mfpChange');

    const element = await page.find('mfp-slider');
    const inputs = await page.findAll('mfp-slider >>> input[type="range"]');

    for (const input of inputs) {
      input.focus();
      await page.waitForChanges();

      element.focus();
      await page.waitForChanges();
    }

    expect(mfpFocus).toHaveReceivedEventTimes(0);
    expect(mfpBlur).toHaveReceivedEventTimes(0);
    expect(mfpChange).toHaveReceivedEventTimes(0);
  });

  it('should handle `value-indicator` property', async () => {
    const page = await newE2EPage({
      html: '<mfp-slider type="range" value="[30,70]"></mfp-slider>',
    });

    await page.$eval('mfp-slider', (elem: HTMLMfpSliderElement) => {
      elem.enableValueIndicator = true;
    });
    await page.waitForChanges();

    const leftLabel = await page.find('mfp-slider >>> span[part="label-start"]');
    const rightLabel = await page.find('mfp-slider >>> span[part="label-end"]');

    expect(leftLabel).not.toHaveClass('hidden');
    expect(rightLabel).not.toHaveClass('hidden');
  });

  it('should handle `gap` property', async () => {
    const gap = 10;
    const page = await newE2EPage({
      html: `<mfp-slider type="range" min="0" max="100" value="[30, 70]" gap="${gap}"></mfp-slider>`,
    });

    await setProperties(page, 'mfp-slider', { value: [55, 60] });

    const minRangeInput = await page.find('mfp-slider >>> input[part="input-min"]');
    const maxRangeInput = await page.find('mfp-slider >>> input[part="input-max"]');

    const difference = Math.abs(
      parseInt(maxRangeInput.getAttribute('value')) - parseInt(minRangeInput.getAttribute('value')),
    );

    expect(difference).toEqual(gap);
  });

  it('should handle `type` property', async () => {
    const page = await newE2EPage({
      html: '<mfp-slider type="single" value="30"></mfp-slider>',
    });

    const element = await page.find('mfp-slider');
    expect(element.shadowRoot.querySelectorAll('input').length).toBe(1);

    await setProperties(page, 'mfp-slider', { type: 'range' });
    await page.waitForChanges();

    const inputs = (await page.find('mfp-slider')).shadowRoot.querySelectorAll('input');
    expect(inputs.length).toBe(2);
  });

  it('should trigger mfpChange', async () => {
    const value = 30;
    const page = await newE2EPage({
      html: `<mfp-slider value="${value}"></mfp-slider>`,
    });

    const mfpChange = await page.spyOnEvent('mfpChange');

    await setProperties(page, 'mfp-slider', { value: value + 20 });
    await page.waitForChanges();

    expect(mfpChange).toHaveReceivedEvent();
  });

  it('should trigger mfpChange with `debounce-time`', async () => {
    const value = 30;
    const page = await newE2EPage({
      html: `<mfp-slider value="${value}" debounce-time="250"></mfp-slider>`,
    });

    const mfpChange = await page.spyOnEvent('mfpChange');

    await setProperties(page, 'mfp-slider', { value: value + 20 });
    await page.waitForChanges();
    await sleep(250);

    expect(mfpChange).toHaveReceivedEventTimes(1);
  });

  it('should respect design style', async () => {
    const page = await newE2EPage({
      html: '<mfp-slider value="30"></mfp-slider>',
    });

    const label = await computedStyle(page, 'mfp-slider >>> span[part="label-start"]', [
      'fontSize',
      'fontWeight',
      'marginInlineEnd',
    ]);
    const track = await computedStyle(page, 'mfp-slider >>> span[part="track-area"]', ['borderRadius', 'height']);
    const progress = await computedStyle(page, 'mfp-slider >>> span[part="progress-area"]', ['borderRadius', 'height']);

    expect(label).toEqual({ fontSize: '14px', fontWeight: '500', marginInlineEnd: '8px' });
    expect(track).toEqual({ borderRadius: '4px', height: '4px' });
    expect(progress).toEqual({ borderRadius: '4px', height: '4px' });
  });
});
