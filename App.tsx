// Dependencies
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { useAuth0, Auth0Provider } from "react-native-auth0";
import { AUTH0_DOMAIN, AUTH0_CLIENTID } from "@env";

// Hooks
import useCustomFonts from "./hooks/useCustomFonts";

// Themes
import mainTheme from "./themes/mainTheme";

// Navigations
import Router from "./routers";

// Components
import { StyleSheet, Text, View } from "react-native";

const App = () => {
	const { fontsLoaded, onLayoutRootView } = useCustomFonts();

	if (!fontsLoaded) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}

	return (
		<Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENTID}>
			<NativeBaseProvider theme={mainTheme}>
				<StatusBar style="dark" backgroundColor="#fff" />
				<View onLayout={onLayoutRootView} style={styles.mainContainer}>
					<Router />
				</View>
			</NativeBaseProvider>
		</Auth0Provider>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1
	}
});

export default App;
