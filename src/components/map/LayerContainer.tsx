import React from 'react';
import ReactDOM from 'react-dom';

type Props = {
  container: HTMLElement;
};

const LayerContainer: React.FunctionComponent<Props> = ({ children, container }) => {
  return ReactDOM.createPortal(children, container);
};

export default LayerContainer;