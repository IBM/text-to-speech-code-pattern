import React, { useRef, useState } from 'react';
import ControlContainer from '../ControlContainer';
import OutputContainer from '../OutputContainer';
import Toast from '../Toast';
import { createError } from '../../utils';
import { canPlayAudioFormat, getSearchParams } from './utils';

const SYNTHESIZE_ERROR_TITLE = 'Text synthesis error';
const GDPR_DISCLAIMER =
  'This system is for demonstration purposes only and is not intended to process Personal Data. No Personal Data is to be entered into this system as it may not have the necessary controls in place to meet the requirements of the General Data Protection Regulation (EU) 2016/679.';

export const ServiceContainer = () => {
  const [error, setError] = useState();
  let audioElementRef = useRef(null);

  const getSynthesizeUrl = (text, voice) => {
    const params = getSearchParams();

    params.set('text', text);
    params.set('voice', voice.id);

    let accept;
    if (canPlayAudioFormat('audio/mp3', audioElementRef.current)) {
      accept = 'audio/mp3';
    } else if (
      canPlayAudioFormat('audio/ogg;codec=opus', audioElementRef.current)
    ) {
      accept = 'audio/ogg;codec=opus';
    } else if (canPlayAudioFormat('audio/wav', audioElementRef.current)) {
      accept = 'audio/wav';
    }
    if (accept) {
      params.set('accept', accept);
    }

    return `/api/synthesize?${params.toString()}`;
  };

  const onSynthesize = async (text, voice) => {
    try {
      audioElementRef.current.setAttribute(
        'src',
        getSynthesizeUrl(text, voice),
      );
      await audioElementRef.current.play();
    } catch (err) {
      setError(createError(SYNTHESIZE_ERROR_TITLE, err.message));
    }
  };

  return (
    <div className="service-container">
      <Toast kind="info" subtitle={GDPR_DISCLAIMER} />
      {error && (
        <Toast
          kind="error"
          title={error.title}
          subtitle={error.description}
          hideAfterFirstDisplay={false}
          timeout={5000}
          onCloseButtonClick={() => {
            setError(null);
          }}
        />
      )}
      <ControlContainer onSynthesize={onSynthesize} />
      <OutputContainer audioElementRef={audioElementRef} />
    </div>
  );
};

export default ServiceContainer;
