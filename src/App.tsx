import React, { useEffect, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'reactn';

import TopologyProvider from './assets/generator/TopologyProvider';
import Map from './components/map/Map';

function App() {

  const provider = useRef(new TopologyProvider());
  const setMVNodes = useDispatch((global, dispatcher, nodes) => ({
    mvNodes: [...global.mvNodes, ...nodes],
  }));

  useEffect(() => {
    provider.current.getMVNodes().then((nodes) => {
      setMVNodes(nodes);
    });
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
