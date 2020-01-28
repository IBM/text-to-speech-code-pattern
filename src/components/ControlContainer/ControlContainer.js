import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import VolumeUp24Filled from '@carbon/icons-react/lib/volume--up--filled/24';
import {
  Button,
  Dropdown,
  DropdownSkeleton,
  FormGroup,
  TextArea,
  Tile,
} from 'carbon-components-react';
import useDataApi from 'use-data-api';
import { sampleText } from '../../data/sampleText';
import { mapVoicesToDropdownItems } from './utils';

const VOICES_ENDPOINT = '/api/voices';

export const ControlContainer = ({ onSynthesize }) => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState();
  const [text, setText] = useState('');

  const [{ data, isLoading, isError }, doFetch] = useDataApi(VOICES_ENDPOINT, {
    voices: [],
  });

  useEffect(() => {
    doFetch(VOICES_ENDPOINT);
    setVoices(data.voices);
  }, [data, doFetch, isError, isLoading]);

  // Default to initial voice once all voices are loaded.
  useEffect(() => {
    if (voices[1]) {
      onSelectVoice(mapVoicesToDropdownItems(voices)[1]);
    }
  }, [voices]);

  const onSelectVoice = voice => {
    setSelectedVoice(voice);

    const text = sampleText[voice.id];
    setText(text);
  };

  return (
    <Tile className="control-container">
      <h3 className="container-title">Input</h3>
      <p className="voice-info">
        For optimal naturalness, select the (V3) voices, which are built using
        deep neural networks.
      </p>
      <FormGroup legendText="Voice model">
        {isLoading || (voices.length === 0 && !isError) ? (
          <DropdownSkeleton />
        ) : (
          <Dropdown
            id="voice-model-dropdown"
            label="Select a voice model"
            onChange={newModel => {
              onSelectVoice(newModel.selectedItem);
            }}
            items={mapVoicesToDropdownItems(voices)}
            selectedItem={selectedVoice && selectedVoice.label}
            defaultText="Select a voice model"
            ariaLabel="Voice model selection dropdown"
            light
          />
        )}
      </FormGroup>
      <FormGroup legendText="Text to synthesize">
        <TextArea
          id="text-input"
          labelText="Text input"
          placeholder="Enter text to synthesize"
          hideLabel
          invalidText="Invalid text provided"
          value={text}
          onChange={evt => {
            setText(evt.target.value);
          }}
          light
        />
      </FormGroup>
      <Button
        disabled={!selectedVoice || !text}
        kind="primary"
        onClick={() => onSynthesize(text, selectedVoice)}
        renderIcon={VolumeUp24Filled}
      >
        Synthesize
      </Button>
    </Tile>
  );
};

ControlContainer.propTypes = {
  onSynthesize: PropTypes.func,
};

ControlContainer.defaultProps = {
  onSynthesize: () => {},
};

export default ControlContainer;
