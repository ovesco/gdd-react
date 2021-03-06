import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

import { Node } from '../../global';
import NodePin from './NodePin';
import NodeWrapper from './NodeWrapper';

import useReorderNodes from '../../hooks/useReorderNodes';
import useFlyTo from '../../hooks/useFlyToNode';

type Props = {
  map: mapboxgl.Map;
  nodes: Node[];
};

const MVLayer: React.FunctionComponent<Props> = ({ nodes, map }) => {

  useEffect(() => {
    map.zoomTo(14);
  }, []);

  useFlyTo(map, nodes);

  const orderedNodes = useReorderNodes(nodes);

  return (
    <>
      {orderedNodes.map((it) => {
        const { x, y } = map.project([it.lng, it.lat]);
        return (
          <NodeWrapper node={it} x={x} y={y} key={it.nodeId}>
            <NodePin node={it} color="#34a853" />
          </NodeWrapper>
        );
      })}
    </>
  );
}


export default MVLayer;