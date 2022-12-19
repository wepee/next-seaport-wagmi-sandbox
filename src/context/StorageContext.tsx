import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { OrderWithCounter } from "@opensea/seaport-js/lib/types";

interface StorageContextProps {
  order: OrderWithCounter | null;
  setOrder: Dispatch<SetStateAction<OrderWithCounter | null>>;
}

export const StorageContext = React.createContext<StorageContextProps>({
	order: null,
	setOrder: () => {
		throw new Error("Missing StorageContextProvider in tree");
	},
});

export const StorageContextProvider = (props: { children?: ReactNode }) => {
	const [order, setOrder] = React.useState<OrderWithCounter | null>(null);

	React.useEffect(() => {
		const localOrder = localStorage.getItem("order");
		if (localOrder !== null)
			setOrder(JSON.parse(localOrder));
	}, []);

	return (
		<StorageContext.Provider value={{order, setOrder}}>
			{props.children}
		</StorageContext.Provider>
	);
};
