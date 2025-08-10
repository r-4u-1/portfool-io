import * as React from "react";
import { motion } from "framer-motion";
import { NavLinks } from "../../shared/utils/navUtils";
import "./MenuItem.css";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

// const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

interface IMenuItem {
  i: number;
  name: keyof NavLinks;
  color: string;
  links: NavLinks
}

export const MenuItem = ({  name, color, links }: IMenuItem) => {

  const style = { border: `2px solid ${color}`,
fontFamily: "Jost, sans-serif",
color: `${color}`,
textDecoration: "none" } as React.CSSProperties;

  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="icon-placeholder" style={style} >
        {/* <img src={`./img/svg/${name.toLocaleLowerCase()}.svg`} alt={`${name} icon`} /> */}
      </div>
      <a className="text-placeholder" style={style} href={`#${name}`} onClick={(e)=> {
        e.preventDefault();
        if (typeof links[name] === "function") {
          links[name]();
        }
      }}>{name} </a>
    </motion.li>
  );
};
