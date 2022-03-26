import {FC, useEffect, useState} from "react";
import "./pageDashboard.css"
import {Grid,} from "@mui/material";
import {jsx} from "@emotion/react";
import {
  Client,
  getAllClientsFromFirestore,
  getAllProductsFromFirestore,
  getProductFromFirestore,
  Product
} from "../../libs/dataUtils";
import {auth} from "../../libs/firebase";
import ProductDashboardDisplay from "./ProductDashboardDisplay";
import ClientDashboardDisplay from "./ClientDashboardDisplay";


const PageDashboard: FC = (props: any) => {
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [failed, setFailed] = useState(false);

  let emProducts = [];
  let emContracts = [];
  let emCustomers = [];

  useEffect(() => {
    const tempUser = auth.currentUser;
    if (tempUser != null)
    {
      getAllProductsFromFirestore(tempUser).then((result) => {
        // @ts-ignore
        setProducts(result);
      });


      getAllClientsFromFirestore(tempUser).then((result) => {
        // @ts-ignore
        setClients(result);
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
