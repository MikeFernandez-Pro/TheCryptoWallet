import React from "react";

const ThemeContext = React.createContext({
    lightTheme: true,
    changeTheme: () => {}
});

export default ThemeContext;