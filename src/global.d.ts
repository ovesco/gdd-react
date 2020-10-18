import 'reactn';

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
  }
}