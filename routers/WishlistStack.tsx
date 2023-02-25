// Dependencies
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Types
import { RootStackParamList } from "../interfaces";

// Icons
import { Entypo } from "@expo/vector-icons";

// Components
import IconButton from "../components/IconButton/IconButton";
import { Icon } from "native-base";

// Screens
import WishlistScreen from "../screens/WishlistScreen";
import ProductScreen from "../screens/ProductScreen";
import ProductReviewScreen from "../screens/ProductReviewScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const WishlistStack = () => {
	return (
		<Stack.Navigator
			screenOptions={({ navigation }) => ({
				animation: "fade",
				headerLeft: ({ canGoBack }) => (
					<IconButton
						onPress={() => {
							if (canGoBack) navigation.goBack();
						}}
						size="sm"
						borderColor="gray.100"
						icon={<Icon as={Entypo} name="chevron-thin-left" color="gray.700" size="md" />}
					/>
				)
			})}
		>
			<Stack.Screen name="Wishlist" component={WishlistScreen} options={{ headerShown: false }} />
			<Stack.Screen
				name="WishlistProduct"
				component={ProductScreen}
				options={{ headerTitle: "Details", headerTitleAlign: "center" }}
			/>
			<Stack.Screen
				name="WishlistProductReview"
				component={ProductReviewScreen}
				options={{ headerTitle: "Product Reviews", headerTitleAlign: "center" }}
			/>
		</Stack.Navigator>
	);
};

export default WishlistStack;
