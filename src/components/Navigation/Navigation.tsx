import React, { useEffect, useRef, useState } from "react";

export const Navigation: React.FC = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [navbarWidth, setNavbarWidth] = useState<number>(0);
    const dropDownRef = useRef<HTMLDivElement | null>(null);
    const navRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (dropDownRef.current && navRef.current) {
            // const navWidth = navRef.current.offsetWidth;
            // const paddingLeft = parseFloat(getComputedStyle(navRef.current).getPropertyValue("padding-left"));
            // const paddingRight = parseFloat(getComputedStyle(navRef.current).getPropertyValue("padding-right"));    
            
            // const navWidthWithoutPadding = navWidth - (paddingLeft + paddingRight);
            
            // console.log({navWidth});
            // console.log({paddingLeft});
            // console.log({paddingRight});
            // console.log({navWidthWithoutPadding});
            // const totalWidth = window.innerWidth;
            // console.log({totalWidth});
            
            // const remainingWidth = (totalWidth - navWidthWithoutPadding) / 2;

            // console.log({remainingWidth});
            // dropDownRef.current.style.right = `${remainingWidth}px`;
        }
    }, [isActive]);

    useEffect(() => {
        const navbarElement = navRef.current;
    
        if (!navbarElement) return;
    
        // Create a ResizeObserver to track navbar size
        const resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            const width = entry.contentRect.width;
            setNavbarWidth(width);
    
            // Automatically close the mobile menu if width exceeds threshold
            if (width > 800) {
                setIsActive(false); // Close menu when view is not mobile
            }
          }
        });
    
        resizeObserver.observe(navbarElement);
    
        return () => {
          resizeObserver.disconnect(); // Cleanup observer on component unmount
        };
      }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight - 500) {
                if (navRef.current) {
                    navRef.current.style.transition = 'background-color 0.5s ease';
                    navRef.current.style.backgroundColor = 'black';
                }
            } else {
                if (navRef.current) {
                    navRef.current.style.transition = 'background-color 0.5s ease';
                    navRef.current.style.backgroundColor = 'transparent';
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="nav-container">
            <nav ref={navRef}>
                <ul>
                    <li>
                        <a href="#home" onClick={() => setIsActive(false)}>Home</a>
                    </li>
                    <li>
                        <a href="#about" onClick={() => setIsActive(false)}>About</a>
                    </li>
                    <li>
                        <a href="#services" onClick={() => setIsActive(false)}>Services</a>
                    </li>
                </ul>
                <button className="nav-btn">Contact</button>
                <button className="hamburger" onClick={() => setIsActive(prev => !prev)}>
                    {isActive ? <span>⤬</span> : <span>&#9776;</span>}
                </button>
            </nav>
            {isActive && (
                <div ref={dropDownRef} className="drop-down-nav-menu">
                    <ul>
                        <li>
                            <a href="#home" onClick={() => setIsActive(false)}>Home</a>
                        </li>
                        <li>
                            <a href="#about" onClick={() => setIsActive(false)}>About</a>
                        </li>
                        <li>
                            <a href="#services" onClick={() => setIsActive(false)}>Services</a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};
