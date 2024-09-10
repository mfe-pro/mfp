import { newE2EPage } from '@stencil/core/testing';

import { computedStyle } from '../../../shared/test-utils';

describe('mfp-card', () => {
  it('should render', async () => {
    const page = await newE2EPage({
      html: '<mfp-card></mfp-card>',
    });
    const element = await page.find('mfp-card');

    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage({
      html: '<mfp-card></mfp-card>',
    });
    const element = await page.find('mfp-card');

    expect(element.shadowRoot).not.toBeNull();
  });

  it('should render default type', async () => {
    const page = await newE2EPage({
      html: '<mfp-card type="default"></mfp-card>',
    });
    const element = await page.find('mfp-card');

    const styleProps = ['padding'] as const;

    const minimalStyle = await computedStyle(page, 'mfp-card[type="default"] >>> [part="wrapper"]', styleProps);

    expect(minimalStyle).toEqual({ padding: '24px' });

    expect(element.shadowRoot).not.toBeNull();
  });

  it('should render minimal type', async () => {
    const page = await newE2EPage({
      html: '<mfp-card type="minimal"></mfp-card>',
    });
    const element = await page.find('mfp-card');

    const styleProps = ['padding'] as const;

    const minimalStyle = await computedStyle(page, 'mfp-card[type="minimal"] >>> [part="wrapper"]', styleProps);

    expect(minimalStyle).toEqual({ padding: '0px' });

    expect(element.shadowRoot).not.toBeNull();
  });
});
