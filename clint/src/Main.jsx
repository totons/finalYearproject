import React from 'react';
import Navbar from './component/shared/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './component/shared/footer/Footer';

const Main = () => {
    return (
        <>
<Navbar/>
<Outlet/>
<Footer/>

            
        </>
    );
}

export default Main;
