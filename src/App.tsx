import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/header/Header";
import {createTheme, ThemeOptions, ThemeProvider} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Padding} from "@mui/icons-material";
import PageLogin from "./pages/login/PageLogin";
import {UserContext} from "./libs/context";
import {useUserData} from "./libs/hooks";
import PageDashboard from "./pages/dashboard/PageDashboard";
import PageAddProduct from "./pages/add_product/PageAddProduct";

const themeOptions = {
    palette: {
        type: 'light',
        primary: {
            main: '#ffffff',
        },
        secondary: {
            main: '#28bb1a',
            contrastText: "#FFFFFF"
        },
    },
};

const theme = createTheme(themeOptions);


function App() {

  let userData: any = useUserData();


    return (

      <UserContext.Provider value={userData}>
        <div className={"App"}>
            <ThemeProvider theme={theme}>
                <Header/>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/login"} element={<PageLogin/>}/>
                        <Route path={"/dashboard"} element={<PageDashboard/>}/>
                        <Route path={"/add/product"} element={<PageAddProduct/>}/>
                        <Route path={"/edit/product/:productID"} element={<PageAddProduct/>}/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
      </UserContext.Provider>

  );
}

export default App;
