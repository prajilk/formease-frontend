import React from 'react';
import Nav from '../Components/Nav/Nav'
import HeaderSection from './Components/Header/HeaderSection';
import Section1 from './Components/Section1/Section1';
import Section2 from './Components/Section2/Section2';
import Section3 from './Components/Section3/Section3';
import HomeFooter from './Components/Footer/HomeFooter';

const Home = () => {

    return (
        <div>
            <Nav />
            <HeaderSection />
            <Section1 />
            <Section2 />
            <Section3 />
            <HomeFooter />
        </div>
    )
}

export default Home
