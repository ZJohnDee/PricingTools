import {FC, useEffect, useState} from "react";
import "./pageDashboard.css"
import {Grid,} from "@mui/material";
import {jsx} from "@emotion/react";
import {
  Client, Contract,
  getAllClientsFromFirestore, getAllContractsFromFirestore,
  getAllProductsFromFirestore,
  getProductFromFirestore,
  Product
} from "../../libs/dataUtils";
import {auth} from "../../libs/firebase";
import ProductDashboardDisplay from "./ProductDashboardDisplay";
import ClientDashboardDisplay from "./ClientDashboardDisplay";
import ContractDashboardDisplay from "./ContractDashboardDisplay";


const PageDashboard: FC = (props: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [failed, setFailed] = useState(false);


  const [loaded, setLoaded] = useState([false, false, false])

  let emProducts = [];
  let emContracts = [];
  let emCustomers = [];

  useEffect(() => {
    const tempUser = auth.currentUser;
    if (tempUser != null)
    {

      if (!loaded[0])
      getAllProductsFromFirestore(tempUser).then((result) => {
        setProducts(result);

        setLoaded(loaded.map((val, index) => {return index == 0}));
      });


      if (!loaded[1])
      getAllClientsFromFirestore(tempUser).then((result) => {
        setClients(result);

        setLoaded(loaded.map((val, index) => {return index == 1}));
      });


      if (!loaded[2])
      getAllContractsFromFirestore(tempUser).then((result) =>
      {
        setContracts(result as Contract[]);

        setLoaded(loaded.map((val, index) => {return index == 2}));
      });
    }
    else setFailed(true);
  })



  for (let i = 0; i<products.length; i++)
  {
    emProducts.push(<ProductDashboardDisplay product={products[i] as Product}/>)
  }

  for (let i = 0; i<clients.length; i++)
  {
    emCustomers.push(<ClientDashboardDisplay client={clients[i] as Client}/>)
  }

  for (let i = 0; i<contracts.length; i++)
  {
    emContracts.push(<ContractDashboardDisplay contract={contracts[i] as Contract}/>)
  }



  return (
    <div className={"page-dashboard"}>
      <h1>Dashboard</h1>
      <div className={"page-dashboard-sections"}>
        <div className={"page-dashboard-section edit-component-sub page-dashboard-products"}>
          <h2>Products</h2>
          {emProducts}
        </div>
        <div className={"page-dashboard-section edit-component-sub page-dashboard-contracts"}>
          <h2>Contracts</h2>
          {emContracts}
        </div>
        <div className={"page-dashboard-section edit-component-sub page-dashboard-customers"}>
          <h2>Customers</h2>
          {emCustomers}
        </div>
      </div>

    </div>
  )
}

export default PageDashboard;
