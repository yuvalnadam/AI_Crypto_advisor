import { useNavigate } from 'react-router-dom'; // moving between pages
import axios from 'axios'
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import './App.css';
const API_URL = "https://ai-crypto-advisor-6l7n.onrender.com";

function Dashboard() {

  const navigate = useNavigate();

  const [bitcoin, setBitcoin] = useState("");
  const [Solana, setSolana] = useState("");
  const [Cardano, setCardano] = useState("");
  const [Ripple, setRipple] = useState("");
  const [ethereum, setEthereum] = useState("");
  const [insight, setInsight] = useState("");

  //const [news, setNews] = useState([]);
  const [news, setNews] = useState([
    { title: "Bitcoin hits new resistance level", url: "#" },
    { title: "Ethereum 2.0 update: Everything you need to know", url: "#" },
    { title: "Top 5 altcoins to watch this week", url: "#" },
    { title: "Crypto market sentiment remains bullish", url: "#" }
  ]);
  const [meme, setMeme] = useState("");
  const [name, setName] = useState("");

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token'); 

    navigate('/Login');   
  };
  
  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      navigate('/Login')
      return;
    }

    const fetchAllUserData = async () => {
      try {
          const res = await axios.get(`${API_URL}/user-profile/${email}`);
          console.log("data:", res.data);
          
          setName(res.data.name);
          setInsight(res.data.insight);
          setMeme(res.data.memeUrl);
      } catch (err) {
          console.error("Error fetching user data", err);
      }
    };
    const fetchPrices = async () => {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,cardano,solana&vs_currencies=usd');
            
            setBitcoin(response.data.bitcoin.usd);
            setEthereum(response.data.ethereum.usd);
            setRipple(response.data.ripple.usd);
            setCardano(response.data.cardano.usd);
            setSolana(response.data.solana.usd);

        } catch (error) {
            console.error("Error while fatching the prices", error);
        }
    };

    const fetchNews = async () => {
      try {
          const res = await axios.get(`${API_URL}/market-news`);
          setNews(res.data);
      } 
      catch (err) {
          console.log("Error fetching news", err);
      }
    };
    fetchNews();

    fetchAllUserData();
    fetchPrices(); 
    
  }, []); //only once
  const handleVote = async (section, vote) => {
    const email = localStorage.getItem('userEmail');
    try {
        await axios.post(`${API_URL}/save-vote`, {
            email: email,
            section: section,
            vote: vote
        });
        
        //alerting nicely 
        Swal.fire({
            title: 'Thank you!',
            text: `Your vote on ${section} has been recorded.`,
            icon: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: '#ffffff',
            iconColor: '#14a3c3', 
            customClass: {
                popup: 'my-swal-popup'
            }
        });

    } catch (err) {
        console.error("Vote failed", err);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to save your vote.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });
    }
};

  return (
    <div className="dashboard-page">
    {/* (Navbar) */}
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-right">
          <img src="/logo.png" alt="Crypto Logo" className="logo" />
        </div>
        
        <div className="navbar-left">
          <span className="welcome-text">Hello, <strong>{name}</strong></span>
          <button className="logout-btn" onClick={() => handleLogout()}>Logout</button>
        </div>
      </div>
    </nav>

    <div className="main-layout">
      <div className="dashboard-grid">
        
        <section className="standard-card">
          <div className="card-header">
            <h2>Coin Prices (USD) </h2>
           
          </div>
          <div className="card-content">
            <div className="prices-grid">
              {/* 1 */}
              <div className="coin-tile">
                <span className="coin-tile-symbol">BTC</span>
                <span className="coin-tile-price">{bitcoin}</span>
              </div>

              {/*  2 */}
              <div className="coin-tile">
                <span className="coin-tile-symbol">ETH</span>
                <span className="coin-tile-price">{ethereum}</span>
              </div>

              {/*  3 */}
              <div className="coin-tile">
                <span className="coin-tile-symbol">SOL</span>
                <span className="coin-tile-price">{Solana}</span>
              </div>

              {/*  4 */}
              <div className="coin-tile">
                <span className="coin-tile-symbol">XRP</span>
                <span className="coin-tile-price">{Ripple}</span>
              </div>

              {/* 5 */}
              <div className="coin-tile">
                <span className="coin-tile-symbol">ADA</span>
                <span className="coin-tile-price">{Cardano}</span>
              </div>
            </div>
          </div>
          <div className="vote-container">
              <button className="vote-btn" onClick={() => handleVote('prices', 'like')}>👍</button>
              <button className="vote-btn" onClick={() => handleVote('prices', 'dislike')}>👎</button>
            </div>
        </section>
  
        <section className="standard-card">
          <div className="card-header">
            <h2>Market News</h2>
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
          <div className="vote-container">
              <button className="vote-btn" onClick={() => handleVote('news', 'like')}>👍</button>
              <button className="vote-btn" onClick={() => handleVote('news', 'dislike')}>👎</button>
            </div>
        </section>
        
        <section className="standard-card">
          <div className="card-content insight-container">
              <div className="ai-status">
                  <span className="status-dot"></span>
                  AI Engine Active
              </div>
              <div className="insight-bubble">
                  <p className="insight-text">{insight}</p>
              </div>
              <div className="insight-footer">
                  Generated just now
              </div>
          </div>
          <div className="vote-container">
              <button className="vote-btn" onClick={() => handleVote('insight', 'like')}>👍</button>
              <button className="vote-btn" onClick={() => handleVote('insight', 'dislike')}>👎</button>
            </div>
        </section>
        
        <section className="standard-card">
          <div className="card-header">
            <h2>Daily Meme</h2>
            
          </div>
          <div className="card-content">
            <div className="meme-wrap">
              {meme ? (<img src={meme} alt="Crypto Meme" className="meme-img" />) : 
                (<p className="loading-text">Fetching the fun...</p>)}
            </div>
          </div>
          <div className="vote-container">
              <button className="vote-btn" onClick={() => handleVote('meme', 'like')}>👍</button>
              <button className="vote-btn" onClick={() => handleVote('meme', 'dislike')}>👎</button>
            </div>
        </section>

      </div>
    </div>
  </div>
  );
}

export default Dashboard;



