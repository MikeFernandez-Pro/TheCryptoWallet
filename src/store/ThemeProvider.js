import { useState } from "react";
import ThemeContext from "./theme-context";
 
const ThemeProvider = (props) => {

    const [lightTheme, setLightTheme] = useState(true)
     
    const changeThemeHandler = () => {
        setLightTheme((prevState) => !prevState);
    };

    const themeContext = {
        lightTheme: lightTheme,
        changeTheme: changeThemeHandler
    }

    return (
        <ThemeContext.Provider value={themeContext}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;