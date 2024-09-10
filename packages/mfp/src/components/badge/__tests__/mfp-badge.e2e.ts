import { newE2EPage } from '@stencil/core/testing';

import { computedStyle } from '../../../shared/test-utils';

describe('mfp-badge', () => {
  it('should render', async () => {
    const page = await newE2EPage({
      html: '<mfp-badge></mfp-badge>',
    });
    const element = await page.find('mfp-badge');

    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage({
      html: '<mfp-badge></mfp-badge>',
    });
    const element = await page.find('mfp-badge');

    expect(element.shadowRoot).not.toBeNull();
  });

  it('should have small size', async () => {
    const page = await newE2EPage({
      html: '<mfp-badge></mfp-badge>',
    });
    const styleProps = ['height', 'width'] as const;
    const badge = await computedStyle(page, 'mfp-badge >>> .mfp-badge', styleProps);
    const shadowDOMElem = await page.find('mfp-badge >>> .mfp-badge');

    expect(shadowDOMElem).toHaveClass('size--small');
    expect(badge).toEqual({ height: '8px', width: '8px' });
  });

  it('should have medium size', async () => {
    const page = await newE2EPage({
      html: '<mfp-badge size="medium"></mfp-badge>',
    });
    const styleProps = ['height', 'width'] as const;
    const badge = await computedStyle(page, 'mfp-badge >>> .mfp-badge', styleProps);
    const shadowDOMElem = await page.find('mfp-badge >>> .mfp-badge');

    expect(shadowDOMElem).toHaveClass('size--medium');
    expect(badge).toEqual({ height: '12px', width: '12px' });
  });

  it('should render a number', async () => {
    const page = await newE2EPage({
      html: '<mfp-badge>2</mfp-badge>',
    });
    const element = await page.find('mfp-badge >>> .mfp-badge');
    const shadowDOMElem = await element.find('span');

    expect(element).toHaveClass('digit');
    expect(shadowDOMElem).not.toBeNull();
  });
});
