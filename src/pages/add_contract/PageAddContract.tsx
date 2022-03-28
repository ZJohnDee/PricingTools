import {Component, useEffect, useState} from "react";
import React from "react";
import {
  Client,
  Contract, ContractComponentLinkData,
  createNewContract,
  getAllClientsFromFirestore,
  getAllProductsFromFirestore, getClientFromFirestore, getContractFromFirestore, getProductFromFirestore,
  Product, ProductComponent, pushContractToFirestore
} from "../../libs/dataUtils";
import {Button, MenuItem, Select, TextField} from "@mui/material";
import {auth} from "../../libs/firebase";
import {jsx} from "@emotion/react";

import {Delete as DeleteIcon, Add as AddIcon} from '@mui/icons-material';
import {useParams} from "react-router-dom";

const PageAddContract = () => {
  const [contract, setContract] = useState<Contract | null>(null);

  const params = useParams();
  const id = params.contractID;

  useEffect(() => {
    if (contract != null) return;

    const userTemp = auth.currentUser;

    if (userTemp == null) return;

    getContractFromFirestore(userTemp, id as string).then((result) =>
    {
      setContract(result as Contract);
    });

  })

  if (id != null && contract == null)
  {
    return <h1>Loading...</h1>
  }

  if (contract == null) {
    return <CreateNewContract setContract={setContract}/>
  } else {
    return <ContractLoaded contract={contract} setContract={setContract}/>
  }


}


const ContractLoaded = (props: any) => {
  const contract: Contract = props.contract;
  const setContract: Function = props.setContract;

  const [updater, setUpdater] = useState(0);

  const repaint = () => {
    setUpdater(updater + 1);
  }

  let emActive: any[] = [];
  let emDisabled: any[] = [];


  const components = contract.getComponentLinkData() as ContractComponentLinkData[];
  const product = contract.getProduct();
  const client = contract.getClient();


  components.forEach((comp) => {

    const {
      component,
      index
    } = product.getComponentByID(comp.componentID) as { component: ProductComponent, index: number };

    if (comp.inUse) {
      emActive.push(
        <div className={"edit-component-sub"}>
          <h4>{component.getName()}</h4>
          <p>{component.getDescription()}</p>


          {
            component.getType() === "choice" &&
            <Select
              color={"secondary"}
              onChange={(e) => {
                const value = e.target.value as string;
                comp.value = value;

                setContract(contract);
                repaint();
              }}
            >
              {component.getChoices()?.map((choice) => <MenuItem value={choice.name}>{choice.name}</MenuItem>)}
            </Select>
          }

          {
            component.getType() === "amount" &&
            <TextField
              color={"secondary"}
              type={"number"}
              variant={"outlined"}
              onChange={(e) => {
                const value: number = Number(e.target.value);

                comp.value = value;

                setContract(contract);
                repaint();
              }}
            />
          }


          {
            !component.isRequired() &&
              <div>
                <DeleteIcon
                  onClick={() => {
                    contract.setComponentUsed(component.getID(), false);
                    setContract(contract);

                    repaint();
                  }}
                />
              </div>
          }

        </div>
      );

    } else {
      emDisabled.push(
        <div className={"edit-component-sub"}>
          <h4>{component.getName()}</h4>
          <p>{component.getDescription()}</p>

          <AddIcon
            onClick={() => {
              contract.setComponentUsed(component.getID(), true);
              setContract(contract);

              repaint();
            }}
          />
        </div>
      )
    }
  });


  return (
    <div>
      <h2>Contract for {contract.getClient().getTitle() + " " + contract.getClient().getLastName()}</h2>
      <div
        className={"edit-component"}
        style={
          {
            display: "flex",
            flexFlow: "row",
            alignContent: "space-between"
          }}
      >


        <div className={"edit-component-sub"}>
          {emActive}
        </div>

        <div className={"edit-component-sub"}>
          {emDisabled}
        </div>

        <Button
          variant={"contained"}
          color={"secondary"}
          onClick={() =>
          {
            const tempUser = auth.currentUser;

            if (tempUser == null)
            {
              console.log("User is null!!!")
              return;
            }

            pushContractToFirestore(contract, tempUser);
          }}
        >
          Save
        </Button>

      </div>
    </div>
  )

}


const CreateNewContract = (props: any) => {
  const setContract: Function = props.setContract;

  const [products, setProducts] = useState<Product[]>([]);
  const [clients, setClients] = useState<Client[]>([]);


  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedClient, setSelectedClient] = useState("");

  const [loading, setLoading] = useState(true);

  const [updater, setUpdater] = useState(0);


  const [emProductMenuItems, setEmProductMenuItems] = useState<any[]>([])
  const [emClientMenuItems, setEmClientMenuItems] = useState<any[]>([])


  const [productsLoaded, setProductsLoaded] = useState(false);
  const [clientsLoaded, setClientsLoaded] = useState(false);

  const repaint = () => {
    setUpdater(updater + 1);
  }


  useEffect(() => {
    const user = auth.currentUser;

    if (user == null) return;

    if (!productsLoaded) {
      getAllProductsFromFirestore(user).then((result) => {
        setProducts(result);

        products.forEach((product: Product) => {
          emProductMenuItems.push(<MenuItem value={product.getID()}>{product.getProductName()}</MenuItem>);
        });

        setEmProductMenuItems(emProductMenuItems);
        setProductsLoaded(true);
        repaint();
      });
    }

    if (!clientsLoaded) {
      getAllClientsFromFirestore(user).then((result) => {
        setClients(result);

        clients.forEach((client: Client) => {
          emClientMenuItems.push(<MenuItem
            value={client.getID()}>{client.getTitle() + " " + client.getLastName()}</MenuItem>)
        });

        setEmClientMenuItems(emClientMenuItems);

        setClientsLoaded(true);
        repaint();
      });
    }

    setLoading(false);

  })

  const createContract = async () => {

    const user = auth.currentUser;

    if (user == null) return;

    const p: Product | null = await getProductFromFirestore(user, selectedProduct);
    const c: Client | null = await getClientFromFirestore(user, selectedClient);

    if (p == null || c == null) return;

    const contract: Contract = createNewContract(p, c);

    console.log("Generated Contract", contract);

    setContract(contract);
  }


  if (loading) return (<h1>Loading...</h1>);

  return (
    <div>
      <h1>Create Contract</h1>

      <div style={{
        display: "flex",
        flexFlow: "column",
        width: "40%",
        margin: "auto"
      }}>
        <Select
          color={"secondary"}
          label={"Product"}
          style={{margin: "15px"}}
          defaultValue={() => {
            if (products.length > 0) return products[0];
            return "";
          }}
          onChange={(e) => {
            const value: string = e.target.value as string;
            setSelectedProduct(value);
            repaint();
          }}
        >
          {emProductMenuItems}
        </Select>

        <Select
          color={"secondary"}
          label={"Client"}
          style={{margin: "15px"}}
          defaultValue={() => {
            if (clients.length > 0) return clients[0];
            return "";
          }}
          onChange={(e) => {
            const value: string = e.target.value as string;
            setSelectedClient(value);
            repaint();
          }}
        >
          {emClientMenuItems}
        </Select>

        <Button
          variant={"contained"}
          color={"secondary"}
          style={{margin: "15px"}}
          onClick={() => createContract()}
        >
          Create
        </Button>
      </div>

    </div>
  );


}


export default PageAddContract;
