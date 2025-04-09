import React from 'react'
import Navbar from './../components/Navbar';
import Header from '../components/Header';


const Home = () => {
  return (
    <div className='flex flex-col  mt-5 items-center justify-conter min-h-screen bg-center bg-cover'>
        <Navbar></Navbar>
        <Header></Header>
    </div>
  )
}

export default Home