import Footer from '@/components/Footer/Footer'

import Navbar from '@/components/Navbar/Navbar'
// import { getSession } from 'next-auth/react';
import React from 'react'


const Home = async() => {
  
  return (
    <div className="w-[90%] md:w-[96%] mx-auto">
     <Navbar/>
      <div>
       
      </div>
      <Footer/>
    </div>
  )
}

export default Home