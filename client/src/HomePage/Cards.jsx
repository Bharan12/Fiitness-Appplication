import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Who we are & What we Have</h1>
      <p style={{textAlign: "center"}}>When you choose Buildup Fitness Studio, you are choosing more than fitness equipment, you are entering into a relationship that will enhance your life, improve your performance and ensure the effectiveness of your every workout through every day you use your equipment. Every promise and every service of Hawk Fitness Studio is dedicated to meet and exceed our customer’s expectations. This isn’t our company statement; this is our way of doing business. As other fitness providers come and go, Hawk  Fitness Studio remains the single stable solution to your fitness needs.</p>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/image-2.jpg'
              text='Bodybuilding is the practice of progressive resistance exercise to build, control, and develop the body muscles'
              label='BODYBUILDING'
              path='/services'
            />
            <CardItem
              src='images/image-1.jpg'
              text='Nutrition is about eating a regular, balanced diet, Good nutrition helps fuel your body'
              label='NUTRITION'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/image-5.jpg'
              text='Cardio Exercises improves the heart rate and blood circulation in the entire body'
              label='CARDIO'
              path='/services'
            />
            <CardItem
              src='images/image-3.jpg'
              text='They strengthen your lungs and heart while lowering the blood pressure'
              label='AEROBIC'
              path='/products'
            />
            <CardItem
              src='images/image-4.jpg'
              text='Traditional yoga is a group of physical, mental, and spiritual practices'
              label='YOGA'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
