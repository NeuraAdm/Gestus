import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services'
import About from './components/About';
import Carousel from './components/Carousel';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Hero />  
        <About />
        <Carousel />
        <Services />
        <Team />
        <Contact />
        <Footer />
      </div>
      <Chatbot />
    </>
  );
}

export default App;