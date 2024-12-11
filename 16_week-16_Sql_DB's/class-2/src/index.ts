import express from 'express'
import { Client } from 'pg'
const pg = new Client("postgresql://neondb_owner:0sZmF6OIWTev@ep-flat-river-a5b7j2np.us-east-2.aws.neon.tech/neondb?sslmode=require")
const app = express();
app.use(express.json());
pg.connect();
// we also learn transaction 
app.get("/signup", async (req, res) => {

    const { username, password, email, city, street, pincode } = req.body;
    try {

        const insertQuery = `INSERT INTO users (username , email , password) VALUES ($1 , $2 , $3) RETURNING id;`;
        const addressInsertQuery = `INSERT INTO address (city , street , pincode , user_id) VALUES ($1 , $2 , $3, $4);`;

        await pg.query("BEGIN;") // begin the Transaction 
        const res1 = await pg.query(insertQuery, [username, email, password]);
        const userID = res1.rows[0].id; // got the userid 
        const res2 = await pg.query(addressInsertQuery, [city, street, pincode, userID]);
        await pg.query("COMMIT;") // end the Transaction

        res.status(200).json({
            msg: "You have signed up"
        })
    } catch (e) {
        res.status(401).json({
            msg: "Error while Signed up"
        })
    }
});
// Bad meta data end point uses 1 by 1 information getting
app.get("/metadata:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const query1 = `SELECT username , email , id FROM users WHERE id=$1`;
        const query2 = `SELECT * FROM address WHERE user_id=$1`;
        const usersDetails = await pg.query(query1, [id]);
        const addressDetails = await pg.query(query2, [id]);

        res.json({
            usersDetails: usersDetails.rows[0],
            addressDetails: addressDetails.rows
        })
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "error"
        })

    }
})
// Joins in the Postgres
app.get("/better-metadata:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        // by default inner join happens
        const allDetailsQuery = `select users.id, users.username , users.email ,address.city , address.street , address.pincode 
                                 FROM users join address on users.id = address.user_id
                                 where users.id = $1`;

        //  Left join happens                       
        // const allDetailsQuery = `select users.id, users.username , users.email ,address.city , address.street , address.pincode 
        //                          FROM users LEFT join address on users.id = address.user_id
        //                          where users.id = $1`;

        //  right join happens                       
        // const allDetailsQuery = `select users.id, users.username , users.email ,address.city , address.street , address.pincode 
        //                          FROM users RIGHT join address on users.id = address.user_id
        //                          where users.id = $1`;

        //  FULL join happens                       
        // const allDetailsQuery = `select users.id, users.username , users.email ,address.city , address.street , address.pincode 
        //                          FROM users FULL join address on users.id = address.user_id
        //                          where users.id = $1`;

        const response = await pg.query(allDetailsQuery , [id]);
        
        res.status(200).json({
            msg:"Here is the User Details",
            userDetails: response.rows
        })
    } catch (e) {
         console.log(e);
         res.status(401).json({
            msg:"error"
         })
         
    }
})

app.listen(3000);