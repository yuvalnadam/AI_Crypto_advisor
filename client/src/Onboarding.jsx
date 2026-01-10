import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';


function Onboarding() {
    const navigate = useNavigate();
    const [investorType, setInvestorType] = useState("");
    const [assets, setAssets] = useState([]);
    const [content, setContent] = useState([]);

    const handleToggle = (item, list, setList) => {
      if (list.includes(item)) {
        setList(list.filter(i => i !== item));
      } else {
        setList([...list, item]);
      }
    };
    const handleChangeType = (e) => {
        setInvestorType(e.target.value);
    };
    const handleChangeAssets = (e) => {
        setAssets(e.target.value);
    };
    const handleChangeContent = (e) => {
        setContent(e.target.value);
    };
    const handleSubmit = async (e) => {
      e.preventDefault(); //the page does not render
      
      try {
        const email = localStorage.getItem('userEmail');

        //debbuging the details sent 
        console.log("Sending update for email:", email);
        console.log("Data to send:", { investor_type: investorType, assets_interest: assets, content_preference: content });
        
        const response = await axios.put('http://localhost:3000/Onboarding', {
          email: email,
          investor_type: investorType,
          assets_interest: assets,
          content_preference: content
        });
    
        console.log("res", response.data);        
        navigate('/Dashboard'); 
    
      } catch (error) {
        console.error("Something went wrong", error);
        alert("Failed connrcting to the server");
      }
    };
  
    return (
      <div className="login-page-wrapper">
          {/* Navbar אחיד */}
          <nav className="navbar">
              <div className="navbar-content">
                  <div className="navbar-right">
                      <img src="/logo.png" alt="Crypto Logo" className="logo" />
                  </div>
              </div>
          </nav>

          <div className="hero-section">
              <img src="/reg.png" alt="Background" className="hero-image" />

              <div className="login-overlay-card onboarding-card">
                  <h2 className="login-title">Personalize Your Experience</h2>
                  <p className="login-desc">Help us get to know your investment style</p>

                  <form onSubmit={handleSubmit} className="altshuler-form">
                      
                      {/*investor type*/}
                      <div className="onboarding-group">
                          <label className="group-label">What type of investor are you?</label>
                          <div className="options-grid">
                              {['HODLer', 'Day Trader', 'NFT Collector'].map(type => (
                                  <button 
                                      type="button"
                                      key={type}
                                      className={`option-btn ${investorType === type ? 'active' : ''}`}
                                      onClick={() => setInvestorType(type)}
                                  >
                                      {type}
                                  </button>
                              ))}
                          </div>
                      </div>

                      {/*assets*/}
                      <div className="onboarding-group">
                          <label className="group-label">What crypto assets are you interested in?</label>
                          <div className="options-grid">
                              {['BTC', 'ETH', 'SOL', 'NFTs'].map(asset => (
                                  <button 
                                      type="button"
                                      key={asset}
                                      className={`option-btn ${assets.includes(asset) ? 'active' : ''}`}
                                      onClick={() => handleToggle(asset, assets, setAssets)}
                                  >
                                      {asset}
                                  </button>
                              ))}
                          </div>
                      </div>

                      {/*content*/}
                      <div className="onboarding-group">
                          <label className="group-label">What kind of content would you like to see?</label>
                          <div className="options-grid">
                              {['Market News', 'Charts', 'Social', 'Fun'].map(item => (
                                  <button 
                                      type="button"
                                      key={item}
                                      className={`option-btn ${content.includes(item) ? 'active' : ''}`}
                                      onClick={() => handleToggle(item, content, setContent)}
                                  >
                                      {item}
                                  </button>
                              ))}
                          </div>
                      </div>

                      <div className="form-footer">
                          <button type="submit" className="login-submit-btn">Save & Continue</button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  );
}

export default Onboarding;