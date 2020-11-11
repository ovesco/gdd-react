import React, { useRef } from 'react';

import DetailPrediction from './DetailPrediction';
import DetailAccuracy from './DetailAccuracy';
import useDim from '../../hooks/useHTMLElementDimensions';

type Props = {
  nodeId: string;
};


const DetailView: React.FunctionComponent<Props> = ({ nodeId }) => {

  const containerRef = useRef<HTMLDivElement>(null);
  const dim = useDim(containerRef);

  return (
    <div className="flex-1 flex flex-col" ref={containerRef}>
      {dim[0] > 0 && dim[1] > 0 && (
          <DetailPrediction nodeId={nodeId} height={dim[1] / 3} width={dim[0]} />
      )}
      <div className="flex-1 flex flex-col border-t-2 border-gray-400 border-solid">
        <div className="mt-auto"> 
          <h2 className="text-2xl p-2 pt-4">Prediction accuracy</h2>
        </div>
        {dim[0] > 0 && dim[1] > 0 && (
          <DetailAccuracy nodeId={nodeId} height={dim[1] / 2.2} width={dim[0]} />
        )}
      </div>
    </div>
  )
};

export default DetailView;