import { useMemo } from 'react';
import { useGlobal } from 'reactn';
import { Event } from '../events';

export default (nodeId: string | null): [boolean, Event[]] => {

  const [events] = useGlobal('events');
  const [highlightedEventId] = useGlobal('highlightedEvent');

  const matchingEvents = useMemo(() => events.filter((it) => nodeId !== null
    && (it.mvNodes.includes(nodeId) || it.lvNodes.includes(nodeId))), [events]);
  const isHidden = useMemo(() => highlightedEventId !== null && matchingEvents.find((it) => it.eventId === highlightedEventId) === undefined, [matchingEvents, highlightedEventId]);

  return [isHidden, matchingEvents];
};