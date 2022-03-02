import ShowHideValueButton from "../UI/ShowHideValueButton/ShowHideValueButton";
import ThemeButton from "../UI/ThemButton/ThemeButton";
import classes from "./Header.module.css"
const Header = (props) => {
    
    return (
        <div className={classes.header}>
            <h1>The Wallet</h1>
            <ShowHideValueButton />
            <ThemeButton />
        </div>
    );
};

export default Header;