// Dependencies
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "native-base";

// Types
import { RootStackParamList } from "../interfaces";

// Icons
import { Entypo } from "@expo/vector-icons";

// Components
import IconButton from "../components/IconButton/IconButton";

// Screens
import AccountScreen from "../screens/AccountScreen";
import TransactionsScreen from "../screens/TransactionsScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AccountStack = () => {
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
								navigation.navigate("AccountDashboard");
							}
						}}
						size="sm"
						borderColor="gray.100"
						icon={<Icon as={Entypo} name="chevron-thin-left" color="gray.700" size="md" />}
					/>
				)
			})}
		>
			<Stack.Screen
				name="AccountDashboard"
				component={AccountScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="AccountTransactions"
				component={TransactionsScreen}
				options={{
					headerTitle: "Order Payment",
					headerTitleAlign: "center"
				}}
			/>
		</Stack.Navigator>
	);
};

export default AccountStack;
