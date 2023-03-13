import React from "react";
import Home from "./pages/HomePage/Home";
import styles from './App.scss'
const App = () =>{
    return (
        <div className={styles["*"]}>
            <Home/>
        </div>
    )
}

export default App;