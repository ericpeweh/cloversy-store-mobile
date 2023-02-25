// Dependencies
import API from "./index";

// Types
import { Province, City, Subdistrict, ResponseBody, ShippingCost } from "../interfaces";

const dataApi = API.injectEndpoints({
	endpoints: build => ({
		getAllProvinces: build.query<ResponseBody<{ provinces: Province[] }>, boolean>({
			query: () => `data/province`,
			providesTags: ["Provinces"]
		}),
		getCitiesByProvinceId: build.query<ResponseBody<{ cities: City[] }>, number>({
			query: provinceId => `data/city?province=${provinceId}`,
			providesTags: ["Cities"]
		}),
		getSubdistrictsByCityId: build.query<ResponseBody<{ subdistricts: Subdistrict[] }>, number>({
			query: cityId => `data/subdistrict?city=${cityId}`,
			providesTags: ["Subdistricts"]
		}),
		getShippingCostByAddressId: build.query<ResponseBody<{ costs: ShippingCost[] }>, number>({
			query: addressId => ({
				url: `data/cost`,
				method: "POST",
				body: {
					addressId
				}
			}),
			providesTags: ["Shipping"]
		})
	}),
	overrideExisting: false
});

export const {
	useGetAllProvincesQuery,
	useGetCitiesByProvinceIdQuery,
	useGetSubdistrictsByCityIdQuery,
	useGetShippingCostByAddressIdQuery
} = dataApi;

export default dataApi;
