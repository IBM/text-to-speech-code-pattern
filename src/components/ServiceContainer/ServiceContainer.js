import React, { useRef, useState } from 'react';
import fetch from 'isomorphic-fetch';
import synthesize from 'watson-speech/text-to-speech/synthesize';
import ControlContainer from '../ControlContainer';
import OutputContainer from '../OutputContainer';
import Toast from '../Toast';
import { createError } from '../../utils';

const TOKEN_ERROR_TITLE = 'Authentication error';
const SYNTHESIZE_ERROR_TITLE = 'Text synthesis error';
const GDPR_DISCLAIMER =
  'This system is for demonstration purposes only and is not intended to process Personal Data. No Personal Data is to be entered into this system as it may not have the necessary controls in place to meet the requirements of the General Data Protection Regulation (EU) 2016/679.';

export const ServiceContainer = () => {
  const [error, setError] = useState();
  let audioElementRef = useRef(null);

  const onSynthesize = async (text, voice) => {
    let authResponse;
    let authJson;
    authResponse = await fetch('/api/auth');
    authJson = await authResponse.json();
    if (!authResponse.ok) {
      setError(createError(TOKEN_ERROR_TITLE, authJson));
    }

    try {
      synthesize({
        accessToken: authJson.accessToken,
        element: audioElementRef.current,
        text,
        voice: voice.id,
      });
    } catch (error) {
      setError(createError(SYNTHESIZE_ERROR_TITLE, error));
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
