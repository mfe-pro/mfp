import { newE2EPage } from '@stencil/core/testing';

import { computedStyle } from '../../../shared/test-utils';

const waitForSvgLoad = async (
  elem: HTMLMfpIconElement,
  props?: Partial<Record<keyof HTMLMfpIconElement, HTMLMfpIconElement[keyof HTMLMfpIconElement]>>,
) => {
  if (props) {
    Object.keys(props).forEach((attr) => (elem[attr] = props[attr]));
  }
  const partSVG = elem.shadowRoot.querySelector('[part="svg"]');
  if (!partSVG) {
    return new Promise((resolve) => elem.addEventListener('svgLoaded', resolve));
  }
  return Promise.resolve();
};

describe('mfp-tab', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-tab id="1"><p>Tab text</p></mfp-tab>');

    const element = await page.find('mfp-tab');

    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-tab id="1"><p>Tab text</p></mfp-tab>');

    const element = await page.find('mfp-tab');

    expect(element.shadowRoot).not.toBeNull();
  });

  it('should display text', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-tab id="1"><p>Tab text</p></mfp-tab>');

    const slotText = await page.$eval('mfp-tab', (element) => {
      const slotElement = element.shadowRoot.querySelector('[part="text"] > slot');
      const assignedElements = (slotElement as HTMLSlotElement).assignedElements({ flatten: true })[0];

      return assignedElements.textContent;
    });

    expect(slotText).toBe('Tab text');
  });

  it('should display icon', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-tab id="1"><mfp-icon name="check" slot="icon"></mfp-icon><p>Tab text</p></mfp-tab>');

    await page.$eval('mfp-icon', waitForSvgLoad);

    const slotText = await page.$eval('mfp-tab', (element) => {
      const slotElement = element.shadowRoot.querySelector('[part="icon"] > slot');
      const assignedElements = (slotElement as HTMLSlotElement).assignedElements({ flatten: true })[0];

      const svg = assignedElements.shadowRoot.querySelector('svg');

      return svg.innerHTML;
    });

    expect(slotText).toBe(
      '<path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>',
    );
  });

  it('should be keyboard accessible', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <mfp-tab id="1"><p>Tab text</p></mfp-tab>
      <mfp-tab id="2"><p>Tab text</p></mfp-tab>
    `);

    const mfpFocus = await page.spyOnEvent('mfpFocus');
    const mfpClick = await page.spyOnEvent('mfpClick');
    const mfpBlur = await page.spyOnEvent('mfpBlur');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const focusedTagName = await page.evaluate(() => document.activeElement.tagName.toLocaleLowerCase());

    expect(mfpFocus).toHaveReceivedEventTimes(2);
    expect(mfpClick).toHaveReceivedEventTimes(0);
    expect(mfpBlur).toHaveReceivedEventTimes(1);
    expect(focusedTagName).toEqual('mfp-tab');
  });

  it('should handle `disabled` property', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-tab id="1" disabled><p>Tab text</p></mfp-tab>');

    const mfpFocus = await page.spyOnEvent('mfpFocus');
    const mfpClick = await page.spyOnEvent('mfpClick');
    const mfpBlur = await page.spyOnEvent('mfpBlur');

    const element = await page.find('mfp-tab >>> [part="base"]');

    await element.click();

    await page.waitForChanges();

    expect(mfpFocus).toHaveReceivedEventTimes(0);
    expect(mfpClick).toHaveReceivedEventTimes(0);
    expect(mfpBlur).toHaveReceivedEventTimes(0);
  });

  it('should respect design style', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <mfp-tab id="1" size="small"><p>Tab text</p></mfp-tab>
      <mfp-tab id="2" size="medium"><p>Tab text</p></mfp-tab>
      <mfp-tab id="3" size="large"><p>Tab text</p></mfp-tab>
    `);

    const smallStyle = await computedStyle(page, 'mfp-tab[size="small"] >>> [part="base"]', ['padding']);
    const mediumStyle = await computedStyle(page, 'mfp-tab[size="medium"] >>> [part="base"]', ['padding']);
    const largeStyle = await computedStyle(page, 'mfp-tab[size="large"] >>> [part="base"]', ['padding']);

    expect(smallStyle).toEqual({ padding: '4px 16px' });
    expect(mediumStyle).toEqual({ padding: '8px 24px' });
    expect(largeStyle).toEqual({ padding: '12px 24px' });
  });
});
