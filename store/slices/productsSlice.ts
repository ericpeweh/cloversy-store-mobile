// Dependencies
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductsSortValues } from "../../interfaces";

interface ProductsState {
	isInitialized: boolean;
	brandFilter: number;
	priceFilter: [number, number];
	priceRange: [number, number];
	products: Product[];
	sortBy: ProductsSortValues;
	currentPage: number;
	page: number;
	searchQuery: string;
}

const initialState: ProductsState = {
	brandFilter: -1,
	priceFilter: [-1, -1],
	priceRange: [-1, -1],
	isInitialized: false,
	products: [],
	sortBy: "id",
	currentPage: 0,
	page: 1,
	searchQuery: ""
};

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		resetFilter: (state: ProductsState) => {
			state.brandFilter = -1;
			state.priceFilter = state.priceRange;
			state.sortBy = "id";
		},
		setPriceFilter: (
			state: ProductsState,
			{ payload: newPriceFilter }: PayloadAction<[number, number]>
		) => {
			state.priceFilter = newPriceFilter;

			// Reset pagination
			state.products = [];
			state.currentPage = 0;
			state.page = 1;
		},
		setPriceRange: (
			state: ProductsState,
			{ payload: priceRange }: PayloadAction<[number, number]>
		) => {
			state.priceRange = priceRange;
			state.isInitialized = true;
		},
		changeBrandFilter: (
			state: ProductsState,
			{ payload: newBrandFilter }: PayloadAction<number>
		) => {
			state.brandFilter = newBrandFilter;

			// Reset pagination
			state.products = [];
			state.currentPage = 0;
			state.page = 1;
		},
		pushToProducts: (state: ProductsState, { payload: products }: PayloadAction<Product[]>) => {
			state.products = [...state.products, ...products];
		},
		resetProducts: (state: ProductsState) => {
			state.products = [];
		},
		changeSortByFilter: (
			state: ProductsState,
			{ payload: newFilter }: PayloadAction<ProductsSortValues>
		) => {
			state.sortBy = newFilter;

			// Reset pagination
			state.products = [];
			state.currentPage = 0;
			state.page = 1;
		},
		setCurrentPage: (state: ProductsState, { payload: newCurrentPage }: PayloadAction<number>) => {
			state.currentPage = newCurrentPage;
		},
		setPage: (state: ProductsState, { payload: newPage }: PayloadAction<number>) => {
			state.page = newPage;
		},
		setSearchQuery: (state: ProductsState, { payload: newSearchQuery }: PayloadAction<string>) => {
			state.searchQuery = newSearchQuery;
		},
		applyProductFilter: (
			state: ProductsState,
			{
				payload: { priceFilter, brandFilter, sortBy }
			}: PayloadAction<{
				priceFilter: [number, number];
				brandFilter: number;
				sortBy: ProductsSortValues;
			}>
		) => {
			state.priceFilter = priceFilter;
			state.brandFilter = brandFilter;
			state.sortBy = sortBy;
		}
	}
});

export const {
	changeBrandFilter,
	setPriceFilter,
	setPriceRange,
	resetFilter,
	pushToProducts,
	changeSortByFilter,
	resetProducts,
	setCurrentPage,
	setPage,
	setSearchQuery,
	applyProductFilter
} = productsSlice.actions;

export default productsSlice.reducer;
