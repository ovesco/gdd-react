import React, { useEffect } from 'react';
import { useGlobal } from 'reactn';
import ReactTooltip from 'react-tooltip';
import { BiPlus, BiMinus, BiSend, BiText, BiHide } from 'react-icons/bi';
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

type BtnProps = {
  onClick: () => any;
  tip: string;
  disabled?: boolean;
  top?: boolean;
  bottom?: boolean;
};

const ControlButton = styled.button<Partial<BtnProps>>`
  width: 2.3rem;
  height: 2.3rem;
  outline: none !important;
  font-size: 1.2rem;
  background: ${p => p.disabled ? '#e2e8f0' : 'white'};
  cursor: ${p => p.disabled ? 'default' : 'pointer'};

  &:hover {
    background: #e2e8f0;
  }
`;

const CtrlButton: React.FunctionComponent<BtnProps> = (props) => {
  const {onClick, tip, disabled, top, bottom} = props;
  let clsName = `hover:bg-gray-300 flex items-center justify-center`;
  if (top === true) clsName += ' rounded-t';
  if (bottom === true) clsName += ' rounded-b';

  return (
    <ControlButton className={clsName} onClick={onClick} data-tip={disabled ? '' : tip} disabled={disabled}>
      {props.children}
    </ControlButton>
  );
};

const MapControls: React.FunctionComponent<Props> = ({ map }) => {

  const [showNames, setShowNames] = useGlobal('showNodeNames');
  const [showLines, setShowLines] = useGlobal('showLines');
  const [topologyMode, setTopologyMode] = useGlobal('lvTopologyMode');
  const nodeId = useRoutingMVNodeId();

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [nodeId, topologyMode]);

  return (
    <div>
      <ButtonContainer className="flex flex-col rounded shadow">
        <CtrlButton onClick={() => map.zoomIn()} tip="Zoom in" disabled={topologyMode} top={true}>
          <BiPlus />
        </CtrlButton>
        <CtrlButton onClick={() => map.zoomOut()} tip="Zoom out" disabled={topologyMode}>
          <BiMinus />
        </CtrlButton>
        <CtrlButton onClick={() => map.resetNorthPitch()} tip="Reset north" disabled={topologyMode} bottom={true}>
          <BiSend style={{ transform: 'rotate(-90deg)' }} />
        </CtrlButton>
      </ButtonContainer>
      <ButtonContainer className="flex flex-col rounded shadow mt-2">
        <CtrlButton onClick={() => setShowNames(!showNames)} tip="Toggle node names" top={true} bottom={nodeId === null}>
          <BiText />
        </CtrlButton>
        {nodeId && (
          <>
            {!topologyMode && (
              <CtrlButton onClick={() => setShowLines(!showLines)} tip="Toggle lines">
                <BiHide />
              </CtrlButton>
            )}
            <CtrlButton onClick={() => setTopologyMode(!topologyMode)} tip="Show Dendogram topology" bottom={true}>
              <CgListTree />
            </CtrlButton>
          </>
        )}
      </ButtonContainer>
      <ReactTooltip place="right" effect="solid" delayShow={300} />
    </div>
  );
};

export default MapControls;