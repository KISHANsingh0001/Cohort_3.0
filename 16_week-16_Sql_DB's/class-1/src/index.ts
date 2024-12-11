import { Client } from 'pg'

const pg = new Client("postgresql://neondb_owner:0sZmF6OIWTev@ep-flat-river-a5b7j2np.us-east-2.aws.neon.tech/neondb?sslmode=require");


async function main() {
    await pg.connect().then(() => {
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
    const response1 = await pg.query("SELECT *FROM USERS"); // getting data from the users table
    const response2 = await pg.query("SELECT *FROM cars"); // getting data from the cars table
    console.log(response1.rows);
    const response3 = await pg.query(`UPDATE cars SET carName='Matricides Amg g63', modal='G Class' WHERE id=1 RETURNING *`);
    console.log(response3.rows);
    

}
main();
