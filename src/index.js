import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { Provider } from "react-redux";
import ThemeProvider from "./store/Theme/ThemeProvider"
import store from "./store/index"

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </Provider>, document.getElementById('root'));
