// Dependencies
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import AccountScreen from "../screens/AccountScreen";

const Stack = createNativeStackNavigator();

const AccountStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Account Dashboard"
				component={AccountScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
};

export default AccountStack;
