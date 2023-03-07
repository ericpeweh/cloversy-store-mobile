// Dependencies
import React, { useEffect, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import CountDownTimer from "react-native-countdown-timer-hooks";
import AppLink from "react-native-app-link";
import * as Clipboard from "expo-clipboard";

// Typess
import { RootStackProps } from "../interfaces";

// Hooks
import { useGetTransactionDetailsQuery } from "../api/transaction.api";
import useSelector from "../hooks/useSelector";
import { useTheme } from "native-base";
import usePopToast from "../hooks/usePopToast";
import useHideHeaderTabbar from "../hooks/useHideHeaderTabbar";

// Utils
import dateDiffCurrentTime from "../utils/dateDiffCurrentTime";
import formatToRupiah from "../utils/formatToRupiah";
import getOrderStatus from "../utils/getOrderStatus";
import paymentInstructions from "../utils/paymentIntstructions";
import { formatDateFull } from "../utils/formatDate";

// Icons
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

// Components
import { AspectRatio, Center, HStack, Image, ScrollView, Text, VStack, Icon } from "native-base";
import { paymentImages } from "../utils/content";
import Button from "../components/Button/Button";
import PaymentAccordion from "../components/PaymentAccordion/PaymentAccordion";
import OrderDetailsItem from "../components/OrderDetailsItem/OrderDetailsItem";
import IconButton from "../components/IconButton/IconButton";
import StatusBadge from "../components/StatusBadge/StatusBadge";
import FallbackContainer from "../components/FallbackContainer/FallbackContainer";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import AlertBox from "../components/AlertBox/AlertBox";
import TryAgainButton from "../components/TryAgainButton/TryAgainButton";

const PaymentScreen = ({ route, navigation }: RootStackProps<"HomePayment" | "AccounPayment">) => {
	const timerRef = useRef();
	const isAuth = useSelector(state => state.auth.isAuth);
	const { colors } = useTheme();
	const params = route.params;

	const {
		data: resultData,
		isLoading: isGetOrderLoading,
		isSuccess: isGetOrderSuccess,
		error: getOrderErrorData,
		refetch: refetchOrder,
		isUninitialized: isGetOrderUninitialized
	} = useGetTransactionDetailsQuery(params?.transactionId || params?.order_id || "", {
		skip: !isAuth || (!params?.transactionId && !params?.order_id),
		pollingInterval: 1000 * 10 // 10 seconds
	});
	const getOrderError: any = getOrderErrorData;
	const transaction = useMemo(() => resultData?.data.transaction, [resultData]);

	const orderStatus = getOrderStatus(transaction?.order_status || "pending");
	const shipping = transaction?.shipping_details;
	const payment = transaction?.payment_details;
	const items = transaction?.item_details;

	useEffect(() => {
		if (isGetOrderSuccess && params?.result) {
			refetchOrder();
		}
	}, [params?.result, isGetOrderSuccess]);

	// Hide parent header and tabbar on mount
	useHideHeaderTabbar(navigation);

	const expireInSeconds = useMemo(
		() => dateDiffCurrentTime(payment?.expiry_time),
		[payment?.expiry_time]
	);

	// Copy toasts
	const { showToastHandler: showCopyCompanyCodeToastHandler } = usePopToast({
		id: "copyCompanyCode",
		text: "	Company code has been copied!",
		duration: 1000,
		pageWithTabbar: false
	});

	const { showToastHandler: showCopyVAToastHandler } = usePopToast({
		id: "copyVA",
		text: "	Virtual account number has been copied!",
		duration: 1000,
		pageWithTabbar: false
	});

	const { showToastHandler: showCopyOrderNumberToastHandler } = usePopToast({
		id: "copyOrderNumber",
		text: "	Order number has been copied!",
		duration: 1000,
		pageWithTabbar: false
	});

	const copyBillerCodeHandler = async () => {
		if (payment?.biller_code) {
			await Clipboard.setStringAsync(payment?.biller_code);
			showCopyCompanyCodeToastHandler();
		}
	};

	const copyVaNumberHandler = async () => {
		if (payment) {
			await Clipboard.setStringAsync(
				(payment?.payment_method === "mandiri" ? payment.bill_key : payment?.va_number) || ""
			);
			showCopyVAToastHandler();
		}
	};

	const copyTransactionNumberHandler = async () => {
		if (transaction) {
			await Clipboard.setStringAsync(transaction.id);
			showCopyOrderNumberToastHandler();
		}
	};

	const openGojekHandler = async (redirectUrl: string) => {
		try {
			await AppLink.maybeOpenURL(redirectUrl, {
				appName: "Gojek",
				playStoreId: "com.gojek.app",
				appStoreId: 0,
				appStoreLocale: ""
			});
		} catch (error) {
			console.log("Gojek deeplink error: ", error);
		}
	};

	return (
		<ScrollView style={styles.homePaymentScreenContainer}>
			{(isGetOrderLoading || isGetOrderUninitialized) && (
				<FallbackContainer mt={10}>
					<LoadingSpinner />
				</FallbackContainer>
			)}
			{getOrderError && (
				<FallbackContainer mt={10}>
					<AlertBox mb={3}>
						{getOrderError?.data?.message || "Error occured while fetching order data."}
					</AlertBox>
					<TryAgainButton onPress={refetchOrder}>Try again</TryAgainButton>
				</FallbackContainer>
			)}
			{isGetOrderSuccess && !isGetOrderLoading && transaction && shipping && payment && items && (
				<VStack mb={10}>
					{transaction.order_status === "pending" && (
						<>
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
											onPress={copyBillerCodeHandler}
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
											onPress={copyVaNumberHandler}
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
									<Button
										_text={{ fontWeight: "500", px: 1 }}
										endIcon={<Icon as={MaterialIcons} name="open-in-new" mb={-0.5} />}
										onPress={() => {
											const redirectUrl = payment?.actions?.find(
												action => action.name === "deeplink-redirect"
											)?.url;

											if (redirectUrl) {
												openGojekHandler(redirectUrl);
											}
										}}
									>
										Open Gojek
									</Button>
								</Center>
							)}
							<HStack alignItems="center" justifyContent="space-between" mt={6}>
								<Text fontSize="13px">Total payment</Text>
								{expireInSeconds > 0 && (
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
								)}
							</HStack>
							<Text fontWeight="500" fontSize="22px" mt={1}>
								{formatToRupiah(+transaction.total)}
							</Text>
							{payment.payment_method === "gopay" ? (
								<Text fontSize="12px" mt={2}>
									Make payments through the Gojek / E-Wallet application using the QR Code above or
									click open app button.
								</Text>
							) : (
								<Text fontSize="12px" mt={2}>
									Make payments from {payment.payment_method.toUpperCase()} bank account to the
									virtual account number above.
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
						</>
					)}
					{transaction.order_status !== "pending" && (
						<Center height="190px">
							{["process", "sent", "success"].includes(transaction.order_status) ? (
								<Icon as={AntDesign} name="checkcircleo" color="primary.400" size="70px" />
							) : (
								<Icon as={AntDesign} name="closecircleo" color="error.500" size="70px" />
							)}
							<Text fontSize="20px" fontWeight="500" mt={2}>
								{["process", "sent", "success"].includes(transaction.order_status)
									? "Order paid successfully"
									: "Order canceled"}
							</Text>
						</Center>
					)}
					<VStack mt={4} mb={2}>
						<Text fontWeight="500" fontSize="14px" mb={1}>
							Order Details
						</Text>
						{items.map(item => (
							<OrderDetailsItem itemData={item} key={`${item.product_id} ${item.product_size}`} />
						))}
					</VStack>
					<VStack mt={2} mb={2} space={2}>
						<Text fontWeight="500" fontSize="14px" mb={1}>
							Order Information
						</Text>
						<HStack justifyContent="space-between" alignItems="center">
							<Text fontSize="13px" color="gray.500">
								Order Number
							</Text>
							<HStack space={1} alignItems="center">
								<IconButton
									icon={<Icon as={MaterialIcons} name="content-copy" size="sm" color="gray.400" />}
									onPress={copyTransactionNumberHandler}
								/>
								<Text color="primary.400" fontWeight="500" fontSize="13px">
									{transaction.id}
								</Text>
							</HStack>
						</HStack>
						<HStack justifyContent="space-between" alignItems="center">
							<Text fontSize="13px" color="gray.500">
								Order Status
							</Text>
							<Text color="primary.400" fontWeight="500" fontSize="13px">
								<StatusBadge color={orderStatus.color}>{orderStatus.label}</StatusBadge>
							</Text>
						</HStack>
						<HStack justifyContent="space-between" alignItems="center" mt={2}>
							<Text fontSize="13px" color="gray.500">
								Purchase Date
							</Text>
							<Text fontSize="13px">{formatDateFull(transaction.created_at)}</Text>
						</HStack>
						<HStack justifyContent="space-between" alignItems="center" mt={2}>
							<Text fontSize="13px" color="gray.500">
								Subtotal
							</Text>
							<Text fontSize="13px">{formatToRupiah(+transaction.subtotal)}</Text>
						</HStack>
						<HStack justifyContent="space-between" alignItems="center" mt={2}>
							<Text fontSize="13px" color="gray.500">
								Shipping Cost
							</Text>
							<Text fontSize="13px">{formatToRupiah(+shipping.shipping_cost)}</Text>
						</HStack>
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
