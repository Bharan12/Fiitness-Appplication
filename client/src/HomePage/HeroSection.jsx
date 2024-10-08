import React from 'react';
// import '../../index.css';
import { Button } from './Button';
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const navigate=useNavigate()
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted/>
      <h1>TRANING FOR LIFE, NOT FOR LOOKS</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button className='btns' onClick={()=>navigate('/signin')} buttonStyle='btn--outline' buttonSize='btn--large'>
          GET STARTED
        </Button>
      </div>
    </div>
  )
}

export default HeroSection