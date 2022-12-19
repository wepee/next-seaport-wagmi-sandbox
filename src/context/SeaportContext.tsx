import React, { ReactNode } from "react";
import { ethers } from "ethers";
import { Seaport } from "@opensea/seaport-js";
import { ExternalProvider } from "@ethersproject/providers";

export const SeaportContext = React.createContext<Seaport | null>(null);

export const SeaportContextProvider = (props: { children?: ReactNode }) => {
	const [seaport, setSeaport] = React.useState<Seaport | null>(null);

	React.useEffect(() => {
		const provider = new ethers.providers.Web3Provider(window.ethereum as ExternalProvider);
		setSeaport(new Seaport(provider));
	}, []);

	return (
		<SeaportContext.Provider value={seaport}>
			{props.children}
		</SeaportContext.Provider>
	);
};
