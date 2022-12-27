import {BigNumber, ethers} from "ethers";
import {ItemType} from "@opensea/seaport-js/lib/constants";
import {FEES_SPLITTER_ADDRESS, PLATFORM_FEES, PLATFORM_FEES_PRECISION, WETH_ADDRESS} from "../../constants";
import {n18} from "../utils/formatter";
import {ExternalProvider} from "@ethersproject/providers";
import {Seaport} from "@opensea/seaport-js";
import {OrderWithCounter} from "@opensea/seaport-js/lib/types";

export interface TokenData {
    address: string,
    id: string,
    type: ItemType
}

const initializeSeaport = () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum as ExternalProvider);
	const seaport = new Seaport(provider);
	return seaport;
};

export const sellAtPrice = async (myAddress: `0x${string}`, token: TokenData, price: BigNumber | string): Promise<OrderWithCounter> => {
	const priceEth = n18(price.toString());
	const fees = priceEth.mul(PLATFORM_FEES).div(PLATFORM_FEES_PRECISION);

	const seaport = initializeSeaport();

	const { executeAllActions } = await seaport.createOrder(
		{
			offer: [
				token.type === ItemType.ERC721
					? {
						itemType: ItemType.ERC721,
						token: token.address,
						identifier: token.id,
					}
					: {
						itemType: ItemType.ERC1155,
						token: token.address,
						identifier: token.id,
						amount: "1",
					},
			],
			consideration: [
				{
					amount: priceEth.sub(fees).toString(),
					recipient: myAddress,
				},
				{
					amount: fees.toString(),
					recipient: FEES_SPLITTER_ADDRESS
				},
			],
		},
		myAddress,
	);

	const order = await executeAllActions();

	return order;
};

export const makeOffer = async (myAddress: `0x${string}`, token: TokenData, price: BigNumber | string, currencyAddress: string = WETH_ADDRESS): Promise<OrderWithCounter> => {
	const provider = new ethers.providers.Web3Provider(window.ethereum as ExternalProvider);
	const seaport = new Seaport(provider);

	const priceEth = n18(price.toString());
	const fees = priceEth.mul(PLATFORM_FEES).div(PLATFORM_FEES_PRECISION);


	const { executeAllActions } = await seaport.createOrder(
		{
			offer: [
				{
					amount: priceEth.toString(),
					token: currencyAddress
				},

			],
			consideration: [
				token.type === ItemType.ERC721
					? {
						itemType: ItemType.ERC721,
						token: token.address,
						identifier: token.id,
						recipient: myAddress
					}
					: {
						itemType: ItemType.ERC1155,
						token: token.address,
						identifier: token.id,
						amount: "1",
						recipient: myAddress
					},
				{
					amount: fees.toString(),
					token: currencyAddress,
					recipient: FEES_SPLITTER_ADDRESS,
				}
			],
		},
		myAddress,
	);

	const order = await executeAllActions();
	return order;
};

export const acceptOffer = async (myAddress: `0x${string}`, order: OrderWithCounter) :  Promise<ethers.ContractTransaction>=> {
	const seaport = initializeSeaport();
	const {executeAllActions: executeAllFulfillActions} =
		await seaport.fulfillOrder({
			order,
			accountAddress: myAddress,
		});

	const transaction = executeAllFulfillActions();
	return transaction;
};
