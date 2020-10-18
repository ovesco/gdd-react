import React from 'react';
import mapboxgl from 'mapbox-gl';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { Node } from '../../global';
import MVLayer from './MVLayer';
import LVLayer from './LVLayer';

type Props = {
  map: mapboxgl.Map;
  nodes: Node[];
  width: number;
  height: number;
};

const D3SVG = styled.svg<Partial<Props>>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  z-index: 1000;
`;

class D3Layer extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    const { map } = this.props;
    map.on('viewreset', () => this.update());
    map.on('move', () => this.update());
    map.on('moveend', () => this.update());
  }

  private update() {
    this.forceUpdate();
  }

  render() {
    const { width, height, nodes, map } = this.props;

    return (
      <>
        <D3SVG width={width} height={height} className="relative">
          <Switch>
            <Route exact path="/">
              <MVLayer nodes={nodes} map={map} />
            </Route>
            <Route path="/mv/:mvNodeId">
              <LVLayer map={map} />
            </Route>
          </Switch>
        </D3SVG>
      </>
    );
  }
}


export default D3Layer;