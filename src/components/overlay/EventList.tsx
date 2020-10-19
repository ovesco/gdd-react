import React from 'react';
import styled from 'styled-components';

import MapControls from './MapControls';

type Props = {
  title: string;
};

const EventList: React.FunctionComponent<Props> = ({ children, title }) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-lg text-center text-gray-800 p-3">{title}</h1>
      {children}
    </div>
  );
};

export default EventList;