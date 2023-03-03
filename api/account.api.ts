// Dependencies
import API from "./index";

// Types
import { UpdateAccountDetailsBody, ResponseBody, User } from "../interfaces";

const accountApi = API.injectEndpoints({
	endpoints: build => ({
		updateAccountDetails: build.mutation<
			ResponseBody<{ updatedAccountDetails: User }>,
			Partial<UpdateAccountDetailsBody>
		>({
			query: updatedAccountDetails => ({
				url: `account/details`,
				method: "PATCH",
				body: updatedAccountDetails
			})
		}),
		updateProfilePicture: build.mutation<ResponseBody<{ updatedAccountDetails: User }>, FormData>({
			query: newProfilePicture => ({
				url: `account/details/picture`,
				method: "PUT",
				body: newProfilePicture
			})
		}),
		deleteProfilePicture: build.mutation<ResponseBody<{ updatedAccountDetails: User }>, void>({
			query: () => ({
				url: `account/details/picture`,
				method: "DELETE"
			})
		}),
		resetPassword: build.mutation<ResponseBody<{ updatedAccountDetails: User }>, void>({
			query: () => ({
				url: `auth/resetpassword`,
				method: "POST"
			})
		})
	}),
	overrideExisting: false
});

export const {
	useUpdateAccountDetailsMutation,
	useUpdateProfilePictureMutation,
	useDeleteProfilePictureMutation,
	useResetPasswordMutation
} = accountApi;

export default accountApi;
