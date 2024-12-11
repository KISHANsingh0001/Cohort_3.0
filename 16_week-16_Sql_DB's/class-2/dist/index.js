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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const pg = new pg_1.Client("postgresql://neondb_owner:0sZmF6OIWTev@ep-flat-river-a5b7j2np.us-east-2.aws.neon.tech/neondb?sslmode=require");
const app = (0, express_1.default)();
app.use(express_1.default.json());
pg.connect();
// we also learn transaction 
app.get("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email, city, street, pincode } = req.body;
    try {
        const insertQuery = `INSERT INTO users (username , email , password) VALUES ($1 , $2 , $3) RETURNING id;`;
        const addressInsertQuery = `INSERT INTO address (city , street , pincode , user_id) VALUES ($1 , $2 , $3, $4);`;
        yield pg.query("BEGIN;"); // begin the Transaction 
        const res1 = yield pg.query(insertQuery, [username, email, password]);
        const userID = res1.rows[0].id; // got the userid 
        const res2 = yield pg.query(addressInsertQuery, [city, street, pincode, userID]);
        yield pg.query("COMMIT;"); // end the Transaction
        res.status(200).json({
            msg: "You have signed up"
        });
    }
    catch (e) {
        res.status(401).json({
            msg: "Error while Signed up"
        });
    }
}));
// Bad meta data end point uses 1 by 1 information getting
app.get("/metadata:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const query1 = `SELECT username , email , id FROM users WHERE id=$1`;
        const query2 = `SELECT * FROM address WHERE user_id=$1`;
        const usersDetails = yield pg.query(query1, [id]);
        const addressDetails = yield pg.query(query2, [id]);
        res.json({
            usersDetails: usersDetails.rows[0],
            addressDetails: addressDetails.rows
        });
    }
    catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "error"
        });
    }
}));
app.get("/better-metadata:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const allDetailsQuery = `select users.id, users.username , users.email ,address.city , address.street , address.pincode 
                                 FROM users join address on users.id = address.user_id
                                 where users.id = $1`;
        const response = yield pg.query(allDetailsQuery, [id]);
        res.status(200).json({
            msg: "Here is the User Details",
            userDetails: response.rows
        });
    }
    catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "error"
        });
    }
}));
app.listen(3000);
