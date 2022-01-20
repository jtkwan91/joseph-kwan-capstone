import React from 'react';
import bgBottom from '../../assets/images/bg-bottom.png'
import './Home.scss'

function Home() {
  return <div className='home'>
      <img className='home__background' src={bgBottom} alt="background" />
  </div>;
}

export default Home;
