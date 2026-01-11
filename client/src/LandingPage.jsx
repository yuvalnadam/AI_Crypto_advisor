import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
const API_URL = "https://ai-crypto-advisor-6l7n.onrender.com";


function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="landing-wrapper">
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-content">
                    <div className="navbar-right">
                        <img src="/logo.png" alt="Logo" className="logo" />
                    </div>
                    <div className="navbar-left">
                        <button className="login-submit-btn" onClick={() => navigate('/login')}>
                            Login
                        </button>
                    </div>
                </div>
            </nav>

            <header className="landing-hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Your own <span className="green-text">Crypto Advisor</span> is Here
                    </h1>
                    <p className="hero-subtitle">
                        Advanced AI insights, real-time market data, and personalized memes all in one place
                    </p>
                    <div className="hero-actions">
                        <button className="main-cta" onClick={() => navigate('/register')}>
                            Start Your Journey
                        </button>
                    </div>
                </div>

                {/* floating preview */}
                <div className="hero-visual">
                    <div className="mockup-container">
                        {/* prices */}
                        <div className="floating-card card-prices">
                            <div className="mock-line short"></div>
                            <div className="mock-price">BTC <span className="price-val">$45,230</span></div>
                            <div className="mock-price">ETH <span className="price-val">$2,450</span></div>
                        </div>

                        {/* meme */}
                        <div className="floating-card card-meme">
                            <div className="mock-meme-img">
                                <img src="/main_meme.png" />
                            </div>
                            <div className="mock-line"></div>
                            <div className="mock-line short"></div>
                        </div>

                        {/* AI Insight */}
                        <div className="floating-card card-ai">
                            <div className="ai-badge">AI INSIGHT</div>
                            <p style={{fontSize: '0.7rem', margin: '5px 0', color: '#636e72'}}>
                                Market sentiment is looking bullish for SOL...
                            </p>
                            <div className="mock-line"></div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default LandingPage;