import React from 'react';
import { IconType } from 'react-icons';
import styled from 'styled-components';

type Props = {
  onClick?: () => any;
  text: string;
  icon: IconType;
  i: number;
}

const MenuButton = styled.rect`
  transition: fill .2s;
  fill: white;

  &:hover {
    fill: #eee;
  }
`;

const ButtonText = styled.text`
  fill: #444;
  font-size: 0.8rem;
`;

const NodeMenu: React.FunctionComponent<Props> = ({ onClick, icon, text, i }) => {
  const Icon = icon;

  return (
    <g className="cursor-pointer" onClick={onClick} transform={`translate(0, ${(i*35) + i})`}>
      <MenuButton width={250} height={35} />
      <line x1={0} y1={35} x2={250} y2={35} stroke="#eee" strokeWidth={1} />
      <Icon x={7} y={7} style={{ fontSize: "1.3rem" }} />
      <ButtonText x={40} y={22}>{text}</ButtonText>
    </g>
  );
};

export default NodeMenu;