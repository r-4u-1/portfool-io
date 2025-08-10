export const tabs = [
    { name: "HOME", color: "#f00" },
    { name: "ABOUT", color: "#0c0" },
    { name: "SERVICES", color: "#b1f" },
    { name: "CONTACT", color: "#f90" },
];

export interface NavLinks {
  HOME: () => void;
  ABOUT: () => void;
  SERVICES: () => void;
  CONTACT: () => void;
}

export const linksObjectBuilder = (
    scrollFunc: (index: number) => void
) : NavLinks => {
    const linksOptions: NavLinks = {
        HOME: () => scrollFunc(0),
        ABOUT: () => scrollFunc(1),
        SERVICES: () => scrollFunc(2),
        CONTACT: () => scrollFunc(3),
    };
    return linksOptions;
};