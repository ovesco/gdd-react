import React from 'react';
import format from 'date-fns/format';

import {
  LineChart as ReLineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  Brush,
  Label,
} from 'recharts';

import { SeriesType } from '../../assets/generator/TimeSeriesProvider';

type Props = {
  series: { [serieName: string]: string };
  data: SeriesType;
  width: number;
  height: number;
};

const LineChart: React.FunctionComponent<Props> = ({ series, data, width, height }) => {
  const actualWidth = width - 80;
  const actualHeight = height - 80;

  return (
    <ReLineChart width={actualWidth} height={actualHeight - 22} data={data} margin={{ top: 20, bottom: 10, left: 2, right: 20 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" tickFormatter={(val: any) => format(val as number, 'dd.MM.yyyy - HH:mm:ss')} />
      <YAxis domain={['datamin - (datamax - datamin)', 'datamax + (datamax - datamin)']} />
      <Tooltip />
      <Legend />
      <Brush dataKey="time" width={actualWidth - 70} height={40} data={data}>
        <ReLineChart width={actualWidth - 100} height={40} data={data}>
          {Object.keys(series).map((key) => <Line type="monotone" dataKey={key} stroke={series[key]} dot={false} />)}
        </ReLineChart>
      </Brush>
      {Object.keys(series).map((key) => <Line type="monotone" dataKey={key} stroke={series[key]} dot={false} />)}
    </ReLineChart>
  );
};

export default LineChart;