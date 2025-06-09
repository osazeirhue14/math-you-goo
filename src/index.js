import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Footer from './Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import routing components
import Signup from './Signup'
import Login from './Login';
import Home from './Home';
import Account from './menuOptions/Account';
import LinearAlgebra from './menuOptions/LinearAlgebra';
import Contact from './menuOptions/Contact';
import Review from './menuOptions/Review';
import Help from './menuOptions/Help';
import Logout from './menuOptions/Logout';
import DifferentialCalculus from './menuOptions/DifferentialCalculus';
import FooterM from './menuOptions/FooterM';
import FooterC from './calculusGame/FooterC';

import CalGame1 from './calculusGame/CalGame1';
import CalGame2 from './calculusGame/CalGame2';
import CalGame3 from './calculusGame/CalGame3';

import ChainGame1 from './calculusGame/ChainGame1';
import ChainGame2 from './calculusGame/ChainGame2';
import ChainGame3 from './calculusGame/ChainGame3';

import Dot1 from './algebraGames/Dot1';
import Dot2 from './algebraGames/Dot2';
import Dot3 from './algebraGames/Dot3';

import P1 from './algebraGames/P1';
import P2 from './algebraGames/P2';
import P3 from './algebraGames/P3';
//import PhaserCanvas from './menuOptions/PhaserCanvas';
//import DropdownMenu from './DropdownMenu';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Router>
    <Routes>
      <Route path="/" element={<App />} />            {/* Main application route */}
      <Route path="/login" element={<Login />} />     {/* Login route */}
      <Route path="/signup" element={<Signup />} />   {/* Signup route */}
      <Route path="/home" element={<Home />} />   {/* Signup route */}
      <Route path="/Account" element={<Account />} />
      <Route path="/LinearAlgebra" element={<LinearAlgebra />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Review" element={<Review />} />
      <Route path="/Help" element={<Help />} />
      <Route path="/Logout" element={<Logout />} />
      <Route path="/DifferentialCalculus" element={<DifferentialCalculus />} />
      <Route path="/Footer" element={<Footer/>} />
      <Route path="/FooterM" element={<FooterM/>} />
      <Route path="/FooterC" element={<FooterC/>} />
     
      <Route path="/CalGame1" element={<CalGame1/>}/>
      <Route path="/CalGame2" element={<CalGame2/>}/>
      <Route path="/CalGame3" element={<CalGame3/>}/>

      <Route path="/ChainGame1" element={<ChainGame1/>}/>
      <Route path="/ChainGame2" element={<ChainGame2/>}/>
      <Route path="/ChainGame3" element={<ChainGame3/>}/>

      <Route path="/Dot1" element={<Dot1/>}/>
      <Route path="/Dot2" element={<Dot2/>}/>
      <Route path="/Dot3" element={<Dot3/>}/>

      <Route path="/P1" element={<P1/>}/>
      <Route path="/P2" element={<P2/>}/>
      <Route path="/P3" element={<P3/>}/>
      

   
    </Routes>
  </Router>
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
