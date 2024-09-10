import { newE2EPage } from '@stencil/core/testing';

describe('mfp-progress', () => {
  it('should render', async () => {
    const page = await newE2EPage({
      html: '<mfp-progress></mfp-progress>',
    });
    const element = await page.find('mfp-progress');

    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage({
      html: '<mfp-progress></mfp-progress>',
    });
    const element = await page.find('mfp-progress');

    expect(element.shadowRoot).not.toBeNull();
  });

  it('should render the progress bar with label', async () => {
    const value = 60;
    const page = await newE2EPage({
      html: `<mfp-progress value="${value}" label></progress>`,
    });

    const element = await page.find('mfp-progress >>> [part="label"] span');
    expect(element).not.toBeNull();
    expect(element.textContent).toEqual(`${value}%`);
  });

  it('should render the progress bar without label', async () => {
    const page = await newE2EPage({
      html: '<mfp-progress value="60" label="false"></progress>',
    });

    const element = await page.find('mfp-progress >>> [part="label"]');
    expect(element).toEqualAttribute('aria-hidden', 'true');
  });

  it('should render the progress bar with tooltip', async () => {
    const value = 60;
    const page = await newE2EPage({
      html: `<mfp-progress value="${value}" enable-tooltip></progress>`,
    });

    const element = await page.find('mfp-progress >>> mfp-tooltip');
    expect(element).not.toBeNull();
    expect(element.innerText).toEqual(`${value}`);
  });

  it('should render the progress bar without tooltip', async () => {
    const page = await newE2EPage({
      html: '<mfp-progress value="60" enable-tooltip="false"></progress>',
    });

    // We are querying a web component inside the shadow DOM element,
    // hence the use of page.$ with the `>>>` combinator
    const element = await page.$('mfp-progress >>> mfp-tooltip');
    expect(element).toBeNull();
  });

  it('should render the progress bar with error type', async () => {
    const page = await newE2EPage({
      html: '<mfp-progress value="60" type="error"></progress>',
    });

    const progressElem = await page.find('mfp-progress >>> [part="progress-bar"]');
    expect(progressElem).toHaveClass('progress-bar__error');

    const labelElem = await page.find('mfp-progress >>> [part="label"]');
    expect(labelElem).toHaveClass('text-ui-danger');

    const uiDangerToken = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--mfp-ui--danger'),
    );
    const indicatorColor = await page.$eval('mfp-progress', (elm: any) =>
      getComputedStyle(elm.shadowRoot.querySelector('[part="progress-bar"]')).getPropertyValue(
        '--mfp-progress-bar--indicatorColor',
      ),
    );
    expect(indicatorColor).toEqual(uiDangerToken);
  });

  it('should render the progress bar with large thickness', async () => {
    const page = await newE2EPage({
      html: '<mfp-progress value="60" thickness="large"></progress>',
    });

    const uiLargeThicknessToken = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--mfp-spacing-xs'),
    );
    const indicatorThickness = await page.$eval('mfp-progress', (elm: any) =>
      getComputedStyle(elm.shadowRoot.querySelector('[part="progress-bar"]')).getPropertyValue(
        '--mfp-progress-bar--height',
      ),
    );
    expect(indicatorThickness).toEqual(uiLargeThicknessToken);
  });

  it('should render the progress bar in indeterminate mode', async () => {
    const page = await newE2EPage({
      html: '<mfp-progress value="60" indeterminate></progress>',
    });

    const element = await page.find('mfp-progress >>> [part="progress"]');
    expect(element).not.toHaveAttribute('value');
  });

  it('should render the progress bar with border shape as rounded', async () => {
    const page = await newE2EPage({
      html: '<mfp-progress value="60" border-shape="rounded"></progress>',
    });

    const progressElem = await page.find('mfp-progress >>> [part="progress-bar"]');
    expect(progressElem).toHaveClass('progress-bar__border-shape');
  });

  it('should render the progress bar with border shape as square', async () => {
    const page = await newE2EPage({
      html: '<mfp-progress value="60" border-shape="square"></progress>',
    });

    const progressElem = await page.find('mfp-progress >>> [part="progress-bar"]');
    expect(progressElem).not.toHaveClass('progress-bar__border-shape');
  });
});
