import {FC, useContext, useEffect, useState} from "react";
import React from "react";
import {
  Product,
  ProductComponent,
  ProductData,
  pushProductToFirestore,
  getProductFromFirestore,
  archiveAllFromProduct
} from "../../libs/dataUtils";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@mui/material";
import ComponentDisplay from "./ComponentDisplay";
import {LanguageContext, UserContext} from "../../libs/context";
import {useParams} from "react-router-dom";

import {auth} from "../../libs/firebase";
import {LanguageProvider} from "../../libs/language";



const PageAddProduct:FC = () =>

{
  const [product, setProduct] = useState(new Product());
  const [ticks, setTicks] = useState(0);
  const [productFetched, setProductFetched] = useState(false); //When a product is being edited instead of added, this will be used to determine, wether the whole page should be rendered
  const [showWarning, setShowWarning] = useState(false);

  const {user} = useContext(UserContext);
  const params = useParams();

  const styleMargin = {margin: "5px"};


  const {language} = useContext(LanguageContext);
  const langProvider = new LanguageProvider(language);



  useEffect(() => {

    if (!params) return;
    if (!params.productID) return;

    const tempUser = auth.currentUser;

    if (tempUser == null) return;

    if (product.getID() == params.productID) return;

    getProductFromFirestore(tempUser, params.productID).then((result) => {
      if (result == null) return;
      setProduct(result);
      setProductFetched(true);
      console.log("Data fetched!");
    });

  },)

  let emComponents = [];
  let components: ProductComponent[] = product.getComponents();

  const updateProduct = () =>
  {
    setProduct(product);
    setTicks(ticks+1);
  }

  for (let i = 0; i<components.length; i++)
  {
    let component = components[i];
    let em = <ComponentDisplay
      component={component}
      onUpdate={(comp: ProductComponent, key: number) => {
        product.setComponent(key, comp);
        updateProduct();
      }
      }
      index={i}
    />

    emComponents.push(em);
  }




  const addEmptyComponent = () =>
  {
    product.addEmptyComponent();
    updateProduct();
  }

  if (params.productID && !productFetched)
  {
    return <h1>Loading...</h1>
  }


  return(
    <div className={"edit-component"}>
      <TextField
        variant={"outlined"}
        label={langProvider.getText("Products.Edit.Name")} color={"secondary"}
        defaultValue={product.getProductName()}
        style={styleMargin}
        onChange={(e) => {
          product.setProductName(e.target.value);
          updateProduct();
        }}
      />


      <TextField
        variant={"outlined"}
        label={langProvider.getText("Products.Edit.Description")} color={"secondary"}
        defaultValue={product.getDescription()}
        style={styleMargin}
        onChange={(e) => {
          product.setDescription(e.target.value);
          updateProduct();
        }}
      />

      <div className={"edit-component-sub"}>
        <h3>{langProvider.getText("Products.Edit.Components.Title")}</h3>

        <Button
          variant={"contained"}
          color={"secondary"}
          onClick={() => addEmptyComponent()}
        >
          {langProvider.getText("Products.Edit.AddComponent")}
        </Button>
        {emComponents}
      </div>


      <Button
        color={"secondary"}
        variant={"contained"}
        style={styleMargin}
        onClick={() =>
        {
          console.log(product.data);
        }}
      >
        Print Component Data
      </Button>

      <Button
        color={"secondary"}
        variant="contained"
        style={styleMargin}
        onClick={() => {
          product.isBeingUsed(user).then((isUsed) => {
            if (isUsed)
            {
              setShowWarning(true);
              return;
            }

            pushProductToFirestore(user, product);
          })
        }}
      >
        {langProvider.getText("Buttons.Save")}
      </Button>


      <Dialog
        open={showWarning}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        color={"secondary"}
      >
        <DialogTitle>
          {langProvider.getText("Products.Warning.Title")}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            {langProvider.getText("Products.Warning.Message")}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            color={"warning"}
            variant="contained"
            onClick={() => {pushProductToFirestore(user, product)}}
          >
            {langProvider.getText("Products.Warning.Buttons.SaveAnyway")}
          </Button>
          <Button
            color={"info"}
            variant="contained"
            onClick={() => {
              archiveAllFromProduct(product, user).then(() => {
                pushProductToFirestore(user, product).then(() => {
                  setShowWarning(false);
                });
              });

            }}
          >
            {langProvider.getText("Products.Warning.Buttons.ArchiveAll")}
          </Button>
          <Button
            color={"secondary"}
            variant="contained"
            onClick={() => {setShowWarning(false)}}
          >
            {langProvider.getText("Products.Warning.Buttons.Cancel")}
          </Button>
        </DialogActions>

      </Dialog>



    </div>
  )
}

export default PageAddProduct;
