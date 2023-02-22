// Dependencies
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps, NativeStackNavigationProp } from "@react-navigation/native-stack";

// Types
import { ProductReviewItem } from "./product.interface";

export type RootTabsParamList = {
	HomeTab: undefined;
	ExploreTab: undefined;
	WishlistTab: undefined;
	AccountTab: undefined;
};

export type MainScreenProps<T extends keyof RootTabsParamList> = BottomTabScreenProps<
	RootTabsParamList,
	T
>;

export type RootStackParamList = {
	Home: undefined;
	HomeProduct: { productSlug: string };
	HomeProductReview: { productReviews: ProductReviewItem[] };
};

export type RootStackProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
	RootStackParamList,
	T
>;

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
