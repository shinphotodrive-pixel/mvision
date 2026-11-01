export type DomainType = 'all' | 'mv' | 'sec' | '3d';
export type NdaaStatus = 'compliant' | 'sanctioned' | 'exempt';

export interface Vendor {
  id: string;
  name: string;
  country: string;
  domain: 'mv' | 'sec' | '3d';
  domainLabel: string;
  website: string;
  youtube: string;
  ndaa: NdaaStatus;
  chip: string;
  socDetails: string;
  products: string;
  summary: string;
  founded: number;
  headquarters: string;
  strengths: string[];
  keySensors: string[];
  supportedInterfaces: string[];
  flagshipCamera: {
    model: string;
    resolution: string;
    maxFps: string;
    interfaceType: string;
    highlight: string;
  };
}

export interface SensorComparison {
  generation: string;
  name: string;
  pixelPitch: number; // in um
  qe: number; // percentage
  saturationCapacity: number; // in e-
  dynamicRange: number; // in dB
  readNoise: number; // in e-
  maxFpsScale: number;
  structure: 'FSI (Front-Illuminated)' | 'BSI (Back-Illuminated)' | 'Stacked BSI';
  craAdvantage: string;
}

export interface InterfaceSpec {
  name: string;
  bandwidthGbps: number;
  maxDistanceMeters: number;
  latencyJitter: string;
  frameGrabber: '필수 (PCIe)' | '불필요 (NIC / Host)' | '선택';
  cableType: string;
  powerDelivery: string;
  typicalApplication: string;
}

export interface SimulationParams {
  mode: 'traffic' | 'conveyor';
  speedKmH: number; // for traffic
  speedMPerSec: number; // for conveyor
  latencyMs: number;
  exposureTimeSec: number; // e.g. 1/1000
  cameraResolutionMp: number;
  fovWidthM: number;
}
