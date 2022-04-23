import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { Provider } from "react-redux";
import ThemeProvider from "./store/Theme/ThemeProvider"
import store from "./store/index"
import {BrowserRouter} from "react-router-dom"

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </Provider>
    </BrowserRouter>, document.getElementById('root'));
