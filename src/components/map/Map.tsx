import React, { useEffect, useRef, useState } from 'react';
import { useGlobal } from 'reactn';
import mapboxgl from 'mapbox-gl';

import D3Layer from './D3Layer';
import MapOverlay from '../overlay/MapOverlay';
import LayerContainer from './LayerContainer';
import useHTMLElementDimensions from '../../hooks/useHTMLElementDimensions';

import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = "pk.eyJ1Ijoic3lzbW9oIiwiYSI6ImNqZjJqODB4MzAyemMyd3A0OTVta285ZzYifQ.aDK6iyJWkqnrmtwEmiZGIw";

const Map: React.FunctionComponent = () => {

  const container = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const dim = useHTMLElementDimensions(container);
  const [mvNodes] = useGlobal('mvNodes');

  useEffect(() => {
    setMap(new mapboxgl.Map({
      container: container.current as HTMLDivElement,
      style: 'mapbox://styles/sysmoh/ckg2d1on80lsn19qhenzr02m4',
      center: [6.634626388549805, 46.524914365934364],
      zoom: 12,
      doubleClickZoom: false,
    }));
  }, []);
  
  return (
    <div>
      <div ref={container} style={{ height: '100vh', width: '100vw' }}>
        {map && (
          <>
            <MapOverlay map={map} />
            <LayerContainer container={map.getCanvasContainer()}>
              <D3Layer map={map as mapboxgl.Map} width={dim[0]} height={dim[1]} nodes={mvNodes} />
            </LayerContainer>
          </>
        )}
      </div>
    </div>
  );
};

export default Map;