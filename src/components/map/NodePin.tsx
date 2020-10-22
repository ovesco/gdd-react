import React, { useCallback, useMemo } from 'react';
import { useGlobal } from 'reactn';
import styled from 'styled-components';

import { Node } from '../../global';
import useNodeMatchingEvents from '../../hooks/useNodeMatchingEvents';
import { eventMetadatas } from '../../events';

type Props = {
  node: Node;
  color: string;
}

const pinPath = "M 0 0 L -5 -8 C -15 -23 -7.4 -32 0 -32 H 0 C 7.4 -32 15 -23 5 -8 L 0 0 Z M 0 -27 C -3 -27 -5 -25 -5 -22 S -3 -17 0 -17 S 5 -19 5 -22 S 3 -27 0 -27 Z";

const Pin = styled.path<{ active: boolean }>`
  stroke: white;
  stroke-width: 2;
  ${e => e.active ? `
  filter: drop-shadow(0 0 5px rgba(0,0,0,0.2));
  ` : ''}
`;

const NotifCircle = styled.circle`
  fill: red;
  stroke: white;
  stroke-width: 2;
`;

const NotifNumber = styled.text`
  stroke: white;
  font-size: 0.6rem;
`;

const PinGroup = styled.g`
  transition: transform .2s, scale .2s, opacity .2s;
`;

const NodePin: React.FunctionComponent<Props> = ({ node, color }) => {

  const [nodeMenu, setNodeMenu] = useGlobal('nodeMenu');
  const [detailNodeId] = useGlobal('detailNodeId');
  const [isHidden, matchingEvents] = useNodeMatchingEvents(node.nodeId);
  const toggleMenu = useCallback(() => {
    const val = nodeMenu === node ? null : node;
    setNodeMenu(val);
  }, [nodeMenu, node]);

  const pinColor = useMemo(() => {
    if (matchingEvents.length === 0) return color;
    const [r, g, b] = eventMetadatas[matchingEvents[0].type].color;
    return `rgb(${r}, ${g}, ${b})`;
  }, [matchingEvents]);
  

  return (
    <>
      <PinGroup transform={`scale(${detailNodeId === node.nodeId ? 1.6 : 1.3})`} className="cursor-pointer" onClick={toggleMenu} style={{ opacity: isHidden ? 0.2 : 1 }}>
        <Pin d={pinPath} fill={pinColor} active={detailNodeId === node.nodeId} />
        {matchingEvents.length > 0 && (
          <>
            <NotifCircle r={8} cx={10} cy={-30} />
            <NotifNumber text-anchor="middle" x={8} y={-27}>{matchingEvents.length}</NotifNumber>
          </>
        )}
      </PinGroup>
    </>
  );
};

export default NodePin;