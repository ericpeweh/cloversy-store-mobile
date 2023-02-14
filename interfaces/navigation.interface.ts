// Dependencies
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type RootTabsParamList = {
	Home: undefined;
	Explore: undefined;
	Wishlist: undefined;
	Account: undefined;
};

export type MainScreenProps<T extends keyof RootTabsParamList> = BottomTabScreenProps<
	RootTabsParamList,
	T
>;
