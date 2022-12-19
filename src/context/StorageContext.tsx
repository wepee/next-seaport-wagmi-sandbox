import React, { ReactNode } from "react";
import { OrderWithCounter } from "@opensea/seaport-js/lib/types";

interface StorageContextProps {
  order: OrderWithCounter | null;
  saveOrder: (order: OrderWithCounter | null) => void;
}

export const StorageContext = React.createContext<StorageContextProps>({
	order: null,
	saveOrder: () => {
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

	function saveOrder(order: OrderWithCounter | null) {
		if (order !== null) {
			localStorage.setItem("order", JSON.stringify(order));
		} else {
			localStorage.removeItem("order");
		}

		return setOrder(order);
	}

	return (
		<StorageContext.Provider value={{order, saveOrder}}>
			{props.children}
		</StorageContext.Provider>
	);
};
