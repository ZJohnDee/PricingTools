import {FC, useContext, useEffect, useState} from "react";
import React from "react";
import {Product, ProductComponent, ProductData, pushProductToFirestore, getProductFromFirestore} from "../../libs/dataUtils";
import {Button, TextField} from "@mui/material";
import ComponentDisplay from "./ComponentDisplay";
import { UserContext } from "../../libs/context";
import {useParams} from "react-router-dom";

import {auth} from "../../libs/firebase";



const PageAddProduct:FC = () =>

{
  const [product, setProduct] = useState(new Product());
  const [ticks, setTicks] = useState(0);
  const [productFetched, setProductFetched] = useState(false); //When a product is being edited instead of added, this will be used to determine, wether the whole page should be rendered
  const [failed, setFailed] = useState(false);

  const {user} = useContext(UserContext);
  const params = useParams();



  useEffect(() => {
    setFailed(false);
    if (!params) {setFailed(true); return;}
    if (!params.productID) {setFailed(true); return;}

    const tempUser = auth.currentUser;

    if (tempUser == null) {setFailed(true); return;}

    getProductFromFirestore(tempUser, params.productID).then((result) => {
      if (result == null) {setFailed(true); return;}
      setProduct(result);
      setProductFetched(true);
      setFailed(false);
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

  if (failed)
  {
    return <h1>Error, fetching product</h1>
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
        onChange={(e) => {
          product.setProductName(e.target.value);
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
        onClick={() => {
          pushProductToFirestore(user, product);
        }}
      >
        SAVE
      </Button>

    </div>
  )
}

export default PageAddProduct;
