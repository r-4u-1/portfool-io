import { forwardRef, useMemo } from 'react';
import './About.css';
import aboutData from './data/about.json';
import DecryptedText from '../DecryptedText/DecryptedText';

const About = forwardRef<HTMLDivElement>((_, ref) => {
    const { title, description } = useMemo(() => {
        if (!aboutData?.about) {
            return { title: "About me", description: "I am the react developer swiss army knife" };
        }
        return aboutData.about;
    }, []);

    return (
        <div className='about' id='about' ref={ref}>
            <div className="about__profile-img-container">
                <img 
                    src="img/black-helmet.jpg" 
                    alt="Profile image" 
                    id="profile-img" 
                    aria-describedby="about-me-title" 
                    width="630" 
                    height="945" 
                    loading="lazy" 
                />
            </div>
            <div className='about__text-container'>
                <h2 id="about-me-title">
                    <DecryptedText
                        text={title}
                        speed={50} // Scrambling frequency (50ms per update)
                        revealDelay={50} // Time before revealing the next character (50ms)
                        animateOn="view"
                        revealDirection="start"
                        sequential={true}
                    />
                </h2>
                <p>
                    <DecryptedText
                        text={description}
                        speed={50} // Scrambling frequency (50ms per update)
                        revealDelay={50} // Time before revealing the next character (50ms)
                        animateOn="view"
                        revealDirection="start"
                        sequential={true}
                    />
                </p>
            </div>
        </div>
    )
});

export default About;