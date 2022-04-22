import VectorIcon from "../../assets/undraw_visionary_technology_re_jfp7.svg";
import VectorRelation from "../../assets/relationship_explanation.svg";
import ImageAddProduct from "../../assets/Add_Product.png";
import {useContext} from "react";
import {LanguageContext} from "../../libs/context";
import {Language, LanguageProvider} from "../../libs/language";

import "./pageHome.css";
import {Button} from "@mui/material";

export default (props: any) => {

  const {language} = useContext(LanguageContext);
  const langProvider = new LanguageProvider(language);

  return(
    <div id={"page-home"}>
      <div id={"page-home-title"} className={"info-section"}>
        <div id="page-home-title-text" className={"info-section-text"}>
          <h1>{langProvider.getText("Home.Title")}</h1>
          <h3>{langProvider.getText("Home.Subtitle")}</h3>
          <Button
            variant={"contained"}
            color={"secondary"}
            href={"/login"}
          >
            {langProvider.getText("Buttons.CallToAction")}
          </Button>
        </div>

        <img src={VectorIcon} alt={"Promotional Material"}/>
      </div>



      <div id={"page-home-add-products"} className={"info-section"}>
        <img src={ImageAddProduct} alt={"Promotional Material"}/>
        <div className={"info-section-text"}>
          <h1>
            {langProvider.getText("Home.AddProducts.Title")}
          </h1>
          <p>
            {langProvider.getText("Home.AddProducts.Subtitle")}
          </p>
        </div>
      </div>

      <div id={"page-home-relationship"} className={"info-section"}>
        <div className={"info-section-text"}>
          <h1>
            {langProvider.getText("Home.ContractRelationship.Title")}
          </h1>
          <p>
            {langProvider.getText("Home.ContractRelationship.Subtitle")}
          </p>
        </div>

        <img src={VectorRelation} alt={"Promotional Material"}/>

      </div>

    </div>
  )
};
