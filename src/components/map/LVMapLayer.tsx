import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

import { Bubble, Node } from '../../global';
import NodePin from './NodePin';
import NodeWrapper from './NodeWrapper';
import Line from './Line';

type Props = {
  map: mapboxgl.Map;
  subTopology: Bubble;
  mappedSubTopology: { [key: string]: Node };
};

const LVMapLayer: React.FunctionComponent<Props> = ({ map, subTopology, mappedSubTopology }) => {

  useEffect(() => {
    const nodeLats = subTopology.lvNodes.map((it) => it.lat);
    const nodeLngs = subTopology.lvNodes.map((it) => it.lng);
    const minLng = Math.min(...nodeLngs);
    const minLat = Math.min(...nodeLats);
    const zoom = map.getZoom();

    map.flyTo({ center: [
      ((Math.max(...nodeLngs) - minLng) / 2) + minLng,
      ((Math.max(...nodeLats) - minLat) / 2) + minLat,
    ], duration: 600, zoom: zoom > 14 ? zoom : 14.5 });
  }, [subTopology]);

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
              <NodePin node={it} color="#5491f5" />
            </NodeWrapper>
          );
        })}
      </>
    </>
  );
}


export default LVMapLayer;