// export interface Gps {
//   id?: string;
//   tripeId : string;
//   latitude : number;
//   longitude : number;
//   timeStamp : Date;
//   ignition : boolean;
//   speed : number;
// }

export class Gps {
  id?:string;
  tripId: string;
  latitude: number;
  longitude: number;
  timeStamp : Date;
  ignition: boolean;
  speed : number;
  isIdle: boolean;
isStoppage: boolean;
isOverSpeed: boolean;

  constructor(props:{
  id?:string;
  tripId: string;
  latitude: number;
  longitude: number;
  timeStamp : Date;
  ignition: boolean;
  speed : number;
   isIdle: boolean,
isStoppage: boolean,
isOverSpeed: boolean,
  }){
   if(props.id)this.id = props.id;
   this.tripId = props.tripId;
   this.latitude = props.latitude;
   this.longitude = props.longitude;
   this.speed = props.speed;
   this.isIdle = props.isIdle;
   this.isStoppage = props.isStoppage;
   this.isOverSpeed = props.isOverSpeed
   this.timeStamp = props.timeStamp;
   this.ignition = props.ignition
  }
}