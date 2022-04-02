import {FC, useContext} from "react";
import React from "react";
import {Button} from "@mui/material";
import {Language} from "../../libs/language";
import "./pageLogin.css";
import {loginWithGoogle, logout} from "../../libs/firebase";
import {UserContext} from "../../libs/context";


const PageLogin:FC = (props: any) =>
{


  let {user} = useContext(UserContext);

  if (user == null)
  {
      return (
          <div id={"page-login"}>
              <h1>LOGIN</h1>
              <Button
                  color={"warning"}
                  variant={"contained"}
                  onClick={() => loginWithGoogle()}
              >
                  Login with Google
              </Button>
          </div>
      )
  }
  else
  {
      return (
          <div id={"page-login"}>
              <h1>Logout</h1>
              <Button
                  color={"warning"}
                  variant={"contained"}
                  onClick={() => logout()}
              >
                  Logout
              </Button>
          </div>
      )
  }

}

export default PageLogin;
