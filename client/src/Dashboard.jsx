import { useState } from 'react'; // manage the data
import { useNavigate } from 'react-router-dom'; // moving between pages
import './Dashboard.css';

function Dashboard() {
    return (
      
      <div className="dashboard-container">
        <section className="dashboard-box-prices">
          <h2>Prices</h2>
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



