export interface Gps {
  id?: string;
  tripeId : string;
  latitude : number;
  longitude : number;
  timeStamp : Date;
  ignition : boolean;
  speed : number;
}