import { useNavigate } from 'react-router-dom'; // moving between pages
import './Dashboard.css';
import axios from 'axios'
import { useState, useEffect } from 'react';

function Dashboard() {

  const [bitcoin, setBitcoin] = useState("");
  const [ethereum, setEthereum] = useState("");
  
  useEffect(() => {
    const fetchPrices = async () => {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,Tether&vs_currencies=usd');
            
            setBitcoin(response.data.bitcoin.usd);
            setEthereum(response.data.ethereum.usd);
        } catch (error) {
            console.error("Error while fatching the prices", error);
        }
    };

    fetchPrices(); }, []); //only once

    return (
      
      <div className="dashboard-container">
        <section className="dashboard-box-prices">
          <h2>Prices</h2>
          <p>Bitcoin Price: ${bitcoin}</p>
          <p>ethereum Price: ${ethereum}</p>
        </section>
  
        <section className="dashboard-box-news">
          <h2>News</h2>
        </section>
        
        <section className="dashboard-box-ai">
          <h2>AI Insight</h2>
        </section>
        
        <section className="dashboard-box-meme">
          <h2>Meme</h2>
        </section>
      </div>
    );
  }
  
  export default Dashboard;



