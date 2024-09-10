import { newE2EPage } from '@stencil/core/testing';

import { computedStyle } from '../../../shared/test-utils';

describe('mfp-panel', () => {
  it('should render', async () => {
    const page = await newE2EPage({
      html: `<mfp-panel></mfp-panel>`,
    });

    const element = await page.find('mfp-panel');

    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage({
      html: `<mfp-panel></mfp-panel>`,
    });

    const element = await page.find('mfp-panel');

    expect(element.shadowRoot).not.toBeNull();
  });

  it('should show in specified position', async () => {
    const page = await newE2EPage({
      html: `<mfp-panel placement="left">Some content</mfp-panel>`,
    });

    const tooltipStyle = await computedStyle(page, 'mfp-panel');
    const sign = tooltipStyle.left.slice(-1);
    expect(sign).not.toEqual('-');
  });

  it('should respect the design', async () => {
    const page = await newE2EPage({
      html: `<mfp-panel placement="bottom">Some content in the panel</mfp-panel>`,
    });

    const styleProps = ['width', 'boxShadow', 'padding'] as const;
    const panelStyle = await computedStyle(page, 'mfp-panel >>> [part="panel"]', styleProps);

    expect(panelStyle).toEqual({
      width: '320px',
      boxShadow:
        'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.12) 0px 10px 48px -16px',
      padding: '8px',
    });
  });
});
