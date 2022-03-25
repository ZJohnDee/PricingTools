import {FC} from "react";

import React from "react";
import {Button} from "@mui/material";

import "./header.css";

const Header:FC = (props) =>
{

  let loggedIn = false;

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
          loggedIn
        }



      </div>
    </div>
  );
};

export default Header;
