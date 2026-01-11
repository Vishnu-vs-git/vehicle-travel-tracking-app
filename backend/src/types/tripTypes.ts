export interface Trip {
  id?: string;
  userId  :string;
  totalDistance : number;
  idleTime : number;
  stoppageTime : number;
  startTime : Date;
  endTime  :Date;
}