// Dependencies
import API from "./index";

// Types
import {
	Product,
	ResponseWithPagination,
	GetProductsQuery,
	SearchProductsQuery,
	ResponseBody,
	GetSingleProductQuery
} from "../interfaces";

const productApi = API.injectEndpoints({
	endpoints: build => ({
		getBestSellerProducts: build.query<
			ResponseWithPagination<{ products: Product[]; priceRange: [number, number] }>,
			null
		>({
			query: () => {
				const params = new URLSearchParams({
					page: "1",
					q: "",
					sortBy: "popularity",
					brand: "",
					price: ""
				});

				return `products?${params.toString()}`;
			},
			providesTags: ["Best Seller Products"]
		}),
		getProducts: build.query<
			ResponseWithPagination<{ products: Product[]; priceRange: [number, number] }>,
			GetProductsQuery
		>({
			query: ({ page, q, sortBy, brandFilter, priceFilter }) => {
				const params = new URLSearchParams({
					page: page.toString(),
					q,
					sortBy: sortBy === "default" ? "" : sortBy,
					brand: brandFilter === -1 ? "" : brandFilter + "",
					price: priceFilter[0] !== -1 && priceFilter[1] !== -1 ? priceFilter + "" : ""
				});

				return `products?${params.toString()}`;
			},
			providesTags: ["Products"]
		}),
		getSingleProduct: build.query<ResponseBody<{ product: Product }>, GetSingleProductQuery>({
			query: ({ productSlug }) => {
				return `products/${productSlug}`;
			},
			providesTags: ["Product"]
		}),
		searchProducts: build.query<
			ResponseWithPagination<{ products: Product[] }>,
			SearchProductsQuery
		>({
			query: ({ q: searchQuery }) => `products?q=${searchQuery}&count=4&page=1`
		})
	}),
	overrideExisting: false
});

export const {
	useGetProductsQuery,
	useGetSingleProductQuery,
	useSearchProductsQuery,
	useGetBestSellerProductsQuery
} = productApi;

export default productApi;
