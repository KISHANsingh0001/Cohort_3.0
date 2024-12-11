import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

// deleting the values to the users table look like given below
async function deleteUser() {
    await client.user.delete({
        where: {
            id: 1
        }
    });
}
// updating the values to the users table look like given below
async function updateUser() {
    await client.user.update({
        where: {
            id: 1
        },
        data: {
            username: "kishan12364"
        }
    })
}
// inserting the values to the users table look like given below
async function insertUser() {
    await client.user.create({
        data: {
            username: "kishan12363",
            password: "123412",
            age: 21,
            city: "jabalpur"
        }
    });
}
async function getUserDetails() {
    const userData = await client.user.findFirst({
        where:{
            id:1
        },
        select:{
            username:true,
            age:true,
            city:true
        }
    })
    console.log(userData);
    
}
getUserDetails();
// insertUser();

