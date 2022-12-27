import { ethers } from "ethers";

export function n18(amount: string) {
	return ethers.utils.parseUnits(amount.replace(/_/g, ""), "ether");
}

export function fromN18(amount: string) {
	return ethers.utils.formatEther(amount.replace(/_/g, ""));
}
