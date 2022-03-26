import {FC, useContext} from "react";

import React from "react";
import {Button} from "@mui/material";

import "./header.css";
import {UserContext} from "../../libs/context";

const Header:FC = (props) =>
{

  const {user} = useContext(UserContext);
  let loggedIn = user != null;

  return (
    <div className={"header"}>
      <div className={"header-empty"}></div>
      <div className={"header-logo"}>
        <h1>Pricing Tool</h1>
      </div>
      <div className={"header-login"}>

        {
          !loggedIn &&
          <Button
            variant={"contained"}
            color={"secondary"}
            href={"/login"}
          >
            Login
          </Button>
        }

        {
          <Button
            variant={"contained"}
            color={"secondary"}
            href={"/dashboard"}
          >
            Dashboard
          </Button>
        }



      </div>
    </div>
  );
};

export default Header;
