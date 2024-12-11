"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient();
// deleting the values to the users table look like given below
function deleteUser() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.user.delete({
            where: {
                id: 1
            }
        });
    });
}
// updating the values to the users table look like given below
function updateUser() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.user.update({
            where: {
                id: 1
            },
            data: {
                username: "kishan12364"
            }
        });
    });
}
// inserting the values to the users table look like given below
function insertUser() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.user.create({
            data: {
                username: "kishan12363",
                password: "123412",
                age: 21,
                city: "jabalpur"
            }
        });
    });
}
function getUserDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const userData = yield client.user.findFirst({
            where: {
                id: 1
            },
            select: {
                username: true,
                age: true,
                city: true
            }
        });
        console.log(userData);
    });
}
getUserDetails();
// insertUser();
