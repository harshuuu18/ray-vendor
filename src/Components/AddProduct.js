/** @format */

import React, { useState } from "react";
import { IconButton, Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { VendorContext } from "../App";
import { useEffect } from "react";

function AddProduct() {
	const [preview1, setPreview1] = useState("");
	const [preview2, setPreview2] = useState("");
	const [preview3, setPreview3] = useState("");
	const [user, setUser] = useState([]);
	const [image1, setImage1] = useState("");
	const [image2, setImage2] = useState("");
	const [image3, setImage3] = useState("");
	const [name, setName] = useState("");
	const [path, setPath] = useState("");
	const [brand, setBrand] = useState("");
	const [vendor, setVendor] = useState("");
	const [price, setPrice] = useState("");
	const [desc, setDesc] = useState("");
	const [mediaUrl, setMediaUrl] = useState([]);
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
		var User = JSON.parse(localStorage.getItem("vendor"));
		if (User) {
			setUser(User);
			setVendor(User.vendor);
		}
	}, []);

	const UploadImage = (e, { img, num }) => {
		// console.log(e.target.id = "FSI",e.target.innerText = "UPLOADED",e.target.disabled = true)
		if (!img) {
			return toast.error("Please add Image", options);
		}
		if (!name || !price || !vendor || !vendor || !path) {
			return toast.error("Please Add All Fields", options);
		}
		toast.info("Image uploading...", options);
		e.target.innerText = "UPLOADING..";
		var FileName = img.name.split(".");
		var extension = FileName[FileName.length - 1];
		var FileId = Date.now();
		var NewFileName = `${path + FileId + num}.${extension}`;
		var link = `/uploads/${NewFileName}`;
		var media = mediaUrl;
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
			media.push(link);
			setMediaUrl(media);
			console.log(res);
		});
	};

	const UploadProduct = () => {
		if (
			!name ||
			!price ||
			!vendor ||
			!vendor ||
			!path ||
			mediaUrl.length == 0
		) {
			return toast.error("Please Add All Fields", options);
		}

		fetch("/api/vendor/CreateProduct", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"Bearer " + JSON.parse(localStorage.getItem("vendor")).token,
			},
			body: JSON.stringify({
				name,
				price,
				brand,
				vendor,
				description: desc,
				mediaUrl,
				url: path,
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
		<div className="AddProduct-Main">
			<div className="Image-Div">
				<label
					htmlFor="product1"
					className="product1"
					style={{ backgroundImage: `url(${preview1 ? preview1 : ""})` }}
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
					style={{ backgroundImage: `url(${preview2 ? preview2 : ""})` }}
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
					style={{ backgroundImage: `url(${preview3 ? preview3 : ""})` }}
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

			<div className="Form-Div">
				<div className="FormHeading">Product Details</div>

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
						value={name}
						autoComplete="false"
						onChange={(e) => {
							setPath(e.target.value.split(" ").join("-"));
							setName(e.target.value);
						}}
					/>
				</div>
				<br />
				<div className="Form-Inputs">
					<span>Brand Name:</span>
					<input
						type="text"
						placeholder="Brand"
						value={brand}
						autoComplete="false"
						onChange={(e) => {
							setBrand(e.target.value);
						}}
					/>
				</div>
				<br />
				<div className="Form-Inputs">
					<span>Vendor Name:</span>
					<input
						type="text"
						placeholder="Vendor"
						value={vendor}
						onChange={(e) => {
							setVendor(e.target.value);
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
						value={price}
						onChange={(e) => {
							setPrice(e.target.value);
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

				<br />
				<div className="Form-Inputs-Desc">
					<span>Upload Images:</span>
					<br />

					<div className="Form-Save-Image">
						<Button
							className="FSI-Btn"
							onClick={(e) => UploadImage(e, { img: image1, num: "-1" })}
						>
							Upload-1
						</Button>
						<Button
							className="FSI-Btn"
							onClick={(e) => UploadImage(e, { img: image2, num: "-2" })}
						>
							Upload-2
						</Button>
						<Button
							className="FSI-Btn"
							onClick={(e) => UploadImage(e, { img: image3, num: "-3" })}
						>
							Upload-3
						</Button>
					</div>
				</div>

				<br />
				<Button className="Form-Button" onClick={() => UploadProduct()}>
					Upload
				</Button>
				<br />
			</div>
		</div>
	);
}

export default AddProduct;
