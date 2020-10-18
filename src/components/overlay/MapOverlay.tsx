import React from 'react';
import styled from 'styled-components';
import mapboxgl from 'mapbox-gl';

import MapControls from './MapControls';

type Props = {
  map: mapboxgl.Map;
};

const Overlay = styled.div`
  width: 5rem;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
`;

const MapOverlay: React.FunctionComponent<Props> = ({ map }) => {
  return (
    <Overlay className="fixed">
      <MapControls map={map} />
    </Overlay>
  );
};

export default MapOverlay;