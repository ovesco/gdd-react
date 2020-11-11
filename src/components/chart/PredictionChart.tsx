import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import Chart from 'react-apexcharts';

import { SeriesType, EventsType } from '../../assets/generator/TimeSeriesProvider';
import { eventMetadatas, getColor } from '../../events';

type TimeSeriesProp = {
  data: SeriesType;
  events: EventsType;
  width: number;
  height: number;
  id: string;
};

const LineChart: FunctionComponent<TimeSeriesProp> = ({ id, data, events, width, height }) => {

  const chartId = 'prediction-chart';
  const brushId = 'prediction-brush-chart';

  const eventsAnnotations = useMemo(() => {
    return events.map(({ type, start, end }) => {
      const metadatas = eventMetadatas[type];
      return {
        x: start,
        x2: end,
        label: {
          text: metadatas.name,
          orientation: 'horizontal',
          borderColor: getColor(metadatas.color),
          style: {
            background: getColor(metadatas.color),
            color: 'white',
          }
        }
      };
    });
  }, [events]);

  const chartOptions = useMemo(() => {
    return {
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
        width: [1,1,1],
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
      annotations: {
        xaxis: eventsAnnotations,
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
          opacityFrom: 0.2,
          opacityTo: 0,
          stops: [0, 100]
        }
      },
      legend: {
        show: false,
      }
    };
  }, [eventsAnnotations]);

  const brushOptions = useMemo(() => {
    return {
      colors: ['#608bfc', '#e1a902', '#e16e02'],
      legend: {
        show: false,
      },
      chart: {
        id: brushId,
        toolbar: {
          autoSelected: 'selection'
        },
        brush: {
          enabled: true,
          target: chartId,
        },
        selection: {
          enabled: true,
          xaxis: {},
        },
      },
      annotations: {
        xaxis: eventsAnnotations,
      },
      xaxis: {
        type: 'datetime',
        tickAmount: 6,
        axisBorder: {
          color: '#aaa',
          show: false,
        },
        axisTicks: {
          color: '#aaa',
          show: false,
        },
        tooltip: {
          enabled: false,
        },
        labels: {
          show: false,
        }
      },
      yaxis: {
        show: false,
      },
      grid: {
        show: false,
        padding: {
          bottom: -15,
          top: -20,
          left: 50,
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.2,
          opacityTo: 0,
          stops: [0, 100]
        }
      },
    };
  }, [eventsAnnotations]);

  useEffect(() => {
    if (data.length > 0) {
      const middle = data[0].data[data[0].data.length - 1][0];
      // @ts-ignore
      ApexCharts.exec(chartId, 'zoomX',
        middle - (4*6*10*60*1000),
        middle + (10*6*10*60*1000));
    }
  }, [data]);

  return (
    <div>
      <Chart options={chartOptions} series={data} height={height} width={width} type="area" />
      <div className="bg-gray-200">
        <Chart options={brushOptions} series={data} type="area" height={60} />
      </div>
    </div>
  );
};

export default LineChart;