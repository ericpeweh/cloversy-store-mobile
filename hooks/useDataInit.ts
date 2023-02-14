// Dependencies
import axios from "axios";

// Api
import { BASE_URL } from "../api";

// Hooks
import { useAuth0 } from "react-native-auth0";
import { useEffect } from "react";
import useDispatch from "./useDispatch";
import useSelector from "./useSelector";

// Types
import { Product, User } from "../interfaces";

// Actions
import { setCredentials, setAuthStatus } from "../store/slices/authSlice";
import { setUserWishlist } from "../store/slices/globalSlice";

const useDataInit = () => {
	const authToken = useSelector(state => state.auth.token);
	const dispatch = useDispatch();
	const { getCredentials, user, isLoading, authorize } = useAuth0();

	// Set user data to auth store slice
	useEffect(() => {
		if (!isLoading && user) {
			const getToken = async () => {
				let token = "";

				try {
					const credentials = await getCredentials();
					token = credentials.accessToken;
				} catch (error) {
					console.error(error);
				}

				dispatch(setAuthStatus("loading"));

				try {
					const res = await axios.get<
						void,
						{ data: { data: { user: User } }; status: "success" | "error" }
					>(`${BASE_URL}/auth`, {
						headers: {
							Authorization: `Bearer ${token}`
						},
						withCredentials: true
					});

					const userData = res.data.data.user;

					dispatch(
						setCredentials({
							isAuth: true,
							token,
							email: user?.email ?? "",
							email_verified: user?.email_verified ?? false,
							full_name: userData?.full_name ?? "",
							contact: userData?.contact ?? "",
							profile_picture: userData?.profile_picture ?? "",
							birth_date: userData?.birth_date ?? "",
							status: "fulfilled"
						})
					);
				} catch (error) {
					console.dir(error);
				}
			};
			getToken();
		}
	}, [dispatch, user]);

	// useEffect(() => {
	// 	if (!user && !isLoading) {
	// 		dispatch(setAuthStatus("fulfilled"));
	// 	}
	// }, [dispatch,  isLoading]);

	// Set user wishlist to global store slice
	useEffect(() => {
		if (user && authToken) {
			const getUserWishlist = async () => {
				const res = await axios.get<
					void,
					{ data: { data: { wishlist: Product[] } }; status: "success" | "error" }
				>(`${BASE_URL}/account/wishlist`, {
					headers: {
						Authorization: `Bearer ${authToken}`
					},
					withCredentials: true
				});

				const wishlist = res.data.data.wishlist.map(item => item.id);

				dispatch(setUserWishlist(wishlist));
			};
			getUserWishlist();
		}
	}, [authToken, dispatch, user]);

	// Redirect user to login if not logged in
	useEffect(() => {
		const loginHandler = async () => await authorize({});

		if (!isLoading && !user) {
			loginHandler();
		}
	}, [isLoading, user]);

	return { isLoading, isAuthenticated: Boolean(user) };
};

export default useDataInit;
