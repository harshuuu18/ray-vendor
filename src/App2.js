/** @format */

import React from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import SideBar from "./Components/SideBar";
import DashBoard from "./Components/DashBoard";
import AddProduct from "./Components/AddProduct";
import { useEffect, useState } from "react";
import Login from "./auth/Login";
import { useContext } from "react";
import { VendorContext } from "./App";
import Orders from "./Components/Orders";
import { toast } from "react-toastify";
import MyProducts from "./Components/MyProducts";
import Profile from "./Components/Profile";

function App2() {
  var [vendor, setVendor] = useState(null);
  var [statusChanged, setStatusChanged] = useState(false);
  var history = useHistory();
  const { state, dispatch } = useContext(VendorContext);
  const options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  useEffect(() => {
    var vendor = JSON.parse(localStorage.getItem("vendor"));
    if (vendor) {
      setVendor(vendor);
      fetch("/api/vendor/getOrderDetails", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + vendor.token,
        },
      })
        .then((r) =>
          r.json().then((d) => {
            if (d.length > 0) {
              console.log(d);
              dispatch({ type: "USER", payload: d });
            }
          })
        )
        .catch((err) => console.log(err));
    } else {
      history.push("/login");
    }
  }, [statusChanged]);

  const UpdateOrderStatus = ({ _id, status, cartId }) => {
    if (!status || !_id || !cartId) {
      return toast.warn("Please select a status", options);
    }
    fetch("/api/vendor/updateOrderStatus", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("vendor")).token,
      },
      body: JSON.stringify({ _id, status, cartId }),
    })
      .then((r) => {
        r.json().then((d) => {
          console.log(d);
          if (d.message) {
            toast.success(d.message, options);
            setStatusChanged(true);
            setStatusChanged(false);
          } else {
            return toast.error(d.error, options);
          }
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {vendor ? <SideBar /> : <></>}

      <Switch>
        <Route exact path="/">
          <DashBoard />
        </Route>

        <Route path="/add-product">
          <AddProduct />
        </Route>

        <Route path="/my-products">
          <MyProducts />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/orders">
          <Orders
            UpdateOrderStatus={({ _id, status, orderid, cartId }) =>
              UpdateOrderStatus({
                _id,
                status,
                orderid,
                cartId,
              })
            }
          />
        </Route>

        <Route path="/profile">
          <Profile />
        </Route>
      </Switch>
    </>
  );
}

export default App2;
