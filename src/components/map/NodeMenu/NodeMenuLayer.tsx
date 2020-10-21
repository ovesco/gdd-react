import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useGlobal } from 'reactn';
import { RiBubbleChartLine, RiBarChartBoxLine } from 'react-icons/ri';
import { Map } from 'mapbox-gl';

import NodeMenu from './NodeMenu';
import MenuButton from './MenuButton';
import MenuEvent from './MenuEvent';

type Props = {
  map: Map;
}

const NodeMenuLayer: React.FunctionComponent<Props> = ({ map }) => {

  const history = useHistory();
  const [node] = useGlobal('nodeMenu');
  const [detailNodeId, setDetailNodeId] = useGlobal('detailNodeId');
  const [events] = useGlobal('events');
  const move = useCallback(() => node ? history.push(`/mv/${node.nodeId}`) : null, [node]);
  const showDetail = useCallback(() => node ? setDetailNodeId(node.nodeId) : null, [node, detailNodeId]);
  const matchingEvents = useMemo(() => {
    if (node) return events.filter((it) => it.mvNodes.includes(node.nodeId) || it.lvNodes.includes(node.nodeId));
    return [];
  }, [node, events]);

  const {x, y} = node ? map.project([ node.lng, node.lat ]) : {x: null, y: null};

  const menu = useMemo(() => {
    if (!node) return null;
    else if (node.type === 'mv') {
      return (
        <NodeMenu node={node}>
          <MenuButton i={0} icon={RiBubbleChartLine} text="Open bubble" onClick={move} />
          <MenuButton i={1} icon={RiBarChartBoxLine} text="Show aggregated details" onClick={showDetail} last={true} />
          {matchingEvents.map((it, i) => <MenuEvent key={it.eventId} event={it} i={i + 2} />)}
        </NodeMenu>
      )
    } else return (
      <NodeMenu node={node}>
        <MenuButton i={0} icon={RiBarChartBoxLine} text="Show node details" onClick={showDetail} last={true} />
        {matchingEvents.map((it, i) => <MenuEvent key={it.eventId} event={it} i={i + 1} />)}
      </NodeMenu>
    )
  }, [node]);

  return (
    <g transform={`translate(${x}, ${y})`}>
      {node && x && y && (
        <>{menu}</>
      )}
    </g>
  )
};

export default NodeMenuLayer;