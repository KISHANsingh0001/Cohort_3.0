// let y:number = 1;
// let x: number | string  = 1; // integer or string  type 
// x = "kishan"
// console.log(x);
// console.log(y);
// // spacial type in TS is "any" which means anything 
// let num:any = "kishan";
// //--------------------------------------
// function greet(firstName:string){
//     console.log("hello " + firstName);

// }

// greet("kishan");
// //------------------------------------------
// function sum(a:number , b:number){
//     return a + b;
// }
// let ans:number = sum(4 , 5);

// //-------------------------------------------
// function isLegal(age:number) : boolean{
//     if(age > 18){
//         return true;
//     }
//     else{
//         return false
//     }
// }
// let a:boolean = isLegal(16);
// console.log(a);
// //---------------------------------

// function delayedCall(fn: ()=> void ){
//     setTimeout(fn , 1000);
// }
// delayedCall(function(){
//     console.log("hello");
// })
// //--------------------------------

// function greet1(user:{
//     name:string,
//     age:number
// }){
//     console.log("hello" + user.name);

// }
// let user = {
//     name:"kishan",
//     age:21
// }
// greet1(user)
// // -------------------------------
// // Custom type 

// interface UserType{
//     name:string,
//     age:number,
//     lastName:string
// }

// function isLegalDriver(user:UserType){
//     if(user.age > 18){
//         console.log("you can");

//     }
//     else{
//         console.log("you Cant");

//     }
// }
//-------------------------------------------------------------------------------------------------------

//  an interface is a way to define the structure of an object. It specifies the types of properties and methods that an object should have, but it doesn’t contain any implementation details. 
interface Address{
    city: string,
    country: string,
    pincode: number
};
interface User {
    name: string,
    age: number,
    // address?: { // address felid is optional whenever we will add "?"
    //     city: string,
    //     country: string,
    //     pincode: number
    // }
    address?:Address // dont repeat in address key every where 
}
function isLegal(user: User): boolean {
    return user.age >= 18;
}
let user: User = {
    name: "kishan",
    age: 20,
    address: {
        city: "jabalpur",
        country: "India",
        pincode: 482004
    }
}
//------------------------------------------------------------------------------------------
interface Person{
    name:string,
    age:number,
    greet:()=> string, // both are function/Method 
    // greet2():string
}

let people : Person = {
    name:"Kishan",
    age:20,
    greet :()=>{
        return "hii"
    }
}

console.log(people.greet());

interface People {
    name :string,
    age:number,
    isLigal():boolean
}

class Manager implements People{
    // name : string;
    // age : number;
    
    constructor(public name:string , public age:number){
        this.name = name;
        this.age = age;
    }

    isLigal(){
        return this.age >= 18;
    }
}

let user1 = new Manager("kishan" , 25);

// arrays in TS

function getMax(nums : number[]){
    let max = 0;
    for(let i = 0 ; i<nums.length ; i++){
        if(nums[i] > max){
            max = nums[i];
        }
    }
    return max;
}
let maxVal:number = getMax([1,2,3,4,5,6]);
console.log(maxVal);

//------------------------------------------



