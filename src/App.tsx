import { Navigation } from "./components/Navigation/Navigation";
import { TimeLine } from "./components/TimeLine/TimeLine";
import Portfolio from "./components/Portfolio/Portfolio";
import './App.css'
import About from "./components/About/About";
import { ScrollText } from "./components/ScrollText/ScrollText";
import IconGrid from "./components/IconGrid/IconGrid";
import Footer from "./components/Footer/Footer";
import React, { useRef } from "react";
import {useScrollToSection} from "./hooks/useScrollToSection";
import AnimatedImage from "./components/AnimatedImage/AnimatedImage";
import useAnimatedImage from "./hooks/useAnimatedImage";
import Particles from "./components/Particles/Particles";
import { tabs } from "./shared/utils/navUtils";
import { linksObjectBuilder } from "./shared/utils/navUtils";

const App: React.FC = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const sectionRefs = [homeRef, aboutRef, servicesRef, contactRef];



  const { activeSection,formerColor, scrollToSection } = useScrollToSection(sectionRefs, tabs);

  const links = linksObjectBuilder(scrollToSection);

  const { isVisible, handleImageClick, controls } = useAnimatedImage(200);

  return (
    <div id="home">
      <Navigation 
        links={links} 
        activeSection={activeSection} 
        sectionRefs={{ homeRef, aboutRef, servicesRef, contactRef }} 
        formerColor={formerColor}
      />
      <div  />
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
      <picture>
        <source srcSet="./img/spacex-small.jpg" media="(max-width: 600px)" />
        <source srcSet="./img/spacex-medium.jpg" media="(max-width: 1200px)" />
        <img
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
          sizes="(max-width: 600px) 50vw, (max-width: 1200px) 50vw, 50vw"
          loading="lazy"
        />
      </picture>
      <div className="part-container">
      <Particles 
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
        ref={homeRef}
      />
      </div>
      <main>
        <ScrollText baseVelocity={-0.5}>I build stuff 🏗️... and sometimes I break them ⚠️  -</ScrollText>
        <ScrollText baseVelocity={0.5}>🧪 I find bugs 🐞... and in a good day I fix them 🎉   -</ScrollText>
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