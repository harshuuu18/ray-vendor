/** @format */

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { VendorContext } from "../App";

function DashBoard() {
  const { state, dispatch } = useContext(VendorContext);
  const [order, setOrder] = useState(0);
  const [delivered, setDelivered] = useState(0);
  const [enRoute, setEnRoute] = useState(0);
  const [dispatched, setDispatched] = useState(0);
  const [products, setProducts] = useState(0);
  const [presentOrder, setPresentOrder] = useState(0);
  const presentDate = new Date().toLocaleDateString();
  const [vendor, setVendor] = useState("");

  useEffect(() => {
    var TotalProduct = [];
    var TotalDelivered = [];
    var TotalEnRoute = [];
    var TotalDispatched = [];
    var TodayOrders = [];
    var vendor = JSON.parse(localStorage.getItem("vendor"));

    if (vendor) {
      setVendor(vendor);
      fetch("/api/vendor/p/ProductLength", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vendor: vendor.vendor }),
      })
        .then((r) =>
          r.json().then((d) => {
            setProducts(d);
          })
        )
        .catch((err) => console.log(err));
    }

    if (state) {
      state.map(({ cart, date }) => {
        console.log(presentDate);
        cart
          .filter((cf) => cf.status)
          .map(({ items }) => {
            if (items.length > 0 && date === presentDate) {
              TodayOrders.push(items.length);
            }
          });

        cart
          .filter((cf) => cf.status == "Placed")
          .map(({ items }) => {
            if (items.length > 0) {
              TotalProduct.push(items.length);
            }
          });

        cart
          .filter((cf) => cf.status == "Delivered")
          .map(({ items }) => {
            if (items.length > 0) {
              TotalDelivered.push(items.length);
            }
          });

        cart
          .filter((cf) => cf.status == "En Route")
          .map(({ items }) => {
            if (items.length > 0) {
              TotalEnRoute.push(items.length);
            }
          });

        cart
          .filter((cf) => cf.status == "Dispatched")
          .map(({ items }) => {
            if (items.length > 0) {
              TotalDispatched.push(items.length);
            }
          });
      });
      if (TotalProduct.length > 0) {
        setOrder(TotalProduct.reduce((a, b) => a + b));
      }
      if (TotalDelivered.length > 0) {
        setDelivered(TotalDelivered.reduce((a, b) => a + b));
      }
      if (TotalEnRoute.length > 0) {
        setEnRoute(TotalEnRoute.reduce((a, b) => a + b));
      }
      if (TotalDispatched.length > 0) {
        setDispatched(TotalDispatched.reduce((a, b) => a + b));
      }
      if (TodayOrders.length > 0) {
        setPresentOrder(TodayOrders.reduce((a, b) => a + b));
      }
      console.log("date", TodayOrders);
    }
  }, [state]);

  return (
    <div className="DashBoard-Main">
      <main>
        <span>
          <h1>Welcome Back! {vendor?.name}</h1>
          <br />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic,
            minima ad. Recusandae animi ipsam, beatae cupiditate iusto a rerum?
            Asperiores optio{" "}
          </p>
        </span>
        <div>
          <h1>Today's Order</h1>
          <h2>{presentOrder}</h2>
        </div>
      </main>

      <div className="MainDetail">
        <span>
          <img src="/img/bar-graph.png" alt="" />
          <p>Total orders</p>
          <br />
          <br />
          <h2>{order}</h2>
        </span>

        <span>
          <img
            src="/img/bar-graph.png"
            alt=""
            style={{ filter: "hue-rotate(248deg)" }}
          />
          <p>Total Products</p>
          <br />
          <br />
          <h2> {products} </h2>
        </span>

        <span>
          <img
            src="/img/bar-graph.png"
            alt=""
            style={{ filter: "hue-rotate(148deg)" }}
          />
          <p>Product Delivered</p>
          <br />
          <br />
          <h2>{delivered}</h2>
        </span>
      </div>

      <div className="MainDetail">
        <span>
          <img src="/img/bar-graph.png" alt="" />
          <p>En Route Orders</p>
          <br />
          <br />
          <h2>{enRoute}</h2>
        </span>

        <span>
          <img
            src="/img/bar-graph.png"
            alt=""
            style={{ filter: "hue-rotate(248deg)" }}
          />
          <p>Dispatched Orders</p>
          <br />
          <br />
          <h2> {dispatched} </h2>
        </span>

        <span>
          <img
            src="/img/bar-graph.png"
            alt=""
            style={{ filter: "hue-rotate(148deg)" }}
          />
          <p>Product Delivered</p>
          <br />
          <br />
          <h2>{delivered}</h2>
        </span>
      </div>
    </div>
  );
}

export default DashBoard;
