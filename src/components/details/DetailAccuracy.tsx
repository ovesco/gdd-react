import React from 'react';

import useAsyncMemo from '../../hooks/useAsyncMemo';
import TimeSeriesProvider, { getStart } from '../../assets/generator/TimeSeriesProvider';
import ChartCard from '../chart/ChartCard';
import AccuracyChart from '../chart/AccuracyChart';
import useMatchingEvents from '../../hooks/useNodeMatchingEvents';

type Props = {
  nodeId: string;
  width: number;
  height: number;
};

const provider = new TimeSeriesProvider();

const DetailAccurary: React.FunctionComponent<Props> = ({ nodeId, width, height }) => {

  const start = getStart(Date.now() - 20*6*60*10*1000);

  const [matchingEvents] = useMatchingEvents(nodeId);

  const data = useAsyncMemo(async () => provider.generateTimeSeries(start * 1000, ['measured', 'predicted'], 233, 20*6), [nodeId], []);

  return (
    <div className="bg-white">
      <ChartCard loading={false}>
        <AccuracyChart data={data} width={width} height={height} id={nodeId} />
      </ChartCard>
    </div>
  )
};

export default DetailAccurary;