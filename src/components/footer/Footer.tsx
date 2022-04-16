import { Button } from "@mui/material";
import { useContext } from "react"
import { LanguageContext } from "../../libs/context";
import { LanguageProvider } from "../../libs/language";

import "./footer.css"

export default (props: any) => {

  const { language, setLanguage } = useContext(LanguageContext);
  const langProvider = new LanguageProvider(language);

  const switchLanguage = () => {
    switch (language) {
      case "de":
        setLanguage("en");
        break;
      case "en":
        setLanguage("de");
        break;
    }
  }

  return (
    <div className="footer">
      <a>
        {langProvider.getText("Footer.Home")}
      </a>
      <a>
        {langProvider.getText("Footer.Impressum")}
      </a>
      <a>
        {langProvider.getText("Footer.Privacy")}
      </a>
      <Button
        variant={"text"}
        color="secondary"
        onClick={() => switchLanguage()}
      >
        {language.toUpperCase()}
      </Button>
    </div>
  )
}