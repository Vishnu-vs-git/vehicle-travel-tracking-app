export interface GpsPoint {
   id?: string;
  latitude: number;
  longitude: number;
  timeStamp: string;
  ignition: boolean;
  speed: number;
  isIdle: boolean;
  isStoppage: boolean;
  isOverSpeed: boolean;
}