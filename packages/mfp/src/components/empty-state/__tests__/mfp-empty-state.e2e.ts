import { newE2EPage } from '@stencil/core/testing';

describe('mfp-empty-state', () => {
  it('should render', async () => {
    const page = await newE2EPage({
      html: '<mfp-empty-state></mfp-empty-state>',
    });
    const element = await page.find('mfp-empty-state');

    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage({
      html: '<mfp-empty-state></mfp-empty-state>',
    });
    const element = await page.find('mfp-empty-state');

    expect(element.shadowRoot).not.toBeNull();
  });

  it('should render a basic empty state', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-empty-state>
          Title
          <span slot="body">You have a basic empty state</span>
        </mfp-empty-state>
      `,
    });

    const element = await page.find('mfp-empty-state >>> slot[name="body"]');

    expect(element).not.toBeNull();
  });
});
