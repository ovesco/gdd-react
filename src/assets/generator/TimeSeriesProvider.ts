import { events } from '../../events';

class TimeSeriesProvider {

  async generateTimeSeries(start: number, series: string[] = ['serie1'], min: number = 48*6, amount: number = 100, every: number = 60*10*1000): Promise<SeriesType> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const values = [];
        for (let i = 0; i < series.length; i++) {
          const curr = {
            name: series[i],
            data: [],
          } as { name: string; data: [number, number][] };

          for (let j = 0; j < amount; j++) {
            curr.data.push([
              start + (j*every),
              j === 0 || j === amount - 1 ? min + 5 : min + Math.round(Math.random() * Math.sin(j) * min / 20)
            ]);
          }

          values.push(curr);
        }
        resolve(values);
      }, Math.random() * 1000);
    });
  }
}

export type SeriesType = {data: [number, number][], name: string}[];

export type EventsType = {start: number, end?: number, type: events}[];

export default TimeSeriesProvider;

export const getStart = (d?: number) => ((date: Date) => {
  date.setMinutes(0);
  date.setSeconds(0);
  return Math.ceil(date.getTime() / 1000);
})(new Date(d ? d : Date.now() - 1000*60*60*10));