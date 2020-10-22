import React from 'react';
import styled from 'styled-components';

import useAsyncMemo from '../../hooks/useAsyncMemo';
import TimeSeriesProvider, { SeriesType } from '../../assets/generator/TimeSeriesProvider';
import ChartCard from '../chart/ChartCard';
import LineChart from '../chart/LineChart';

type Props = {
  nodeId: string;
  width: number;
  height: number;
};

const provider = new TimeSeriesProvider();

const LVPredictionVerification: React.FunctionComponent<Props> = ({ nodeId, width, height }) => {

  const series = { actual: 'blue', predicted: 'green'};
  const data = useAsyncMemo<SeriesType>(() => provider.generateTimeSeries(Date.now() - 3600*100*1000, Object.keys(series)), [nodeId], []);

  return (
    <div>
      <ChartCard loading={data.length === 0}>
        <LineChart data={data} series={series} width={width} height={height} />
      </ChartCard>
    </div>
  )
};

export default LVPredictionVerification;