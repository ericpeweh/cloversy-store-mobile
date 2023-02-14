// Dependencies
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Types
import { CartItemDetails, Product } from "../../interfaces";

interface GlobalState {
	cartSnackbarData: Partial<CartItemDetails> | null;
	showCartSnackbar: boolean;
	showSearchModal: boolean;
	showCartModal: boolean;
	showProductView: boolean;
	productViewData: Product | null;
	userWishlist: number[];
	userCart: CartItemDetails[];
	canSyncUserCart: boolean;
	ordersTabIndex: number;
}

const initialState: GlobalState = {
	cartSnackbarData: null,
	showCartSnackbar: false,
	showSearchModal: false,
	showCartModal: false,
	showProductView: false,
	productViewData: null,
	userWishlist: [],
	userCart: [],
	canSyncUserCart: false,
	ordersTabIndex: 0
};

const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		openCartSnackbar: (state, { payload }: PayloadAction<Partial<CartItemDetails>>) => {
			state.showCartSnackbar = true;
			state.cartSnackbarData = payload;
		},
		closeCartSnackbar: state => {
			state.showCartSnackbar = false;
		},
		resetCartSnackbarData: state => {
			state.cartSnackbarData = null;
		},
		openSearchDrawer: state => {
			state.showSearchModal = true;
		},
		closeSearchDrawer: state => {
			state.showSearchModal = false;
		},
		openCartDrawer: state => {
			state.showCartModal = true;
		},
		closeCartDrawer: state => {
			state.showCartModal = false;
		},
		openProductView: (state, { payload }: PayloadAction<Product>) => {
			state.showProductView = true;
			state.productViewData = payload;
		},
		closeProductView: state => {
			state.showProductView = false;
		},
		setUserWishlist: (state, { payload }: PayloadAction<number[]>) => {
			state.userWishlist = payload;
		},
		setUserCart: (
			state,
			{ payload }: PayloadAction<{ cart: CartItemDetails[]; sync?: boolean }>
		) => {
			state.userCart = payload.cart;
			state.canSyncUserCart = payload.sync || state.canSyncUserCart || false;
		},
		changeCartSyncStatus: (state, { payload }: PayloadAction<boolean>) => {
			state.canSyncUserCart = payload;
		},
		updateUserCartItem: (state, { payload }: PayloadAction<CartItemDetails>) => {
			state.userCart = state.userCart.map(item => (item.id === payload.id ? payload : item));
		},
		setOrdersTabIndex: (state, { payload }: PayloadAction<number>) => {
			state.ordersTabIndex = payload;
		}
	}
});

export const {
	openCartSnackbar,
	closeCartSnackbar,
	resetCartSnackbarData,
	openSearchDrawer,
	closeSearchDrawer,
	openCartDrawer,
	closeCartDrawer,
	openProductView,
	closeProductView,
	setUserWishlist,
	setUserCart,
	updateUserCartItem,
	changeCartSyncStatus,
	setOrdersTabIndex
} = globalSlice.actions;

export default globalSlice.reducer;
