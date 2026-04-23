import React from 'react';
import Banner from './homeComponent/Banner';
import HomeSlider from './homeComponent/HomeSlider';
import HomeClasses from './homeComponent/HomeClasses';
import Instructor from '../Instructor/Instructor';

const Home = () => {
    return (
        <div>
            <Banner/>
            {/* <HomeSlider/> */}
            <HomeClasses/>
            <Instructor/>
        </div>
    );
}

export default Home;
