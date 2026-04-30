import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import FAQ from '../components/FAQ';
import Team from '../components/Team';
import Contact from '../components/Contact';

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <FAQ />
      <Team />
      <Contact />
    </>
  );
};

export default HomePage;
