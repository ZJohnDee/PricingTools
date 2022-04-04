import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/header/Header";
import {createTheme, ThemeOptions, ThemeProvider} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Padding} from "@mui/icons-material";
import PageLogin from "./pages/login/PageLogin";
import {LanguageContext, UserContext} from "./libs/context";
import {useUserData} from "./libs/hooks";
import PageDashboard from "./pages/dashboard/PageDashboard";
import PageAddProduct from "./pages/add_product/PageAddProduct";
import PageAddClient from "./pages/add_client/PageAddClient";
import PageAddContract from "./pages/add_contract/PageAddContract";
import {Language} from "./libs/language";
import PageHome from "./pages/home/PageHome";

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
  const [language, setLanguage] = useState<Language>("en");

  return (

    <LanguageContext.Provider value={{language: language, setLanguage: setLanguage}}>
      <UserContext.Provider value={userData}>
        <div className={"App"}>
          <ThemeProvider theme={theme}>
            <Header/>
            <BrowserRouter>
              <Routes>
                <Route path={"/login"} element={<PageLogin/>}/>
                <Route path={"/"} element={<PageHome/>}/>
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
    </LanguageContext.Provider>

  );
}

export default App;
