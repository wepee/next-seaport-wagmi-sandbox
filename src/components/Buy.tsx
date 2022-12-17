import {useAccount} from "wagmi";
import React, {useContext} from "react";
import {GlobalContext} from "./context/GlobalContext";
import {fromN18} from "../../utils/formatter";

export function Buy() {
	const { address } = useAccount();
	const { order, seaport } = useContext(GlobalContext);

	const fulfillOrder =  async () => {
		if(!seaport || !order) {
			return;
		}

		try {
			const { executeAllActions: executeAllFulfillActions } =
				await seaport.fulfillOrder({
					order,
					accountAddress: address,
				});

			const transaction = executeAllFulfillActions();

			console.log(await transaction);
		} catch (e: any) {
			alert(e.message);
		}
	};

	return (
		<div id="buy" className="section" >

			<h2>Purchase the Token</h2>
			{
				order ?
					<>
						<p>Fulfill Order</p>

						<b>Price</b>
						<p>
							{
								//to get price + fees
								order.parameters.consideration.reduce((acc, el) => {
									return acc + +fromN18(el.startAmount);
								}, 0)
							} ETH
						</p>

						<button onClick={fulfillOrder}>Purchase</button>
					</>
					:
					<b>No pending order</b>
			}
		</div>
	);
}
