import {FC} from "react";
import "./pageDashboard.css"
import {Grid,} from "@mui/material";
import {jsx} from "@emotion/react";


const PageDashboard: FC = (props: any) => {

  let emProducts = [];
  let emContracts = [];
  let emCustomers = [];




  return (
    <div id={"page-dashboard"}>
      <h1>Dashboard</h1>
      <div id={"page-dashboard-sections"}>
        <div id={"page-dashboard-section page-dashboard-products"}>
          <h1>Products</h1>
        </div>
        <div id={"page-dashboard-section page-dashboard-contracts"}>
          <h1>Contracts</h1>
        </div>
        <div id={"page-dashboard-section page-dashboard-customers"}>
          <h1>Customers</h1>
        </div>
      </div>

    </div>
  )
}

export default PageDashboard;
