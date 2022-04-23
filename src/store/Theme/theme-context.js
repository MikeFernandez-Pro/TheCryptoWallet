import React from "react";

const ThemeContext = React.createContext({
    lightTheme: false,
    changeTheme: () => {}
});

export default ThemeContext;