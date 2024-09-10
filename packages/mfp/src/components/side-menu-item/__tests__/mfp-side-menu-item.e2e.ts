import { newE2EPage } from '@stencil/core/testing';

describe('mfp-side-menu-item', () => {
  it('should render', async () => {
    const page = await newE2EPage({
      html: '<mfp-side-menu-item></mfp-side-menu-item>',
    });

    const menuItemElem = await page.find('mfp-side-menu-item');
    expect(menuItemElem).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage({
      html: '<mfp-side-menu-item></mfp-side-menu-item>',
    });

    const menuItemElem = await page.find('mfp-side-menu-item');
    expect(menuItemElem.shadowRoot).not.toBeNull();
  });

  it('should display text', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-side-menu-item disabled="true">
          Menu item label
        </mfp-side-menu-item>
      `,
    });

    const menuItemElem = await page.find('mfp-side-menu-item');
    expect(menuItemElem).toEqualText('Menu item label');
  });

  it('should trigger click', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-side-menu-item>
          Menu item label
        </mfp-side-menu-item>
      `,
    });
    const mfpClick = await page.spyOnEvent('mfpClick');

    const menuItemElem = await page.find('mfp-side-menu-item');
    await menuItemElem.click();

    expect(mfpClick).toHaveReceivedEventTimes(1);
  });
});

it('should be keyboard accessible', async () => {
  const page = await newE2EPage({
    html: `
      <mfp-side-menu-item>
        <mfp-icon size="18" name="user" slot="prefix"></mfp-icon>
        <span>Verified users</span>
      </mfp-side-menu-item>
    `,
  });
  const mfpFocus = await page.spyOnEvent('mfpFocus');
  const mfpBlur = await page.spyOnEvent('mfpBlur');

  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.waitForChanges();

  expect(mfpFocus).toHaveReceivedEventTimes(1);
  expect(mfpBlur).toHaveReceivedEventTimes(1);
});

it('should handle `active` property', async () => {
  const page = await newE2EPage({
    html: `
      <mfp-side-menu-item active="true">
        Menu item label
      </mfp-side-menu-item>
    `,
  });

  const menuItemElem = await page.find('mfp-side-menu-item >>> .mfp-side-menu__item');

  expect(menuItemElem).toHaveClass('active');
});

it('should handle `disabled` property', async () => {
  const page = await newE2EPage({
    html: `
      <mfp-side-menu-item disabled="true">
        Menu item label
      </mfp-side-menu-item>
    `,
  });
  const mfpFocus = await page.spyOnEvent('mfpSideMenuItemFocus');
  const mfpBlur = await page.spyOnEvent('mfpSideMenuItemBlur');
  const mfpClick = await page.spyOnEvent('mfpSideMenuItemClick');

  await page.$eval('mfp-side-menu-item', async (elem: HTMLMfpSideMenuItemElement) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Property 'click' does not exist on type 'Element'.
    elem.shadowRoot.querySelector('a[part="base"]').click();
  });
  await page.waitForChanges();

  expect(mfpFocus).toHaveReceivedEventTimes(0);
  expect(mfpClick).toHaveReceivedEventTimes(0);
  expect(mfpBlur).toHaveReceivedEventTimes(0);
});

it('should render prefix element', async () => {
  const page = await newE2EPage({
    html: `
      <mfp-side-menu-item>
        <span slot="prefix">Prefix</span>
        Dashboard
      </mfp-side-menu-item>
    `,
  });

  const prefixText = await page.$eval('mfp-side-menu-item', (element) => {
    const slotElement = element.shadowRoot.querySelector('slot[name="prefix"]');
    const assignedElements = (slotElement as HTMLSlotElement).assignedElements({ flatten: true })[0];

    return assignedElements.textContent;
  });

  expect(prefixText).toBe('Prefix');
});

it('should render suffix element', async () => {
  const page = await newE2EPage({
    html: `
      <mfp-side-menu-item>
        <span slot="suffix">Suffix</span>
        Dashboard
      </mfp-side-menu-item>
    `,
  });

  const suffixText = await page.$eval('mfp-side-menu-item', (element) => {
    const slotElement = element.shadowRoot.querySelector('slot[name="suffix"]');
    const assignedElements = (slotElement as HTMLSlotElement).assignedElements({ flatten: true })[0];

    return assignedElements.textContent;
  });

  expect(suffixText).toEqualText('Suffix');
});
