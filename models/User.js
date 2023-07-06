import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name : {type : String , required : true }, 
    phone : {type : String , required : true }, 
    email : {type : String , required : true , unique: true }, 
    password : {type : String , required : true }, 
}
, 
{
 timestamps: true ,
})

const User = model('User' , UserSchema)

export default User
