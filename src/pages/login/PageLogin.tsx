import {FC, useContext} from "react";
import React from "react";
import {Button} from "@mui/material";
import {Language, LanguageProvider} from "../../libs/language";
import "./pageLogin.css";
import {loginWithGoogle, logout} from "../../libs/firebase";
import {LanguageContext, UserContext} from "../../libs/context";
import Disclaimer from "../../components/disclaimer/Disclaimer";


const PageLogin: FC = (props: any) => {


  let {user} = useContext(UserContext);

  const {language} = useContext(LanguageContext);
  const langProvider = new LanguageProvider(language);

  if (user == null) {
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
        <Disclaimer
          heading={langProvider.getText("Disclaimers.AccountPrivacy.Heading")}
          message={langProvider.getText("Disclaimers.AccountPrivacy.Message")}
          type={"warning"}
        />
      </div>
    )
  } else {
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
