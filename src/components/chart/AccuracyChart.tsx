import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import Chart from 'react-apexcharts';

import { SeriesType } from '../../assets/generator/TimeSeriesProvider';

type TimeSeriesProp = {
  data: SeriesType;
  width: number;
  height: number;
  id: string;
};

const AccuracyChart: FunctionComponent<TimeSeriesProp> = ({ id, data, width, height }) => {

  const chartId = 'prediction-chart';

  const chartOptions = useMemo(() => {
    return {
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
        width: [1,1,1],
        dashArray: [0, 4, 4],
      },
      colors: ['#608bfc', '#e1a902', '#e16e02'],
      chart: {
        id: chartId,
        toolbar: {
          show: false,
          autoSelected: 'pan'
        },
        stacked: false,
        zoom: {
          type: 'x',
          enabled: true,
        }
      },
      xaxis: {
        type: 'datetime',
        tickAmount: 6,
        axisBorder: {
          color: '#aaa',
        },
        axisTicks: {
          color: '#aaa',
        },
        tooltip: {
          enabled: false,
        },
      },
      markers: {
        size: 0,
      },
      grid: {
        borderColor: '#aaa',
        strokeDashArray: 3,
        xAxis: {
          lines: {
            show: false,
          }
        },
        padding: {
          bottom: 0,
          top: 0
        }
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy HH:mm'
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0,
          stops: [0, 100]
        }
      },
      legend: {
        show: false,
      }
    };
  }, []);

  return (
    <div>
      <Chart options={chartOptions} series={data} height={height} width={width} type="area" />
    </div>
  );
};

export default AccuracyChart;