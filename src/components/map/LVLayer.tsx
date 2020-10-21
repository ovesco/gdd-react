import React, { useMemo } from 'react';
import { useEffect, useGlobal } from 'reactn';
import { useParams } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';

import { Bubble } from '../../global';
import { useAsyncMemo } from '../../hooks/useAsyncMemo';
import LVMapLayer from './LVMapLayer';
import LVTopologyLayer from './LVTopologyLayer';
import TopologyProvider from '../../assets/generator/TopologyProvider';

type Props = {
  map: mapboxgl.Map;
  width: number;
  height: number;
};

const LVLayer: React.FunctionComponent<Props> = ({ map, width, height }) => {

  const provider = new TopologyProvider();
  const { mvNodeId } = useParams() as any;
  const [mvNodes] = useGlobal('mvNodes');
  const [topologyMode] = useGlobal('lvTopologyMode');

  const subTopology = useAsyncMemo<Bubble | null>(async () => {
    const mvNode = mvNodes.find(it => it.nodeId === mvNodeId);
    if (mvNode) return await provider.getLVBubble(mvNode);
    return null;
  }, [mvNodeId, mvNodes], null);

  useEffect(() => {
    const mapCanvas = map.getCanvasContainer().querySelector('canvas') as HTMLCanvasElement;
    mapCanvas.style.transition = 'opacity .2s';
    if (topologyMode) {
      mapCanvas.style.opacity = '0.2';
    } else {
      mapCanvas.style.opacity = '1';
    }
  }, [topologyMode]);

  const mappedSubTopology = useMemo(() => {
    if (!subTopology) return null;
    return subTopology.lvNodes.reduce((acc, it) => {
      // @ts-ignore
      acc[it.nodeId] = it;
      return acc;
    }, {});
  }, [subTopology]) as any;

  if (subTopology === null) {
    return <>Loading</>;
  }
  if (topologyMode) {
    return <LVTopologyLayer subTopology={subTopology} mappedSubTopology={mappedSubTopology} width={width} height={height} />
  } else {
    return (
      <LVMapLayer map={map} subTopology={subTopology} mappedSubTopology={mappedSubTopology} />
    );
  }
}


export default LVLayer;