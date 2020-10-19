import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { useGlobal } from 'reactn';

export default (): string | null => {
  const { pathname } = useLocation();
  const [mvNodes] = useGlobal('mvNodes');

  return useMemo(() => {
    const potentialId = pathname.split('/').pop() as string;
    if (mvNodes.find((it) => it.nodeId === potentialId) !== undefined) return potentialId;
    return null;
  }, [pathname, mvNodes]);
};