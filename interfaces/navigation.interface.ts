// Dependencies
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps, NativeStackNavigationProp } from "@react-navigation/native-stack";

// Types
import { ProductReviewItem } from "./product.interface";
import { CheckoutFormValues } from "./cart.interface";
import { Address, Voucher } from "./account.interface";
import { ClientTransactionDetails } from "./transaction.interface";

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

interface PaymentScreenProps {
	transactionId: string;
	order_id?: string;
	result?: "success" | "failure";
}

interface ProductReviewProps {
	productReviews: ProductReviewItem[];
}

export type RootStackParamList = {
	Home: undefined;
	HomeProduct: ProductScreenProps;
	HomeProductReview: ProductReviewProps;
	HomeCart: undefined;
	HomeCheckout: { state?: CheckoutFormValues; appliedVoucher?: Voucher | null };
	HomeCheckoutAddressPicker: { state: CheckoutFormValues };
	HomeCheckoutShippingPicker: { state: CheckoutFormValues };
	HomeCheckoutAddAddress: { state: CheckoutFormValues };
	HomeCheckoutPaymentPicker: { state: CheckoutFormValues };
	HomeCheckoutEditOrderInfo: { state: CheckoutFormValues };
	HomeCheckoutVoucherPicker: { state: CheckoutFormValues };
	HomeCheckoutSuccess: { transaction: ClientTransactionDetails };
	HomePayment: PaymentScreenProps;
	Explore: undefined;
	ExploreProduct: ProductScreenProps;
	ExploreProductReview: ProductReviewProps;
	ExploreProductFilter: undefined;
	Wishlist: undefined;
	WishlistProduct: ProductScreenProps;
	WishlistProductReview: ProductReviewProps;
	AccountDashboard: undefined;
	AccountMyOrders: undefined;
	AccountMyVouchers: undefined;
	AccounPayment: PaymentScreenProps;
	AccountOrderDetails: { transactionId: string };
	AccountAddress: undefined;
	AccountAddAddress: undefined;
	AccountEditAddress: { addressData: Address };
	AccountProduct: ProductScreenProps;
	AccountDetails: undefined;
	AccountCreateReview: { transactionId: string };
	AccountLastSeenProducts: undefined;
	AccountLiveChat: undefined;
};

export type CombinedParamList = RootTabsParamList & RootStackParamList;

export type RootStackProps<T extends keyof CombinedParamList> = NativeStackScreenProps<
	CombinedParamList,
	T
>;

export type RootStackNavigationProp = NativeStackNavigationProp<CombinedParamList>;
