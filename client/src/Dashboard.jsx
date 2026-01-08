import { useState } from 'react'; // manage the data
import { useNavigate } from 'react-router-dom'; // moving between pages

function Dashboard() {
    const navigate = useNavigate(); 
    const name = localStorage.getItem('userName');
  
    return <h1> Hi! {name}</h1>;
  }
  
  export default Dashboard;



