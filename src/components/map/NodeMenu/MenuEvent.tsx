import React from 'react';
import styled from 'styled-components';
import { Event, eventMetadatas, getColor } from '../../../events';

type Props = {
  event: Event;
  i: number;
}

const EventBG = styled.rect`
  fill: #eee;
`;

const EventText = styled.text`
  fill: #444;
  font-size: 0.8rem;
`;

const MenuEvent: React.FunctionComponent<Props> = ({ event, i }) => {

  const metadatas = eventMetadatas[event.type];
  const color = getColor(metadatas.color);

  return (
    <g transform={`translate(0, ${(i*35) + i})`}>
      <EventBG width={250} height={35} />
      <rect width={240} height={25} x={5} y={5} rx={10} ry={10} fill={color} />
      <line x1={0} y1={35} x2={250} y2={35} stroke="#eee" strokeWidth={1} />
      <EventText x={40} y={22} pointer-events="none">{metadatas.name}</EventText>
    </g>
  );
};

export default MenuEvent;