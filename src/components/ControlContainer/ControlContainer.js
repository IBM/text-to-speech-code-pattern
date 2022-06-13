import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { VolumeUpFilled } from '@carbon/react/icons';
import {
  Button,
  Dropdown,
  DropdownSkeleton,
  FormGroup,
  TextArea,
  Tile,
} from '@carbon/react';
import axios from 'axios';
import { sampleText } from '../../data/sampleText';
import { mapVoicesToDropdownItems } from './utils';

const VOICES_ENDPOINT = '/api/voices';

export const ControlContainer = ({ onSynthesize }) => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState();
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Get voices data
  useEffect(() => {
    axios(VOICES_ENDPOINT)
      .then(({ data }) => setVoices(data.voices))
      .catch(err => {
        console.log(err);
        setIsError(true);
      })
      .finally(setIsLoading(false));
  }, []);

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
            onChange={(newModel) => {
              onSelectVoice(newModel.selectedItem);
            }}
            items={mapVoicesToDropdownItems(voices)}
            selectedItem={selectedVoice && selectedVoice.label}
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
        renderIcon={(props) => <VolumeUpFilled size={24} {...props} />}
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
