import React from 'react';
import styled from 'styled-components';
import { BiX } from 'react-icons/bi';
import { useGlobal } from 'reactn';
import { CSSTransition } from 'react-transition-group';

import DetailView from './DetailView';

const Holder = styled.div`

  position: fixed;
  top: 0;
  width: 960px;
  opacity: 0;
  height: 100vh;
  right: 0;
  z-index: 1000;
  transform: translate(960px, 0);

  &.detail-view-enter {
    opacity: 0;
    transform: translate(960px, 0);
    transition: opacity .3s, transform .3s;
  }

  &.detail-view-enter-active,
  &.detail-view-enter-done {
    opacity: 1;
    transform: translate(0, 0);
  }

  &.detail-view-exit {
    opacity: 1;
    transform: translate(0, 0);
  }

  &.detail-view-exit-active {
    opacity: 0;
    transform: translate(960px, 0);
    transition: opacity .3s, transform .3s;
  }
`;

const DetailViewContainer: React.FunctionComponent = () => {

  const [detailNodeId, setId] = useGlobal('detailNodeId');

  return (
    <CSSTransition in={detailNodeId !== null} timeout={300} classNames="detail-view">
      <Holder className="bg-gray-100 shadow flex flex-col">
        <div className="p-2 flex items-center">
          <div className="w-10 cursor-pointer h-10 rounded flex justify-center items-center bg-gray-300 hover:bg-gray-400" onClick={() => setId(null)}>
            <BiX className="text-2xl" />
          </div>
          <h2 className="text-2xl ml-3">
            {detailNodeId} - Prediction
          </h2>
        </div>
        {detailNodeId && (
          <DetailView nodeId={detailNodeId} />
        )}
      </Holder>
    </CSSTransition>
  )
};

export default DetailViewContainer;