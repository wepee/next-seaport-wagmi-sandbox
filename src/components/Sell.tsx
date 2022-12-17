import {useAccount} from "wagmi";
import {FEES_SPLITTER_ADDRESS, PLATFORM_FEES} from "../../constants";
import React, {ChangeEvent, useContext, useState} from "react";
import {n18} from "../../utils/formatter";
import {GlobalContext} from "./context/GlobalContext";

export function Sell() {
	const { address } = useAccount();
	const { tokenData: { tokenAddress, tokenId, tokenType }, setOrder, seaport } = useContext(GlobalContext);

	const [inputField , setInputField] = useState({
		price: 0.01
	});

	const inputsHandler = (e: ChangeEvent<HTMLInputElement>) =>{
		setInputField( {...inputField, [e.target.name]: e.target.value} );
	};

	const createOrder =  async () => {
		if(!seaport) {
			return;
		}
		try {
			const { executeAllActions } = await seaport.createOrder(
				{
					offer: [
						{
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-ignore
							itemType: tokenType,
							token: tokenAddress,
							identifier: tokenId,
						},
					],
					consideration: [
						{
							amount: n18(String(inputField.price * (1-PLATFORM_FEES))).toString(),
							recipient: address,
						},
						{
							amount: n18(String(inputField.price * PLATFORM_FEES)).toString(),
							recipient: FEES_SPLITTER_ADDRESS,
						},
					],
				},
				address,
			);

			const order = await executeAllActions();
			setOrder(order);
			localStorage.setItem("order", JSON.stringify(order));
		} catch (e: any) {
			alert(e.message);
		}
	};

	return (
		<div id="sell" className="section">

			<h2>Sell a token</h2>
			<p>Here you can sign a transaction to create an order for the selected token</p>

			<label htmlFor="price">Price (in ETH)</label><br/>
			<input
				type="number"
				name="price"
				onChange={inputsHandler}
				placeholder="price in ETH"
				value={inputField.price}
			/><br/><br/>
			<button onClick={createOrder}>Sell</button>
		</div>
	);
}
