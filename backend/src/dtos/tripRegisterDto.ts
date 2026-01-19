export interface ITripRegisterDTO {
  userId : string;
  startTime : Date;
  endTime : Date;
  totalDistance: number;
  idleTime : number;
  stoppageTime :number;
  tripDuration : number;
  overSpeedTime: number;
  name : string;
  overSpeedDistance: number;
}