import React, { useRef, useMemo } from 'react';
import styled from 'styled-components';

import { Node } from '../../../global';
import useSvgDimensions from '../../../hooks/useSVGDimensions';

type Props = {
  node: Node;
}

const MenuContainer = styled.rect`
  fill: white;
  filter: drop-shadow(0 3px 5px rgba(0,0,0,0.1));
`;

const MenuTitle = styled.rect`
  fill: transparent;
`;

const TitleText = styled.text`
  fill: #555;
  font-size: 1rem;
`;

const Arrow = styled.path`
  stroke: white;
  stroke-width: 8;
  filter: drop-shadow(0 3px 3px rgba(0,0,0,0.1));
`;

const NodeMenu: React.FunctionComponent<Props> = ({ node, children }) => {

  const titleRef = useRef<SVGTextElement>(null);
  const dim = useSvgDimensions(titleRef);
  const btnsHeight = useMemo(() => {
    return Array.isArray(children) ? children.filter((it) => Array.isArray(it) ? it.length > 0 : true).length * 35 : 35;
  }, [children]);

  return (
    <g transform={`translate(-125, -${btnsHeight + 35 + 70 + 5})`}>
      <MenuContainer width={250} height={btnsHeight + 35 + 5} rx={5} ry={5} />
      <MenuTitle width={250} height={35} />
      <TitleText y={24} ref={titleRef} x={125 - (dim[0] / 2)}>{node.nodeId}</TitleText>
      <g transform="translate(0, 35)">
        {children}
      </g>
      <Arrow d="M 1 0 L 5 0 L 3 2 Z" transform={`translate(122, ${btnsHeight + 35 + 8})`} />
    </g>
  );
};

export default NodeMenu;