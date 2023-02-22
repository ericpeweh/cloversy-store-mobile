// Dependencies
import API from "./index";

// Types
import { Product, ResponseBody, Wishlist } from "../interfaces";

const wishlistApi = API.injectEndpoints({
	endpoints: build => ({
		getWishlist: build.query<ResponseBody<{ wishlist: Product[] }>, boolean>({
			query: () => `account/wishlist`,
			providesTags: ["Wishlist"]
		}),
		addProductToWishlist: build.mutation<ResponseBody<{ wishlist: Wishlist[] }>, number>({
			query: productId => ({
				url: `account/wishlist/${productId}`,
				method: "POST"
			}),
			invalidatesTags: ["Wishlist"]
		}),
		deleteProductFromWishlist: build.mutation<ResponseBody<{ wishlist: Wishlist[] }>, number>({
			query: productId => ({
				url: `account/wishlist/${productId}`,
				method: "DELETE"
			}),
			invalidatesTags: ["Wishlist"]
		}),
		emptyWishlist: build.mutation<ResponseBody<{ wishlist: Wishlist[] }>, void>({
			query: () => ({
				url: `account/wishlist`,
				method: "DELETE"
			}),
			invalidatesTags: ["Wishlist"]
		})
	}),
	overrideExisting: false
});

export const {
	useGetWishlistQuery,
	useAddProductToWishlistMutation,
	useDeleteProductFromWishlistMutation,
	useEmptyWishlistMutation
} = wishlistApi;

export default wishlistApi;
