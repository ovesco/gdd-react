import { useMemo } from 'react';
import { useGlobal } from 'reactn';
import useMatchingEvents from './useNodeMatchingEvents';

export default (nodeId: string | null): boolean => {

  const [highlightedEventId] = useGlobal('highlightedEvent');
  const [matchingEvents] = useMatchingEvents(nodeId);
  const isHidden = useMemo(() => highlightedEventId !== null && matchingEvents.find((it) => it.eventId === highlightedEventId) === undefined, [matchingEvents, highlightedEventId]);

  return isHidden;
};