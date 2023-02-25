// Dependencies
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps, NativeStackNavigationProp } from "@react-navigation/native-stack";

// Types
import { ProductReviewItem } from "./product.interface";
import { CheckoutFormValues } from "./cart.interface";
import { Voucher } from "./account.interface";

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

interface ProductScreenProps {
	productSlug: string;
	runHeaderFn?: boolean;
	runTabbarFn?: boolean;
}

interface ProductReviewProps {
	productReviews: ProductReviewItem[];
}

export type RootStackParamList = {
	Home: undefined;
	HomeProduct: ProductScreenProps;
	HomeProductReview: ProductReviewProps;
	HomeCart: undefined;
	HomeCheckout: { state?: CheckoutFormValues; appliedVoucher?: Voucher };
	HomeCheckoutAddressPicker: { state: CheckoutFormValues };
	HomeCheckoutShippingPicker: { state: CheckoutFormValues };
	HomeCheckoutAddAddress: { state: CheckoutFormValues };
	HomeCheckoutPaymentPicker: { state: CheckoutFormValues };
	HomeCheckoutEditOrderInfo: { state: CheckoutFormValues };
	HomeCheckoutVoucherPicker: { state: CheckoutFormValues };
	Explore: undefined;
	ExploreProduct: ProductScreenProps;
	ExploreProductReview: ProductReviewProps;
	ExploreProductFilter: undefined;
	Wishlist: undefined;
	WishlistProduct: ProductScreenProps;
	WishlistProductReview: ProductReviewProps;
};

export type RootStackProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
	RootStackParamList,
	T
>;

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
