import React from "react";
import { ItemType } from "@opensea/seaport-js/lib/constants";

export interface TokenData {
	tokenType: ItemType;
	tokenAddress: string;
	tokenId: string;
}

export function TokenInfoForm(props: { onChangeToken?: (tokenData: TokenData) => void }) {
	// const [tokenType, setTokenType] = React.useState<ItemType | undefined>(undefined);
	// const [tokenAddress, setTokenAddress] = React.useState("");
	// const [tokenId, setTokenId] = React.useState("");
	const [tokenType, setTokenType] = React.useState<ItemType | undefined>(ItemType.ERC1155);
	const [tokenAddress, setTokenAddress] = React.useState("0xf4910c763ed4e47a585e2d34baa9a4b611ae448c");
	const [tokenId, setTokenId] = React.useState("52825296347877427141239656042084453522409464454284240208904887735097764085770");

	function handleSubmit() {
		if (tokenType !== ItemType.ERC721 && tokenType !== ItemType.ERC1155)
			return alert("Invalid token type.");

		if (!tokenAddress.startsWith("0x") || tokenAddress.length !== 42)
			return alert("Invalid token address.");

		if (!tokenId.match(/^\d+$/))
			return alert("Invalid token ID.");

		if (props.onChangeToken) {
			props.onChangeToken({
				tokenType,
				tokenAddress,
				tokenId,
			});
		}
	}

	return (
		<div id="token-info" className="section">
			<h2>Token information</h2>
			<p>Please fill information about the Token you what to Sell</p>

			<label htmlFor="tokenType">Token Type</label>
			<select name="tokenType" value={tokenType} onChange={(e) => setTokenType(parseInt(e.target.value, 10) as ItemType)}>
				<option value={undefined} disabled selected>Select a value...</option>
				<option value={ItemType.ERC721}>ERC721</option>
				<option value={ItemType.ERC1155}>ERC1155</option>
			</select>

			<label htmlFor="tokenAddress">Token Address</label>
			<input
				type="text"
				name="tokenAddress"
				onChange={(e) => setTokenAddress(e.target.value)}
				placeholder="Token address (0x...)"
				value={tokenAddress}
			/>

			<label htmlFor="tokenId">Token Id</label>
			<input
				type="text"
				name="tokenId"
				onChange={(e) => setTokenId(e.target.value)}
				placeholder="Token ID"
				value={tokenId}
			/>
			<br/>

			<button onClick={handleSubmit}>Update Token Info</button>
		</div>
	);
}
