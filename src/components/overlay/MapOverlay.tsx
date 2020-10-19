import React from 'react';
import { useGlobal, useMemo } from 'reactn';
import styled from 'styled-components';
import mapboxgl from 'mapbox-gl';

import MapControls from './MapControls';
import useRoutingMVNodeId from '../../hooks/useRoutingMVNodeId';
import EventList from './EventList';
import Event from './Event';

type Props = {
  map: mapboxgl.Map;
};

const Overlay = styled.div`
  width: 15rem;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
`;

const OverlayContent = styled.div`
  height: 15rem;
  background: white;
`;

const MapOverlay: React.FunctionComponent<Props> = ({ map }) => {

  const [events] = useGlobal('events');
  const [highlightEvent, setHighlightedEvent] = useGlobal('highlightedEvent');
  const currentMvId = useRoutingMVNodeId();

  const displayedEvents = useMemo(() => {
    if (currentMvId === null) return events;
    return events.filter((it) => it.mvNodes.includes(currentMvId));
  }, [currentMvId, events]);

  return (
    <Overlay className="fixed">
      <div className="flex">
        <OverlayContent className="flex-1 mr-2 rounded shadow">
          <EventList title="Current events">
            {displayedEvents.map(it => <Event event={it} key={it.eventId} onMouseOver={() => setHighlightedEvent(it.eventId)} onMouseOut={() => setHighlightedEvent(null)} />)}
          </EventList>
        </OverlayContent>
        <MapControls map={map} />
      </div>
    </Overlay>
  );
};

export default MapOverlay;