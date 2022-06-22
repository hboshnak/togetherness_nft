import React, { useState, useEffect } from "react";
import css from "./Mint.module.css";
import image from "../../../assets/cat.png";

const Mint = ({ nftminter, isConnected, plugActor }) => {
	const [name, setName] = useState("");
	const [symbol, setSymbol] = useState("");
	// num
	const [tokensMinted, setTokensMinted] = useState(); // num
	// get
	const [tokenIdUrl, setTokenIdUrl] = useState(0);
	const [tokenUrl, setTokenUrl] = useState("");
	const [tokenIdOwner, setTokenIdOwner] = useState(0);
	const [tokenOwner, setTokenOwner] = useState("");
	// status
	const [isMinting, setIsMinting] = useState(false);

	async function getName() {
		await nftminter.name().then((res) => setName(res));
	}

	async function getSymbol() {
		await nftminter.symbol().then((res) => setSymbol(res));
	}

	const link = "http://localhost:8080";
	//const linkNetwork = "https://j76pn-raaaa-aaaai-qicmq-cai.raw.ic0.app";

	async function mint() {
		if (tokensMinted < 10) {
			setIsMinting(true);
			await plugActor
				.mint(`${linkNetwork}/${tokensMinted + 1}.svg`)
				.then((res) => console.log("Minted NFT with id", res.toString()));
			getNumMinted();
			setIsMinting(false);
		}
	}

	async function getOwnerOf() {
		await nftminter.ownerOf(tokenIdOwner).then((owner) => setTokenOwner(owner));
	}

	async function getTokenUrl() {
		await nftminter.tokenURI(tokenIdUrl).then((url) => setTokenUrl(url));
	}

	async function getNumMinted() {
		await nftminter.getNumTokensMinted().then((numTokensMinted) => {
			setTokensMinted(parseInt(numTokensMinted.toString()));
		});
	}

	// get number of tokens minted
	useEffect(async () => {
		if (isConnected) {
			getNumMinted();
		}
	}, [isConnected]);

	return (
		<div className="section">
			<h2>NFT</h2>
			{isConnected ? (
				<div className={css.mint__info}>
					<button onClick={() => getName()}>Name </button>
					<p>{name}</p>
					<button onClick={() => getSymbol()}>Symbol </button>
					<p>{symbol}</p>
					<p>Minted NFT's: {tokensMinted}/10</p>
					<p>Last minted NFT: {tokensMinted}</p>
					<p>Next to be minted:</p>
					{tokensMinted >= 0 && tokensMinted <= 10 ? (
						<img
							className={css.img}
							//src={`https://j76pn-raaaa-aaaai-qicmq-cai.raw.ic0.app/${tokensMinted + 1}.svg`}
							src={`http://localhost:8080/${tokensMinted + 1}.svg`}
							alt=""
						/>
					) : (
						<p>Sorry, come another time</p>
					)}
					<button onClick={() => mint()}>{!isMinting ? "Mint" : "Minting..."}</button>

					{/* owner */}
					<div className={css.withInput}>
						<p>Get NFT owner </p>
						<input onChange={(e) => setTokenIdOwner(parseInt(e.target.value))} type="number" />
						<button onClick={() => getOwnerOf()}>Get</button>
					</div>
					<p>Owner: </p>
					<p>{tokenOwner}</p>

					{/* url */}
					<div className={css.withInput}>
						<p>Get NFT url </p>
						<input onChange={(e) => setTokenIdUrl(parseInt(e.target.value))} type="number" />
						<button onClick={() => getTokenUrl()}>Get</button>
					</div>
					<p>NFT url: </p>
					<p>{tokenUrl}</p>
				</div>
			) : (
				<p>Sign in for more</p>
			)}
		</div>
	);
};

export default Mint;
