import { newE2EPage } from '@stencil/core/testing';

describe('mfp-side-menu', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-side-menu></mfp-side-menu>');

    const sideMenuElem = await page.find('mfp-side-menu');

    expect(sideMenuElem).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-side-menu></mfp-side-menu>');

    const sideMenuElem = await page.find('mfp-side-menu');

    expect(sideMenuElem.shadowRoot).not.toBeNull();
  });

  it('should render with default values', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-side-menu></mfp-side-menu>');

    const sideMenuElem = await page.find('mfp-side-menu');
    expect(sideMenuElem).toEqualAttribute('appearance', 'default');
    expect(sideMenuElem).toEqualAttribute('size', 'medium');
  });

  it('should collapse and expand', async () => {
    const page = await newE2EPage({
      html: '<mfp-side-menu></mfp-side-menu>',
    });
    const sideMenuSelector = 'mfp-side-menu';

    page.$eval(sideMenuSelector, async (sideMenu: HTMLMfpSideMenuElement) => {
      await sideMenu.toggleCollapse();
    });
    await page.waitForChanges();
    expect(await page.find(sideMenuSelector)).toHaveAttribute('collapse');

    page.$eval(sideMenuSelector, async (sideMenu: HTMLMfpSideMenuElement) => {
      await sideMenu.toggleCollapse();
    });
    await page.waitForChanges();
    expect(await page.find(sideMenuSelector)).not.toHaveAttribute('collapse');
  });

  it('should render navigation menu items', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <mfp-side-menu>
        <mfp-side-menu-item active>
          <mfp-icon name="diamonds-four" slot="prefix"></mfp-icon>
          Dashboard
        </mfp-side-menu-item>
        <mfp-side-menu-item>
          <mfp-icon name="package" slot="prefix"></mfp-icon>
          Products
          <mfp-badge slot="suffix"> 5 </mfp-badge>
        </mfp-side-menu-item>
      </mfp-side-menu>
    `);

    const sideMenuElem = await page.find('mfp-side-menu');
    const sideMenuItems = await sideMenuElem.findAll('mfp-side-menu-item');
    expect(sideMenuItems).toHaveLength(2);
  });

  it('should display a tooltip on the navigation item when collapsed', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <mfp-side-menu collapse>
        <mfp-side-menu-item>
          <mfp-icon name="diamonds-four" slot="prefix"></mfp-icon>
          Dashboard
        </mfp-side-menu-item>
      </mfp-side-menu>
    `);

    const sideMenuItemTooltip = await page.find('mfp-side-menu-item >>> mfp-tooltip');
    expect(sideMenuItemTooltip).not.toBeNull();
    expect(sideMenuItemTooltip).toEqualText('Dashboard');
  });
});
