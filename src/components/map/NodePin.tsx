import React, { useCallback, useMemo } from 'react';
import { useGlobal } from 'reactn';
import styled from 'styled-components';

import { Node } from '../../global';
import useNodeMatchingEvents from '../../hooks/useNodeMatchingEvents';
import useIsHidden from '../../hooks/useHighlightedNodeHidden';
import { eventMetadatas, getColor } from '../../events';

type Props = {
  node: Node;
  color: string;
}

const pinPath = "M 0 0 L -5 -8 C -15 -23 -7.4 -32 0 -32 H 0 C 7.4 -32 15 -23 5 -8 L 0 0 Z M 0 -27 C -3 -27 -5 -25 -5 -22 S -3 -17 0 -17 S 5 -19 5 -22 S 3 -27 0 -27 Z";

const Pin = styled.path<{ active: boolean }>`
  stroke: ${e => e.active ? 'lightgreen' : 'white'};
  stroke-width: 2;
  ${e => e.active ? `
  filter: drop-shadow(0 0 5px rgba(0,0,0,0.2));
  ` : ''}
`;

const NotifCircle = styled.circle<{ color: string }>`
  fill: ${e => e.color};
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

  const [nodeMenuId, setNodeMenuId] = useGlobal('nodeMenuId');
  const [detailNodeId] = useGlobal('detailNodeId');
  const [, matchingHappened, matchingFuture] = useNodeMatchingEvents(node.nodeId);
  const isHidden = useIsHidden(node.nodeId);
  const toggleMenu = useCallback(() => {
    const val = nodeMenuId === node.nodeId ? null : node.nodeId;
    setNodeMenuId(val);
  }, [nodeMenuId, node]);

  const pinColor = useMemo(() => {
    if (matchingFuture.length > 0) return getColor(eventMetadatas[matchingFuture[0].type].color);
    // else if (matchingHappened.length > 0) return getColor(eventMetadatas[matchingHappened[0].type].color);
    return node.type === 'mv' ? '#34a853' : '#5491f5';
  }, [matchingHappened, matchingFuture]);

  return (
    <>
      <PinGroup transform={`scale(${detailNodeId === node.nodeId ? 1.6 : 1.3})`} className="cursor-pointer" onClick={toggleMenu} style={{ opacity: isHidden ? 0.2 : 1 }}>
        <Pin d={pinPath} fill={pinColor} active={detailNodeId === node.nodeId} />
        {matchingFuture.length > 0 && (
          <>
            <NotifCircle r={8} cx={10} cy={-30} color='red' />
            <NotifNumber text-anchor="middle" x={8} y={-27}>{matchingFuture.length}</NotifNumber>
          </>
        )}
        {matchingHappened.length > 0 && (
          <>
            <NotifCircle r={8} cx={-10} cy={-30} color='#fcba03' />
            <NotifNumber text-anchor="middle" x={-13} y={-27}>{matchingHappened.length}</NotifNumber>
          </>
        )}
      </PinGroup>
    </>
  );
};

export default NodePin;