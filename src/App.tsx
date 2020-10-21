import React, { useEffect, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useGlobal } from 'reactn';

import TopologyProvider from './assets/generator/TopologyProvider';
import Map from './components/map/Map';
import DetailView from './components/details/DetailView';

function App() {

  const provider = useRef(new TopologyProvider());
  const setMVNodes = useDispatch((global, dispatcher, nodes) => ({
    mvNodes: [...global.mvNodes, ...nodes],
  }));

  const [events, setEvents] = useGlobal('events');

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
      }
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
