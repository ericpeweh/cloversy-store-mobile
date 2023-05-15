// Dependencies
import API from "./index";

// Types
import { Brand, ResponseBody } from "../interfaces";

const brandApi = API.injectEndpoints({
	endpoints: build => ({
		getBrands: build.query<ResponseBody<{ brands: Brand[] }>, void>({
			query: () => `brands`,
			providesTags: ["Brands"]
		})
	}),
	overrideExisting: false
});

export const { useGetBrandsQuery } = brandApi;

export default brandApi;
