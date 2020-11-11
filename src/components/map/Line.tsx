import React, { useMemo } from 'react';
import styled from 'styled-components';

import useLineMatchingEvents from '../../hooks/useLineMatchingEvents';
import { eventMetadatas, getColor } from '../../events';

type Props = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  lineId: string;
};

const DrawnLine = styled.line<{ stroke: string, width: number }>`
  stroke: ${e => e.stroke};
  stroke-width: ${e => e.width};
`;

const Node: React.FunctionComponent<Props> = ({ x1, x2, y1, y2, lineId }) => {

  const [isHidden, matchingHappened, matchingFuture] = useLineMatchingEvents(lineId);
  const [color, size] = useMemo(() => {
    if (matchingFuture.length > 0) return [getColor(eventMetadatas[matchingFuture[0].type].color), 4];
    // else if (matchingHappened.length > 0) return [getColor(eventMetadatas[matchingHappened[0].type].color), 4];
    return ['#aaa', 2];
  }, [matchingHappened, matchingFuture]);

  return (
    <DrawnLine x1={x1} x2={x2} y1={y1} y2={y2} stroke={color} width={size} />
  );
};

export default Node;