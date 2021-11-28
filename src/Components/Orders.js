/** @format */

import React, { useContext } from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { VendorContext } from "../App";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { toast } from "react-toastify";
import { useEffect } from "react";
import isWeekend from "date-fns/isWeekend";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";

function Orders({ UpdateOrderStatus }) {
  const { state, dispatch } = useContext(VendorContext);
  const [value, setValue] = React.useState(new Date());

  const [filter, setFilter] = useState("Placed");

  const [orderId, setOrderId] = useState("");

  const [globeFilter, setGlobalFilter] = useState("");
  const [dateOpened, setDateOpened] = useState(false);
  const [dateVal, setDateVal] = useState("");

  const options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const InnerCartProduct = ({ details }, InCartIndex) => {
    const [dropped, setDropped] = useState(false);
    const [orderStatus, setOrderStatus] = useState("");
    const {
      cart,
      time,
      payment,
      comment,
      voucher,
      amount,
      userid,
      username,
      mobile,
      address,
      totalitems,
      delivered,
      date,
      vendors,
      _id,
    } = details;

    const NewCart = cart.filter((cf) => {
      if (filter == "All") {
        return cf.status;
      } else {
        return cf.status === filter;
      }
    });

    if (NewCart.length == 0) {
      return <h1></h1>;
    }
    return (
      <div className="cartDiv1in" key={_id + 5}>
        {NewCart.map(({ id, items, status, vendor }) => {
          return (
            <React.Fragment key={id + 4}>
              <div className="cartImg">
                <div
                  className="cartActualImg"
                  style={{
                    backgroundImage: `url(${items[0].mediaUrl})`,
                  }}
                ></div>
              </div>

              <div className="cartDetails">
                <h3> #{id} </h3>
                <div className="cartDetailsWBtn">
                  <div className="cartValue cvl">
                    <span>Total Item: {items.length}</span>

                    <span>
                      Status:<span className="redBold"> {status} </span>
                    </span>
                  </div>
                  <div className="cartButton">
                    <Button
                      className="cartButtonv2"
                      onClick={() => {
                        if (!dropped) {
                          setDropped(true);
                        } else {
                          setDropped(false);
                        }
                      }}
                    >
                      {!dropped ? (
                        <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                      ) : (
                        <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              <div
                className="detailedOrderDiv"
                id={dropped ? "showDetail" : "hideDetails"}
              >
                <div className="cdinfo">
                  <span>
                    <b>Amount</b>: {amount}{" "}
                  </span>
                  <span>
                    <b>Status</b>: {status}{" "}
                  </span>
                  <span>
                    <b>comment</b>: {comment}{" "}
                  </span>
                  <span>
                    <b>voucher</b>: {voucher}{" "}
                  </span>
                </div>

                <div className="cdinfo">
                  <span>
                    <b>Name</b>: {username}{" "}
                  </span>
                  <span>
                    <b>Mobile</b>: {mobile}{" "}
                  </span>
                  <span>
                    <b>Mail</b>: {mobile}{" "}
                  </span>
                  <span>
                    <b>UserId</b>: {userid}{" "}
                  </span>
                </div>

                <div className="cdinfo">
                  <span>
                    <b>Time</b>: {time} {date}
                  </span>
                </div>

                <div className="cdinfo">
                  <span>
                    <b>Address</b>: {address.street},{address.pin},
                    {address.city},{address.state}{" "}
                  </span>
                </div>

                <div className="cdinfo1">
                  <span>
                    <b>Payment</b>:{"  "} {payment}
                  </span>
                  <select
                    name=""
                    id="UpdateOrderDrpDwn"
                    onChange={(e) => setOrderStatus(e.target.value)}
                    onClick={(e) => setOrderStatus(e.target.value)}
                  >
                    <option value="Placed">Placed</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="En Route">En Route</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <Button
                    id="UpdateOrderBtn"
                    onClick={() =>
                      UpdateOrderStatus({
                        _id,
                        status: orderStatus,
                        cartId: id,
                      })
                    }
                  >
                    Update
                  </Button>
                </div>

                {items.map(
                  ({ name, url, mediaUrl, price, vendor, quantity }, index) => {
                    return (
                      <div className="cartDiv1in cdivln" key={index + 8}>
                        <div className="cartImg">
                          <div
                            className="cartActualImg"
                            style={{ backgroundImage: `url(${mediaUrl})` }}
                          ></div>
                        </div>
                        <div className="cartDetails cdils">
                          <h3>
                            {" "}
                            <a
                              href={`http://localhost:3000/product/${url}`}
                              target="_blank"
                            >
                              {name}
                            </a>{" "}
                          </h3>
                          <div className="cartDetailsWBtn">
                            <div className="cartValue">
                              <span>
                                ${price} x {quantity}
                              </span>
                              <span className="redBold">
                                ${parseInt(price * quantity)}{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  //   const CartProduct = ({ details }) => {
  //     const {
  //       cart,
  //       time,
  //       payment,
  //       comment,
  //       voucher,
  //       amount,
  //       userid,
  //       username,
  //       mobile,
  //       address,
  //       totalitems,
  //       delivered,
  //       date,
  //       vendors,
  //       _id,
  //     } = details;

  //     return (
  //       <>
  //         {order
  //           .filter((of) => {
  //             if (orderId) {
  //               return _id == orderId;
  //             } else {
  //               return _id;
  //             }
  //           })
  //           .filter((df) => {
  //             if (!dateVal) {
  //               return df.date;
  //             } else {
  //               return df.date === dateVal;
  //             }
  //           })
  //           .map(
  //             (
  //               {
  //                 amount,
  //                 cart,
  //                 comment,
  //                 delivered,
  //                 orderid,
  //                 payment,
  //                 time,
  //                 totalitems,
  //                 voucher,
  //                 date,
  //               },
  //               index
  //             ) => {
  //               if (cart.length === 0) {
  //                 return (
  //                   <React.Fragment key={index * index + 1}></React.Fragment>
  //                 );
  //               }
  //               return (
  //                 <InnerCartProduct
  //                   amount={amount}
  //                   cart={cart}
  //                   comment={comment}
  //                   delivered={delivered}
  //                   orderid={orderid}
  //                   payment={payment}
  //                   time={time}
  //                   totalitems={totalitems}
  //                   voucher={voucher}
  //                   address={address}
  //                   _id={_id}
  //                   name={name}
  //                   mobile={mobile}
  //                   email={email}
  //                   date={date}
  //                   key={index}
  //                 />
  //               );
  //             }
  //           )}
  //       </>
  //     );
  //   };

  const FilterValues = ["All", "Placed", "Dispatched", "En Route", "Delivered"];

  return (
    <div className="OrderBox">
      <div className={dateOpened ? "DateInput" : "HideDateInput"}>
        <Button
          className="OrderFilterBtn"
          id={"DateResetBtn"}
          onClick={() => setDateVal("")}
        >
          Reset
        </Button>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            style={{ border: "2px solid red" }}
            orientation="landscape"
            openTo="day"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
              setDateVal(newValue.toLocaleDateString());
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>

      <div className="DateDiv">
        <Button
          id="DateDivBtn"
          onClick={() => {
            dateOpened ? setDateOpened(false) : setDateOpened(true);
          }}
        >
          <img src="/calendar.png" alt="" width="30px" />
        </Button>
      </div>

      <div className="OrderFilterNav">
        {FilterValues.map((fv) => {
          return (
            <Button
              className="OrderFilterBtn"
              id={filter === fv ? "OrderFilterBtnSlctd" : ""}
              key={fv}
              onClick={() => setFilter(fv)}
            >
              {fv}
            </Button>
          );
        })}
      </div>

      {filter === "All" ? (
        <div className="OrderFilterNavDp">
          <div className="FilterInputs">
            <span>Search Order by OrderId</span>
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Ex. 348924892034094"
            />
          </div>

          <div className="FilterInputs">
            <span>Search Order by UserDetails</span>
            <input
              type="text"
              value={globeFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Name, Mobile or Email"
            />
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="OrderDiv">
        {filter === "All" ? <div className="OrderFilterNav"></div> : ""}

        {state ? (
          state
            .filter((sf) => {
              if (!globeFilter) {
                return sf.username;
              } else {
                return (
                  sf.username.match(globeFilter) ||
                  sf.mobile.match(globeFilter) ||
                  sf.userid.match(globeFilter)
                );
              }
            })
            .filter((of) => {
              if (orderId) {
                return of._id == orderId;
              } else {
                return of._id;
              }
            })
            .filter((df) => {
              if (!dateVal) {
                return df.date;
              } else {
                return df.date === dateVal;
              }
            })
            .map((details) => {
              return <InnerCartProduct details={details} key={details._id} />;
            })
        ) : (
          <h1>No Order yet</h1>
        )}
      </div>
    </div>
  );
}

export default Orders;
