import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useGlobal } from 'reactn';
import mapboxgl from 'mapbox-gl';

type Props = {
  map: mapboxgl.Map;
};

const LVLayer: React.FunctionComponent<Props> = ({ map }) => {

  const [topologyMode, setTopologyMode] = useGlobal('lvTopologyMode');
  const { pathname } = useLocation();

  useEffect(() => {
    setTopologyMode(false);
  }, [pathname]);

  useEffect(() => {
    const mapCanvas = map.getCanvasContainer().querySelector('canvas') as HTMLCanvasElement;
    mapCanvas.style.transition = 'opacity .3s';
    if (topologyMode) {
      mapCanvas.style.opacity = '0.1';
      map.scrollZoom.disable();
      map.dragPan.disable();
    } else {
      mapCanvas.style.opacity = '1';
      map.scrollZoom.enable();
      map.dragPan.enable();
    }
  }, [topologyMode]);

  return null;
}


export default LVLayer;