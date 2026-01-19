export interface Trip {
  id :string;
  startTime : string;
  endTime : string;
  totalDistance : number;
  idleTime :number;
  stoppageTime : number;
  tripDuration : number;
  name :string;
  overSpeedTime: number;
  overSpeedDistance : number;
}