import { useAccount } from "wagmi";
import {
	FEES_SPLITTER_ADDRESS,
	PLATFORM_FEES,
	PLATFORM_FEES_PRECISION,
	WETH_ADDRESS,
} from "../../constants";
import React from "react";
import { n18 } from "../../utils/formatter";
import { SeaportContext } from "../context/SeaportContext";
import { TokenData } from "./TokenInfoForm";
import { StorageContext } from "../context/StorageContext";
import { ItemType } from "@opensea/seaport-js/lib/constants";

export function MakeOffer({ tokenData }: { tokenData: TokenData | null }) {
	const [price, setPrice] = React.useState("0.01");
	const [loading, setLoading] = React.useState(false);
	const { saveOrder } = React.useContext(StorageContext);
	const seaport = React.useContext(SeaportContext);
	const { address } = useAccount();

	async function createOrder() {
		if (seaport === null || tokenData === null || loading) return;

		setLoading(true);

		try {
			const priceEth = n18(price);
			const fees = priceEth.mul(PLATFORM_FEES).div(PLATFORM_FEES_PRECISION);

			const { executeAllActions } = await seaport.createOrder(
				{
					offer: [
						{
							amount: priceEth.toString(),
							token: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" //WETH_ADDRESS,
						},

					],
					consideration: [
						tokenData.tokenType === ItemType.ERC721
							? {
								itemType: ItemType.ERC721,
								token: tokenData.tokenAddress,
								identifier: tokenData.tokenId,
								recipient: address
							}
							: {
								itemType: ItemType.ERC1155,
								token: tokenData.tokenAddress,
								identifier: tokenData.tokenId,
								amount: "1",
								recipient: address
							},
						{
							itemType: 1, //ERC20
							amount: fees.toString(),
							token: WETH_ADDRESS,
							recipient: FEES_SPLITTER_ADDRESS,
						}
					],
				},
				address,
			);

			const order = await executeAllActions();
			saveOrder(order);
		} catch (e: any) {
			alert(e?.message);
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

			<button onClick={createOrder} disabled={tokenData === null || price === "" || loading}>
				{loading
					? "Loading..."
					: "Make an offer"
				}
			</button>
		</div>
	);
}
