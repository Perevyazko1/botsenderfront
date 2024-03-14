import React from 'react';
import './App.css';
import {Button, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import ColumnGroupingTable from "./TableList";
import CreateTask from "./CreateTask";


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <main>
                <ColumnGroupingTable/>
                <CreateTask/>

            </main>
        </ThemeProvider>

    );
}

export default App;
