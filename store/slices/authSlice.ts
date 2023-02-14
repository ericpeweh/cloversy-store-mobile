// Dependencies
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UpdateAccountDetailsBody } from "../../interfaces";

interface AuthState {
	isAuth: boolean;
	token: string;
	full_name: string;
	email: string;
	profile_picture: string;
	email_verified: boolean;
	contact: string | null;
	birth_date: string | null;
	status: string;
}

const initialState: AuthState = {
	isAuth: false,
	token: "",
	full_name: "",
	email: "",
	profile_picture: "",
	email_verified: false,
	contact: "",
	birth_date: "",
	status: "idle"
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (
			state,
			{
				payload: {
					isAuth,
					token,
					full_name,
					email,
					profile_picture,
					email_verified,
					contact,
					birth_date,
					status
				}
			}: PayloadAction<AuthState>
		) => {
			state.isAuth = isAuth;
			state.token = token;
			state.full_name = full_name;
			state.email = email;
			state.profile_picture = profile_picture;
			state.email_verified = email_verified;
			state.contact = contact;
			state.birth_date = birth_date;
			state.status = status;
		},
		setAuthStatus: (state, { payload }: PayloadAction<string>) => {
			state.status = payload;
		},
		setUserDetails: (
			state,
			{ payload: { full_name, contact, birth_date } }: PayloadAction<UpdateAccountDetailsBody>
		) => {
			state.full_name = full_name;
			state.contact = contact;
			state.birth_date = birth_date;
		},
		setUserProfilePicture: (
			state,
			{ payload: { profile_picture } }: PayloadAction<{ profile_picture: string }>
		) => {
			state.profile_picture = profile_picture;
		}
	}
});

export const { setCredentials, setUserDetails, setUserProfilePicture, setAuthStatus } =
	authSlice.actions;

export default authSlice.reducer;
