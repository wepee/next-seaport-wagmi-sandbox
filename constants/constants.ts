import { getNetwork } from "@wagmi/core";
import {mainnet} from "wagmi/chains";

const { chain } = getNetwork();


const isMainnet = chain?.name === mainnet.name;

const FEES_SPLITTER_ADDRESS_MAINNET = "0x74ca0ee5411b98266b959af88c0b2fc63bada9e2";
const FEES_SPLITTER_ADDRESS_GOERLI = "0x74ca0ee5411b98266b959af88c0b2fc63bada9e2";


export const FEES_SPLITTER_ADDRESS = isMainnet ? FEES_SPLITTER_ADDRESS_MAINNET : FEES_SPLITTER_ADDRESS_GOERLI;

export const WETH_ADDRESS_MAINNET = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
export const WETH_ADDRESS_GOERLI = "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6";

export const WETH_ADDRESS = isMainnet ? WETH_ADDRESS_MAINNET : WETH_ADDRESS_GOERLI;

export const PLATFORM_FEES = 2;
export const PLATFORM_FEES_PRECISION = 1e2;
