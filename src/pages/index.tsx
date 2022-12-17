import React, {useContext} from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import {Sell, Buy, TokenInfoForm, OrderInfo} from "../components";
import {GlobalContext} from "../components/context/GlobalContext";

function Page() {
	const { isConnected } = useAccount();

	const { order } = useContext(GlobalContext);

	return (
		<>
			<h1>Wagmi + RainbowKit + Next.js + Seaport</h1>

			<ConnectButton />

			{
				isConnected &&
				<>
					<div className="flex">
						<TokenInfoForm />
						<OrderInfo order={order} />
					</div>
					<div className="flex">
						<Sell />
						<Buy order={order}/>
					</div>
				</>
			}
		</>
	);
}

export default Page;
