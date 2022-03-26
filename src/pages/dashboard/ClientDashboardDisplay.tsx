import React from "react";
import {Client, Product} from "../../libs/dataUtils";
import {Edit} from '@mui/icons-material';
import {Link} from "react-router-dom";


const ClientDashboardDisplay = (props: any) =>
{

  const client: Client = props.client;

  const lastName: string = client.getLastName();
  const title: string = client.getTitle();



  return (
    <div className={"edit-component-sub"}>
      <h3 style={{textAlign: "center"}}>{title + " " + lastName}</h3>
      <Edit onClick={() => {
        window.location.assign("/edit/client/" + client.getID());
      }}/>
    </div>
  )
}

export default ClientDashboardDisplay;
