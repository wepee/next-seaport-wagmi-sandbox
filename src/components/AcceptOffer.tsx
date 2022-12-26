import { useAccount } from "wagmi";
import React from "react";
import { StorageContext } from "../context/StorageContext";
import { fromN18 } from "../../utils/formatter";
import { SeaportContext } from "../context/SeaportContext";
import { BigNumber } from "ethers";
import { OrderWithCounter } from "@opensea/seaport-js/lib/types";

export function AcceptOffer({ order }: { order: OrderWithCounter | null }) {
	const [loading, setLoading] = React.useState(false);
	const { saveOrder } = React.useContext(StorageContext);
	const seaport = React.useContext(SeaportContext);
	const { address } = useAccount();

	const fulfillOrder =  async () => {
		if(seaport === null || order === null) return;

		setLoading(true);

		try {
			const { executeAllActions } =
				await seaport.fulfillOrder({
					order,
					accountAddress: address,
				});

			const transaction = await executeAllActions();

			console.log(transaction);

			saveOrder(null);
		} catch (e: any) {
			alert(e?.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div id="accept" className="section" >
			<h2>Accept the offer</h2>

			{order ? <>
				<p>Fulfill Order</p>

				<b>Price</b>
				<p>
					{fromN18(
						order.parameters.consideration.reduce((acc, el) => {
							return acc.add(el.startAmount);
						}, BigNumber.from(0)).toString()
					)}
					ETH
				</p>

				<button onClick={fulfillOrder}>
					{loading
						? "Loading..."
						: "Accept offer"
					}
				</button>
			</> : (
				<b>No pending order</b>
			)}
		</div>
	);
}
