import { useAccount } from "wagmi";
import { FEES_SPLITTER_ADDRESS, PLATFORM_FEES } from "../../constants";
import React from "react";
import { n18 } from "../../utils/formatter";
import { SeaportContext } from "../context/SeaportContext";
import { TokenData } from "./TokenInfoForm";
import { StorageContext } from "../context/StorageContext";

export function Sell(props: { tokenData: TokenData | null }) {
	const [price, setPrice] = React.useState(0.01);
	const { setOrder } = React.useContext(StorageContext);
	const seaport = React.useContext(SeaportContext);
	const { address } = useAccount();

	const createOrder =  async () => {
		if (seaport === null || props.tokenData === null) return;

		try {
			const { executeAllActions } = await seaport.createOrder(
				{
					offer: [
						{
							itemType: props.tokenData.tokenType,
							token: props.tokenData.tokenAddress,
							identifier: props.tokenData.tokenId,
						},
					],
					consideration: [
						{
							amount: n18(String(price * (1-PLATFORM_FEES))).toString(),
							recipient: address,
						},
						{
							amount: n18(String(price * PLATFORM_FEES)).toString(),
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
				onChange={(e) => setPrice(parseFloat(e.target.value))}
				placeholder="price in ETH"
				value={price}
			/><br/><br/>
			<button onClick={createOrder}>Sell</button>
		</div>
	);
}
