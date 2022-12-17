import "../styles/styles.css";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import * as React from "react";
import {WagmiConfig} from "wagmi";

import { chains, client } from "../wagmi";
import {ContextProvider} from "../components/context/GlobalContext";

function App({ Component, pageProps }: AppProps) {
	const [mounted, setMounted] = React.useState(false);
	React.useEffect(() => setMounted(true), []);

	return (
		<WagmiConfig client={client}>
			<RainbowKitProvider chains={chains}>
				<ContextProvider>
					<>
						<NextHead>
							<title>Seaport Sandbox</title>
						</NextHead>
						{mounted ? <Component {...pageProps} /> : undefined}
					</>
				</ContextProvider>
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default App;
