import React from 'react';
import { useGlobal } from 'reactn';
import { IconType } from 'react-icons';
import styled from 'styled-components';

type Props = {
  onClick?: () => any;
  text: string;
  icon: IconType;
  i: number;
  last?: boolean;
}

const MenuButton = styled.rect`
`;

const ButtonGroup = styled.g`
  rect{
    fill: white;
  }

  &:hover rect {
    fill: #eee;
  }
`;

const ButtonText = styled.text`
  fill: #444;
  font-size: 0.8rem;
`;

const NodeMenu: React.FunctionComponent<Props> = ({ onClick, icon, text, i, last }) => {
  const Icon = icon;

  const [n, setNodeMenu] = useGlobal('nodeMenu');
  const clicked = () => {
    if (onClick) {
      setNodeMenu(null);
      onClick();
    }
  };

  return (
    <ButtonGroup className="cursor-pointer" onClick={clicked} transform={`translate(0, ${(i*35) + i})`}>
      <MenuButton width={250} height={35} />
      <line x1={0} y1={0} x2={250} y2={0} stroke="#eee" strokeWidth={1} />
      {last === true && (
        <line x1={0} y1={35} x2={250} y2={35} stroke="#eee" strokeWidth={1} />
      )}
      <Icon x={7} y={7} style={{ fontSize: "1.3rem" }} />
      <ButtonText x={40} y={22} pointer-events="none">{text}</ButtonText>
    </ButtonGroup>
  );
};

export default NodeMenu;