// Dependencies
import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
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
import formatToRupiah from "../utils/formatToRupiah";
import getOrderStatus from "../utils/getOrderStatus";
import { formatDateFull, formatDateTimeline } from "../utils/formatDate";

// Icons
import { MaterialIcons } from "@expo/vector-icons";

// Components
import {
	AspectRatio,
	HStack,
	Image,
	ScrollView,
	Text,
	VStack,
	Icon,
	View,
	Divider
} from "native-base";
import { courierImages, paymentImages } from "../utils/content";
import OrderDetailsItem from "../components/OrderDetailsItem/OrderDetailsItem";
import IconButton from "../components/IconButton/IconButton";
import StatusBadge from "../components/StatusBadge/StatusBadge";
import FallbackContainer from "../components/FallbackContainer/FallbackContainer";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import AlertBox from "../components/AlertBox/AlertBox";
import TryAgainButton from "../components/TryAgainButton/TryAgainButton";
import OrderTimeline from "../components/OrderTimeline/OrderTimeline";

const OrderDetailsScreen = ({ route, navigation }: RootStackProps<"AccountOrderDetails">) => {
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
	} = useGetTransactionDetailsQuery(transactionId, {
		skip: !isAuth,
		pollingInterval: 1000 * 30 // 30 seconds
	});
	const getOrderError: any = getOrderErrorData;
	const transaction = useMemo(() => resultData?.data.transaction, [resultData]);

	const orderStatus = getOrderStatus(transaction?.order_status || "pending");
	const shipping = transaction?.shipping_details;
	const payment = transaction?.payment_details;
	const items = transaction?.item_details;

	// Hide parent header and tabbar on mount
	useHideHeaderTabbar(navigation);

	// Copy toasts
	const { showToastHandler: showCopyTrackingCodeToastHandler } = usePopToast({
		id: "copyTrackingCode",
		text: "	Tracking code has been copied!",
		duration: 1000,
		pageWithTabbar: false
	});

	const { showToastHandler: showCopyOrderNumberToastHandler } = usePopToast({
		id: "copyOrderNumber",
		text: "	Order number has been copied!",
		duration: 1000,
		pageWithTabbar: false
	});

	const copyTrackingCodeHandler = async () => {
		if (shipping?.shipping_tracking_code) {
			await Clipboard.setStringAsync(shipping.shipping_tracking_code);
			showCopyTrackingCodeToastHandler();
		}
	};

	const copyTransactionNumberHandler = async () => {
		if (transaction) {
			await Clipboard.setStringAsync(transaction.id);
			showCopyOrderNumberToastHandler();
		}
	};

	return (
		<ScrollView style={styles.homeOrderDetailsScreenContainer}>
			{(isGetOrderLoading || isGetOrderUninitialized) && (
				<FallbackContainer mt={10}>
					<LoadingSpinner />
				</FallbackContainer>
			)}
			{getOrderError && (
				<FallbackContainer mt={10}>
					<AlertBox mb={3}>{getOrderError?.data?.message || "Failed to fetch order data"}</AlertBox>
					<TryAgainButton onPress={refetchOrder}>Try again</TryAgainButton>
				</FallbackContainer>
			)}
			{isGetOrderSuccess && !isGetOrderLoading && transaction && shipping && payment && items && (
				<VStack space={2}>
					<VStack space={2} p={4} pt={6} bg="white">
						<Text fontWeight="500" fontSize="14px">
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
					</VStack>
					<VStack space={2} p={4} bg="white">
						<Text fontWeight="500" fontSize="14px">
							Products
						</Text>
						{items.map(item => (
							<OrderDetailsItem
								itemData={item}
								key={`${item.product_id} ${item.product_size}`}
								disableBorder
							/>
						))}
						<Text fontWeight="500" fontSize="13px" color="gray.500">
							Order notes:
						</Text>
						<View bg="gray.100" p={3} borderRadius="10px" mt={2}>
							<Text fontSize="13px" color="gray.600">
								{transaction.customer_note || "No order notes provided."}
							</Text>
						</View>
						<Text fontWeight="500" fontSize="13px" color="gray.500" mt={3}>
							Gift notes:
						</Text>
						<View bg="gray.100" p={3} borderRadius="10px" mt={2}>
							<Text fontSize="13px" color="gray.600">
								{transaction.gift_note || "No gift notes provided."}
							</Text>
						</View>
					</VStack>
					<VStack space={3} p={4} bg="white">
						<Text fontWeight="500" fontSize="14px">
							Payment Information
						</Text>
						<HStack justifyContent="space-between" alignItems="center">
							<Text fontSize="13px" color="gray.500">
								Payment Method
							</Text>
							<HStack space={1} alignItems="center">
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
						</HStack>
						<Divider bg="gray.100" />
						<HStack justifyContent="space-between" alignItems="center">
							<Text fontSize="13px" color="gray.500">
								Products Subtotal
							</Text>
							<Text fontSize="13px">{formatToRupiah(+transaction.subtotal)}</Text>
						</HStack>
						{+transaction.discount_total !== 0 && (
							<HStack justifyContent="space-between" alignItems="center">
								<Text fontSize="13px" color="gray.500">
									Discounts
								</Text>
								<Text fontSize="13px">{formatToRupiah(+transaction.discount_total)}</Text>
							</HStack>
						)}
						<HStack justifyContent="space-between" alignItems="center">
							<Text fontSize="13px" color="gray.500">
								Shipping Cost
							</Text>
							<Text fontSize="13px">{formatToRupiah(+shipping.shipping_cost)}</Text>
						</HStack>
						<HStack justifyContent="space-between" alignItems="center">
							<Text fontSize="15px" fontWeight="700" color="primary.400">
								Order Total
							</Text>
							<Text fontWeight="700" color="primary.400" fontSize="15px">
								{formatToRupiah(+transaction.total)}
							</Text>
						</HStack>
					</VStack>
					<VStack space={3} p={4} bg="white">
						<Text fontWeight="500" fontSize="14px">
							Shipping Information
						</Text>
						<HStack justifyContent="space-between" alignItems="center">
							<Text fontSize="13px" color="gray.500">
								Shipping Method
							</Text>
							<HStack space={1} alignItems="center">
								<AspectRatio ratio={2 / 1} width="60px">
									<Image
										source={courierImages[shipping.shipping_courier]}
										resizeMode="cover"
										width="100%"
										height="100%"
										alt={shipping.shipping_courier}
									/>
								</AspectRatio>
								<Text textTransform="uppercase" fontSize="12px">
									{`${shipping.shipping_courier} ${shipping.shipping_service}`}{" "}
									<Text fontSize="12px" textTransform="lowercase">
										({shipping.shipping_etd} days)
									</Text>
								</Text>
							</HStack>
						</HStack>
						<HStack justifyContent="space-between" alignItems="center">
							<Text fontSize="13px" color="gray.500">
								Tracking Code
							</Text>
							<HStack space={1} alignItems="center">
								{shipping.shipping_tracking_code && (
									<IconButton
										icon={
											<Icon as={MaterialIcons} name="content-copy" size="sm" color="gray.400" />
										}
										onPress={copyTrackingCodeHandler}
									/>
								)}
								<Text fontSize="13px">{shipping.shipping_tracking_code || "Not available"}</Text>
							</HStack>
						</HStack>
						<VStack space={1}>
							<Text fontSize="13px" color="gray.500">
								Shipping Address:
							</Text>
							<VStack mt={2} space={0.5}>
								<Text fontSize="13px" fontWeight="500" color="gray.600">
									{shipping.recipient_name}
								</Text>
								<Text fontSize="13px" mb={2}>
									{shipping.contact}
								</Text>
								<Text fontSize="13px">{shipping.address}</Text>
								<Text fontSize="13px">
									{shipping.province}, {shipping.city}
								</Text>
								<Text fontSize="13px">
									{shipping.subdistrict}, {shipping.postal_code}
								</Text>
								<Text fontSize="13px">{shipping.contact}</Text>
							</VStack>
							<Divider bg="gray.100" my={2} />
							<VStack space={0.5}>
								<Text fontSize="13px">Label: {shipping.label || "-"}</Text>
								<Text fontSize="13px" mb={2}>
									Address note: {shipping.shipping_note || "-"}
								</Text>
							</VStack>
						</VStack>
					</VStack>
					<VStack space={2} p={4} bg="white">
						<Text fontWeight="500" fontSize="14px" mb={4}>
							Order Timeline
						</Text>
						<OrderTimeline
							data={transaction.timeline.map((item, i) => ({
								time: formatDateTimeline(item.timeline_date),
								title: item.description,
								circleColor: i === 0 ? "#55904e4d" : colors.gray[100],
								dotColor: i === 0 ? colors.primary[400] : colors.gray[300]
							}))}
						/>
					</VStack>
				</VStack>
			)}
		</ScrollView>
	);
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
	homeOrderDetailsScreenContainer: {
		flex: 1
	}
});
