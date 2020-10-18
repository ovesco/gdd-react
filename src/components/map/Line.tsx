import React from 'react';
import styled from 'styled-components';

type Props = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

const DrawnLine = styled.line`
  stroke: #ccc;
  stroke-width: 2;
`;

const Node: React.FunctionComponent<Props> = ({ x1, x2, y1, y2 }) => {

  return (
    <DrawnLine x1={x1} x2={x2} y1={y1} y2={y2} />
  );
};

export default Node;