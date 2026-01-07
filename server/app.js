const express = require('express');
//connecting to Postgres
const { Pool } = require('pg'); 
require('dotenv').config();
const app = express();
const pool = new Pool({
    connectionString: "postgresql://postgres:[Eshhar123315]@db.gdnndnywigwgmdcwmotv.supabase.co:5432/postgres"
});
const PORT = 3000;

app.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to root URL of Server");
});

//ckecking the connection to the database
app.get('/db-test', async (req, res) => {
    console.log("Connecting to DB");
    try {
        const result = await pool.query('SELECT NOW()');
        console.log("Work!");
        res.send(result.rows[0]);
    } catch (err) {
        console.error("ERROR!", err.message);
        res.status(500).send("Connection error: " + err.message);
    }
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT);
    else 
        console.log("Error occurred, server can't start", error);
    }
);