// Dependencies
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { Auth0Provider } from "react-native-auth0";
import { Provider as ReduxProvider } from "react-redux";

// Configs
import reduxStore from "./store";

// Hooks
import useCustomFonts from "./hooks/useCustomFonts";

// Themes
import mainTheme from "./themes/mainTheme";

// Navigations
import Router from "./routers";

// Components
import { StyleSheet, Text, View } from "react-native";
import AppWrapper from "./components/AppWrapper/AppWrapper";

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
		<Auth0Provider domain="cloversyid.jp.auth0.com" clientId="DNcAH2TH3pUe0KVTxRdjY3ElAGD6zzZX">
			<NativeBaseProvider theme={mainTheme}>
				<ReduxProvider store={reduxStore}>
					<StatusBar style="dark" backgroundColor="#fff" />
					<View onLayout={onLayoutRootView} style={styles.mainContainer}>
						<AppWrapper>
							<Router />
						</AppWrapper>
					</View>
				</ReduxProvider>
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
