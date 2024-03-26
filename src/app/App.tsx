import React, {useState} from 'react';
import {MainPage} from "../pages/MainPage";
import {Route, Routes} from "react-router-dom";
import {DataContent} from "app/providers/ContextProvider/DataContext";



function App() {
        const [dataSort, setDataSort] = useState<any>()

    return (

        <DataContent.Provider value={{dataSort, setDataSort}}>
            <Routes>
                <Route path={"/tasks/:id_chat"} element={<MainPage/>}/>
            </Routes>
        </DataContent.Provider>


    );
}

export default App;
