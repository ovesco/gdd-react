import { IconType } from 'react-icons/lib';
import 'reactn';

import { Event } from './events';

export interface Node {
  type: 'mv' | 'lv';
  nodeId: string;
  lat: number;
  lng: number;
}

export interface Line {
  lineId: string;
  source: string;
  target: string;
}

export interface Bubble {
  mvNode: string;
  lvNodes: Node[];
  lvLines: Line[];
}

declare module 'reactn/default' {

  export interface Reducers {

  }

  export interface State {
    mvNodes: Node[];
    showNodeNames: boolean;
    showLines: boolean;
    events: Event[];
    highlightedEvent: string | null;
    nodeMenuId: string | null;
    lvTopologyMode: boolean;
    mapDimensions: [number, number];
    detailNodeId: string | null;
  }
}