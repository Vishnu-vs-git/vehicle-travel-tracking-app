export interface ITripResponseDTO {
     id?: string;
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
    name : string;
    overSpeedDistance: number;
}