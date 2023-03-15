import React from 'react';
import {createBrowserRouter} from "react-router-dom";
import Home from '../pages/HomePage/Home'
import CharacterPage from "../pages/CharacterPage/CharacterPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,

    },
    {
        path: "character/:id",
        element: <CharacterPage/>,

    },

]);
// const router = createBrowserRouter(
//     createRoutesFromElements(
//         <React.Fragment>
//             <Route exact path="/" element={<Home/>}/>
//             <Route exact path="/character" element={<CharacterPage/>}/>
//             <Route exact path="/character/:id" element={<div>id</div>}/>
//         </React.Fragment>
//     )
// );
export default router;