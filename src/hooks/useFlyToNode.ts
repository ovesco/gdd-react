import { useGlobal } from 'reactn';
import { Map } from 'mapbox-gl';
import { useEffect } from 'react';
import { Node } from '../global';

export default (map: Map, nodes: Node[]) => {
  const [nodeId] = useGlobal('detailNodeId');

  useEffect(() => {
    const node = nodes.find((it) => it.nodeId === nodeId);
    if (node) {
      const bounds = map.getBounds();
      const longDiff = (bounds.getSouthEast().lng - bounds.getNorthWest().lng) / (2 * 2);
      map.flyTo({ center: [ node.lng + longDiff, node.lat ], duration: 400 });
    }
  }, [nodeId, nodes]);
};