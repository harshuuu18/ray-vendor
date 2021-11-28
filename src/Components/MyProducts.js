/** @format */

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Product from "./Product";
import { toast } from "react-toastify";

function MyProducts() {
  const [products, setProducts] = useState("");

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
    fetch(`/api/v/${vendor.vendor}/${vendor._id}`)
      .then((r) =>
        r.json().then((d) => {
          console.log(d);
          setProducts(d.FilteredProducts);
        })
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="OrderBox">
      <div className="OrderFilterNav">
        <div className="FilterInputs">
          <span>Search Order by OrderId</span>
          <input
            type="text"
            onChange={(e) => console.log(e.target.value)}
            placeholder="Ex. 348924892034094"
          />
        </div>

        <div className="FilterInputs">
          <span>Search Order by UserDetails</span>
          <input
            type="text"
            onChange={(e) => console.log(e.target.value)}
            placeholder="Name, Mobile or Email"
          />
        </div>
      </div>
      <div className="OrderDiv">
        {products
          ? products.map((p) => {
              console.log(p);
              return <Product data={p} />;
            })
          : ""}
      </div>
      ;
    </div>
  );
}

export default MyProducts;
