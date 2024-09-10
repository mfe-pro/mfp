import { newE2EPage } from '@stencil/core/testing';

describe('mfp-dropdown', () => {
  it('should render', async () => {
    const page = await newE2EPage({
      html: `<mfp-dropdown></mfp-dropdown>`,
    });
    const element = await page.find('mfp-dropdown');

    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage({
      html: `<mfp-dropdown></mfp-dropdown>`,
    });
    const element = await page.find('mfp-dropdown');

    expect(element.shadowRoot).not.toBeNull();
  });

  it('should be visible on click', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-dropdown>
          <mfp-button slot="trigger">Open</mfp-button>
          <div>Some content in panel</div>
        </mfp-dropdown>
      `,
    });
    const button = await page.find('mfp-button');

    await button.click();

    const dropdownPanel = await page.find('mfp-dropdown >>> .mfp-dropdown__panel');
    expect(dropdownPanel).toHaveAttribute('open');
  });

  it('should open based on `open` prop', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-dropdown open="true">
          <mfp-button slot="trigger">Open</mfp-button>
          <div>Some content in panel</div>
        </mfp-dropdown>
      `,
    });
    const dropdownPanel = await page.find('mfp-dropdown >>> .mfp-dropdown__panel');

    expect(dropdownPanel).toHaveAttribute('open');
  });

  it('should close on "Escape"', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-dropdown open>
          <mfp-button slot="trigger">Open</mfp-button>
          <div>Some content in panel</div>
        </mfp-dropdown>
      `,
    });

    const dropdownPanelSelector = 'mfp-dropdown >>> .mfp-dropdown__panel';
    expect(await page.find(dropdownPanelSelector)).toHaveAttribute('open');

    await page.keyboard.press('Escape');
    await page.waitForChanges();

    expect(await page.find(dropdownPanelSelector)).not.toHaveAttribute('open');
  });

  it('should change placement value', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-dropdown>
          <mfp-button slot="trigger">Open</mfp-button>
          <div>Some content in panel</div>
        </mfp-dropdown>
      `,
    });
    const dropdown = await page.find('mfp-dropdown');
    dropdown.setProperty('placement', 'bottom');

    await page.waitForChanges();

    const dropdownPanel = await page.find('mfp-dropdown >>> .mfp-dropdown__panel');
    expect(dropdownPanel).toEqualAttribute('placement', 'bottom');
  });
});
