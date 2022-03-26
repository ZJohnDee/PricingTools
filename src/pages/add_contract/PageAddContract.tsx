import {useEffect, useState} from "react";
import React from "react";
import {
  Client,
  Contract,
  createNewContract,
  getAllClientsFromFirestore,
  getAllProductsFromFirestore, getClientFromFirestore, getProductFromFirestore,
  Product
} from "../../libs/dataUtils";
import {Button, MenuItem, Select, TextField} from "@mui/material";
import {auth} from "../../libs/firebase";
import {jsx} from "@emotion/react";
import JSX = jsx.JSX;

const PageAddContract = () => {
  const [contract, setContract] = useState(null);

  if (contract == null) {
    return <CreateNewContract setContract={setContract}/>
  } else {
    return <ContractLoaded contract={contract} setContract={setContract}/>
  }


}


const ContractLoaded = (props: any) => {
  const contract: Contract = props.contract;
  const setContract: Function = props.setContract;

  return (
    <div>
      <h2>Contract for {contract.}</h2>
      <div
        className={"edit-component"}
        style={
          {
            display: "flex",
            flexFlow: "row"

          }}
      >

        <div className={"edit-component-sub"}>

        </div>

        <div className={"edit-component-sub"}>

        </div>

      </div>
    </div>
  )

}


const CreateNewContract = (props: any) => {
  const setContract: Function = props.setContract;

  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);


  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedClient, setSelectedClient] = useState("");


  useEffect(() => {
    const user = auth.currentUser;

    if (user == null) return;

    // @ts-ignore
    setProducts(getAllProductsFromFirestore(user));
    // @ts-ignore
    setClients(getAllClientsFromFirestore(user));
  })

  const createContract = async () => {

    const user = auth.currentUser;

    if (user == null) return;

    const p: Product | null = await getProductFromFirestore(user, selectedProduct);
    const c: Client | null = await getClientFromFirestore(user, selectedClient);

    if (p == null || c == null) return;

    const contract: Contract = createNewContract(p, c);

    setContract(contract);
  }


  let emProductMenuItems: JSX.Element[] = [];

  products.forEach((product: Product) => {
    emProductMenuItems.push(<MenuItem value={product.getID()}>{product.getProductName()}</MenuItem>);
  });

  let emClientMenuItems: JSX.Element[] = [];

  clients.forEach((client: Client) => {
    emClientMenuItems.push(<MenuItem value={client.getID()}>{client.getTitle() + " " + client.getLastName()}</MenuItem>)
  });


  return (
    <div>
      <h1>Create Contract</h1>

      <Select
        color={"secondary"}
        label={"Product"}
        onChange={(e) => {
          const value: string = e.target.value as string;
          setSelectedProduct(value);
        }}
      >
        {emProductMenuItems}
      </Select>

      <Select
        color={"secondary"}
        label={"Client"}
        onChange={(e) => {
          const value: string = e.target.value as string;
          setSelectedClient(value);
        }}
      >
        {emClientMenuItems}
      </Select>

      <Button
        variant={"contained"}
        color={"secondary"}
        onClick={() => createContract()}
      >
        Create
      </Button>


    </div>
  );


}


export default PageAddContract;
