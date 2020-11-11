import { useMemo } from 'react';
import { useGlobal } from 'reactn';
import { Event } from '../events';

export default (lineId: string | null): [boolean, Event[], Event[]] => {

  const [events] = useGlobal('events');
  const [highlightedEventId] = useGlobal('highlightedEvent');

  const matchingEvents = useMemo(() => events.filter((it) => lineId !== null && it.lvLines.includes(lineId)), [events]);
  const isHidden = useMemo(() => highlightedEventId !== null && matchingEvents.find((it) => it.eventId === highlightedEventId) === undefined, [matchingEvents, highlightedEventId]);

  return [isHidden, 
    matchingEvents.filter((it) => it.start < Date.now()),
    matchingEvents.filter((it) => it.start > Date.now())
  ];
};