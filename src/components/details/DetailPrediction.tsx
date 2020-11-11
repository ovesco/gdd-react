import React from 'react';

import useAsyncMemo from '../../hooks/useAsyncMemo';
import TimeSeriesProvider, { getStart } from '../../assets/generator/TimeSeriesProvider';
import ChartCard from '../chart/ChartCard';
import PredictionChart from '../chart/PredictionChart';
import useMatchingEvents from '../../hooks/useNodeMatchingEvents';

type Props = {
  nodeId: string;
  width: number;
  height: number;
};

const provider = new TimeSeriesProvider();

const DetailPrediction: React.FunctionComponent<Props> = ({ nodeId, width, height }) => {

  const start = getStart();

  const [matchingEvents] = useMatchingEvents(nodeId);

  const data = useAsyncMemo(async () => {
    const actualSerie = provider.generateTimeSeries(start * 1000, ['actual'], 230, 10*6);
    const predictedSerie = provider.generateTimeSeries((start + (10*60*60) - 60*10) * 1000, ['predicted'], 230, 20*6);

    return Promise.all([ actualSerie, predictedSerie ]).then(([act, pre]) => [...act, ...pre]);
  }, [nodeId], []);

  return (
    <div className="bg-white">
      <ChartCard loading={false}>
        <PredictionChart data={data} events={matchingEvents} width={width} height={height} id={nodeId} />
      </ChartCard>
    </div>
  )
};

export default DetailPrediction;