import { useNavigate } from 'react-router-dom'; // moving between pages
import './Dashboard.css';
import axios from 'axios'
import { useState, useEffect } from 'react';

function Dashboard() {

  const [bitcoin, setBitcoin] = useState("");
  const [ethereum, setEthereum] = useState("");
  const [insight, setInsight] = useState("");
  const [news, setNews] = useState([]);
  const [meme, setMeme] = useState("");
  const [name, setName] = useState("");
  
  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      window.location.href = '/login';
      return;
    }

    const fetchAllUserData = async () => {
      try {
          const res = await axios.get(`http://localhost:3000/user-profile/${email}`);
          
          setName(res.data.name);
          setInsight(res.data.insight);
          setMeme(res.data.memeUrl);
      } catch (err) {
          console.error("Error fetching user data", err);
      }
    };
    const fetchPrices = async () => {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,Tether&vs_currencies=usd');
            
            setBitcoin(response.data.bitcoin.usd);
            setEthereum(response.data.ethereum.usd);
        } catch (error) {
            console.error("Error while fatching the prices", error);
        }
    };

    const fetchNews = async () => {
      try {
          const res = await axios.get('http://localhost:3000/market-news');
          setNews(res.data);
      } 
      catch (err) {
          console.log("Error fetching news", err);
      }
    };

    fetchAllUserData();
    fetchNews();
    fetchPrices(); 
    
  }, []); //only once

    return (
      
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <h1>Welcome back, <span className="user-name">{name}</span></h1>
        <p>Your personalized crypto summary for today</p>
      </header>
      <div className="dashboard-grid">
        <section className="dashboard-box-prices">
          <h2>Coin Prices</h2>
          <p>Bitcoin Price: ${bitcoin}</p>
          <p>ethereum Price: ${ethereum}</p>
        </section>
  
        <section className="dashboard-box-news">
          <h2>News</h2>
          <h3>Latest Market News</h3>
          <ul>
            {news.map((item) => (
                <li key={item.id || item.title}> 
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.title || "No Title Available"}
                    </a>
                </li>
            ))}
        </ul>
        </section>
        
        <section className="dashboard-box-ai">
          <h2>AI Insight</h2>
          <p>AI insight: {insight}</p>
        </section>
        
        <section className="dashboard-box-meme">
          <h2>Meme</h2>
          {meme ? <img src={meme} alt="Crypto Meme" style={{ width: '100%', borderRadius: '8px' }} /> : <p>Loading fun stuff...</p>}
        </section>
      </div>
    </div>
    );
  }
  
  export default Dashboard;


