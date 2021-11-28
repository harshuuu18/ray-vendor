/** @format */

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function SideBar() {
  const [vendor, setVendor] = useState([]);

  const location = useLocation().pathname;

  useEffect(() => {
    var Vendor = JSON.parse(localStorage.getItem("vendor"));
    if (Vendor) {
      setVendor(Vendor);
    }
  }, []);

  const NavDivs = ({ img, name, url, Id }) => {
    return (
      <Link to={url ? url : "/"}>
        <div className="nav-divs" id={Id}>
          <img src={img} alt="" />
          {name}
        </div>
      </Link>
    );
  };

  const NavData = [
    {
      name: "Orders",
      img: "https://cdn-icons-png.flaticon.com/512/590/590506.png",
      url: "/orders",
    },
    {
      name: "Add Product",
      img: "https://cdn-icons-png.flaticon.com/512/1332/1332655.png",
      url: "/add-product",
    },
    {
      name: "My Products",
      img: "https://cdn-icons-png.flaticon.com/512/126/126122.png",
      url: "/my-products",
    },
  ];

  const NavData2 = [
    {
      name: "Profile",
      img: "https://cdn-icons-png.flaticon.com/512/1077/1077063.png",
      url: "/profile",
    },
  ];

  return (
    <div className="SideBar">
      <div className="Logo-heading">Logo</div>
      <br />
      <div className="profile">
        <span>{/* img */}</span>
        <div>
          <h3>{vendor.name}</h3>
          <h6>Vendor</h6>
        </div>
      </div>
      <br />
      <Link to="/">
        <div className="DashBoard" id={location == "/" ? "selectedDash" : ""}>
          DashBoard
        </div>
      </Link>
      <br />

      <div className="nav-heading">GENERAL</div>

      {NavData.map(({ url, name, img, Id }) => {
        return (
          <NavDivs
            img={img}
            name={name}
            url={url}
            key={url}
            Id={location == url ? "selectedNav" : ""}
          />
        );
      })}

      <br />

      <div className="nav-heading">MANAGEMENT</div>
      {NavData2.map(({ url, name, img, Id }) => {
        return (
          <NavDivs
            img={img}
            name={name}
            url={url}
            key={url}
            Id={location == url ? "selectedNav" : ""}
          />
        );
      })}
    </div>
  );
}

export default SideBar;
