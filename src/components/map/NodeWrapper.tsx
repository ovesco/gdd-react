import React, { useRef, useEffect, useState } from 'react';
import { useGlobal } from 'reactn';
import styled from 'styled-components';

import { Node } from '../../global';
import useSvgDimensions from '../../hooks/useSVGDimensions';

type Props = {
  node: Node;
  x: number;
  y: number;
}

const TextContainer = styled.rect`
  fill: rgba(0,0,0,0.6);
`;

const NodeNameText = styled.text`
  fill: white;
  font-family: 'Roboto', sans-serif;
`;

const NodeWrapper: React.FunctionComponent<Props> = ({ node, x, y, children }) => {

  const textRef = useRef<SVGTextElement>(null);
  const [textWidth, setTextWidth] = useState(0); // height = 14
  const [showNames] = useGlobal('showNodeNames');

  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.getBBox().width);
    }
  }, [textRef.current, showNames]);
  
  return (
    <g transform={`translate(${x}, ${y})`}>
      {children}
      {showNames && (
        <>
          <TextContainer width={textWidth + 10} height={20} x={-(10 + textWidth) / 2} y={5} rx={5} ry={5} />
          <NodeNameText ref={textRef} x={-(textWidth / 2)} y={19}>{node.nodeId}</NodeNameText>
        </>
      )}
    </g>
  );
};

export default NodeWrapper;