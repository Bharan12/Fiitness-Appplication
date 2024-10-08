import { Button } from '@material-tailwind/react'
// import React from 'react'
import'./css/home.css'
function Home() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted/>
      <h1>TRANING FOR LIFE, NOT FOR LOOKS</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button >
          GET STARTED
        </Button>
      </div>
    </div>
  )
}

export default Home