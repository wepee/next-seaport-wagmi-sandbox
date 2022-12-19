import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

if (!process.env.NEXT_PUBLIC_ALCHEMY_API_KEY)
	throw new Error("Missing Alchemy API key");

const { chains, provider, webSocketProvider } = configureChains(
	[goerli, mainnet],
	[
		alchemyProvider({
			apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
		}),
		publicProvider(),
	],
);

export const appName = "Seaport Sandbox Wagmi + RainbowKit";

const { connectors } = getDefaultWallets({
	appName,
	chains,
});

export const client = createClient({
	autoConnect: true,
	connectors,
	provider,
	webSocketProvider,
});

export { chains };
