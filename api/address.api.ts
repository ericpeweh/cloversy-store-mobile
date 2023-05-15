// Dependencies
import API from "./index";

// Types
import { Address, ResponseBody } from "../interfaces";

const addressApi = API.injectEndpoints({
	endpoints: build => ({
		getAllAddresses: build.query<ResponseBody<{ address: Address[] }>, boolean>({
			query: () => `account/address`,
			providesTags: ["Addresses"]
		}),
		createAddress: build.mutation<ResponseBody<{ newAddress: Address }>, Partial<Address>>({
			query: newAddressData => ({
				url: "account/address",
				method: "POST",
				body: newAddressData
			}),
			invalidatesTags: ["Addresses"]
		}),
		updateAddress: build.mutation<ResponseBody<{ updatedAddress: Address }>, Partial<Address>>({
			query: ({ id: addressId, ...updatedAddressData }) => ({
				url: `account/address/${addressId}`,
				method: "PUT",
				body: updatedAddressData
			}),
			invalidatesTags: ["Addresses"]
		}),
		deleteAddress: build.mutation<ResponseBody<{ deletedAddress: Address }>, number>({
			query: addressId => ({
				url: `account/address/${addressId}`,
				method: "DELETE"
			}),
			invalidatesTags: ["Addresses"]
		})
	}),
	overrideExisting: false
});

export const {
	useGetAllAddressesQuery,
	useCreateAddressMutation,
	useUpdateAddressMutation,
	useDeleteAddressMutation
} = addressApi;

export default addressApi;
