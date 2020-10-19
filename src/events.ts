import { TiFlash, TiFlashOutline, TiBatteryLow, TiBatteryCharge, TiTimesOutline } from 'react-icons/ti';
import { IconType } from 'react-icons/lib';

export type events = 'powerOutage' | 'overVoltage' | 'underVoltage' | 'overCurrent' | 'underCurrent';

export interface EventMetadata {
  name: string;
  color: [number, number, number];
  icon: IconType;
}

export interface Event {
  eventId: string;
  type: events;
  mvNodes: string[];
  lvNodes: string[];
  lvLines: string[];
}


export const eventMetadatas: {[key in events]: EventMetadata} = {
  powerOutage: {
    name: 'Power Outage',
    color: [255, 128, 128],
    icon: TiTimesOutline
  },
  overVoltage: {
    name: 'Over Voltage',
    color: [255, 51, 204],
    icon: TiFlash
  },
  underVoltage: {
    name: 'Under Voltage',
    color: [255, 153, 204],
    icon: TiFlashOutline
  },
  overCurrent: {
    name: 'Over Current',
    color: [255, 153, 0],
    icon: TiBatteryCharge,
  },
  underCurrent: {
    name: 'Under Current',
    color: [255, 204, 102],
    icon: TiBatteryLow,
  },
};

export const getColor = (color: [number, number, number]) => `rgb(${color[0]}, ${color[1]}, ${color[2]})`;