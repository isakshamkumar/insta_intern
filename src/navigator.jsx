import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Navigation from './components/Navigation'
import Explore from './components/Explore';
import Reels from './components/Reels';
// import Create from './overlay/create/App';
import Profile from './components/Profile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HashLoader from "react-spinners/HashLoader";

const cssOverride = {
  display: "block",
  margin: "0 auto",
  padding: "331.5px 0px",
};

export default function Navigator() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <div className='App'>
      {
        loading ?
          <HashLoader
            className='loader'
            color={'#ffffff'}
            loading={loading}
            size={50}
            cssOverride={cssOverride}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          :
          <Router>
            <Navigation />
            <Routes>
              <Route exact path="/insta-clone-app/" element={<Home />} />
              {/* <Route path='/Search' element={<Search />} /> */}
              <Route path='/Explore' element={<Explore />} />
              <Route path='/Reels' element={<Reels />} />
              {/* <Route path='/Messages' element={<Messages />} /> */}
              {/* <Route path='/Create' element={<Create />} /> */}
              <Route path='/Profile' element={<Profile />} />
              {/* <Route path='/Chillzone' element={<Chillzone />} /> */}
            </Routes>
          </Router>
      }
    </div>
  );
}