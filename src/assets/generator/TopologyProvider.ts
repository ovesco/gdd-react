import Nodes from './MVTopology.json';
import { Node, Line, Bubble } from '../../global';

const LVPerMVModuloKey = [19, 22, 25, 21];

class TopologyProvider {

  getMVNodes() {
    return new Promise((resolve) => {
      resolve(Nodes.features.map((it, i) => ({
        type: 'mv',
        nodeId: `mv-${i}`,
        lat: it.geometry.coordinates[1],
        lng: it.geometry.coordinates[0]
      })));
    });
  }

  getLVBubble(node: Node, time: number = 1000): Promise<Bubble> {
    const ni = parseInt(node.nodeId.split('-').pop() as string, 10);
    const lvAmount = LVPerMVModuloKey[ni % LVPerMVModuloKey.length];
    const lvNodes: Node[] = [];
  
    lvNodes.push({
      type: 'lv',
      lat: node.lat,
      lng: node.lng,
      nodeId: `${node.nodeId}-lv-0`
    });
  
    for (let i = 1; i < lvAmount + 1; i++) {
      let dist = 0.005;
      if (i < 6) dist = 0.005;
      else if (i < 21) dist = 0.01;
      else dist = 0.015;

      let angle = 0;
      if (i < 6) angle = 5 - i;
      else angle = 20 - i;

      let tot = 0;
      if (i < 6) tot = 5;
      else tot = lvAmount - 6;

      lvNodes.push({
        type: 'lv',
        nodeId: `${node.nodeId}-lv-${i}`,
        lat: node.lat + (Math.sin((360 / tot * angle) * Math.PI / 180) * (dist + (Math.random() * 0.005))),
        lng: node.lng + (Math.cos((360 / tot * angle) * Math.PI / 180) * (dist + (Math.random() * 0.005)))
      });
    }
  
    const lvLines = this.buildLines(lvNodes, `${node.nodeId}-lv`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          mvNode: node.nodeId,
          lvNodes,
          lvLines
        });
      }, time * Math.random());
    });
  }

  private buildLines(nodes: Node[], idPrefix: string): Line[] {
    const links = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      let source = 0;
      if (i < 5) source = 0;
      else source = Math.ceil((i - 4) / 3);
      links.push({
        lineId: `line-${idPrefix}-${i}`,
        source: `${idPrefix}-${source}`,
        target: `${idPrefix}-${i+1}`
      });
    }
  
    return links;  
  }
}

export default TopologyProvider;