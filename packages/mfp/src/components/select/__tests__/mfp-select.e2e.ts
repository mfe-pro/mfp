import { newE2EPage } from '@stencil/core/testing';
import { setProperties } from '../../../shared/test-utils';

describe('mfp-select', () => {
  it('should render', async () => {
    const page = await newE2EPage({
      html: `<mfp-select></mfp-select>`,
    });
    const element = await page.find('mfp-select');

    expect(element).toHaveClass('hydrated');
  });

  it('should have shadow root', async () => {
    const page = await newE2EPage({
      html: `<mfp-select></mfp-select>`,
    });
    const element = await page.find('mfp-select');

    expect(element.shadowRoot).not.toBeNull();
  });

  it('should render with default suffix icon', async () => {
    const page = await newE2EPage({
      html: `<mfp-select></mfp-select>`,
    });
    const suffixIconElem = await page.find('mfp-select >>> mfp-icon[name="caret-down"]');

    expect(suffixIconElem).not.toBeNull();
  });

  it('should render with prefix icon', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-select>
          <mfp-icon name="user-circle" slot="prefix"></mfp-icon>
        </mfp-select>
      `,
    });
    const prefixContainerElem = await page.find('mfp-select >>> .mfp-select__control--prefix');
    expect(prefixContainerElem).not.toHaveClass('hidden');
  });

  it('should render with label content', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-select>
          <label slot="label">Select label</label>
        </mfp-select>
      `,
    });
    const labelContainerElem = await page.find('mfp-select >>> .mfp-select__label');

    expect(labelContainerElem).not.toHaveClass('hidden');
  });

  it('should render with helper content', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-select>
          <span slot="helper-text">Helper text</span>
        </mfp-select>
      `,
    });
    const helperContainerElem = await page.find('mfp-select >>> .mfp-select__helper-text');

    expect(helperContainerElem).not.toHaveClass('hidden');
  });

  it('should render with options', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-select>
          <mfp-option value="1">Option 1</mfp-option>
          <mfp-option value="2">Option 2</mfp-option>
          <mfp-option value="3">Option 3</mfp-option>
        </mfp-select>
      `,
    });
    const options = await page.findAll('mfp-select > mfp-option');

    expect(options.length).toEqual(3);
  });

  it('should render with panel options opened', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-select open>
          <mfp-option value="1">Option 1</mfp-option>
          <mfp-option value="2">Option 2</mfp-option>
          <mfp-option value="3">Option 3</mfp-option>
        </mfp-select>
      `,
    });
    const selectPanelElem = await page.find('mfp-select >>> .mfp-select__dropdown >>> .mfp-dropdown__panel');

    expect(selectPanelElem).toHaveAttribute('open');
  });

  it('should render with selected option', async () => {
    const selectedValue = 1;
    const page = await newE2EPage({
      html: `
        <mfp-select value="${selectedValue}">
          <mfp-option value="1">Option 1</mfp-option>
          <mfp-option value="2">Option 2</mfp-option>
          <mfp-option value="3">Option 3</mfp-option>
        </mfp-select>
      `,
    });
    const selectValueElem = await page.find(`mfp-select mfp-option[value="${selectedValue}"]`);

    expect(selectValueElem).toHaveAttribute('selected');
  });

  it('should select an option and emit Select event', async () => {
    const value = 2;
    const page = await newE2EPage({
      html: `
        <mfp-select>
          <mfp-option value="1">Option 1</mfp-option>
          <mfp-option value="2">Option 2</mfp-option>
          <mfp-option value="3">Option 3</mfp-option>
        </mfp-select>
      `,
    });
    const optionSelector = `mfp-select > mfp-option[value="${value}"]`;
    const eventEmitter = await page.spyOnEvent('mfpSelect');

    const selectElem = await page.find('mfp-select');
    await selectElem.click();

    // Make sure the dropdown is open
    expect(await page.find('mfp-select >>> mfp-dropdown')).toHaveAttribute('open');

    // Make sure the option is not selected
    const optionElem = await page.find(optionSelector);
    expect(optionElem).not.toHaveAttribute('selected');

    await optionElem.click();
    await page.waitForChanges();

    // Make sure the dropdown is close
    expect(await page.find('mfp-select >>> mfp-dropdown')).not.toHaveAttribute('open');
    // Check that the option is selected
    expect(await page.find(optionSelector)).toHaveAttribute('selected');
    expect(eventEmitter).toHaveReceivedEventTimes(1);
  });

  it('should render with selected options', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-select multiple>
          <mfp-option value="1">Option 1</mfp-option>
          <mfp-option value="2">Option 2</mfp-option>
          <mfp-option value="3">Option 3</mfp-option>
        </mfp-select>
      `,
    });

    await setProperties(page, 'mfp-select', { value: JSON.stringify(['1', '2']) });

    const selectedValueElements = await page.findAll(`mfp-select mfp-option[selected]`);
    const displayTags = await page.findAll('mfp-select >>> mfp-tag');

    expect(selectedValueElements).toHaveLength(2);
    expect(displayTags).toHaveLength(2);
    expect(displayTags[0]).toEqualText('Option 1');
    expect(displayTags[1]).toEqualText('Option 2');
  });

  it('should rerender when value is change externally', async () => {
    const page = await newE2EPage({
      html: `
        <mfp-select multiple>
          <mfp-option value="1">Option 1</mfp-option>
          <mfp-option value="2">Option 2</mfp-option>
          <mfp-option value="3">Option 3</mfp-option>
        </mfp-select>
      `,
    });

    await setProperties(page, 'mfp-select', { value: JSON.stringify(['1', '2']) });

    expect(await page.findAll(`mfp-select mfp-option[selected]`)).toHaveLength(2);

    await setProperties(page, 'mfp-select', { value: JSON.stringify(['3']) });

    const displayTags = await page.findAll('mfp-select >>> mfp-tag');

    expect(await page.findAll(`mfp-select mfp-option[selected]`)).toHaveLength(1);
    expect(displayTags).toHaveLength(1);
    expect(displayTags[0]).toEqualText('Option 3');
  });
});
