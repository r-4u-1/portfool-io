import { Navigation } from "./components/Navigation/Navigation";
import { TimeLine } from "./components/TimeLine/TimeLine";
import Portfolio from "./components/Portfolio/Portfolio";
import './App.css'
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import { ScrollText } from "./components/ScrollText/ScrollText";
import IconGrid from "./components/IconGrid/IconGrid";
import Footer from "./components/Footer/Footer";
import React, { useRef } from "react";
import {useScrollToSection} from "./hooks/useScrollToSection";
import AnimatedImage from "./components/AnimatedImage/AnimatedImage";
import BackgroundImage from "./components/BackgroundImage/BackgroundImage";
import useAnimatedImage from "./hooks/useAnimatedImage";

const App: React.FC = () => {
  // Section refs
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const sectionRefs = [homeRef, aboutRef, servicesRef, contactRef];
  const { activeSection, scrollToSection } = useScrollToSection(sectionRefs);

  // Navigation links
  const links = {
    HOME: () => scrollToSection(homeRef),
    ABOUT: () => scrollToSection(aboutRef),
    SERVICES: () => scrollToSection(servicesRef),
    CONTACT: () => scrollToSection(contactRef),
  };

  const { isVisible, handleImageClick, controls } = useAnimatedImage(200);

  return (
    <div id="home">
      <Navigation 
        links={links} 
        activeSection={activeSection} 
        sectionRefs={{ homeRef, aboutRef, servicesRef, contactRef }} 
      />
      <div ref={homeRef} />
      {isVisible && (
        <AnimatedImage
          src="./img/astro1.png"
          alt="Astronaut Logo 1"
          initial={{ x: -100, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 1.5 }}
          controls={controls}
          onClick={handleImageClick}
          style={{
            position: "fixed",
            left: 0,
            top: "1rem",
            cursor: "pointer",
            zIndex: 10000,
          }}
        />
      )}
      <BackgroundImage
        src="./img/spacex.jpg"
        alt="SpaceX Background"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "50vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: 1,
        }}
      />
      <Hero />
      <main>
        <ScrollText baseVelocity={-0.5}>Framer Motion</ScrollText>
        <ScrollText baseVelocity={0.5}>Scroll velocity</ScrollText>
        <About ref={aboutRef} />
        <TimeLine ref={servicesRef} />
        <Portfolio />
        <IconGrid />
      </main>
      <Footer ref={contactRef} />
    </div>
  );
};

export default App;