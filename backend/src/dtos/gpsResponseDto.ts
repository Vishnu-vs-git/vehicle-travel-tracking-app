export interface IGpsResponseDTO {
  id?:string;
  tripId: string;
  latitude: number;
  longitude: number;
  timeStamp : Date;
  ignition: boolean;
  speed : number;
  createdAt?: Date;
  updatedAt?: Date;
  isIdle: boolean;
isStoppage: boolean;
isOverSpeed: boolean;
}