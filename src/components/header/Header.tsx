import {FC} from "react";

import React from "react";
import {Button} from "@mui/material";

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
          <Button variant={"contained"}>Login</Button>
        }

        {
          loggedIn
        }



      </div>
    </div>
  );
};

export default Header;
