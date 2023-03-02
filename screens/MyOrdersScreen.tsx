// Dependencies
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TabView, TabBar, SceneRendererProps, NavigationState } from "react-native-tab-view";

// Types
import { RootStackProps, TransactionStatus } from "../interfaces";

// Actions
import { setOrdersTabIndex } from "../store/slices/globalSlice";

// Hooks
import useSelector from "../hooks/useSelector";
import useHideHeaderTabbar from "../hooks/useHideHeaderTabbar";
import useDispatch from "../hooks/useDispatch";
import useDimensions from "../hooks/useDimensions";

// Components
import { Text, useTheme } from "native-base";
import OrdersList from "../components/OrdersList/OrdersList";

type TabItemType = {
	key: TransactionStatus | "all";
	title: string;
};

const _renderScene = ({
	route
}: SceneRendererProps & {
	route: TabItemType;
}) => {
	return <OrdersList orderStatus={route.key} />;
};

const _renderTabBar = (
	props: SceneRendererProps & {
		navigationState: NavigationState<TabItemType>;
	}
) => {
	const { colors } = useTheme();

	return (
		<TabBar
			{...props}
			style={{ backgroundColor: "white", height: 45 }}
			renderLabel={({ route, focused }) => (
				<Text color={focused ? "primary.400" : "black"} fontSize="14px">
					{route.title}
				</Text>
			)}
			scrollEnabled={true}
			tabStyle={{ width: 115 }}
			indicatorStyle={{ backgroundColor: colors.primary[400] }}
			pressColor={colors.gray[200]}
		/>
	);
};

const MyOrdersScreen = ({ navigation }: RootStackProps<"AccountMyOrders">) => {
	const dispatch = useDispatch();
	const { window } = useDimensions();

	const ordersTabIndex = useSelector(state => state.global.ordersTabIndex);
	const [routes] = useState<TabItemType[]>([
		{ key: "all", title: "All Orders" },
		{ key: "pending", title: "Pending" },
		{ key: "process", title: "Processed" },
		{ key: "sent", title: "Shipped" },
		{ key: "success", title: "Success" },
		{ key: "cancel", title: "Canceled" }
	]);

	// Hide parent header and tabbar on mount
	useHideHeaderTabbar(navigation);

	const tabPanelChangeHandler = (newValue: number) => {
		dispatch(setOrdersTabIndex(newValue));
	};

	return (
		<TabView
			style={styles.myOrdersScreenContainer}
			navigationState={{ index: ordersTabIndex, routes }}
			onIndexChange={tabPanelChangeHandler}
			initialLayout={{ width: window.width }}
			renderScene={_renderScene}
			renderTabBar={_renderTabBar}
			sceneContainerStyle={{ marginTop: 10 }}
			lazy={true}
		/>
	);
};

export default MyOrdersScreen;

const styles = StyleSheet.create({
	myOrdersScreenContainer: {
		flex: 1,
		backgroundColor: "#f0f0f0"
	}
});
