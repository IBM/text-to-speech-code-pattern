import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Tile } from 'carbon-components-react';

export const OutputContainer = ({ audioElementRef }) => {
  return (
    <Tile className="output-container">
      <h3 className="container-title">Output</h3>
      <FormGroup legendText="Synthesized audio">
        <audio className="audio-output" controls ref={audioElementRef}>
          Your browser does not support the <code>audio</code> element :(
        </audio>
      </FormGroup>
    </Tile>
  );
};

OutputContainer.propTypes = {
  audioElementRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

OutputContainer.defaultProps = {
  audioElementRef: null,
};

export default OutputContainer;
