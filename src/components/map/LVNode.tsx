import React from 'react';
import styled from 'styled-components';

import { Node } from '../../global';

type Props = {
  node: Node;
}

const pinPath = "M 0 0 L -5 -8 C -15 -23 -7.4 -32 0 -32 H 0 C 7.4 -32 15 -23 5 -8 L 0 0 Z M 0 -27 C -3 -27 -5 -25 -5 -22 S -3 -17 0 -17 S 5 -19 5 -22 S 3 -27 0 -27 Z";

const Pin = styled.path`
  fill: #5491f5;
  stroke: white;
  stroke-width: 2;
`;

const LVNode: React.FunctionComponent<Props> = ({ node }) => {
  return (
    <Pin d={pinPath} transform='scale(1.2)' />
  );
};

export default LVNode;