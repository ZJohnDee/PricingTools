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
import { UserContext } from "../../libs/context";
import {useParams} from "react-router-dom";

import {auth} from "../../libs/firebase";



const PageAddProduct:FC = () =>

{
  const [product, setProduct] = useState(new Product());
  const [ticks, setTicks] = useState(0);
  const [productFetched, setProductFetched] = useState(false); //When a product is being edited instead of added, this will be used to determine, wether the whole page should be rendered
  const [showWarning, setShowWarning] = useState(false);

  const {user} = useContext(UserContext);
  const params = useParams();

  const styleMargin = {margin: "5px"};



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
        label={"Name"} color={"secondary"}
        defaultValue={product.getProductName()}
        style={styleMargin}
        onChange={(e) => {
          product.setProductName(e.target.value);
          updateProduct();
        }}
      />


      <TextField
        variant={"outlined"}
        label={"Description"} color={"secondary"}
        defaultValue={product.getDescription()}
        style={styleMargin}
        onChange={(e) => {
          product.setDescription(e.target.value);
          updateProduct();
        }}
      />

      <div className={"edit-component-sub"}>
        <h3>Components</h3>

        <Button
          variant={"contained"}
          color={"secondary"}
          onClick={() => addEmptyComponent()}
        >
          + Component
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
        SAVE
      </Button>


      <Dialog
        open={showWarning}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        color={"secondary"}
      >
        <DialogTitle>
          Saving this might break a few contracts
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Because some contract depend on this product, saving changes may break these contracts.{"\n"}
            If you want, you can ARCHIVE these products, which will make their data independet from product and client data.{"\n"}
            Simply proceeding with the save may break your contract unredeamably.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            color={"secondary"}
            variant="contained"
            onClick={() => {pushProductToFirestore(user, product)}}
          >
            SAVE ANYWAY
          </Button>
          <Button
            color={"secondary"}
            variant="contained"
            onClick={() => {
              archiveAllFromProduct(product, user).then(() => {
                pushProductToFirestore(user, product).then(() => {
                  setShowWarning(false);
                });
              });

            }}
          >
            ARCHIVE ALL
          </Button>
          <Button
            color={"secondary"}
            variant="contained"
            onClick={() => {setShowWarning(false)}}
          >
            CANCEL
          </Button>
        </DialogActions>

      </Dialog>



    </div>
  )
}

export default PageAddProduct;
