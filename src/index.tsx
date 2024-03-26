import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './app/style/index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter, HashRouter} from "react-router-dom";



const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

root.render(
    <HashRouter>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <App/>
            </ThemeProvider>
    </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
