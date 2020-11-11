import { useMemo } from 'react';
import { useGlobal } from 'reactn';
import { Event } from '../events';

export default (nodeId: string | null): [Event[], Event[], Event[]] => {

  const [events] = useGlobal('events');

  const matchingEvents = useMemo(() => events.filter((it) => nodeId !== null
    && (it.mvNodes.includes(nodeId) || it.lvNodes.includes(nodeId))), [events, nodeId]);

  return [
    matchingEvents,
    matchingEvents.filter((it) => it.start < Date.now()),
    matchingEvents.filter((it) => it.start > Date.now())
  ];
};