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

app.post('/Login', async (req, res) => {
    const {email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1',[email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: "user not found" });
        } 
        const user = result.rows[0];

        if (user.password === password) {
            res.status(200).json({ 
                message: "Login successful!", 
                user: { id: user.id, name: user.name } 
            });
        } else {
            res.status(401).json({ message: "Wrong password" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});