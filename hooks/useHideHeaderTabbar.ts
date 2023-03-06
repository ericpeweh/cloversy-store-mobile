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
			const hideParentNavAndTabbar = () => {
				navigation?.getParent()?.setOptions({
					headerShown: false,
					tabBarStyle: { display: "none" }
				});
			};

			const showParentNavAndTabbar = () =>
				navigation?.getParent()?.setOptions({
					headerShown: true,
					tabBarStyle: { display: "flex", height: 56, paddingTop: 5, paddingBottom: 7 }
				});

			navigation.addListener("focus", hideParentNavAndTabbar);
			navigation.addListener("beforeRemove", showParentNavAndTabbar);

			// Cleanup function (revert header & tabbar style changes)
			return () => {
				navigation.removeListener("focus", hideParentNavAndTabbar);
				navigation.removeListener("beforeRemove", showParentNavAndTabbar);
			};
		}, [navigation]),
		[isFocused]
	);
};

export default useHideHeaderTabbar;
