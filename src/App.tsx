import React, { useEffect, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useGlobal } from 'reactn';

import TopologyProvider from './assets/generator/TopologyProvider';
import Map from './components/map/Map';
import DetailView from './components/details/DetailViewContainer';
import { getStart } from './assets/generator/TimeSeriesProvider';

function App() {

  const provider = useRef(new TopologyProvider());
  const setMVNodes = useDispatch((global, dispatcher, nodes) => ({
    mvNodes: [...global.mvNodes, ...nodes],
  }));

  const [, setEvents] = useGlobal('events');
  const start = getStart();

  useEffect(() => {
    provider.current.getMVNodes().then((nodes) => {
      setMVNodes(nodes);
    });

    setEvents([
      {
        eventId: 'event-1',
        mvNodes: ['mv-5'],
        lvNodes: ['mv-5-lv-12', 'mv-5-lv-14', 'mv-5-lv-13' ,'mv-5-lv-3'],
        lvLines: [],
        type: 'powerOutage',
        start: (start + 60*10*15) * 1000,
        end: (start + 60*10*18) * 1000,
      },
      {
        eventId: 'event-2',
        mvNodes: ['mv-6'],
        lvNodes: ['mv-6-lv-12', 'mv-6-lv-14', 'mv-6-lv-13' ,'mv-6-lv-3'],
        lvLines: [],
        type: 'underVoltage',
        start: (start + 60*70*10) * 1000,
        end: (start + 60*80*10) * 1000,
      },
      {
        eventId: 'event-3',
        mvNodes: ['mv-6'],
        lvNodes: [],
        lvLines: ['line-mv-6-lv-11', 'line-mv-6-lv-12', 'line-mv-6-lv-13'],
        type: 'overCurrent',
        start: (start + 60*95*10) * 1000,
        end: (start + 60*120*10) * 1000,
      },
    ]);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Map />
        <DetailView />
      </BrowserRouter>
    </div>
  );
}

export default App;
