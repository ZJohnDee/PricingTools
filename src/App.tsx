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
import PageAddClient from "./pages/add_client/PageAddClient";
import PageAddContract from "./pages/add_contract/PageAddContract";

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
                        <Route path={"/add/client"} element={<PageAddClient/>}/>
                        <Route path={"/add/contract"} element={<PageAddContract/>}/>
                        <Route path={"/edit/product/:productID"} element={<PageAddProduct/>}/>
                        <Route path={"/edit/client/:clientID"} element={<PageAddClient/>}/>
                        <Route path={"/edit/contract/:contractID"} element={<PageAddContract/>}/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
      </UserContext.Provider>

  );
}

export default App;
