import { newE2EPage } from '@stencil/core/testing';

describe('mfp-steps', () => {
  it('should render', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-steps type="icon" size="medium">
          <mfp-step-item status="default">
            <mfp-icon slot="prefix" name="bell-ringing"></mfp-icon>
            <span>Title</span>
            <span slot="description">Description</span>
          </mfp-step-item>
        </mfp-steps>
      `,
    });

    const element = await page.find('mfp-steps');
    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage({
      html: `<mfp-steps type="numeric" size="medium"></mfp-steps>`,
    });

    const element = await page.find('mfp-steps');
    expect(element.shadowRoot).not.toBeNull();
  });

  it('should render the correct number of steps', async () => {
    const page = await newE2EPage({
      html: `
      <mfp-steps type="numeric" size="medium">
        <mfp-step-item>
          <span slot="prefix">1</span>
          <span>Title</span>
        </mfp-step-item>
        <mfp-step-item>
          <span slot="prefix">2</span>
          <span>Title</span>
        </mfp-step-item>
      </mfp-steps>
      `,
    });

    const steps = await page.findAll('mfp-step-item');
    expect(steps).toHaveLength(2);
  });
});
