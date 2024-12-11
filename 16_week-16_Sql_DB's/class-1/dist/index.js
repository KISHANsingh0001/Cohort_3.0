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
const pg_1 = require("pg");
const pg = new pg_1.Client("postgresql://neondb_owner:0sZmF6OIWTev@ep-flat-river-a5b7j2np.us-east-2.aws.neon.tech/neondb?sslmode=require");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield pg.connect().then(() => {
            console.log("Database Connected Successful");
        }).catch((e) => {
            console.log("Error While Connecting the Database");
            console.log(e);
        });
        // Creating a Table Using query
        // await pg.query(`CREATE TABLE cars(
        //      id SERIAL PRIMARY KEY,
        //      carName TEXT NOT NULL,
        //      modal TEXT NOT NULL,
        //      topSpeed INTEGER NOT NULL
        //     );`)
        const response1 = yield pg.query("SELECT *FROM USERS"); // getting data from the users table
        const response2 = yield pg.query("SELECT *FROM cars"); // getting data from the cars table
        console.log(response1.rows);
        const response3 = yield pg.query(`UPDATE cars SET carName='Matricides Amg g63', modal='G Class' WHERE id=1 RETURNING *`);
        console.log(response3.rows);
    });
}
main();
