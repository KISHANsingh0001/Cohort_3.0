// interface User {
//     name:string;
//     age:number;
// }

// function sumOfAge(user1:User , user2:User){
//     return user1.age + user2.age;
// }

// const age:number = sumOfAge({name:"tom" , age:20} , {name:"jarry" , age:40});
// console.log(age);
//-------------------------------------------------------------------------------------------

// Pick :- Allows you to create a new type by selecting a set of properties (Keys) from an existing type (Type) or Interface
// imagine you have a User model with several properties , but for a user profile display, you only need a subset of these properties
interface User {
    id: string;
    name: string;
    age: string;
    email: string;
    password: string
}

type UpdateProps = Pick<User, 'name' | 'age' | 'email'>

function updateUser(updateProps: UpdateProps) {
    // hit the database to update the user 
}
//-------------------------------------------------------------------------------------------
// Partial :- makes all properties of a type optional , creating a type with the same properties , but each marked as optional
interface User1 {
    id: string;
    name: string;
    age: string;
    email: string;
    password: string
}

type UpdateProps1 = Pick<User1, 'name' | 'age' | 'email'>

type updatePropsOptional1 = Partial<UpdateProps1>

function updateUser1(updateProps: updatePropsOptional1) {
    // hit the database to update the user 
}
//-------------------------------------------------------------------------------------------
// Readonly : when you have a configuration object that should not be altered after initialization , making it Readonly ensures it's properties cannot be changed
interface Config {
    readonly endpoint:string;
    readonly apiKey : string;
}

const config : Readonly<Config> = {
    endpoint:'https://api.example.com',
    apiKey: 'abcdef123456',
}
//Cannot assign to 'apiKey' because it is a read-only property.
// config.apiKey = "asdfsdf"

//-------------------------------------------------------------------------------------------
//Record :- Record is a utility type that allows you to create an object type with specified keys and values.

type User2 = Record<string,string>

const users : User2 = {
    "name" : "kishan",
    "age"  : "number"
}
//-------------------------------------------------------------------------------------------
// Exclude :- It’s part of TypeScript’s utility types and is very useful when you need to create a new type by removing specific types from an existing union.
type EventType = 'click' | 'scroll' | 'mousemove';
type ExcludeEvent = Exclude<EventType , 'scroll'>;

const handleEvent = (event : ExcludeEvent) => {
    console.log(`Handling event :  ${event}`); 
    
}
handleEvent('click'); // ✅ Allowed
//handleEvent('scroll'); // ❌ Error
//-------------------------------------------------------------------------------------------

// Type inference in Zod :- When using zod , we're done runtime validation.
// For example , the following code makes sure that the user is sending the right input ot update their profile information 

import {z} from 'zod';
import express from 'express'

const app = express();

// Define the Schema for Profile update
const userProfileSchema = z.object({
    name : z.string().min(1 , {message:"Name cannot be empty"}),
    email: z.string().email({message:"Invalid email Format"}),
    age : z.number().min(18,{message:"You must be at least 18 years old"})
});
// type finalUserSchema = {
//     name:string;
//     email:string;
//     age?:number
// }
type finalUserSchema = z.infer<typeof userProfileSchema>;
app.put("/users" , (req , res)=>{
    const {success} = userProfileSchema.safeParse(req.body);
    const updateBody:finalUserSchema =  req.body;
    
    if(!success){
        res.status(411).json({
            msg:"invalid formate"
            
        })
        return 
    }
    // update database here
    res.status(201).json({
        msg:"User Updated"
    });
})

app.listen(3000);