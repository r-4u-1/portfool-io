import { useRef } from "react";
import { motion, useScroll, MotionStyle, useCycle } from "framer-motion";
import { useDimensions } from "../../use-dimentions";
import { MenuToggle } from "../MenuToggle/MenuToggle";
import { SideNav } from "../SideNav/SideNav";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import "./Navigation.css";
import { useNavbarWidth } from "../../hooks/useNavbarWidth";
import { useNavbarStyle } from "../../hooks/useNavbarStyle";
import { NavbarLogo } from "../NavbarLogo/NavbarLogo";

const sidebarVariants = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at calc(100% - 10px - 30px) 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: "circle(30px at calc(100% - 10px - 30px) 40px)",
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
};

const tabs = [
    { name: "HOME", color: "#f00" },
    { name: "ABOUT", color: "#0c0" },
    { name: "SERVICES", color: "#b1f" },
    { name: "CONTACT", color: "#f90" },
];

const tabStyle: MotionStyle = {
    height: 30,
    position: "relative",
    padding: "3px 15px",
    margin: 0,
    fontFamily: "sans-serif",
    fontSize: 20,
    fontWeight: 700,
    color: "#222",
    cursor: "pointer",
};

const selectionStyle: MotionStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 15,
    top: 0,
    left: 0,
};

interface INavigationProps {
    links: {
        [key: string]: () => void;
    };
    activeSection: number | null;
    sectionRefs: {
        homeRef: React.RefObject<HTMLDivElement>;
        aboutRef: React.RefObject<HTMLDivElement>;
        servicesRef: React.RefObject<HTMLDivElement>;
        contactRef: React.RefObject<HTMLDivElement>;
    };
    formerColor?: string;
}

export const Navigation = ({ links, activeSection }: INavigationProps) => {
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);
    const navRef = useRef<HTMLElement | null>(null);
    const navbarWidth = useNavbarWidth(navRef);
    const scrollyY = useScrollPosition();
    const { justifyContent, backgroundColor, navWidth } = useNavbarStyle(scrollyY);

    const selected = activeSection ?? 0;
    const windowWidth = useWindowSize();
    const { scrollY } = useScroll();

    const handleLinkClick = (linkAction: () => void) => {
        linkAction();
    };

    return (
        <>
            <motion.nav
                ref={navRef}
                className="navbar"
                layout
                style={{
                    display: "flex",
                    justifyContent: navbarWidth > 900 ? justifyContent : "flex-end",
                    backgroundColor,
                    position: "fixed",
                    width: "100%",
                    top: 0,
                    padding: "1rem 0",
                    zIndex: 100,
                    right: 0,
                    alignItems: "center",
                }}
            >
                <motion.div className="navbar__logo">
                    <NavbarLogo scrollY={scrollY} />
                </motion.div>
                <ul
                    className="navbar__tabs"
                    style={{
                        position: "relative",
                        width: navWidth,
                        right: "20px",
                    }}
                >
                    {tabs.map(({ name, color }, i) => (
                        <motion.li
                            style={tabStyle}
                            key={i}
                            initial={{ color: i === selected ? "#fff" : color }}
                            animate={{ color: i === selected ? "#fff" : color }}
                            transition={{ duration: 0.3 }}
                            onTap={() => {
                                handleLinkClick(links[name]);
                            }}
                        >
                            <span style={{ position: "relative", zIndex: 1 }}>{name}</span>
                            {i === selected && (
                                <motion.div
                                    style={selectionStyle}
                                    layoutId="selected"
                                    key={selected}
                                    animate={{ backgroundColor: color }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.5 }}
                                />
                            )}
                        </motion.li>
                    ))}
                </ul>
            </motion.nav>

            {windowWidth <= 900 && (
                <motion.nav
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                    custom={height}
                    ref={containerRef}
                    className="navbar__sidebar"
                    style={{ height: isOpen ? "100%" : "100px" }}
                >
                    <motion.div className="background" variants={sidebarVariants} />
                    <SideNav />
                    <MenuToggle toggle={() => toggleOpen()} />
                </motion.nav>
            )}
        </>
    );
};