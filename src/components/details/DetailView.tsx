import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useGlobal } from 'reactn';
import { CSSTransition } from 'react-transition-group';

const DetailViewContainer = styled.div`

  position: fixed;
  top: 0;
  width: 50vw;
  height: 100vh;
  right: 0vw;
  opacity: 0;
  z-index: 1000;
  transform: translate(50vw, 0);

  &.detail-view-enter {
    opacity: 0;
    transform: translate(50vw, 0);
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
    transform: translate(50vw, 0);
    transition: opacity .3s, transform .3s;
  }
`;

const DetailView: React.FunctionComponent = () => {

  const [detailNodeId, setId] = useGlobal('detailNodeId');
  console.log(detailNodeId);

  return (
    <CSSTransition in={detailNodeId !== null} timeout={300} classNames="detail-view">
      <DetailViewContainer className="bg-white">
        <button onClick={() => setId(null)}>close</button>
      </DetailViewContainer>
    </CSSTransition>
  )
};

export default DetailView;