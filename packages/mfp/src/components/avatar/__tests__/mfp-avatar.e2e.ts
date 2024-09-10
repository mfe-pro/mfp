import { newE2EPage } from '@stencil/core/testing';

import { computedStyle } from '../../../shared/test-utils';

describe('mfp-avatar', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-avatar></mfp-avatar>');

    const element = await page.find('mfp-avatar');

    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-avatar></mfp-avatar>');

    const element = await page.find('mfp-avatar');

    expect(element.shadowRoot).not.toBeNull();
  });

  it('should render initials', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-avatar initials="JS"></mfp-avatar>');

    const element = await page.find('mfp-avatar >>> [part="text"]');

    expect(element).toEqualText('JS');
  });

  it('should render image', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <mfp-avatar
        image="https://images.unsplash.com/photo-1524593689594-aae2f26b75ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
      ></mfp-avatar>
    `);

    const element = await page.find('mfp-avatar >>> [part="img"]');

    expect(element).toBeDefined();
  });

  it('should respect design style', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <mfp-avatar initials="JS" shape="circle" size="xsmall"></mfp-avatar>
      <mfp-avatar initials="JS" shape="square" size="xsmall"></mfp-avatar>
      <mfp-avatar initials="JS" shape="square" size="small"></mfp-avatar>
      <mfp-avatar initials="JS" shape="square" size="medium"></mfp-avatar>
      <mfp-avatar initials="JS" shape="square" size="large"></mfp-avatar>
    `);

    const styleProps = ['width', 'borderRadius', 'height'] as const;

    const circleStyle = await computedStyle(page, 'mfp-avatar[shape="circle"] >>> [part="base"]', styleProps);
    const xmallSquareStyle = await computedStyle(
      page,
      'mfp-avatar[shape="square"][size="xsmall"] >>> [part="base"]',
      styleProps,
    );
    const smallSquareStyle = await computedStyle(
      page,
      'mfp-avatar[shape="square"][size="small"] >>> [part="base"]',
      styleProps,
    );
    const mediumSquareStyle = await computedStyle(
      page,
      'mfp-avatar[shape="square"][size="medium"] >>> [part="base"]',
      styleProps,
    );
    const largeSquareStyle = await computedStyle(
      page,
      'mfp-avatar[shape="square"][size="large"] >>> [part="base"]',
      styleProps,
    );

    expect(circleStyle).toEqual({ borderRadius: '9999px', height: '24px', width: '24px' });
    expect(xmallSquareStyle).toEqual({ borderRadius: '4px', height: '24px', width: '24px' });
    expect(smallSquareStyle).toEqual({ borderRadius: '8px', height: '32px', width: '32px' });
    expect(mediumSquareStyle).toEqual({ borderRadius: '12px', height: '48px', width: '48px' });
    expect(largeSquareStyle).toEqual({ borderRadius: '12px', height: '64px', width: '64px' });
  });

  it('should render <mfp-badge> component', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <mfp-avatar
        alt-text="User profile"
        label="Label"
        initials="JS"
        shape="circle"
        size="medium"
      >
        <mfp-badge slot="badge" text-color="#fff">9</mfp-badge>
      </mfp-avatar>
    `);

    const avatarElem = await page.find('mfp-avatar');
    const sideMenuItems = await avatarElem.findAll('mfp-badge');

    expect(sideMenuItems).toHaveLength(1);
  });
});
