import React from "react";
import {Product} from "../../libs/dataUtils";
import {Edit} from '@mui/icons-material';
import {Link} from "react-router-dom";


const ComponentProductDashboardDisplay = (props: any) =>
{

  const product: Product = props.product;

  const name: string = product.getProductName();

  let emComponents = [];
  const components = product.getComponents();

  for (let i = 0; i<components.length; i++)
  {
    emComponents.push(
      <div style={{display: "flex", flexFlow: "row", justifyContent: "space-between"}}>
        <p>{components[i].getName()}</p>
        <p>{components[i].getType()}</p>
      </div>
    );
  }


  return (
    <div className={"edit-component-sub"}>
      <h3 style={{textAlign: "center"}}>{name}</h3>
      <h4>Components</h4>
      {emComponents}

      <Edit onClick={() => {
        window.location.assign("/edit/product/" + product.getID());
      }}/>
    </div>
  )
}

export default ComponentProductDashboardDisplay;
