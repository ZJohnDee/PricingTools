import React, {useContext, useEffect, useState} from "react";
import {Client, getClientFromFirestore, getProductFromFirestore, pushClientToFirestore} from "../../libs/dataUtils";
import {Button, TextField} from "@mui/material";
import {UserContext} from "../../libs/context";
import {useParams} from "react-router-dom";
import {auth} from "../../libs/firebase";

const PageAddClient = (props: any) =>
{
  const [client, setClient] = useState(new Client())
  const [updater, setUpdater] = useState(0);
  const [fetched, setFetched] = useState(false);

  const {user} = useContext(UserContext);
  const params = useParams();

  useEffect(() => {

    if (!params) return;
    if (!params.clientID) return;

    const tempUser = auth.currentUser;

    if (tempUser == null) return;

    if (client.getID() == params.clientID) return;

    getClientFromFirestore(tempUser, params.clientID).then((result) => {
      if (result == null) return;
      setClient(result);
      setFetched(true);
      console.log("Data fetched!");
    });

  },)



  const repaint = () => {
    setUpdater(updater + 1);
  }

  const updateClient = () =>
  {
    setClient(client);
    repaint();
  }



  const firstName = client.getFirstName();
  const lastName = client.getLastName();
  const email = client.getEmail();
  const title = client.getTitle();

  if (params.clientID && !fetched)
  {
    return <h1>Loading...</h1>
  }

  return(
    <div className={"edit-component"}>
      <TextField
        color={"secondary"}
        variant={"outlined"}
        defaultValue={firstName}
        label={"First Name"}
        onChange={(e) =>
        {
          const value = e.target.value;
          client.setFirstName(value);
          updateClient();
        }}
      />

      <TextField
        color={"secondary"}
        variant={"outlined"}
        defaultValue={lastName}
        label={"Last Name"}
        onChange={(e) =>
        {
          const value = e.target.value;
          client.setLastName(value);
          updateClient();
        }}
      />

      <TextField
        color={"secondary"}
        variant={"outlined"}
        defaultValue={title}
        label={"Title"}
        onChange={(e) =>
        {
          const value = e.target.value;
          client.setTitle(value);
          updateClient();
        }}
      />

      <TextField
        color={"secondary"}
        variant={"outlined"}
        defaultValue={email}
        label={"E-Mail"}
        onChange={(e) =>
        {
          const value = e.target.value;
          client.setEmail(value);
          updateClient();
        }}
      />

      <div>
        <Button
          variant={"contained"}
          color={"secondary"}
          onClick={() => {
            pushClientToFirestore(user, client);
          }}
        >
          SAVE
        </Button>
      </div>

    </div>
  )
}


export default PageAddClient;
