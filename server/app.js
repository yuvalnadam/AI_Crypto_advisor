import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import 'dotenv/config';
import { HfInference } from "@huggingface/inference";
import axios from 'axios';

const { Pool } = pkg;

const app = express();

app.use(cors());
app.use(express.json());

const hf = new HfInference(process.env.HF_TOKEN);

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
            const isFirstLogin = !user.investor_type; //marking the first login for onboard requirement 
            res.status(200).json({ 
                message: "Login successful!", 
                user: { id: user.id, name: user.name, isFirstLogin: isFirstLogin } 
            });
        } else {
            res.status(401).json({ message: "Wrong password" });
        }
        
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.put('/Onboarding', async (req, res) => {
    const { email, investor_type, assets_interest, content_preference } = req.body;

    try {
        const query = `
            UPDATE users 
            SET investor_type = $1, assets_interest = $2, content_preference = $3 
            WHERE email = $4
        `;
        const values = [investor_type, assets_interest, content_preference, email];
        console.log("Values to SQL:", values);
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/user-profile/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const result = await pool.query('SELECT name,investor_type, assets_interest, content_preference FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = result.rows[0];
        
        let memeUrl = "";
        const interest = user.content_preference || "";

        if (interest.includes('Fun')){
            memeUrl = "/mems/fun.jpg";
        }
        else if (interest.includes('Social')){
            memeUrl = "/mems/social.jpeg";
        } 
        else if (interest.includes('Charts')){
            memeUrl = "/mems/charts.png";
        }
        //news
        else {
            memeUrl = "/mems/news.png";
        } 

        const userPrompt = `You are a crypto advisor. Give me an AI Insight of the Day which is a short sentence advice to a ${user.investor_type} who likes ${user.assets_interest}. Respond in English.`;
        
        let aiInsight = "";

        try {
            const response = await hf.chatCompletion({
                model: "Qwen/Qwen2.5-7B-Instruct",
                messages: [
                    {
                        role: "user",
                        content: userPrompt
                    }
                ],
                max_tokens: 100
            }); 
            
            aiInsight = response.choices[0].message.content;
        } catch (err) {
            console.error("AI Error:", err.message);
            
            aiInsight = "Stay focused on your long-term goals and keep an eye on market trends.";
        
            if (user.investor_type === 'Day Trader') {
                aiInsight = "Volatility is high today! Monitor the 15-minute charts and stick to your stop-loss strategy.";
            } else if (user.investor_type === 'HODLer') {
                aiInsight = "Don't let the daily noise distract you. Remember: time in the market beats timing the market. HODL tight!";
            } else if (user.investor_type === 'Long-term Investor') {
                aiInsight = "Fundamentals haven't changed. A great day to review your portfolio allocation and stay patient.";
            }
        }

        res.json({
            investor_type: user.investor_type,
            assets_interest: user.assets_interest,
            content_preference: user.content_preference,
            insight: aiInsight,
            memeUrl: memeUrl,
            name: user.name
        });

    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ error: "Server Error" });
    }
});


app.get('/market-news', async (req, res) => {
    try {
        const apiKey = process.env.CRYPTOPANIC_KEY;
        
        const response = await axios.get('https://cryptopanic.com/api/v1/posts/', {
            params: {
                auth_token: apiKey,
                public: 'true' 
            }
        });

        console.log("CryptoPanic Data Status:", response.status);

        const newsItems = response.data.results.slice(0, 5).map(post => ({
            id: post.id,
            title: post.title,
            url: post.url
        }));

        res.json(newsItems);

    } catch (error) {
        console.error("Detailed News Error:", error.response ? error.response.status : error.message);
        
        const fallbackNews = [
            { id: 1, title: "Bitcoin Maintains $90K Despite Rising Geopolitical Tension, Morgan Stanley Enters Crypto ETF Race: Weekly Recap", url: "https://cryptopotato.com/bitcoin-maintains-90k-despite-rising-geopolitical-tension-morgan-stanley-enters-crypto-etf-race-weekly-recap/"},
            { id: 2, title: "Ethereum, Solana report strong growth in users, revenue, and activity in 2025", url: "https://catenaa.com/markets/cryptocurrencies/ethereum-solana-report-strong-growth-in-users-revenue-and-activity-in-2025/" },
            { id: 3, title: "New Crypto Regulation: What investors need to know", url: "https://www.cryptopolitan.com/raj-kundra-summoned-bitcoin-scam/" }
        ];
        res.json(fallbackNews);
    }
});






