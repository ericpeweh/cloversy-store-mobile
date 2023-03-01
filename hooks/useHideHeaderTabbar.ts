// Hooks
import { useCallback, useLayoutEffect } from "react";

// Hooks
import { useIsFocused } from "@react-navigation/native";

// Types
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CombinedParamList } from "../interfaces";

const useHideHeaderTabbar = (
	navigation: NativeStackNavigationProp<CombinedParamList, keyof CombinedParamList>
) => {
	const isFocused = useIsFocused();

	// Hide parent header and tabbar on mount
	useLayoutEffect(
		useCallback(() => {
			navigation?.getParent()?.setOptions({
				headerShown: false,
				tabBarStyle: { display: "none" }
			});

			// Cleanup function (revert header & tabbar style changes)
			return () => {
				navigation?.getParent()?.setOptions({
					headerShown: true,
					tabBarStyle: { display: "flex", height: 56, paddingTop: 5, paddingBottom: 7 }
				});
			};
		}, []),
		[isFocused]
	);
};

export default useHideHeaderTabbar;
