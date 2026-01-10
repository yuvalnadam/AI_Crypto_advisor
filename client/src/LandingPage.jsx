import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="landing-wrapper">
            {/*Navbar  */}
            <nav className="navbar">
                <div className="navbar-content">
                    <img src="/logo.png" alt="Logo" className="logo" />
                    <div>
                        <button className="login-submit-btn" onClick={() => navigate('/login')}>Login</button>
                    </div>
                </div>
            </nav>

            <header className="landing-hero">
                <div className="hero-content">
                    <h1 className="hero-title">The Future of <span className="green-text">Crypto Advisory</span> is Here.</h1>
                    <p className="hero-subtitle">
                        Advanced AI insights, real-time market data, and personalized portfolio management – all in one place
                    </p>
                    <div className="hero-actions">
                        <button className="main-cta" onClick={() => navigate('/register')}>Start Your Journey</button>
                    </div>
                </div>
                <div className="hero-visual">
                    <img src="/dashboard-preview.png" alt="App Preview" />
                </div>
            </header>
        </div>
    );
}

export default LandingPage;