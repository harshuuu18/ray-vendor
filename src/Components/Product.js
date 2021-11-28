/** @format */
import { Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function Product({ data }) {
  const [dropped, setDropped] = useState(false);
  const [preview1, setPreview1] = useState("");
  const [preview2, setPreview2] = useState("");
  const [preview3, setPreview3] = useState("");
  const [user, setUser] = useState([]);
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [cname, setCName] = useState("");
  const [cpath, setCPath] = useState("");
  const [cbrand, setCBrand] = useState("");
  const [cvendor, setCVendor] = useState("");
  const [cprice, setCPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [cmediaUrl, setCMediaUrl] = useState([]);
  const { brand, description, mediaUrl, name, price, url, vendor, vid, _id } =
    data;

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
    setCBrand(brand);
    setCName(name);
    setCPrice(price);
    setDesc(description);
    setCVendor(vendor);
    setCMediaUrl(mediaUrl);
    setCPath(name.split(" ").join("-"));
  }, []);

  const UploadImage = (e, { img, num, path }) => {
    if (!img) {
      return toast.error("Please add Image", options);
    }
    if (!cname || !cprice || !cvendor) {
      return toast.error("You have not changed anything", options);
    }
    var nNum = parseInt(num.replace("-", ""));

    toast.info("Image uploading...", options);
    e.target.innerText = "UPLOADING..";
    var FileName = img.name.split(".");
    var extension = FileName[FileName.length - 1];
    var FileId = Date.now();
    var NewFileName = `${path + FileId + num}.${extension}`;
    var link = `/uploads/${NewFileName}`;
    var media = cmediaUrl;
    console.log(NewFileName);
    const formData = new FormData();
    formData.append("file", img, NewFileName);

    axios("/api/auth/uploadImage", {
      method: "POST",
      data: formData,
      "content-type": "multipart/form-data",
    }).then((res) => {
      e.target.id = "FSI";
      e.target.innerText = "UPLOADED";
      e.target.disabled = true;
      toast.success("Image uploaded", options);
      media[nNum - 1] = link;
      setCMediaUrl(media);
      console.log(media, link);
      console.log(res);
    });
  };

  const UploadProduct = ({ productId }) => {
    if (
      !cname ||
      !cprice ||
      !cvendor ||
      !cvendor ||
      !cpath ||
      cmediaUrl.length == 0
    ) {
      return toast.error("Please Add All Fields", options);
    }

    fetch("/api/product/UpdateProduct", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("vendor")).token,
      },
      body: JSON.stringify({
        name: cname,
        price: cprice,
        brand: cbrand,
        vendor: cvendor,
        description: desc,
        mediaUrl: cmediaUrl,
        url: cpath,
        productId,
      }),
    })
      .then((r) => {
        r.json().then((d) => {
          if (d.error) {
            toast.error(d.error, options);
            console.log(d.error);
          } else {
            toast.success("Product Uploaded", options);
            console.log(d);
          }
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="cartDiv1in" key={_id}>
      <React.Fragment>
        <div className="cartImg">
          <div
            className="cartActualImg"
            style={{
              backgroundImage: `url(${mediaUrl[0]})`,
            }}
          ></div>
        </div>

        <div className="cartDetails">
          <h3> {name} </h3>
          <div className="cartDetailsWBtn">
            <div className="cartValue cvl">
              <span>Brand: {brand}</span>

              <span>
                Price:<span className="redBold"> {price} </span>
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
            {mediaUrl.map((mUrl, index) => {
              return <img src={mUrl} alt="" width="60px" key={index + 1} />;
            })}
          </div>

          <div className="cdinfo">
            <span>
              <b>Vendor</b>: {vendor}{" "}
            </span>
            <span>
              <b>Price</b>: {price}{" "}
            </span>
            <span>
              <b>_ID</b>: {_id}{" "}
            </span>
            <span>
              <b>VID</b>: {vid}{" "}
            </span>
          </div>

          <div className="cdinfo">
            <span>{description}</span>
          </div>

          <div className="cdinfo">
            <div className="Form-Div1">
              <div className="FormHeading">Update Details</div>

              <br />
              <br />
              <br />
              <br />
              <br />

              <div className="Form-Inputs">
                <span>Product Name:</span>
                <input
                  type="text"
                  placeholder="Name"
                  value={cname}
                  autoComplete="false"
                  onChange={(e) => {
                    setCPath(e.target.value.split(" ").join("-"));
                    setCName(e.target.value);
                  }}
                />
              </div>
              <br />
              <div className="Form-Inputs">
                <span>Brand Name:</span>
                <input
                  type="text"
                  placeholder="Brand"
                  value={cbrand}
                  autoComplete="false"
                  onChange={(e) => {
                    setCBrand(e.target.value);
                  }}
                />
              </div>
              <br />
              <div className="Form-Inputs">
                <span>Vendor Name:</span>
                <input
                  type="text"
                  placeholder="Vendor"
                  value={cvendor}
                  onChange={(e) => {
                    setCVendor(e.target.value);
                  }}
                />
              </div>
              <br />
              <div className="Form-Inputs">
                <span>Price:</span>
                <input
                  type="number"
                  placeholder="Price"
                  autoComplete="false"
                  value={cprice}
                  onChange={(e) => {
                    setCPrice(e.target.value);
                  }}
                />
              </div>
              <br />
              <div className="Form-Inputs-Desc">
                <span>Product Description:</span>
                <br />
                <textarea
                  name=""
                  id=""
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
              </div>
              <div className="Form-Inputs-Desc">
                <span>Select Images:</span>
                <br />

                <div className="Form-Save-Image">
                  <div className="Image-Div1">
                    <label
                      htmlFor="product1"
                      className="product1"
                      style={{
                        backgroundImage: `url(${preview1 ? preview1 : ""})`,
                      }}
                    >
                      <span>1</span>
                      {preview1 ? "" : <img src="/img/upload.png" alt="" />}
                    </label>
                    <input
                      type="file"
                      id="product1"
                      onChange={(e) => {
                        if (e.target.files.length === 0) {
                          return setPreview1("");
                        }
                        setPreview1(URL.createObjectURL(e.target.files[0]));

                        setImage1(e.target.files[0]);
                      }}
                    />

                    <label
                      htmlFor="product2"
                      className="product2"
                      style={{
                        backgroundImage: `url(${preview2 ? preview2 : ""})`,
                      }}
                    >
                      <span>2</span>
                      {preview2 ? "" : <img src="/img/upload.png" alt="" />}
                    </label>
                    <input
                      type="file"
                      id="product2"
                      onChange={(e) => {
                        if (e.target.files.length === 0) {
                          return setPreview2("");
                        }
                        setPreview2(URL.createObjectURL(e.target.files[0]));
                        setImage2(e.target.files[0]);
                      }}
                    />

                    <label
                      htmlFor="product3"
                      className="product2"
                      style={{
                        backgroundImage: `url(${preview3 ? preview3 : ""})`,
                      }}
                    >
                      <span>3</span>
                      {preview3 ? "" : <img src="/img/upload.png" alt="" />}
                    </label>
                    <input
                      type="file"
                      id="product3"
                      onChange={(e) => {
                        if (e.target.files.length === 0) {
                          return setPreview3("");
                        }
                        setPreview3(URL.createObjectURL(e.target.files[0]));
                        setImage3(e.target.files[0]);
                      }}
                    />
                  </div>
                </div>
              </div>

              <br />

              <div className="Form-Inputs-Desc">
                <span>Upload Images:</span>
                <br />

                <div className="Form-Save-Image">
                  <Button
                    className="FSI-Btn"
                    onClick={(e) =>
                      UploadImage(e, { img: image1, num: "-1", path: cpath })
                    }
                  >
                    Upload-1
                  </Button>
                  <Button
                    className="FSI-Btn"
                    onClick={(e) =>
                      UploadImage(e, { img: image2, num: "-2", path: cpath })
                    }
                  >
                    Upload-2
                  </Button>
                  <Button
                    className="FSI-Btn"
                    onClick={(e) =>
                      UploadImage(e, { img: image3, num: "-3", path: cpath })
                    }
                  >
                    Upload-3
                  </Button>
                </div>
              </div>

              <br />

              <br />
            </div>
          </div>

          <div className="cdinfo1">
            <Button
              id="UpdateOrderBtn"
              onClick={() => UploadProduct({ productId: _id })}
            >
              Update
            </Button>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
}

export default Product;
