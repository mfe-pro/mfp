import { newE2EPage } from '@stencil/core/testing';

describe('mfp-dialog', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-dialog></mfp-dialog>');

    const element = await page.find('mfp-dialog');

    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-dialog></mfp-dialog>');

    const element = await page.find('mfp-dialog');

    expect(element.shadowRoot).not.toBeNull();
  });

  it('should display title', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-dialog><h3 slot="title">Dialog Title</h3></mfp-dialog>');

    const element = await page.find('mfp-dialog');

    expect(element).toEqualText('Dialog Title');
  });

  it('should display content', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<mfp-dialog><p slot="content">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p></mfp-dialog>',
    );

    const element = await page.find('mfp-dialog');

    expect(element).toEqualText('Lorem Ipsum is simply dummy text of the printing and typesetting industry.');
  });
});
