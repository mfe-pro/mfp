import { newE2EPage } from '@stencil/core/testing';

describe('mfp-step-item', () => {
  it('should render', async () => {
    const page = await newE2EPage({
      html: `<mfp-step-item></mfp-step-item>`,
    });

    const element = await page.find('mfp-step-item');
    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage({
      html: `<mfp-step-item></mfp-step-item>`,
    });

    const element = await page.find('mfp-step-item');
    expect(element.shadowRoot).not.toBeNull();
  });

  it('should display text title', async () => {
    const title = 'Title';
    const description = 'Description for step item';

    const page = await newE2EPage({
      html: `
        <mfp-step-item type="numeric" status="default">
          <span>${title}</span>
          <span slot="description">${description}</span>
        </mfp-step-item>
      `,
    });

    const text = await page.$eval('mfp-step-item', (element) => {
      const slotElement = element.shadowRoot.querySelector('.mfp-step-item__content--title').querySelector('slot');
      const assignedElements = (slotElement as HTMLSlotElement).assignedElements({ flatten: true })[0];

      return assignedElements.textContent;
    });
    expect(text).toEqualText(title);
  });

  it('should display description', async () => {
    const title = 'Title';
    const description = 'Description for step item';

    const page = await newE2EPage({
      html: `
        <mfp-step-item type="numeric" status="default">
          <span>${title}</span>
          <span slot="description">${description}</span>
        </mfp-step-item>
      `,
    });

    const text = await page.$eval('mfp-step-item', (element) => {
      const slotElement = element.shadowRoot.querySelector('slot[name="description"]');
      const assignedElements = (slotElement as HTMLSlotElement).assignedElements({ flatten: true })[0];

      return assignedElements.textContent;
    });
    expect(text).toEqualText(description);
  });

  it('should display icon prefix', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-step-item status="default">
          <mfp-icon slot="prefix" name="circle"></mfp-icon>
          <span>Title</span>
          <span slot="description">Description</span>
        </mfp-step-item>
      `,
    });

    const prefix = await page.$eval('mfp-step-item', (element) => {
      const slotElement = element.shadowRoot.querySelector('slot[name="prefix"]');
      const assignedElements = (slotElement as HTMLSlotElement).assignedElements({ flatten: true })[0];

      return assignedElements.tagName;
    });
    expect(prefix).toMatch(/mfp-icon/i);
  });
});
