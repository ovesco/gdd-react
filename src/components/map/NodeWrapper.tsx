import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { useGlobal } from 'reactn';
import { useHistory } from 'react-router-dom';
import { RiBubbleChartLine, RiBarChartBoxLine } from 'react-icons/ri';
import styled from 'styled-components';

import { Node } from '../../global';
import useHidden from '../../hooks/useHighlightedNodeHidden';

import NodeMenu from './NodeMenu/NodeMenu';
import MenuEvent from './NodeMenu/MenuEvent';
import MenuButton from './NodeMenu/MenuButton';


type Props = {
  node: Node;
  x: number;
  y: number;
  rotate?: number;
}

const TextContainer = styled.rect`
  fill: rgba(0,0,0,0.6);
`;

const NodeNameText = styled.text`
  fill: white;
  font-family: 'Roboto', sans-serif;
`;

const NameGroup = styled.g`
  transition: opacity .2s;
`;

const NodeWrapper: React.FunctionComponent<Props> = ({ node, x, y, rotate, children }) => {

  const history = useHistory();
  const textRef = useRef<SVGTextElement>(null);
  const [textWidth, setTextWidth] = useState(0); // height = 14
  const [showNames] = useGlobal('showNodeNames');
  const [openNodeMenuId] = useGlobal('nodeMenuId');
  const [detailNodeId, setDetailNodeId] = useGlobal('detailNodeId');
  const [events] = useGlobal('events');
  const nodeHidden = useHidden(node.nodeId);
  const matchingEvents = useMemo(() => {
    if (node) return events.filter((it) => it.mvNodes.includes(node.nodeId) || it.lvNodes.includes(node.nodeId));
    return [];
  }, [node, events]);

  const move = useCallback(() => node ? history.push(`/mv/${node.nodeId}`) : null, [node]);
  const showDetail = useCallback(() => node ? setDetailNodeId(node.nodeId) : null, [node, detailNodeId]);

  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.getBBox().width);
    }
  }, [textRef, showNames]);


  const CorrectNodeMenu = useMemo(() => {
    if (node.type === 'mv') {
      return (
        <NodeMenu node={node}>
          <MenuButton i={0} icon={RiBubbleChartLine} text="Open bubble" onClick={move} />
          <MenuButton i={1} icon={RiBarChartBoxLine} text="Show aggregated details" onClick={showDetail} last={true} />
          {matchingEvents.map((it, i) => <MenuEvent key={it.eventId} event={it} i={i + 2} />)}
        </NodeMenu>
      )
    } else return (
      <NodeMenu node={node}>
        <MenuButton i={0} icon={RiBarChartBoxLine} text="Show node details" onClick={showDetail} last={true} />
        {matchingEvents.map((it, i) => <MenuEvent key={it.eventId} event={it} i={i + 1} />)}
      </NodeMenu>
    )
  }, [node]);
  
  return (
    <NameGroup transform={`translate(${x}, ${y}) ${rotate ? `, rotate(${rotate})`: ''}`} style={{ opacity: nodeHidden ? 0.2 : 1 }}>
      {openNodeMenuId === node.nodeId && CorrectNodeMenu}
      {children}
      {showNames && (
        <>
          <TextContainer width={textWidth + 10} height={20} x={-(10 + textWidth) / 2} y={5} rx={5} ry={5} />
          <NodeNameText ref={textRef} x={-(textWidth / 2)} y={19}>{node.nodeId}</NodeNameText>
        </>
      )}
    </NameGroup>
  );
};

export default NodeWrapper;