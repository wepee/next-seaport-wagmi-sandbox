import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import NextHead from "next/head";

import { Sell, Buy, TokenInfoForm, OrderInfo, MakeOffer, AcceptOffer, TokenData } from "../components";

import { StorageContext } from "../context/StorageContext";

function Page() {
	const [mounted, setMounted] = React.useState(false);
	const [tokenData, setTokenData] = React.useState<TokenData | null>(null);
	const { order } = React.useContext(StorageContext);
	const { isConnected } = useAccount();

	React.useEffect(() => setMounted(true), []);

	return (
		<>
			<NextHead>
				<title>Seaport Sandbox</title>
			</NextHead>

			<h1>Next.js + Wagmi + RainbowKit + Seaport</h1>

			<ConnectButton />

			{mounted && isConnected && <>
				<div className="flex">
					<TokenInfoForm onChangeToken={setTokenData} />
					<OrderInfo order={order} />
				</div>
				<div className="flex">
					<Sell tokenData={tokenData} />
					<Buy order={order} />
				</div>
				<div className="flex">
					<MakeOffer tokenData={tokenData} />
					<AcceptOffer order={order} />
				</div>
			</>}
		</>
	);
}

export default Page;
