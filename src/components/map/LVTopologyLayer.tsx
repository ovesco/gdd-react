import React, { useMemo } from 'react';
import styled from 'styled-components';
import {
  tree,
  stratify,
  linkRadial,
} from 'd3';

import { Bubble, Node } from '../../global';
import NodePin from './NodePin';
import NodeWrapper from './NodeWrapper';

type Props = {
  subTopology: Bubble;
  mappedSubTopology: { [key: string]: Node };
  width: number;
  height: number;
};

const linkGenerator = linkRadial().angle((d: any) => d.x).radius((d: any) => d.y);

const TopoPath = styled.path`
  fill: none;
  stroke: black;
  stroke-width: 1;
`;

const LVTopologyLayer: React.FunctionComponent<Props> = ({ subTopology, mappedSubTopology, width, height }) => {

  const radius = useMemo(() => {
    const val = Math.min(width, height);
    return (val / 2) - 50;
  }, [width, height]);

  const root = useMemo(() => {
    const treeGenerator = tree()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);

    const mainRootNode = '__ROOT__';
    const nodeIds = Object.keys(mappedSubTopology);
    const lines = subTopology.lvLines.map((it) => [it.target, it.source]); // current - parent
    const lineChilds = lines.map((it) => it[0]);
    const roots = nodeIds.filter((it) => !lineChilds.includes(it));
    const additionalLinks = roots.length === 1
      ? [[roots[0], '']]
      : roots.map((rootId) => [rootId, mainRootNode]).concat([[mainRootNode, '']]);
    const data = stratify()
      .id((it: any) => it[0])
      .parentId((it: any) => it[1])
      (lines.concat(additionalLinks));
    return treeGenerator(data);
  }, [subTopology, radius, mappedSubTopology]);

  console.log(root.links());

  return (
    <g transform={`translate(${width / 2}, ${height / 2})`}>
      <g>
        {root.links().map((it, i) => <TopoPath key={i} d={linkGenerator(it as any) as string} />)}
      </g>
      <g>
        {root.descendants().map((it, i) => {
          const nodeId = (it.data as [string, string])[0];
          if (nodeId in mappedSubTopology) {
            const node = mappedSubTopology[nodeId];
            const angle = it.x * 180 / Math.PI - 90;
            return (
              <g transform={`rotate(${angle}) translate(${it.y}, 0)`}>
                <NodeWrapper x={0} y={0} rotate={-angle} node={node} key={nodeId}>
                  <NodePin node={node} color="#5491f5" />
                </NodeWrapper>
              </g>
            );
          } else {
            return null;
          }
        })}
      </g>
    </g>
  );
}


export default LVTopologyLayer;