import React, { useEffect, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useGlobal } from 'reactn';

import TopologyProvider from './assets/generator/TopologyProvider';
import Map from './components/map/Map';

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
        mvNodes: ['mv-18'],
        lvNodes: ['mv-18-lv-12', 'mv-18-lv-14', 'mv-18-lv-13', 'mv-18-lv-15'],
        lvLines: [],
        type: 'powerOutage',
      }
    ]);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Map />
      </BrowserRouter>
    </div>
  );
}

export default App;
