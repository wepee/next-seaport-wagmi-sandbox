import { useAccount } from "wagmi";
import React from "react";
import { SeaportContext } from "../context/SeaportContext";
import type { TokenData } from "../services/seaport.service";
import { StorageContext } from "../context/StorageContext";
import {makeOffer} from "../services/seaport.service";

export function MakeOffer({ tokenData }: { tokenData: TokenData | null }) {
	const [price, setPrice] = React.useState("0.01");
	const [loading, setLoading] = React.useState(false);
	const { saveOrder } = React.useContext(StorageContext);
	const seaport = React.useContext(SeaportContext);
	const { address } = useAccount();

	async function makeAnOffer() {
		if (seaport === null || tokenData === null || loading || address === undefined) return;

		try {
			setLoading(true);
			const order = await makeOffer(address, tokenData, price);
			saveOrder(order);
		} catch (e) {
			console.log(e);
			alert(e);
		} finally {
			setLoading(false);
		}

	}

	return (
		<div id="sell" className="section">
			<h2>Make an offer</h2>
			<p>Here you can sign a transaction to create an order for the selected token</p>

			<label htmlFor="price">Price (in ETH)</label>
			<input
				type="number"
				name="price"
				onChange={(e) => setPrice(e.target.value)}
				placeholder="Price (in ETH)"
				value={price}
			/>

			<br/>

			<button onClick={makeAnOffer} disabled={tokenData === null || price === "" || loading}>
				{loading
					? "Loading..."
					: "Make an offer"
				}
			</button>
		</div>
	);
}
