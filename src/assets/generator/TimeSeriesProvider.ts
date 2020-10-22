class TimeSeriesProvider {

  async generateTimeSeries(start: number, series: string[] = ['serie1'], min: number = 500, amount: number = 100, every: number = 60*10*1000): Promise<SeriesType> {
    return new Promise((resolve) => {
      const values = [];
      for (let i = 0; i < amount; i++) {
        const curr = {};
        for (let j = 0; j < series.length; j++) {
          // @ts-ignore
          curr[series[j]] = min + Math.round(Math.random() * Math.sin(i) * min / 20);
        }
        values.push({
          ...curr,
          time: start + (i*every),
        });
      }

      resolve(values);
    });
  }
}

export type SeriesType = Array<{ [keyVal: string]: number, time: number }>;

export default TimeSeriesProvider;