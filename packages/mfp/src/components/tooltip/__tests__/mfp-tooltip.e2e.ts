import { newE2EPage } from '@stencil/core/testing';

import { computedStyle } from '../../../shared/test-utils';

describe('mfp-tooltip', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-tooltip></mfp-tooltip>');

    const tooltipElem = await page.find('mfp-tooltip');
    expect(tooltipElem).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-tooltip></mfp-tooltip>');

    const tooltipElem = await page.find('mfp-tooltip');
    expect(tooltipElem.shadowRoot).not.toBeNull();
  });

  it('should be visible on hover', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <mfp-tooltip>
        Yuhu! A tooltip!
        <mfp-button slot="trigger"> Hover me! </mfp-button>
      </mfp-tooltip>
    `);

    const tooltipPanelSelector = 'mfp-tooltip >>> [part="panel"]';
    expect(await page.find(tooltipPanelSelector)).toHaveAttribute('aria-hidden');

    const button = await page.find('mfp-button');
    await button.hover();

    expect(await page.find(tooltipPanelSelector)).not.toHaveAttribute('aria-hidden');
  });

  it('should hide on mouse out', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <mfp-tooltip visible>
        Yuhu! A tooltip!
        <mfp-button mfp-button slot="trigger"> Hover me! </mfp-button>
      </mfp-tooltip>
    `);

    const tooltipPanelSelector = 'mfp-tooltip >>> [part="panel"]';
    expect(await page.find(tooltipPanelSelector)).not.toHaveAttribute('aria-hidden');

    await page.click('body');
    await page.waitForChanges();

    expect(await page.find(tooltipPanelSelector)).toHaveAttribute('aria-hidden');
  });

  it('should be visible only on click if specified', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <mfp-tooltip display-on="click">
        Yuhu! A tooltip!
        <mfp-button slot="trigger"> Hover me! </mfp-button>
      </mfp-tooltip>
    `);

    const tooltipPanelSelector = 'mfp-tooltip >>> [part="panel"]';
    expect(await page.find(tooltipPanelSelector)).toHaveAttribute('aria-hidden');

    const button = await page.find('mfp-button');
    await button.hover();
    expect(await page.find(tooltipPanelSelector)).toHaveAttribute('aria-hidden');

    await button.click();
    expect(await page.find(tooltipPanelSelector)).not.toHaveAttribute('aria-hidden');
  });

  it('should show in specified position', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <mfp-tooltip placement="left">
        Yuhu! A tooltip!
        <mfp-button slot="trigger"> Hover me! </mfp-button>
      </mfp-tooltip>
    `);

    const button = await page.find('mfp-button');
    await button.hover();
    const tooltipStyle = await computedStyle(page, 'mfp-tooltip >>> [part="panel"]');
    const sign = tooltipStyle.left.slice(-1);
    // left position should be positive if tooltip is placed to the left
    expect(sign).not.toEqual('-');
  });
});
