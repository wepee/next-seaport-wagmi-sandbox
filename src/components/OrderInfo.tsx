import React from "react";
import { ItemType } from "@opensea/seaport-js/lib/constants";
import { fromN18 } from "../utils/formatter";
import { OrderWithCounter } from "@opensea/seaport-js/lib/types";

export function OrderInfo({order} : {order: OrderWithCounter | null}) {
	return (
		<div id="order-info" className="section">
			<h2>Order information</h2>

			{order ? <>
				<b>Signature:</b>
				<span>{order.signature.slice(0, 42)}...</span>

				<b>Type:</b>
				<span>{ItemType[order.parameters.offer[0].itemType]}</span>

				<b>Address:</b>
				<span>{order.parameters.offer[0].token}</span>

				<b>Price:</b>
				<span>{fromN18(order.parameters.consideration[0].startAmount)} ETH</span>

				<b>Platform fees:</b>
				<span>{fromN18(order.parameters.consideration[1].startAmount)} ETH</span>
			</> : (
				<b>Create an order to see it appear here.</b>
			)}
		</div>
	);
}
