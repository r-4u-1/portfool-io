import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "../MenuItem/MenuItem";
import { NavLinks, tabs } from "../../shared/utils/navUtils";
import "./SideNav.css";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

interface ISideNavProps {
  links: NavLinks;
}

export const SideNav = ({links}: ISideNavProps ) => (
    <motion.ul className="side-nav" variants={variants}>
    {tabs.map(({name, color}, i) => (
      <MenuItem i={i} key={i} name={name as keyof NavLinks} color={color} links={links} />
    ))}
  </motion.ul>
);
