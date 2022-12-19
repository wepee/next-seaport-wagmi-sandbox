import { useAccount } from "wagmi";
import React from "react";
import { StorageContext } from "../context/StorageContext";
import { fromN18 } from "../../utils/formatter";
import { SeaportContext } from "../context/SeaportContext";
import { TokenData } from "./TokenInfoForm";

export function Buy(props: { tokenData: TokenData | null }) {
	const { order } = React.useContext(StorageContext);
	const seaport = React.useContext(SeaportContext);
	const { address } = useAccount();

	const fulfillOrder =  async () => {
		if(seaport === null || order === null) return;

		try {
			const { executeAllActions: executeAllFulfillActions } =
				await seaport.fulfillOrder({
					order,
					accountAddress: address,
				});

			const transaction = executeAllFulfillActions();

			console.log(await transaction);
		} catch (e: any) {
			alert(e?.message);
		}
	};

	return (
		<div id="buy" className="section" >
			<h2>Purchase the Token</h2>

			{order ? <>
				<p>Fulfill Order</p>

				<b>Price</b>
				<p>
					{
						//to get price + fees
						order.parameters.consideration.reduce((acc, el) => {
							return acc + + fromN18(el.startAmount);
						}, 0)
					} ETH
				</p>

				<button onClick={fulfillOrder}>Purchase</button>
			</> : (
				<b>No pending order</b>
			)}
		</div>
	);
}
