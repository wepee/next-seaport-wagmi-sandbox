import { mainnet, useAccount, useNetwork } from "wagmi";
import { FEES_SPLITTER_ADDRESS_GOERLI, FEES_SPLITTER_ADDRESS_MAINNET, PLATFORM_FEES, PLATFORM_FEES_PRECISION } from "../../constants";
import React from "react";
import { n18 } from "../../utils/formatter";
import { SeaportContext } from "../context/SeaportContext";
import { TokenData } from "./TokenInfoForm";
import { StorageContext } from "../context/StorageContext";
import { ItemType } from "@opensea/seaport-js/lib/constants";

export function Sell({ tokenData }: { tokenData: TokenData | null }) {
	const [price, setPrice] = React.useState("0.01");
	const [loading, setLoading] = React.useState(false);
	const { saveOrder } = React.useContext(StorageContext);
	const seaport = React.useContext(SeaportContext);
	const { address } = useAccount();
	const { chain } = useNetwork();

	async function createOrder() {
		if (seaport === null || tokenData === null || loading) return;

		setLoading(true);

		try {
			const priceEth = n18(price);
			const fees = priceEth.mul(PLATFORM_FEES).div(PLATFORM_FEES_PRECISION);

			const { executeAllActions } = await seaport.createOrder(
				{
					offer: [
						tokenData.tokenType === ItemType.ERC721
							? {
								itemType: ItemType.ERC721,
								token: tokenData.tokenAddress,
								identifier: tokenData.tokenId,
							}
							: {
								itemType: ItemType.ERC1155,
								token: tokenData.tokenAddress,
								identifier: tokenData.tokenId,
								amount: "1",
							},
					],
					consideration: [
						{
							amount: priceEth.sub(fees).toString(),
							recipient: address,
						},
						{
							amount: fees.toString(),
							recipient: chain === mainnet
								? FEES_SPLITTER_ADDRESS_MAINNET
								: FEES_SPLITTER_ADDRESS_GOERLI,
						},
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
			<h2>Sell a token</h2>
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
					: "Sell"
				}
			</button>
		</div>
	);
}
