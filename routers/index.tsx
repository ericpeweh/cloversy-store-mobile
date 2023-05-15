// Dependencies
import { useRef, useState } from "react";
import {
	LinkingOptions,
	NavigationContainer,
	NavigationContainerRef
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Linking from "expo-linking";
import analytics from "@react-native-firebase/analytics";
import * as Notifications from "expo-notifications";

// Icons
import { AntDesign, Feather } from "@expo/vector-icons";

// Hooks
import useWishlist from "../hooks/useWishlist";
import useSelector from "../hooks/useSelector";

// Types
import { RootStackParamList, RootTabsParamList } from "../interfaces";

// Components
import { Badge, Icon, Text, useTheme, VStack } from "native-base";

// Navigations
import AccountStack from "./AccountStack";
import HomeStack from "./HomeStack";
import ExploreStack from "./ExploreStack";
import WishlistStack from "./WishlistStack";

// Screens
import IconButton from "../components/IconButton/IconButton";
import HeaderLogo from "../components/HeaderLogo/HeaderLogo";
import ConfirmModal from "../components/ConfirmModal/ConfirmModal";

const Tabs = createBottomTabNavigator<RootTabsParamList>();
const prefix = Linking.createURL("/");
const productScreensName = ["HomeProduct", "ExploreProduct", "WishlistProduct", "AccountProduct"];

const Router = () => {
	const routeNameRef = useRef<string>();
	const navigationRef =
		useRef<NavigationContainerRef<RootStackParamList & RootTabsParamList>>(null);

	const linking: LinkingOptions<RootStackParamList & RootTabsParamList> = {
		prefixes: [prefix, "https://cloversy.id", "https://www.cloversy.id"],
		config: {
			screens: {
				HomeTab: {
					screens: {
						Home: "home",
						HomeProduct: "products/:productSlug",
						HomePayment: "orders/payment"
					}
				},
				AccountTab: {
					screens: {
						AccountLiveChat: "account/livechat",
						AccountCreateReview: "orders/:transactionId/review",
						AccountOrderDetails: "orders/:transactionId/details"
					}
				}
			}
		},
		getInitialURL: async (): Promise<string> => {
			// Check if app opened from a deep link
			const url = await Linking.getInitialURL();

			if (url !== null) {
				return url;
			}

			// Get deeplinkUrl from push notifications
			const response = await Notifications.getLastNotificationResponseAsync();
			const deeplinkUrl = response?.notification.request.content.data?.deeplinkUrl;

			return (deeplinkUrl as string) || "";
		},
		subscribe: listener => {
			const onReceiveURL = ({ url }: { url: string }) => listener(url);

			// Listen to incoming links from deep linking
			const urlListener = Linking.addEventListener("url", onReceiveURL);

			// Listen to push notifications
			const subscription = Notifications.addNotificationResponseReceivedListener(response => {
				const deeplinkUrl = response.notification.request.content.data?.deeplinkUrl;

				listener((deeplinkUrl as string) || "home");
			});

			return () => {
				// Cleanup all event listeners
				urlListener.remove();
				subscription.remove();
			};
		}
	};

	const cartItems = useSelector(state => state.global.userCart);
	const cartQuantityCount = cartItems.reduce((totalQty, item) => (totalQty += item.quantity), 0);

	const [isEmptyWishlistModalOpen, setIsEmptyWishlistModalOpen] = useState(false);
	const { colors } = useTheme();

	const { emptyWishlistHandler, isEmptyWishlistLoading } = useWishlist();

	const clearWishlistHandler = () => {
		if (!isEmptyWishlistLoading) {
			emptyWishlistHandler();
		}
	};

	return (
		<NavigationContainer
			ref={navigationRef}
			linking={linking}
			onReady={() => {
				routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
			}}
			onStateChange={async () => {
				const previousRouteName = routeNameRef.current;
				const currentRoute = navigationRef.current?.getCurrentRoute();
				const currentRouteName = currentRoute?.name || "";
				const currentRouteParams = currentRoute?.params as { productSlug?: string };

				const isProductRoute = productScreensName.includes(currentRouteName);

				if (previousRouteName !== currentRouteName) {
					try {
						await analytics().logScreenView({
							screen_name: isProductRoute
								? `${currentRouteName}/${currentRouteParams?.productSlug || "invalid-product"}`
								: currentRouteName,
							screen_class: currentRouteName
						});
					} catch (error) {
						console.log("Analytics error: ", error);
					}
				}

				routeNameRef.current = currentRouteName;
			}}
		>
			<ConfirmModal
				title="Clear wishlist"
				description="All your products in wishlist will be deleted, this action can't be undone, are you sure?"
				isOpen={isEmptyWishlistModalOpen}
				onConfirm={clearWishlistHandler}
				onClose={() => setIsEmptyWishlistModalOpen(false)}
			/>
			<Tabs.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ color: iconColor }) => {
						const iconSize = 24;
						let iconName: keyof typeof AntDesign.glyphMap = "question";

						switch (route.name) {
							case "HomeTab":
								iconName = "home";
								break;
							case "ExploreTab":
								iconName = "search1";
								break;
							case "WishlistTab":
								iconName = "hearto";
								break;
							case "AccountTab":
								iconName = "user";
								break;
						}

						return <AntDesign name={iconName} size={iconSize} color={iconColor} />;
					},
					headerStyle: { borderBottomWidth: 1, borderBottomColor: colors.gray[100] },
					headerRightContainerStyle: { paddingRight: 15 },
					headerLeftContainerStyle: { marginLeft: 15 },
					headerTitleStyle: {
						display: "none"
					},
					headerLeft: () => <HeaderLogo />,
					tabBarActiveTintColor: colors.primary[400],
					tabBarInactiveTintColor: colors.gray[400],
					tabBarShowLabel: true,
					tabBarStyle: { height: 56, paddingTop: 5, paddingBottom: 7 }
				})}
			>
				<Tabs.Screen
					name="HomeTab"
					component={HomeStack}
					options={({ navigation }) => ({
						tabBarLabel: "Home",
						headerRight: () => (
							<VStack>
								<Badge
									rounded="full"
									mb={-5}
									mr={-0.7}
									bg="primary.400"
									zIndex={1}
									py={0}
									px={1.5}
									alignSelf="flex-end"
									_text={{ fontSize: 10, color: "white" }}
								>
									{cartQuantityCount}
								</Badge>
								<IconButton
									onPress={() => navigation.navigate("HomeCart")}
									icon={<Icon as={Feather} name="shopping-bag" />}
								/>
							</VStack>
						)
					})}
				/>
				<Tabs.Screen
					name="ExploreTab"
					component={ExploreStack}
					options={{ headerShown: false, tabBarLabel: "Explore" }}
				/>
				<Tabs.Screen
					name="WishlistTab"
					component={WishlistStack}
					options={{
						headerLeft: () => (
							<Text fontWeight="600" fontSize="18px" letterSpacing={0.5}>
								Wishlist
							</Text>
						),
						headerRight: () => (
							<IconButton
								onPress={() => {
									setIsEmptyWishlistModalOpen(true);
								}}
								icon={<Icon as={Feather} name={isEmptyWishlistLoading ? "loader" : "trash-2"} />}
							/>
						),
						tabBarLabel: "Wishlist"
					}}
				/>
				<Tabs.Screen
					name="AccountTab"
					component={AccountStack}
					options={{
						headerLeft: () => (
							<Text fontWeight="600" fontSize="18px" letterSpacing={0.5}>
								My Account
							</Text>
						),
						tabBarLabel: "Account"
					}}
				/>
			</Tabs.Navigator>
		</NavigationContainer>
	);
};

export default Router;
