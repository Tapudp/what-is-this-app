import HomeContainer from './containers';
import React from 'react';

export default function Home() {
  return (
    <div className='container mx-auto columns-3 bg-white text-black h-full flex flex-col p-5 min-h-screen'>
      <HomeContainer />
    </div>
  );
}
