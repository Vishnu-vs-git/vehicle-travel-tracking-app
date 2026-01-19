

export class Trip {
   id?: string | undefined;
   userId  :string;
   totalDistance : number;
   idleTime : number;
   stoppageTime : number;
   startTime : Date;
   endTime  :Date;
   createdAt?: Date ;
   updatedAt?: Date ;
   tripDuration : number;
   overSpeedTime: number;
   name :string;
   overSpeedDistance: number;
  
   constructor(props: {
       id?: string
       userId: string;
       totalDistance : number;
       idleTime : number;
       stoppageTime : number;
       startTime : Date;
       endTime : Date;
       createdAt?: Date;
       updatedAt?: Date;
       tripDuration : number;
       overSpeedTime: number;
       name :string;
       overSpeedDistance: number;
   }){
    if(props.createdAt)this.createdAt = props.createdAt;
    this.endTime = props.endTime;
    this.idleTime = props.idleTime;
    this.startTime = props.startTime;
    this.tripDuration = props.tripDuration;
    this.overSpeedTime = props.overSpeedTime;
    this.id = props.id;
    this.overSpeedDistance = props.overSpeedDistance
    this.name = props.name;
    this.userId = props.userId;
    this.totalDistance = props.totalDistance;
    if(props.updatedAt)this.updatedAt = props.updatedAt;
    this.stoppageTime = props.stoppageTime;

   }
}