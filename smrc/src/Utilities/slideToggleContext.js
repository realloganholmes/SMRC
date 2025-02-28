import React, { createContext, useState, useContext } from "react";

const SlideToggleContext = createContext();

export const SlideToggleProvider = ({ children }) => {
    const [isToggled, setIsToggled] = useState(false);

    const toggle = () => {
        setIsToggled((prev) => !prev);
    };

    return (
        <SlideToggleContext.Provider value={{ isToggled, toggle }}>
            {children}
        </SlideToggleContext.Provider>
    );
};

export const useSlideToggle = () => useContext(SlideToggleContext);
