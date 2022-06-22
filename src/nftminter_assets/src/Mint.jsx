import React, { useState } from "react";
import css from "./App.module.css";
import Mint from "./Sections/Mint/Mint";
import N3 from "./Sections/N3/N3";
import "./App.css";

// components
import Plug from "./Sections/Plug/Plug";


const Mint = ({ nftminter }) => {
	// state
	const [isConnected, setIsConnected] = useState(false);
	const [plugActor, setPlugActor] = useState(undefined);
	const [plugUserPrincipal, setPlugUserPrincipal] = useState(undefined);
	const [motokoBootcampTokenBalance, setMotokoBootcampTokenBalance] = useState(undefined);
	const [whoAmI, setWhoAmI] = useState(undefined);

	return (
		<div className="app">
			<N3 />
			<div className="app__content">
				<Plug
					nftminter={nftminter}
					isConnected={isConnected}
					setIsConnected={setIsConnected}
					plugActor={plugActor}
					setPlugActor={setPlugActor}
					plugUserPrincipal={plugUserPrincipal}
					setPlugUserPrincipal={setPlugUserPrincipal}
					motokoBootcampTokenBalance={motokoBootcampTokenBalance}
					setMotokoBootcampTokenBalance={setMotokoBootcampTokenBalance}
					whoAmI={whoAmI}
					setWhoAmI={setWhoAmI}
				/>
				<Mint nftminter={nftminter} isConnected={isConnected} plugActor={plugActor} />
			</div>
		</div>
	);
};

export default App;
