import React from "react";
import {Client, Contract, Product} from "../../libs/dataUtils";
import {Edit} from '@mui/icons-material';
import {Link} from "react-router-dom";


const ContractDashboardDisplay = (props: any) =>
{

  const contract: Contract = props.contract;

  const lastName: string = contract.getClient().getLastName();
  const title: string = contract.getClient().getTitle();

  const productName = contract.getProduct().getProductName();

  const styleCenter: any = {textAlign: "center"};


  return (
    <div className={"edit-component-sub"}>
      <h3 style={styleCenter}>{title + " " + lastName}</h3>
      <h3 style={styleCenter}>{productName}</h3>
      {
        contract.isArchived() &&
        <p style={styleCenter}>(archived)</p>
      }
      <Edit onClick={() => {
        window.location.assign("/edit/contract/" + contract.data.id);
      }}/>
    </div>
  )
}

export default ContractDashboardDisplay;
