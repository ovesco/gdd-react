import React, { useMemo } from 'react';
import { useEffect, useGlobal } from 'reactn';
import { useParams } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';

import { Bubble, Node } from '../../global';
import { useAsyncMemo } from '../../hooks/useAsyncMemo';
import LVNode from './LVNode';
import NodeWrapper from './NodeWrapper';
import Line from './Line';
import TopologyProvider from '../../assets/generator/TopologyProvider';

type Props = {
  map: mapboxgl.Map;
};

const LVLayer: React.FunctionComponent<Props> = ({ map }) => {

  const provider = new TopologyProvider();
  const { mvNodeId } = useParams() as any;
  const [ mvNodes ] = useGlobal('mvNodes');

  const subTopology = useAsyncMemo<Bubble | null>(async () => {
    const mvNode = mvNodes.find(it => it.nodeId === mvNodeId);
    if (mvNode) return await provider.getLVBubble(mvNode);
    return null;
  }, [mvNodeId, mvNodes], null);

  const mappedSubTopology = useMemo(() => {
    if (!subTopology) return null;
    return subTopology.lvNodes.reduce((acc, it) => {
      // @ts-ignore
      acc[it.nodeId] = it;
      return acc;
    }, {});
  }, [subTopology]) as any;

  useEffect(() => {
    if (subTopology) {
      const nodeLats = subTopology.lvNodes.map((it) => it.lat);
      const nodeLngs = subTopology.lvNodes.map((it) => it.lng);
      const minLng = Math.min(...nodeLngs);
      const minLat = Math.min(...nodeLats);
      const zoom = map.getZoom();
  
      map.flyTo({ center: [
        ((Math.max(...nodeLngs) - minLng) / 2) + minLng,
        ((Math.max(...nodeLats) - minLat) / 2) + minLat,
      ], duration: 600, zoom: zoom > 14 ? zoom : 14 });
    }
  }, [subTopology]);

  if (subTopology === null) {
    return <>Loading</>;
  } else {
    return (
      <>
        <>
          {subTopology.lvLines.map((it) => {
            const source = mappedSubTopology[it.source] as Node;
            const target = mappedSubTopology[it.target] as Node;
            const sourcePos = map.project([ source.lng, source.lat ]);
            const targetPos = map.project([ target.lng, target.lat ]);
            return <Line x1={sourcePos.x} x2={targetPos.x} y1={sourcePos.y} y2={targetPos.y} key={it.lineId} />;
          })}
        </>
        <>
          {subTopology.lvNodes.map((it) => {
            const { x, y } = map.project([it.lng, it.lat]);
            return (
              <NodeWrapper x={x} y={y} node={it} key={it.nodeId}>
                <LVNode node={it} />
              </NodeWrapper>
            );
          })}
        </>
      </>
    );
  }
}


export default LVLayer;