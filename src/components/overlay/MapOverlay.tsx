import React from 'react';
import { useGlobal, useMemo } from 'reactn';
import styled from 'styled-components';
import mapboxgl from 'mapbox-gl';

import MapControls from './MapControls';
import useRoutingMVNodeId from '../../hooks/useRoutingMVNodeId';
import EventList from './EventList';
import { Event as EventType } from '../../events';
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

const MapOverlay: React.FunctionComponent<Props> = ({ map }) => {

  const [events] = useGlobal('events');
  const [, setHighlightedEvent] = useGlobal('highlightedEvent');
  const currentMvId = useRoutingMVNodeId();

  const [past, future] = useMemo(() => {
    let baseEvents = (currentMvId === null) ? events : events.filter((it) => it.mvNodes.includes(currentMvId));
    const before = baseEvents.filter((it) => it.start < Date.now());
    const after = baseEvents.filter((it) => it.start > Date.now());
    return [before, after];
  }, [currentMvId, events]);

  return (
    <Overlay className="fixed">
      <div className="flex">
        <div className="flex-1 mr-2">
          <div>
            <div>
              <EventList title="Current events">
                {past.map(it => <Event event={it} key={it.eventId} onMouseOver={() => setHighlightedEvent(it.eventId)} onMouseOut={() => setHighlightedEvent(null)} />)}
              </EventList>
            </div>
            <div className="mt-2">
              <EventList title="Upcoming events">
                {future.map(it => <Event event={it} key={it.eventId} onMouseOver={() => setHighlightedEvent(it.eventId)} onMouseOut={() => setHighlightedEvent(null)} />)}
              </EventList>
            </div>
          </div>
        </div>
        <div>
          <MapControls map={map} />
        </div>
      </div>
    </Overlay>
  );
};

export default MapOverlay;