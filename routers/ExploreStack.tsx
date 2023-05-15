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
import ExploreScreen from "../screens/ExploreScreen";
import ProductScreen from "../screens/ProductScreen";
import ProductReviewScreen from "../screens/ProductReviewScreen";
import ProductFilterScreen from "../screens/ProductFilterScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const ExploreStack = () => {
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
			<Stack.Screen name="Explore" component={ExploreScreen} options={{ headerShown: false }} />
			<Stack.Screen
				name="ExploreProduct"
				component={ProductScreen}
				options={{ headerTitle: "Details", headerTitleAlign: "center" }}
			/>
			<Stack.Screen
				name="ExploreProductReview"
				component={ProductReviewScreen}
				options={{ headerTitle: "Product Reviews", headerTitleAlign: "center" }}
			/>
			<Stack.Screen
				name="ExploreProductFilter"
				component={ProductFilterScreen}
				options={{ headerTitle: "Product Filters", headerTitleAlign: "center" }}
			/>
		</Stack.Navigator>
	);
};

export default ExploreStack;
