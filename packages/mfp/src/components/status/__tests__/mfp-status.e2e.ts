import { newE2EPage } from '@stencil/core/testing';

import { computedStyle, setProperties } from '../../../shared/test-utils';
import { STATUS_TYPE } from '../mfp-status.types';

describe('mfp-status', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-status>Neutral status</mfp-status>');

    const element = await page.find('mfp-status');

    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-status>Neutral status</mfp-status>');

    const element = await page.find('mfp-status');

    expect(element.shadowRoot).not.toBeNull();
  });

  it('should display status text', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-status>Neutral status</mfp-status>');

    const element = await page.find('mfp-status');

    expect(element).toEqualText('Neutral status');
  });

  it('should handle status type', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-status>Neutral status</mfp-status>');

    expect(await setProperties(page, 'mfp-status', { type: 'danger' })).toEqual({ type: 'danger' });
    expect(await page.find('mfp-status >>> [part="circle"]')).toHaveClass('danger');
  });

  it('should handle invalid status type', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-status status="danger">Neutral status</mfp-status>');

    const console: jest.Mock<void, string[]> = jest.fn();

    page.on('console', (message) => console(message.type(), message.text()));
    // @ts-expect-error we're testing that component is handling invalid properties
    expect(await setProperties(page, 'mfp-status', { type: 'invalid-status' })).toEqual({ type: 'neutral' });
    expect(await page.find('mfp-status >>> [part="circle"]')).toHaveClass('neutral');
    expect(console).toHaveBeenCalledTimes(1);
    expect(console).toHaveBeenCalledWith(
      'warn',
      `[BQ-STATUS] Please notice that "type" should be one of ${STATUS_TYPE.join('|')}`,
    );
  });

  it('should respect design height', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-status status="danger">Neutral status</mfp-status>');

    const style = await computedStyle(page, 'mfp-status >>> [part="base"]');

    expect(style.height).toEqual('20px');
  });

  it('should have status as circle', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-status status="danger">Neutral status</mfp-status>');

    const style = await computedStyle(page, 'mfp-status >>> [part="circle"]');

    expect(style.borderRadius).toEqual('9999px');
  });

  it('should respect design space between status and text', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-status status="danger">Neutral status</mfp-status>');

    const style = await computedStyle(page, 'mfp-status >>> [part="base"]', ['gap']);

    expect(style).toEqual({ gap: '8px' });
  });
});
