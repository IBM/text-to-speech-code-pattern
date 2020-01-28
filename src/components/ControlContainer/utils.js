// This function removes V2 models from selection and does a little extra formatting to the labels.
export const mapVoicesToDropdownItems = voices =>
  voices
    .filter(voice => voice.name.indexOf('V2') === -1)
    .sort((voiceA, voiceB) =>
      voiceA.description.localeCompare(voiceB.description),
    )
    .map(voice => {
      const isV3 = voice.name.indexOf('V3') > -1;
      const colonIndex = voice.description.indexOf(':');
      const voicePersonName = voice.description.substring(0, colonIndex);
      const restOfDescription = voice.description.substring(
        colonIndex + 1,
        voice.description.indexOf('.'),
      );
      const label = `${voicePersonName}${
        isV3 ? ' (V3)' : ''
      }:${restOfDescription}`;

      return {
        id: voice.name,
        label,
      };
    });
