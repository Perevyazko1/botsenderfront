import React from 'react';
import {MainPage} from "../pages/MainPage";
import {Route, Routes} from "react-router-dom";


function App() {
    return (
    <>
        <Routes>
            <Route path={"/:id_chat"} element={<MainPage/>}/>
        </Routes>
    </>

    );
}

export default App;
