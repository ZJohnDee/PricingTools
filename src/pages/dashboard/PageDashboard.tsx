import { FC, useContext, useEffect, useState } from "react";
import "./pageDashboard.css"
import { Button, Grid, } from "@mui/material";
import {
  Client, Contract,
  getAllClientsFromFirestore, getAllContractsFromFirestore,
  getAllProductsFromFirestore,
  getProductFromFirestore,
  Product
} from "../../libs/dataUtils";
import { auth } from "../../libs/firebase";
import ProductDashboardDisplay from "./ProductDashboardDisplay";
import ClientDashboardDisplay from "./ClientDashboardDisplay";
import ContractDashboardDisplay from "./ContractDashboardDisplay";
import { LanguageContext } from "../../libs/context";
import { LanguageProvider } from "../../libs/language";


const PageDashboard: FC = (props: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState([false, false, false])

  const [emProducts, setEmProducts] = useState<any[]>([]);
  const [emContracts, setEmContracts] = useState<any[]>([]);
  const [emClients, setEmClients] = useState<any[]>([]);

  const { language } = useContext(LanguageContext);
  const langProvider = new LanguageProvider(language);

  useEffect(() => {
    const tempUser = auth.currentUser;
    if (tempUser != null) {

      if (!loaded[0])
        getAllProductsFromFirestore(tempUser).then((result) => {
          setProducts(result);

          setLoaded(loaded.map((val, index) => { if (index == 0) return true; return val; }));

          for (let i = 0; i < products.length; i++) {
            emProducts.push(<ProductDashboardDisplay product={products[i] as Product} />)
            setEmProducts(emProducts.map((val) => { return val }));
          }

        });


      if (!loaded[1])
        getAllClientsFromFirestore(tempUser).then((result) => {
          setClients(result);

          setLoaded(loaded.map((val, index) => { if (index == 1) return true; return val; }));
          
          for (let i = 0; i < clients.length; i++) {
            emClients.push(<ClientDashboardDisplay client={clients[i] as Client} />)
            setEmClients(emClients.map((val) => { return val }))
          }
        });


      if (!loaded[2])
        getAllContractsFromFirestore(tempUser).then((result) => {
          setContracts(result as Contract[]);

          setLoaded(loaded.map((val, index) => { if (index == 2) return true; return val; }));

          for (let i = 0; i < contracts.length; i++) {
            emContracts.push(<ContractDashboardDisplay contract={contracts[i] as Contract} />)
            setEmContracts(emContracts.map((val) => { return val }))
          }
        });
    }
    else setFailed(true);
  })





  const buttonStyle = {
    width: "100%",
    marginTop: "20px"
  }

  return (
    <div className={"page-dashboard"}>
      <h1>{langProvider.getText("Dashboard.Title")}</h1>
      <div className={"page-dashboard-sections"}>
        <div className={"page-dashboard-section edit-component-sub page-dashboard-products"}>
          <h2>{langProvider.getText("Dashboard.Products.Title")}</h2>
          {emProducts}
          <Button style={buttonStyle} color={"secondary"} variant={"contained"} href={"/add/product"}>{langProvider.getText("Buttons.Add")}</Button>
        </div>
        <div className={"page-dashboard-section edit-component-sub page-dashboard-contracts"}>
          <h2>{langProvider.getText("Dashboard.Contracts.Title")}</h2>
          {emContracts}
          <Button style={buttonStyle} color={"secondary"} variant={"contained"} href={"/add/contract"}>{langProvider.getText("Buttons.Add")}</Button>
        </div>
        <div className={"page-dashboard-section edit-component-sub page-dashboard-customers"}>
          <h2>{langProvider.getText("Dashboard.Clients.Title")}</h2>
          {emClients}
          <Button style={buttonStyle} color={"secondary"} variant={"contained"} href={"/add/client"}>{langProvider.getText("Buttons.Add")}</Button>
        </div>
      </div>

    </div>
  )
}

export default PageDashboard;
