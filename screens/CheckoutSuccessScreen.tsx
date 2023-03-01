// Dependencies
import React from "react";
import { StyleSheet } from "react-native";
import { shallowEqual } from "react-redux";

// Types
import { RootStackProps, RootTabsParamList } from "../interfaces";

// Icons
import { Octicons, MaterialIcons } from "@expo/vector-icons";

// Hooks
import useSelector from "../hooks/useSelector";
import useHideHeaderTabbar from "../hooks/useHideHeaderTabbar";

// Utils
import formatToRupiah from "../utils/formatToRupiah";
import { courierImages, paymentImages } from "../utils/content";

// Components
import { AspectRatio, Divider, HStack, Icon, Image, ScrollView, Text, VStack } from "native-base";
import Button from "../components/Button/Button";
import OrderDetailsItem from "../components/OrderDetailsItem/OrderDetailsItem";
import { CommonActions } from "@react-navigation/native";

const CheckoutSuccessScreen = ({ navigation, route }: RootStackProps<"HomeCheckoutSuccess">) => {
	const { full_name } = useSelector(state => state.auth, shallowEqual);

	const { transaction } = route.params;

	// TE6BIQNTNE = mandiri
	// LAUEG3SHOT = bri
	// 7VDN2OA5T5 = gopay
	// VKT54VEUPB = permata

	const shipping = transaction?.shipping_details;
	const payment = transaction?.payment_details;
	const items = transaction?.item_details;

	// Hide parent header and tabbar on mount
	useHideHeaderTabbar(navigation);

	return (
		<ScrollView style={styles.checkoutSuccessScreenContainer} p={4}>
			{transaction && shipping && payment && items && (
				<VStack space={3} mb={8}>
					<HStack space={3} alignItems="center">
						<Icon as={Octicons} name="check-circle" color="primary.400" size="50px" />
						<VStack>
							<Text fontSize="12px" color="gray.600">
								Order Number: #{transaction.id}
							</Text>
							<Text fontSize="15px">
								Thank you, {full_name.includes("@") ? "Clovers" : full_name}!
							</Text>
						</VStack>
					</HStack>
					<VStack
						py={3}
						px={4}
						space={2}
						borderColor="gray.300"
						borderWidth="1px"
						borderRadius="10px"
						mt={1}
					>
						<Text fontWeight="500" fontSize="14px">
							You order has been created!
						</Text>
						<Text fontSize="13px">
							You will receive confirmation email and notification about this order.
						</Text>
					</VStack>
					<VStack
						py={3}
						px={4}
						space={2}
						borderColor="gray.300"
						borderWidth="1px"
						borderRadius="10px"
					>
						<Text fontWeight="500" fontSize="14px">
							Order status and shipping
						</Text>
						<Text fontSize="13px">
							You can see the status of orders and shipping information in{" "}
							<Text color="primary.400" fontWeight="500" underline onPress={() => {}}>
								transaction details
							</Text>
						</Text>
					</VStack>
					<VStack
						py={3}
						px={4}
						space={2}
						borderColor="gray.300"
						borderWidth="1px"
						borderRadius="10px"
					>
						<Text fontWeight="500" fontSize="14px">
							Payment
						</Text>
						<Text fontSize="13px">
							Make a payment to complete your transaction with the{" "}
							<Text fontWeight="500">"Make Payment"</Text> button below.
						</Text>
					</VStack>
					<VStack
						py={3}
						px={4}
						space={2}
						borderColor="gray.300"
						borderWidth="1px"
						borderRadius="10px"
					>
						<Text fontWeight="500" fontSize="14px">
							Order Information
						</Text>
						<Text fontWeight="500" fontSize="13px" mt={1}>
							Shipping Method
						</Text>
						<HStack space={3} alignItems="center">
							<AspectRatio ratio={2 / 1} width="60px">
								<Image
									source={courierImages[shipping.shipping_courier]}
									resizeMode="cover"
									width="100%"
									height="100%"
									alt={shipping.shipping_courier}
								/>
							</AspectRatio>
							<Text textTransform="uppercase" fontSize="13px">
								{`${shipping.shipping_courier} ${shipping.shipping_service}`}{" "}
								<Text fontSize="12px" textTransform="lowercase">
									({shipping.shipping_etd} days)
								</Text>
							</Text>
						</HStack>
						<Text fontWeight="500" fontSize="13px" mt={2}>
							Payment Method
						</Text>
						<HStack space={3} alignItems="center">
							<AspectRatio ratio={2 / 1} width="60px">
								<Image
									source={paymentImages[payment.payment_method]}
									resizeMode="cover"
									width="100%"
									height="100%"
									alt={payment.payment_method}
								/>
							</AspectRatio>
							<Text fontSize="13px">
								{payment.payment_method === "gopay"
									? "Gopay"
									: `${payment.payment_method.toUpperCase()} Virtual Account`}
							</Text>
						</HStack>
						<Text fontWeight="500" fontSize="13px" mt={2}>
							Shipping Address
						</Text>
						<VStack>
							<Text fontSize="13px">{shipping.recipient_name}</Text>
							<Text fontSize="13px">{shipping.address}</Text>
							<Text fontSize="13px">
								{shipping.province}, {shipping.city}
							</Text>
							<Text fontSize="13px">
								{shipping.subdistrict}, {shipping.postal_code}
							</Text>
							<Text fontSize="13px">{shipping.contact}</Text>
						</VStack>
						<Text fontWeight="500" fontSize="13px" mt={2}>
							Order notes
						</Text>
						<Text fontSize="13px">{transaction.customer_note || "No order notes provided"}</Text>
						<Text fontWeight="500" fontSize="13px" mt={2}>
							Gift notes
						</Text>
						<Text fontSize="13px">{transaction.gift_note || "No gift notes provided."}</Text>
					</VStack>
					<VStack mt={2} mb={2}>
						<Text fontWeight="500" fontSize="14px" mb={2}>
							Order Details
						</Text>
						{items.map(item => (
							<OrderDetailsItem itemData={item} key={`${item.product_id} ${item.product_size}`} />
						))}
						<HStack justifyContent="space-between" alignItems="center" mt={4}>
							<Text fontWeight="500" fontSize="13px" color="gray.600">
								Subtotal:
							</Text>
							<Text fontWeight="500" fontSize="13px">
								{formatToRupiah(+transaction.subtotal)}
							</Text>
						</HStack>
						<HStack justifyContent="space-between" alignItems="center" mt={4}>
							<Text fontWeight="500" fontSize="13px" color="gray.600">
								Shipping Cost:
							</Text>
							<Text fontWeight="500" fontSize="13px">
								{formatToRupiah(+shipping.shipping_cost)}
							</Text>
						</HStack>
						<Divider mt={3} mb={4} bg="gray.100" />
						<HStack justifyContent="space-between" alignItems="center">
							<Text fontWeight="500" fontSize="13px" color="gray.600">
								Total:
							</Text>
							<Text fontWeight="700" color="primary.400" fontSize="15px">
								{formatToRupiah(+transaction.total)}
							</Text>
						</HStack>
					</VStack>
					<VStack space={2}>
						<Button
							bg="white"
							borderColor="gray.300"
							borderWidth={1}
							py={2}
							_text={{
								color: "gray.600",
								fontSize: "14px",
								fontWeight: "500"
							}}
							_pressed={{ bg: "gray.100" }}
							onPress={() => {
								navigation.dispatch(
									CommonActions.reset({
										index: 1,
										routes: [{ key: "Home", name: "Home", params: undefined }]
									})
								);
								navigation.navigate("AccountTab", { screen: "AccountTransactions" } as any);
							}}
						>
							Transactions List
						</Button>
						<Button
							bg="secondary.400"
							borderColor="gray.300"
							borderWidth={1}
							py={2}
							_text={{
								color: "white",
								fontSize: "14px",
								fontWeight: "500"
							}}
							_pressed={{ bg: "secondary.300" }}
							onPress={() => navigation.replace("Home")}
						>
							Continue Shopping
						</Button>
						<Button
							borderColor="gray.300"
							borderWidth={1}
							py={2}
							_text={{
								color: "white",
								fontSize: "14px",
								fontWeight: "500"
							}}
							_pressed={{ bg: "primary.500" }}
							startIcon={<Icon as={MaterialIcons} name="payments" />}
							onPress={() => navigation.replace("HomePayment", { transactionId: transaction.id })}
						>
							Make Payment
						</Button>
					</VStack>
				</VStack>
			)}
		</ScrollView>
	);
};

export default CheckoutSuccessScreen;

const styles = StyleSheet.create({
	checkoutSuccessScreenContainer: {
		flex: 1,
		backgroundColor: "#fff"
	}
});
