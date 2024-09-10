import { newE2EPage } from '@stencil/core/testing';

describe('mfp-notification', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-notification></mfp-notification>');

    const element = await page.find('mfp-notification');
    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-notification></mfp-notification>');

    const element = await page.find('mfp-notification');
    expect(element.shadowRoot).not.toBeNull();
  });

  it('should render as hidden', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-notification></mfp-notification>');

    const element = await page.find('mfp-notification');
    expect(element).toEqualAttribute('aria-hidden', 'true');
    expect(element).toHaveClass('is-hidden');
  });

  it('should render as hidden with `open="false"`', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-notification open="false"></mfp-notification>');

    const element = await page.find('mfp-notification');
    expect(element).toEqualAttribute('aria-hidden', 'true');
    expect(element).toHaveClass('is-hidden');
  });

  it('should render as open', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-notification open></mfp-notification>');

    const element = await page.find('mfp-notification');
    expect(element).not.toEqualAttribute('aria-hidden', 'true');
    expect(element).not.toHaveClass('is-hidden');
  });

  it('should render as open with `open="true"`', async () => {
    const page = await newE2EPage();
    await page.setContent('<mfp-notification open="true"></mfp-notification>');

    const element = await page.find('mfp-notification');
    expect(element).not.toEqualAttribute('aria-hidden', 'true');
    expect(element).not.toHaveClass('is-hidden');
  });

  it('should render basic notification', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <mfp-notification>
        Notification title
        <span slot="body">You have a new chat message</span>
      </mfp-notification>
    `);

    const description = await page.find('mfp-notification >>> slot[name="body"]');
    expect(description).not.toBeNull();
  });

  it('should show notification with icon', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <mfp-notification type="info">Notification title</mfp-notification>
    `);

    const iconHolder = await page.find('mfp-notification >>> [part="icon-outline"]');
    expect(iconHolder).not.toBeNull();
  });

  it('should show notification with close button', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <mfp-notification type="info">Notification title</mfp-notification>
    `);

    const iconHolder = await page.find('mfp-notification >>> [part="btn-close"]');
    expect(iconHolder).not.toBeNull();
  });

  it('should show notification with avatar', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <mfp-notification has-custom-icon>
        <mfp-avatar slot="icon" label="Avatar component label" initials="JS" shape="circle" size="small"></mfp-avatar>
        Notification title
      </mfp-notification>
    `);

    const avatarSlot = await page.find('mfp-notification >>> slot[name="icon"]');
    expect(avatarSlot).not.toBeNull();
  });

  it('should show notification footer', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <mfp-notification>
        Notification title
        <div slot="footer">
          <mfp-button appearance="primary" type="button" variant="standard">Button</mfp-button>
          <mfp-button appearance="secondary" variant="standard">Button</mfp-button>
        </div>
      </mfp-notification>',
    `);

    const footerSlot = await page.find('mfp-notification >>> slot[name="footer"]');
    expect(footerSlot).not.toBeNull();
  });

  it('should call methods', async () => {
    const page = await newE2EPage({
      html: '<mfp-notification></mfp-notification>',
    });

    await page.$eval('mfp-notification', async (elem: HTMLMfpNotificationElement) => {
      await elem.show();
    });
    await page.waitForChanges();

    const visibleNotification = await page.find('mfp-notification');
    expect(visibleNotification).toEqualAttribute('aria-hidden', 'false');
    expect(visibleNotification).toEqualAttribute('hidden', 'false');

    await page.$eval('mfp-notification', async (elem: HTMLMfpNotificationElement) => {
      await elem.hide();
    });
    await page.waitForChanges();

    const hiddenNotification = await page.find('mfp-notification');
    expect(hiddenNotification).toEqualAttribute('aria-hidden', 'true');
    expect(hiddenNotification).toEqualAttribute('hidden', 'true');
  });
});
