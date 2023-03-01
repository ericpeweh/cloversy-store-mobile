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
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";
import ProductReviewScreen from "../screens/ProductReviewScreen";
import CartScreen from "../screens/CartScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import AddressPickerScreen from "../screens/AddressPickerScreen";
import AddAddressScreen from "../screens/AddAddressScreen";
import ShippingPickerScreen from "../screens/ShippingPickerScreen";
import PaymentPickerScreen from "../screens/PaymentPickerScreen";
import EditOrderInfoScreen from "../screens/EditOrderInfoScreen";
import VoucherPickerScreen from "../screens/VoucherPickerScreen";
import CheckoutSuccessScreen from "../screens/CheckoutSuccessScreen";
import PaymentScreen from "../screens/PaymentScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = () => {
	return (
		<Stack.Navigator
			screenOptions={({ navigation }) => ({
				animation: "fade",
				headerLeft: ({ canGoBack }) => (
					<IconButton
						onPress={() => {
							if (canGoBack) {
								navigation.goBack();
							} else {
								navigation.navigate("Home");
							}
						}}
						size="sm"
						borderColor="gray.100"
						icon={<Icon as={Entypo} name="chevron-thin-left" color="gray.700" size="md" />}
					/>
				)
			})}
		>
			<Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
			<Stack.Screen
				name="HomeProduct"
				component={ProductScreen}
				options={{ headerTitle: "Details", headerTitleAlign: "center" }}
			/>
			<Stack.Screen
				name="HomeProductReview"
				component={ProductReviewScreen}
				options={{ headerTitle: "Product Reviews", headerTitleAlign: "center" }}
			/>
			<Stack.Screen
				name="HomeCart"
				component={CartScreen}
				options={{
					headerTitle: "Shopping Cart",
					headerTitleAlign: "center"
				}}
			/>
			<Stack.Screen
				name="HomeCheckout"
				component={CheckoutScreen}
				options={{
					headerTitle: "Checkout",
					headerTitleAlign: "center"
				}}
			/>
			<Stack.Screen
				name="HomeCheckoutAddressPicker"
				component={AddressPickerScreen}
				options={{
					headerTitle: "Choose Address",
					headerTitleAlign: "center"
				}}
			/>
			<Stack.Screen
				name="HomeCheckoutAddAddress"
				component={AddAddressScreen}
				options={{
					headerTitle: "Create Address",
					headerTitleAlign: "center"
				}}
			/>
			<Stack.Screen
				name="HomeCheckoutShippingPicker"
				component={ShippingPickerScreen}
				options={{
					headerTitle: "Choose Shipping",
					headerTitleAlign: "center"
				}}
			/>
			<Stack.Screen
				name="HomeCheckoutPaymentPicker"
				component={PaymentPickerScreen}
				options={{
					headerTitle: "Choose Payment",
					headerTitleAlign: "center"
				}}
			/>
			<Stack.Screen
				name="HomeCheckoutEditOrderInfo"
				component={EditOrderInfoScreen}
				options={{
					headerTitle: "Edit Notes",
					headerTitleAlign: "center"
				}}
			/>
			<Stack.Screen
				name="HomeCheckoutVoucherPicker"
				component={VoucherPickerScreen}
				options={{
					headerTitle: "Use Voucher",
					headerTitleAlign: "center"
				}}
			/>
			<Stack.Screen
				name="HomeCheckoutSuccess"
				component={CheckoutSuccessScreen}
				options={{
					headerTitle: "Checkout Success",
					headerTitleAlign: "center"
				}}
			/>
			<Stack.Screen
				name="HomePayment"
				component={PaymentScreen}
				options={{
					headerTitle: "Order Payment",
					headerTitleAlign: "center"
				}}
			/>
		</Stack.Navigator>
	);
};

export default HomeStack;
