import React from 'react'
import { Outlet } from 'react-router-dom';
import HomeNavBar from '../components/navbars/HomeNavBar';
import Footer from '../views/home/Footer';

const AppLayout = () => {
  return (
    <div>
        <section>
        <HomeNavBar />
        
        </section>

        <Outlet />


        <section className='pt-10'>
          <Footer />
        </section>
    </div>
  )
}


export default AppLayout;