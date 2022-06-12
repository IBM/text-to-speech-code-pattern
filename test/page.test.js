/* eslint-disable no-undef */
jest.setTimeout(10000);

describe('App functionality', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:5000');
  });

  it('Text synthesis', async () => {
    await page.waitFor('div.cds--dropdown', {
      timeout: 0,
    });

    // Choose voice model.
    await expect(page).toClick('div.cds--dropdown');
    await expect(page).toClick('div.cds--list-box__menu-item__option', {
      text: 'Allison (V3): American English female voice',
    });

    // Add some text.
    await expect(page).toFill(
      'textarea.cds--text-area',
      'Good news, good news, good news, thats all they wanna hear.',
    );

    // Synthesize text.
    await expect(page).toClick('button', {
      text: 'Synthesize',
    });

    // Wait for the audio to play for a bit.
    await page.waitFor(1000);

    // Assert that the audio element now has a source.
    const audioElement = await page.$('audio.audio-output');
    const audioSrc = await audioElement.getProperty('src');
    expect(audioSrc).toBeTruthy();
  });
});
