// Dependencies
import API from "./index";

// Types
import { ResponseBody, Product } from "../interfaces";

const activityApi = API.injectEndpoints({
	endpoints: build => ({
		getUserLastSeenProducts: build.query<ResponseBody<{ products: Product[] }>, boolean>({
			query: () => `activity/product-last-seen`,
			providesTags: ["Last Seen Products"]
		}),
		trackProductSeen: build.mutation<ResponseBody<{ lastSeenProductId: number }>, number>({
			query: productId => ({
				url: "activity/product-last-seen",
				body: { productId },
				method: "POST"
			}),
			invalidatesTags: ["Last Seen Products"]
		})
	}),
	overrideExisting: false
});

export const { useGetUserLastSeenProductsQuery, useTrackProductSeenMutation } = activityApi;

export default activityApi;
