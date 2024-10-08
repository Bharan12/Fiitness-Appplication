import React from 'react';
// import '../../index.css';
import HeroSection from './HeroSection.jsx';
import TopBar from './TopBar.jsx';
import Cards from './Cards'
import Footer from './Footer.jsx';


function Home() {
  return (
    <>
      <TopBar/>
      <HeroSection />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;
