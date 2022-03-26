import {FC, useContext, useState} from "react";
import React from "react";
import {Product, ProductComponent, ProductData, pushProductToFirestore} from "../../libs/dataUtils";
import {Button, TextField} from "@mui/material";
import ComponentDisplay from "./ComponentDisplay";
import { UserContext } from "../../libs/context";



const PageAddProduct:FC = () =>

{
  const [product, setProduct] = useState(new Product());
  const [ticks, setTicks] = useState(0);

  const {user} = useContext(UserContext); 


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
