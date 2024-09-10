import { newE2EPage } from '@stencil/core/testing';

describe('mfp-page-title', () => {
  it('should render', async () => {
    const page = await newE2EPage({
      html: '<mfp-page-title>Title</mfp-page-title>',
    });
    const element = await page.find('mfp-page-title');

    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage({
      html: '<mfp-page-title>Title</mfp-page-title>',
    });
    const element = await page.find('mfp-page-title');

    expect(element.shadowRoot).not.toBeNull();
  });

  it('should render title + back navigation button', async () => {
    const page = await newE2EPage({
      html: '<mfp-page-title haveBackNavigation="true">Title</mfp-page-title>',
    });
    const backIcon = await page.find('mfp-page-title >>> slot[name="back"]');
    expect(backIcon).not.toBeNull();
  });

  it('should render title + action icons - suffix', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-page-title>
          Title
          <div slot="suffix">
            <mfp-icon name="start"></mfp-icon>
          </div>
        </mfp-page-title>`,
    });
    const suffixSlot = await page.find('mfp-page-title >>> slot[name="suffix"]');
    expect(suffixSlot).not.toBeNull();
  });
});
