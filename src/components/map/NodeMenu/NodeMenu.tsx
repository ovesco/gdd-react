import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BiPlus } from 'react-icons/bi';

import { Node } from '../../../global';
import useSvgDimensions from '../../../hooks/useSVGDimensions';
import MenuButton from './MenuButton';

type Props = {
  node: Node;
  ref?: React.RefObject<SVGGElement>;
}

const MenuContainer = styled.rect`
  fill: white;
  filter: drop-shadow(0 1px 3px rgba(0,0,0,0.1));
`;

const MenuTitle = styled.rect`
  fill: rgb(245,245,245);
`;

const TitleText = styled.text`
  fill: #555;
  font-size: 1rem;
`;

const Arrow = styled.path`
  stroke: white;
  stroke-width: 8;
  filter: drop-shadow(0 1px 3px rgba(0,0,0,0.1));
`;

const NodeMenu: React.FunctionComponent<Props> = ({ node, ref }) => {

  const titleRef = useRef<SVGTextElement>(null);
  const dim = useSvgDimensions(titleRef);

  return (
    <g transform="translate(-125, -215)" ref={ref}>
      <MenuContainer width={250} height={150} />
      <Arrow d="M 1 0 L 5 0 L 3 2 Z" fill="black" transform='translate(122, 153)' />
      <MenuTitle width={250} height={35} />
      <TitleText y={24} ref={titleRef} x={125 - (dim[0] / 2)}>{node.nodeId}</TitleText>
      <g transform="translate(0, 35)">
        <MenuButton text="C'est qui le plus beau" i={0} icon={BiPlus} onClick={() => alert("Mon bb c'est le plus beau")} />
        <MenuButton text="C'est qui le plus beau" i={1} icon={BiPlus} onClick={() => alert("Mon bb c'est le plus beau")} />
      </g>
    </g>
    
  );
};

export default NodeMenu;