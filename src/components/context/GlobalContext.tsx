import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import {ItemType} from "@opensea/seaport-js/lib/constants";
import {OrderWithCounter} from "@opensea/seaport-js/lib/types";
import {ethers} from "ethers";
import {Seaport} from "@opensea/seaport-js";

interface TokenData {
    tokenAddress: string
    tokenId: string
    tokenType: ItemType
}

interface GlobalContextProps {
  tokenData: TokenData
  setTokenData: Dispatch<SetStateAction<TokenData>>
    order: OrderWithCounter | null
  setOrder: Dispatch<SetStateAction<OrderWithCounter>>
	seaport?: Seaport
}

// for testing purpose -> information of NFT you own
const tokenDataDefault = {
	tokenAddress: "0xf4910c763ed4e47a585e2d34baa9a4b611ae448c",
	tokenId: "52825296347877427141239656042084453522409464454284240208904887735097764085770",
	tokenType: ItemType.ERC1155,
};

export const GlobalContext = createContext<GlobalContextProps>({
	tokenData : tokenDataDefault,
	setTokenData: () => {return {};},
	order: null,
	setOrder: () => {return {};},
	seaport: undefined
});

export const ContextProvider = (props: { children: JSX.Element }) => {

	let seaport = undefined;

	if (typeof window !== "undefined") {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		seaport = new Seaport(provider);
	}

	const [tokenData, setTokenData] = useState<TokenData>(tokenDataDefault);
	const [order, setOrder] = useState<OrderWithCounter>(null);

	useEffect(() => {
		setOrder(JSON.parse(localStorage.getItem("order")));
	}, []);
	return (
		<GlobalContext.Provider value={{tokenData, setTokenData, order, setOrder, seaport}}>
			{props.children}
		</GlobalContext.Provider>
	);
};
