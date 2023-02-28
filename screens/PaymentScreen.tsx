// Dependencies
import React, { useLayoutEffect, useCallback, useMemo, useState, useRef } from "react";
import { StyleSheet } from "react-native";
import CountDownTimer from "react-native-countdown-timer-hooks";

// Typess
import { RootStackProps } from "../interfaces";

// Hooks
import { useGetTransactionDetailsQuery } from "../api/transaction.api";
import useSelector from "../hooks/useSelector";
import { useTheme } from "native-base";

// Utils
import dateDiffCurrentTime from "../utils/dateDiffCurrentTime";
import formatToRupiah from "../utils/formatToRupiah";
import getOrderStatus from "../utils/getOrderStatus";
import paymentInstructions from "../utils/paymentIntstructions";

// Components
import { AspectRatio, Center, HStack, Image, ScrollView, Text, VStack } from "native-base";
import { paymentImages } from "../utils/content";
import Button from "../components/Button/Button";
import PaymentAccordion from "../components/PaymentAccordion/PaymentAccordion";
import OrderDetailsItem from "../components/OrderDetailsItem/OrderDetailsItem";

const PaymentScreen = ({ route, navigation }: RootStackProps<"HomePayment">) => {
	const timerRef = useRef();
	const isAuth = useSelector(state => state.auth.isAuth);
	const { colors } = useTheme();
	const { transactionId } = route.params;

	const {
		data: resultData,
		isLoading: isGetOrderLoading,
		isSuccess: isGetOrderSuccess,
		error: getOrderErrorData,
		refetch: refetchOrder,
		isUninitialized: isGetOrderUninitialized
	} = useGetTransactionDetailsQuery(transactionId as string, {
		skip: !isAuth || !transactionId,
		pollingInterval: 1000 * 15 // 15 seconds
	});
	const getOrderError: any = getOrderErrorData;
	const transaction = useMemo(() => resultData?.data.transaction, [resultData]);

	const orderStatus = getOrderStatus(transaction?.order_status || "pending");
	const shipping = transaction?.shipping_details;
	const payment = transaction?.payment_details;
	const items = transaction?.item_details;

	// Hide parent header and tabbar on mount
	useLayoutEffect(
		useCallback(() => {
			navigation?.getParent()?.setOptions({
				headerShown: false,
				tabBarStyle: { display: "none" }
			});

			// Cleanup function (revert header & tabbar style changes)
			return () => {
				navigation?.getParent()?.setOptions({
					headerShown: true,
					tabBarStyle: { display: "flex", height: 56, paddingTop: 5, paddingBottom: 7 }
				});
			};
		}, [])
	);

	const expireInSeconds = useMemo(
		() => dateDiffCurrentTime(payment?.expiry_time),
		[payment?.expiry_time]
	);

	return (
		<ScrollView style={styles.homePaymentScreenContainer}>
			{isGetOrderSuccess && transaction && shipping && payment && items && (
				<VStack mb={10}>
					<HStack alignItems="center" justifyContent="space-between">
						<Text fontWeight="700" fontSize="18px">
							{payment.payment_method === "gopay"
								? "GoPay"
								: `Bank ${payment.payment_method.toUpperCase()}`}
						</Text>
						<AspectRatio ratio={2 / 1} width="80px">
							<Image
								source={paymentImages[payment.payment_method]}
								resizeMode="cover"
								width="100%"
								height="100%"
								alt={payment.payment_method}
							/>
						</AspectRatio>
					</HStack>
					{payment.payment_method === "mandiri" && (
						<VStack mb={2} mt={1}>
							<Text fontSize="13px">Company Code</Text>
							<HStack alignItems="center" justifyContent="space-between" mt={1}>
								<Text fontSize="22px" letterSpacing={1} color="primary.400" fontWeight="500">
									{payment.biller_code}
								</Text>
								<Button
									borderColor="primary.400:alpha.50"
									borderWidth={1}
									minWidth="70px"
									_text={{
										textTransform: "uppercase",
										fontSize: "12px",
										color: "primary.400",
										fontWeight: 700
									}}
									bg="white"
									_pressed={{
										bg: "primary.400:alpha.10"
									}}
								>
									Copy
								</Button>
							</HStack>
						</VStack>
					)}
					{payment && (payment.va_number || payment.bill_key) && (
						<VStack>
							<Text fontSize="13px" mt={1}>
								Virtual Account Number
							</Text>
							<HStack alignItems="center" justifyContent="space-between" mt={1}>
								<Text fontSize="22px" letterSpacing={1} color="primary.400" fontWeight="700">
									{payment.payment_method === "mandiri" ? payment.bill_key : payment.va_number}
								</Text>
								<Button
									borderColor="primary.400:alpha.50"
									borderWidth={1}
									minWidth="70px"
									_text={{
										textTransform: "uppercase",
										fontSize: "12px",
										color: "primary.400",
										fontWeight: 700
									}}
									bg="white"
									_pressed={{
										bg: "primary.400:alpha.10"
									}}
								>
									Copy
								</Button>
							</HStack>
						</VStack>
					)}
					{payment && payment.payment_method === "gopay" && payment.actions && (
						<Center>
							<AspectRatio ratio={1 / 1} width="90%">
								<Image
									source={{ uri: payment.actions[0].url }}
									resizeMode="cover"
									width="100%"
									height="100%"
									alt="Gopay QRCode"
								/>
							</AspectRatio>
						</Center>
					)}
					<HStack alignItems="center" justifyContent="space-between" mt={6}>
						<Text fontSize="13px">Total payment</Text>
						<HStack alignItems="center" space={1}>
							<Text fontSize="13px">Expire in</Text>
							<CountDownTimer
								timestamp={expireInSeconds}
								ref={timerRef}
								textStyle={{
									fontSize: 13,
									color: colors.primary[400],
									fontWeight: "700",
									letterSpacing: 0.25
								}}
							/>
						</HStack>
					</HStack>
					<Text fontWeight="500" fontSize="22px" mt={1}>
						{formatToRupiah(+transaction.total)}
					</Text>
					{payment.payment_method === "gopay" ? (
						<Text fontSize="12px" mt={2}>
							Lakukan pembayaran melalui aplikasi Gojek / E-Wallet menggunakan QR Code di atas atau
							mengklik tombol buka aplikasi.
						</Text>
					) : (
						<Text fontSize="12px" mt={2}>
							Make payments from {payment.payment_method.toUpperCase()} bank account to the virtual
							account number above.
						</Text>
					)}
					<VStack mt={6}>
						<Text fontWeight="500" fontSize="14px" mb={4}>
							Payment Instructions{" "}
							<Text color="gray.400" fontSize="12px">
								(Bahasa)
							</Text>
						</Text>
						<PaymentAccordion sections={paymentInstructions[payment.payment_method]} />
					</VStack>
					<VStack mt={4} mb={2}>
						<Text fontWeight="500" fontSize="14px" mb={1}>
							Order Details
						</Text>
						{items.map(item => (
							<OrderDetailsItem itemData={item} key={`${item.product_id} ${item.product_size}`} />
						))}
					</VStack>
					<VStack mt={2} mb={2}>
						<Text fontWeight="500" fontSize="14px" mb={1}>
							Order Information
						</Text>
					</VStack>
				</VStack>
			)}
		</ScrollView>
	);
};

export default PaymentScreen;

const styles = StyleSheet.create({
	homePaymentScreenContainer: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 16
	}
});
