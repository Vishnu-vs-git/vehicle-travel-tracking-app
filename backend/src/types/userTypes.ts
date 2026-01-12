export class User {
  name : string;
  email: string;
  password : string;
  id? : string;
  createdAt?: Date;
  updatedAt?: Date;
  
  constructor(props:{
    id?: string;
    name : string;
    email : string;
    password : string;
    createdAt? : Date;
    updatedAt?: Date;
  }){
    if(props.id) this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    if(props.createdAt) this.createdAt = props.createdAt;
    if(props.updatedAt) this.updatedAt = props.updatedAt
  }
}