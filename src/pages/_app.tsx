import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import * as React from "react";
import { WagmiConfig } from "wagmi";
import { appName, chains, client } from "../wagmi";
import { SeaportContextProvider } from "../context/SeaportContext";
import { StorageContextProvider } from "../context/StorageContext";

import "../styles/styles.css";
import "@rainbow-me/rainbowkit/styles.css";

function App({ Component, pageProps }: AppProps) {
	return (
		<WagmiConfig client={client}>
			<RainbowKitProvider appInfo={{ appName }} chains={chains}>
				<SeaportContextProvider>
					<StorageContextProvider>
						<Component {...pageProps} />
					</StorageContextProvider>
				</SeaportContextProvider>
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default App;
