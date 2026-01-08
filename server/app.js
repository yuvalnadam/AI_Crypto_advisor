const express = require('express');

//connecting to Postgres
const { Pool } = require('pg'); 
require('dotenv').config();

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
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

app.post('/Register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log("קיבלתי בקשת הרשמה עבור:", email);

    try {
        const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
        const values = [name, email, password];

        const result = await pool.query(query, values);

        res.status(201).json({
            message: "User created successfully!",
            user: result.rows[0]
        });
    } catch (err) {
        console.error("Error insering user to the DB", err.message);
        res.status(500).json({ error: "Server error, could not create user" });
    }
});