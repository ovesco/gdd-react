import React, { useRef } from 'react';

import LVPredictionVerification from './LVPredictionVerification';
import useDim from '../../hooks/useHTMLElementDimensions';

type Props = {
  nodeId: string;
};


const DetailView: React.FunctionComponent<Props> = ({ nodeId }) => {

  const containerRef = useRef<HTMLDivElement>(null);
  const dim = useDim(containerRef);

  return (
    <div className="flex-1" ref={containerRef}>
      {dim[0] > 0 && dim[1] > 0 && (
        <>
          <LVPredictionVerification nodeId={nodeId} height={dim[1] / 2} width={dim[0]} />
        </>
      )}
    </div>
  )
};

export default DetailView;