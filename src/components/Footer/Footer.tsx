import { forwardRef } from 'react';
// import linkedin from '/img/svg/LinkedIn.svg';
import './Footer.css';
import ProfileCard from '../ProfileCard/ProfileCard';

export const Footer = forwardRef<HTMLDivElement>((_, ref) => {
  // const socialLinks = [
  //   { href: "https://linkedin.com", src: linkedin, alt: "Visit my LinkedIn profile" },
  // ];
  
  return (
    <footer className="footer" ref={ref}>
      <div className="footer__icon-container">
        {/* {socialLinks.map((link, index) => (
          <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
            <img src={link.src} alt={link.alt} className="footer__icon" />
          </a>
        ))} */}
        <ProfileCard
          name="Raul"
          className="footer__profile-card"
  title="Developer & Testlead"
  handle="raul"
  status="Online"
  contactText="Contact Me"
  avatarUrl="./img/black-helmet.jpg"
  showUserInfo={true}
  enableTilt={true}
  enableMobileTilt={true}
        />
      </div>
      <div className="footer__links">
        {/* <a href="#about" className="footer__link">About</a>
        <a href="#portfolio" className="footer__link">Portfolio</a>
        <a href="#contact" className="footer__link">Contact</a> */}
      </div>
      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} Raul. All rights reserved.</p>
      </div>
    </footer>
  );
});

export default Footer;