import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        alert("Your prefences been updated");
        
        navigate('/Dashboard'); 
    
      } catch (error) {
        console.error("Something went wrong", error);
        alert("Failed connrcting to the server");
      }
    };
  
    return (
        <div>
            <h2>בוא נתאים את החוויה עבורך</h2>
            <form onSubmit={handleSubmit}>
            
            {/* שאלה 1: סוג משקיע */}
            <label>What type of investor are you?</label>
            <select value={investorType} onChange={(e) => setInvestorType(e.target.value)} required>
                <option value="">Select...</option>
                <option value="HODLer">HODLer</option>
                <option value="Day Trader">Day Trader</option>
                <option value="NFT Collector">NFT Collector</option>
            </select>
    
            {/* שאלה 2: נכסים מעניינים (מערך) */}
            <p>What crypto assets are you interested in?</p>
            {['BTC', 'ETH', 'SOL', 'NFTs'].map(asset => (
                <label key={asset}>
                <input type="checkbox" onChange={() => handleToggle(asset, assets, setAssets)} /> {asset}
                </label>
            ))}
    
            {/* שאלה 3: העדפת תוכן (מערך) */}
            <p>What kind of content would you like to see?</p>
            {['Market News', 'Charts', 'Social', 'Fun'].map(item => (
                <label key={item}>
                <input type="checkbox" onChange={() => handleToggle(item, content, setContent)} /> {item}
                </label>
            ))}
    
            <button type="submit" style={{ marginTop: '20px' }}>Save & Continue</button>
            </form>
        </div>
    );
  }

export default Onboarding;