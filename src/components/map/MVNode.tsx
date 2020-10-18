import React, { useCallback, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'reactn';
import styled from 'styled-components';

import { Node } from '../../global';
import NodeMenu from './NodeMenu/NodeMenu';

type Props = {
  node: Node;
}

const pinPath = "M 0 0 L -5 -8 C -15 -23 -7.4 -32 0 -32 H 0 C 7.4 -32 15 -23 5 -8 L 0 0 Z M 0 -27 C -3 -27 -5 -25 -5 -22 S -3 -17 0 -17 S 5 -19 5 -22 S 3 -27 0 -27 Z";

const Pin = styled.path`
  fill: #34a853;
  stroke: white;
  stroke-width: 2;
`;

const NotifCircle = styled.circle`
  fill: red;
  stroke: white;
  stroke-width: 2;
`;

const NotifNumber = styled.text`
  stroke: white;
  font-size: 0.6rem;
`;

const MVNode: React.FunctionComponent<Props> = ({ node }) => {

  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<SVGGElement>(null);
  // const move = useCallback(() => history.push(`/mv/${node.nodeId}`), [node]);
  
  return (
    <>
      {showMenu && (
        <NodeMenu node={node} ref={menuRef} />
      )}
      <g transform="scale(1.3)" className="cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
        <Pin d={pinPath} />
        <NotifCircle r={8} cx={10} cy={-30} />
        <NotifNumber text-anchor="middle" x={8} y={-27}>2</NotifNumber>
      </g>
    </>
  );
};

export default MVNode;