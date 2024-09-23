import React, { createContext, useState } from "react";

export const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
    const [fontSize, setFontSize] = useState(20); // Tamaño de letra predeterminado

    const updateFontSize = (size) => {
        switch (size) {
            case "Pequeña":
                setFontSize(14);
                break;
            case "Mediano":
                setFontSize(20);
                break;
            case "Grande":
                setFontSize(28);
                break;
            default:
                setFontSize(20);
        }
    };

    return (
        <FontSizeContext.Provider value={{ fontSize, updateFontSize }}>
            {children}
        </FontSizeContext.Provider>
    );
};
