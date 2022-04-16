import {FC, useContext} from "react";

import React from "react";
import {Button} from "@mui/material";

import "./header.css";
import {LanguageContext, UserContext} from "../../libs/context";
import {LanguageProvider} from "../../libs/language";

const Header:FC = (props) =>
{

  const {user} = useContext(UserContext);
  let loggedIn = user != null;

  const {language} = useContext(LanguageContext);
  const langProvider = new LanguageProvider(language);

  return (
    <div className={"header"}>
      <div className={"header-empty"}></div>
      <div className={"header-logo"}>
        <h1>Pricing Tool</h1>
      </div>
      <div className={"header-login"}>

        <Button
          color={"secondary"}
          variant={"text"}
          href="/docs/getting_started"
          style={{marginRight: "5px"}}
        >
          Docs
        </Button>
        {
          !loggedIn &&
          <Button
            variant={"contained"}
            color={"secondary"}
            href={"/login"}
          >
            {langProvider.getText("Buttons.Login")}
          </Button>
        }

        {
          loggedIn &&
          <Button
            variant={"contained"}
            color={"secondary"}
            href={"/dashboard"}
          >
            {langProvider.getText("Buttons.Dashboard")}
          </Button>
        }



      </div>
    </div>
  );
};

export default Header;
