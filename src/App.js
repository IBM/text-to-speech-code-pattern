import React from 'react';
import { Button, Link } from '@carbon/react';
import {
  Api_1,
  Document,
  IbmCloud,
  Launch,
  LogoGithub,
} from '@carbon/react/icons';
import Header from './components/Header';
import ServiceContainer from './components/ServiceContainer';
import useScript from './hooks/useScript';

const HEADER_TITLE = 'Watson Text to Speech';
const HEADER_DESCRIPTION =
  'The Watson Text to Speech service understands text and natural language to generate synthesized audio output complete with appropriate cadence and intonation.';
const HEADER_LINKS = [
  <Link
    className="link"
    key="api-link"
    target="_blank"
    rel="noopener noreferrer"
    href="https://cloud.ibm.com/apidocs/text-to-speech/text-to-speech"
  >
    <p className="link-text">API reference</p>
    <Api_1 className="link-icon" size={24} />
  </Link>,
  <Link
    className="link"
    key="docs-link"
    target="_blank"
    rel="noopener noreferrer"
    href="https://cloud.ibm.com/docs/services/text-to-speech?topic=text-to-speech-gettingStarted"
  >
    <p className="link-text">Documentation</p>
    <Document className="link-icon" size={24} />
  </Link>,
  <Link
    className="link"
    key="github-link"
    target="_blank"
    rel="noopener noreferrer"
    href="https://github.com/IBM/text-to-speech-code-pattern"
  >
    <p className="link-text">GitHub</p>
    <LogoGithub className="link-icon" size={24} />
  </Link>,
  <Link
    className="link getting-started"
    key="ibm-cloud-link"
    target="_blank"
    rel="noopener noreferrer"
    href="https://cloud.ibm.com/registration?target=%2Fdeveloper%2Fwatson%2Flaunch-service%2Ftext-to-speech%3FhideTours%3Dtrue"
  >
    <Button className="link-button" kind="tertiary" renderIcon={(props) => <Launch size={16} {...props} />}>
      Start for free on IBM Cloud
    </Button>
    <IbmCloud className="link-icon" size={24} />
  </Link>,
];

export const App = () => {
  useScript(
    'https://cdn.jsdelivr.net/gh/watson-developer-cloud/watson-developer-cloud.github.io@master/analytics.js',
  );

  return (
    <div className="app-container">
      <Header
        description={HEADER_DESCRIPTION}
        links={HEADER_LINKS}
        title={HEADER_TITLE}
      />
      <ServiceContainer />
    </div>
  );
};

export default App;
