import { newE2EPage } from '@stencil/core/testing';

import { computedStyle } from '../../../shared/test-utils';

describe('mfp-tag', () => {
  it('should render', async () => {
    const page = await newE2EPage({
      html: '<mfp-tag></mfp-tag>',
    });
    const element = await page.find('mfp-tag');

    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage({
      html: '<mfp-tag></mfp-tag>',
    });
    const element = await page.find('mfp-tag');

    expect(element.shadowRoot).not.toBeNull();
  });

  it('should render as hidden', async () => {
    const page = await newE2EPage({
      html: `<mfp-tag removable hidden></mfp-tag>`,
    });

    const element = await page.find('mfp-tag');
    expect(element).toEqualAttribute('aria-hidden', 'true');
  });

  it('should render as hidden with `hidden="true"`', async () => {
    const page = await newE2EPage({
      html: `<mfp-tag removable hidden="true"></mfp-tag>`,
    });

    const element = await page.find('mfp-tag');
    expect(element).toEqualAttribute('aria-hidden', 'true');
  });

  it('should render as open', async () => {
    const page = await newE2EPage({
      html: `<mfp-tag></mfp-tag>`,
    });

    const element = await page.find('mfp-tag');
    expect(element).toEqualAttribute('aria-hidden', 'false');
    expect(element).not.toHaveClass('is-hidden');
  });

  it('should render as open with `hidden="false"`', async () => {
    const page = await newE2EPage({
      html: `<mfp-tag hidden="false"></mfp-tag>`,
    });

    const element = await page.find('mfp-tag');
    expect(element).toEqualAttribute('aria-hidden', 'false');
    expect(element).not.toHaveClass('is-hidden');
  });

  it('should render a removable tag component', async () => {
    const page = await newE2EPage({
      html: `<mfp-tag removable>Tag</mfp-tag>`,
    });

    const element = await page.find('mfp-tag >>> mfp-icon[name="x-circle"]');
    expect(element).not.toBeNull();
  });

  it('should render a basic tag without icon', async () => {
    const page = await newE2EPage({
      html: `<mfp-tag>Tag</mfp-tag>`,
    });

    const element = await page.find('mfp-tag >>> slot');

    expect(element).not.toBeNull();
  });

  it('should render a tag with a prefix (icon)', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-tag>
          <span slot="prefix">
            <mfp-icon name="star"></mfp-icon>
          </span>
          Tag
        </mfp-tag>
      `,
    });

    const prefixSlot = await page.find('mfp-tag >>> slot[name="prefix"]');
    expect(prefixSlot).not.toBeNull();
  });

  it('should respect design style', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-tag size="xsmall">Tag</tag>
        <mfp-tag size="small">Tag</tag>
        <mfp-tag size="medium">Tag</tag>
      `,
    });

    const styleProps = ['padding'] as const;

    const xsmallStyle = await computedStyle(page, 'mfp-tag[size="xsmall"] >>> [part="wrapper"]', styleProps);
    const smallStyle = await computedStyle(page, 'mfp-tag[size="small"] >>> [part="wrapper"]', styleProps);
    const mediumStyle = await computedStyle(page, 'mfp-tag[size="medium"] >>> [part="wrapper"]', styleProps);

    // We need to subtract 1px from the padding because of the border
    // that is added to the tag component, in design the paddings are as follows:
    // - xsmall: 2px 8px
    // - small: 2px 8px
    // - medium: 4px 12px
    expect(xsmallStyle).toEqual({ padding: '1px 7px' });
    expect(smallStyle).toEqual({ padding: '1px 7px' });
    expect(mediumStyle).toEqual({ padding: '3px 11px' });
  });
});
