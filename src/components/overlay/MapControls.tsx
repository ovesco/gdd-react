import React from 'react';
import { useEffect, useGlobal } from 'reactn';
import ReactTooltip from 'react-tooltip';
import { BiPlus, BiMinus, BiSend, BiDetail } from 'react-icons/bi';
import { CgListTree } from 'react-icons/cg';
import styled from 'styled-components';
import mapboxgl from 'mapbox-gl';
import useRoutingMVNodeId from '../../hooks/useRoutingMVNodeId';

type Props = {
  map: mapboxgl.Map;
};

const ButtonContainer = styled.div`
  width: 2.3rem;
`;

const ControlButton = styled.div`
  width: 2.3rem;
  height: 2.3rem;
  font-size: 1.2rem;
`;

const MapControls: React.FunctionComponent<Props> = ({ map }) => {

  const [showNames, setShowNames] = useGlobal('showNodeNames');
  const [topologyMode, setTopologyMode] = useGlobal('lvTopologyMode');
  const nodeId = useRoutingMVNodeId();

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [nodeId]);

  return (
    <div>
      <ButtonContainer className="flex flex-col rounded shadow">
        <ControlButton className="bg-white hover:bg-gray-300 flex items-center justify-center rounded-t" onClick={() => map.zoomIn()} data-tip="Zoom in">
          <BiPlus />
        </ControlButton>
        <ControlButton className="bg-white hover:bg-gray-300 flex items-center justify-center" onClick={() => map.zoomOut()} data-tip="Zoom out">
          <BiMinus />
        </ControlButton>
        <ControlButton className="bg-white hover:bg-gray-300 flex items-center justify-center rounded-b" onClick={() => map.resetNorthPitch()} data-tip="Reset north">
          <BiSend style={{ transform: 'rotate(-90deg)' }} />
        </ControlButton>
      </ButtonContainer>
      <ButtonContainer className="flex flex-col rounded shadow mt-2">
        <ControlButton className={`bg-white hover:bg-gray-300 flex items-center justify-center rounded${nodeId ? '-t' : ''}`} onClick={() => setShowNames(!showNames)} data-tip="Toggle node names">
          <BiDetail />
        </ControlButton>
        {nodeId && (
          <ControlButton className="bg-white hover:bg-gray-300 flex items-center justify-center rounded-b" onClick={() => setTopologyMode(!topologyMode)} data-tip="Show Dendogram topology">
            <CgListTree />
          </ControlButton>
        )}
      </ButtonContainer>
      <ReactTooltip place="right" effect="solid" delayShow={300} />
    </div>
  );
};

export default MapControls;