import { useMemo } from 'react';
import { useGlobal } from 'reactn';

import { Node } from '../global';

export default (nodes: Node[]) => {

  const [nodeMenuId] = useGlobal('nodeMenuId');
  const nodeIds = useMemo(() => nodes.map((it) => it.nodeId), [nodes]);

  if (!nodeIds.includes(nodeMenuId as string)) return nodes;
  else return nodes.sort((a, b) => a.nodeId === nodeMenuId ? 1 : -1);
};