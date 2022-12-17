import React from "react";
import {ItemType} from "@opensea/seaport-js/lib/constants";
import {useContext, useState} from "react";
import {GlobalContext} from "./context/GlobalContext";

export function TokenInfoForm() {
	const { setTokenData, tokenData } = useContext(GlobalContext);

	const [inputField , setInputField] = useState(tokenData);

	const inputsHandler = (e: EventTarget) =>{
		setInputField( {...inputField, [e.target.name]: e.target.value} );
	};

	const submitButton = () =>{
		setTokenData(inputField);
	};

	return (
		<div id="token-info" className="section">

			<h2>Token information</h2>
			<p>Please fill information about the Token you what to Sell</p>

			<label htmlFor="tokenType">Token Type</label>
			<select onChange={inputsHandler} value={inputField.tokenType} name="tokenType">
				<option value={ItemType.ERC721}>ERC721</option>
				<option value={ItemType.ERC1155}>ERC1155</option>
			</select>

			<label htmlFor="tokenAddress">Token Address</label>
			<input
				type="text"
				name="tokenAddress"
				onChange={inputsHandler}
				placeholder="tokenAddress"
				value={inputField.tokenAddress}
			/>

			<label htmlFor="tokenId">Token Id</label>
			<input
				type="text"
				name="tokenId"
				onChange={inputsHandler}
				placeholder="tokenId"
				value={inputField.tokenId}
			/>
			<br/>

			<button onClick={submitButton}>Update Token Info</button>
		</div>
	);
}
