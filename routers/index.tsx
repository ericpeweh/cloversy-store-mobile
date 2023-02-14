// Dependencies
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Icons
import { AntDesign, Feather } from "@expo/vector-icons";

// Hooks
import { Icon, useTheme } from "native-base";

// Types
import { RootTabsParamList } from "../interfaces/navigation.interface";

// Screens
import HomeScreen from "../screens/HomeScreen";
import ExploreScreen from "../screens/ExploreScreen";
import WishlistScreen from "../screens/WishlistScreen";
import AccountScreen from "../screens/AccountScreen";
import IconButton from "../components/IconButton/IconButton";
import HeaderLogo from "../components/HeaderLogo/HeaderLogo";

const Tabs = createBottomTabNavigator<RootTabsParamList>();

const Router = () => {
	const { colors } = useTheme();

	return (
		<NavigationContainer>
			<Tabs.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ color: iconColor }) => {
						const iconSize = 24;
						let iconName: keyof typeof AntDesign.glyphMap = "question";

						switch (route.name) {
							case "Home":
								iconName = "home";
								break;
							case "Explore":
								iconName = "search1";
								break;
							case "Wishlist":
								iconName = "hearto";
								break;
							case "Account":
								iconName = "user";
								break;
						}

						return <AntDesign name={iconName} size={iconSize} color={iconColor} />;
					},
					headerRightContainerStyle: { paddingRight: 15 },
					headerLeftContainerStyle: { paddingLeft: 15 },
					headerStyle: {
						borderColor: "#fff",
						elevation: 0,
						shadowColor: "#fff"
					},
					headerRight: () => <IconButton icon={<Icon as={Feather} name="shopping-bag" />} />,
					headerTitle: () => <HeaderLogo />,
					headerTitleAlign: "center",
					tabBarActiveTintColor: colors.blueGray[800],
					tabBarInactiveTintColor: colors.gray[300],
					tabBarShowLabel: true,
					tabBarStyle: { height: 56, paddingTop: 5, paddingBottom: 7 }
				})}
			>
				<Tabs.Screen name="Home" component={HomeScreen} />
				<Tabs.Screen name="Explore" component={ExploreScreen} />
				<Tabs.Screen name="Wishlist" component={WishlistScreen} />
				<Tabs.Screen name="Account" component={AccountScreen} />
			</Tabs.Navigator>
		</NavigationContainer>
	);
};

export default Router;
