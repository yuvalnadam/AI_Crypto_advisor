import { useNavigate } from 'react-router-dom'; // moving between pages
import './Dashboard.css';
import axios from 'axios'
import { useState, useEffect } from 'react';
import './App.css';

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
  const handleVote = async (section, vote) => {
    const email = localStorage.getItem('userEmail');
    try {
        await axios.post('http://localhost:3000/save-vote', {
            email: email,
            section: section,
            vote: vote
        });
        alert(`Thanks for voting on ${section}!`);
    } catch (err) {
        console.error("Vote failed", err);
    }
  };

  return (
    <div className="dashboard-page">
    {/* (Navbar) */}
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-right">
          <img src="/logo.png" alt="Crypto Logo" className="logo" />
          <span className="brand-name">CryptoAdvisor</span>
        </div>
        
        <div className="navbar-left">
          <span className="welcome-text">Hello, <strong>{name}</strong></span>
          <button className="logout-btn" onClick={() => {
              localStorage.clear();
              window.location.href = '/login';
          }}>Logout</button>
        </div>
      </div>
    </nav>

    <div className="main-layout">
     

      <div className="dashboard-grid">
        
        <section className="standard-card">
          <div className="card-header">
            <h2>Coin Prices</h2>
            <div className="vote-container">
              <button className="vote-btn" onClick={() => handleVote('prices', 'like')}>👍</button>
              <button className="vote-btn" onClick={() => handleVote('prices', 'dislike')}>👎</button>
            </div>
          </div>
          <div className="card-content">
            <p className="price-row">Bitcoin: <span className="price-val">${bitcoin}</span></p>
            <p className="price-row">Ethereum: <span className="price-val">${ethereum}</span></p>
          </div>
        </section>
  
        <section className="standard-card">
          <div className="card-header">
            <h2>Market News</h2>
            <div className="vote-container">
              <button className="vote-btn" onClick={() => handleVote('news', 'like')}>👍</button>
              <button className="vote-btn" onClick={() => handleVote('news', 'dislike')}>👎</button>
            </div>
          </div>
          <div className="card-content">
            <ul className="news-list">
              {news.map((item) => (
                <li key={item.id || item.title} className="news-item"> 
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.title || "No Title Available"}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
        
        <section className="standard-card">
          <div className="card-header">
            <h2>AI Insight</h2>
            <div className="vote-container">
              <button className="vote-btn" onClick={() => handleVote('insight', 'like')}>👍</button>
              <button className="vote-btn" onClick={() => handleVote('insight', 'dislike')}>👎</button>
            </div>
          </div>
          <div className="card-content">
            <p className="insight-text">{insight}</p>
          </div>
        </section>
        
        <section className="standard-card">
          <div className="card-header">
            <h2>Daily Meme</h2>
            <div className="vote-container">
              <button className="vote-btn" onClick={() => handleVote('meme', 'like')}>👍</button>
              <button className="vote-btn" onClick={() => handleVote('meme', 'dislike')}>👎</button>
            </div>
          </div>
          <div className="card-content">
            {meme ? (
              <img src={meme} alt="Crypto Meme" className="meme-img" />
            ) : (
              <p className="loading-text">Fetching the fun...</p>
            )}
          </div>
        </section>

      </div>
    </div>
  </div>
  );
}

export default Dashboard;


