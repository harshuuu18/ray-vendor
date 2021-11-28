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
			fetch(`/api/v/${User.vendor}/${User._id}`).then((r => r.json().then(d=>{
				setDesc(d.Details.about)
				setPreview1(d.Details.image)
			})))
		}
	}, []);

	const UploadImage = (e, { img, num }) => {
		// console.log(e.target.id = "FSI",e.target.innerText = "UPLOADED",e.target.disabled = true)
		if (!img) {
			return toast.error("Please add Image", options);
		}
		
		toast.info("Image uploading...", options);
		e.target.innerText = "UPLOADING..";
		var FileName = img.name.split(".");
		var extension = FileName[FileName.length - 1];
		var FileId = Date.now();
		var NewFileName = `${vendor + "-" + user._id}.${extension}`;
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
			if(res.status == 200){
				fetch('/api/auth/updateVendorImage',{
					method:"post",
					headers:{
						"Content-Type":"application/json"
					},
					body:JSON.stringify({imageUrl:link,vid:user._id,vname:user.vendor})
				}).then(r=>r.json().then(d=>{
					console.log(d)
				})).catch(err=>console.log(err))
			}
		})
	};

	const UploadProduct = () => {
		if (
			!desc
		) {
			return toast.error("Please Add All Fields", options);
		}

		fetch("/api/auth/updateVendorAbout", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"Bearer " + JSON.parse(localStorage.getItem("vendor")).token,
			},
			body: JSON.stringify({
				desc,vid:user._id,vname:user.vendor
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
					<h1>Update Your Detail Image</h1>
					<Button
							className="FSI-Btn"
							onClick={(e) => UploadImage(e, { img: image1, num: "-1" })}
						>
							Upload-1
						</Button>
			</div>

			<div className="Form-Div">
				<div className="FormHeading">Vendor Details</div>

				<br />
				

				
				
				
				
				
				{/* <hr style={{justifySelf:"center",textAlign:"center"}} /> */}
				<br />
				<div className="Form-Inputs-Desc">
					<span>About You:</span>
					<br />
					<textarea
						name=""
						id=""
						placeholder="Ex. We provide our customer with the excellence varities of Products."
						value={desc}
						onChange={(e) => setDesc(e.target.value)}
					></textarea>
				</div>
				
				<Button className="Form-Button" onClick={() => UploadProduct()}>
					Upload
				</Button>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
			</div>
		</div>
	);
}

export default AddProduct;
