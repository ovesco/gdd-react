import React from 'react';
import mapboxgl from 'mapbox-gl';

import { Node } from '../../global';
import MVNode from './MVNode';
import NodeWrapper from './NodeWrapper';

type Props = {
  map: mapboxgl.Map;
  nodes: Node[];
};

const MVLayer: React.FunctionComponent<Props> = ({ nodes, map }) => {
  return (
    <>
      {nodes.filter(it => it.nodeId === 'mv-18').map((it) => {
        const { x, y } = map.project([it.lng, it.lat]);
        return (
          <NodeWrapper node={it} x={x} y={y} key={it.nodeId}>
            <MVNode node={it} />
          </NodeWrapper>
        );
      })}
    </>
  );
}


export default MVLayer;