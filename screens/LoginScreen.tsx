// Dependencies
import React from "react";

// Hooks
import { useAuth0 } from "react-native-auth0";

// Images
const LoginImage = require("../assets/images/login.png");

// Components
import Button from "../components/Button/Button";
import { Image, Text, View } from "native-base";
import HeaderLogo from "../components/HeaderLogo/HeaderLogo";
import { SafeAreaView } from "react-native-safe-area-context";
import useSelector from "../hooks/useSelector";

const LoginScreen = () => {
	const autStatus = useSelector(state => state.auth.status);
	const { authorize, error, isLoading } = useAuth0();

	const loginHandler = async () => {
		await authorize({ audience: "cloversy-store-api" }, { customScheme: "cloversy-store-auth0" });
	};

	return (
		<SafeAreaView>
			<View justifyContent="space-between" alignItems="center" height="100%" width="100%">
				<View mt={4}>
					<HeaderLogo />
				</View>
				<Image source={LoginImage} alt="Login" height={300} resizeMode="contain" mt={16} />
				<View width="100%" p="6">
					<Text textAlign="center" mb={2} fontSize={13}>
						You must be authenticated to continue
					</Text>
					<Button
						alignSelf="stretch"
						onPress={loginHandler}
						isLoading={autStatus === "loading"}
						py={2}
					>
						<Text fontWeight="700" fontSize={16} color="white">
							{error ? "Continue" : "Sign In / Up"}
						</Text>
					</Button>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default LoginScreen;
