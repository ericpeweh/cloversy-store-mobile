// Dependencies
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

const useCustomFonts = () => {
	const [fontsLoaded] = useFonts({
		"Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
		"Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
		"Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
		"Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf")
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	return { fontsLoaded, onLayoutRootView };
};

export default useCustomFonts;
