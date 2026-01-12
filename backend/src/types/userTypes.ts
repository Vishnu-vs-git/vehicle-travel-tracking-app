export class User {
  name : string;
  email: string;
  password : string;
  id? : string | undefined;
  createdAt?: Date | undefined
  updatedAt?: Date | undefined
  
  constructor(props:{
    id?: string;
    name : string;
    email : string;
    password : string;
    createdAt? : Date;
    updatedAt?: Date;
  }){
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt
  }
}