import { forwardRef, useMemo } from 'react';
import './About.css';
import aboutData from './data/about.json';
import DecryptedText from '../DecryptedText/DecryptedText';

interface AboutProps {
  children?: React.ReactNode;
}

const About = forwardRef<HTMLDivElement, AboutProps>((_, ref) => {
    const { title, description } = useMemo(() => {
        if (!aboutData?.about) {
            return { title: "About me", description: "I am the react developer swiss army knife" };
        }
        return aboutData.about;
    }, []);

    return (
        <div className='about' id='about' ref={ref}>
            <div className="about__profile-img-container">
                <picture>
                <source srcSet="./img/black-helmet-small.jpg" media="(max-width: 600px)" width="480" height="720" />
                <source srcSet="./img/black-helmet-medium.jpg" media="(max-width: 1200px)" width="960" height="1440" />
                <img
                    src="./img/black-helmet.jpg"
                    alt="Profile image"
                    id="profile-img"
                    aria-describedby="about-me-title"
                    width="1920"
                    height="2880"
                    style={{
                    width: "100%",
                    height: "auto",
                    }}
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    loading="lazy"
                />
                </picture>
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