import React from 'react';
import { Event as EventType, eventMetadatas } from '../../events';
import styled from 'styled-components';

interface ColorProps {
  color: string;
  hoverColor: string;
}

interface Props {
  event: EventType;
  expected?: boolean;
  description?: string;
  onMouseOver?: () => any;
  onMouseOut?: () => any;
};

const EventContainer = styled.div<ColorProps>`
  background: ${e => e.color};
  border: 1px solid ${e => e.hoverColor};

  &:hover {
    background: ${e => e.hoverColor};
  }
`;

const Event: React.FunctionComponent<Props> = ({ event, expected, description, children, ...leftOver }) => {

  const metadatas = eventMetadatas[event.type];
  const [r, g, b] = metadatas.color;
  const upColor = (color: number, amount: number = 30) => Math.max(0, color - amount);
  const bgColor = `rgb(${r}, ${g}, ${b})`;
  const hoverBgColor = `rgb(${upColor(r)}, ${upColor(g)}, ${upColor(b)})`;

  return (
    <EventContainer {...leftOver} color={bgColor} hoverColor={hoverBgColor} className="ml-2 mb-2 mr-2 p-1 rounded-sm shadow-sm cursor-default">
      <div className="flex items-center text-gray-800">
        <metadatas.icon className="text-2xl mr-1 text-gray-700" />
        <div>
          <div>{metadatas.name}</div>
          {description && <div>{description}</div>}
        </div>
      </div>
    </EventContainer>
  );
};

export default Event;