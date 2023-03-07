// Dependencies
import React, { useMemo } from "react";

// Types
import { TransactionStatus } from "../../interfaces";

// Hooks
import { useGetAllTransactionsQuery } from "../../api/transaction.api";
import useSelector from "../../hooks/useSelector";

// Components
import { Text, View, FlatList } from "native-base";
import OrderListItem from "../OrderListItem/OrderListItem";
import FallbackContainer from "../FallbackContainer/FallbackContainer";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import AlertBox from "../AlertBox/AlertBox";
import TryAgainButton from "../TryAgainButton/TryAgainButton";

interface OrdersListProps {
	orderStatus: TransactionStatus | "all";
}

const OrdersList = ({ orderStatus }: OrdersListProps) => {
	const isAuth = useSelector(state => state.auth.isAuth);

	const {
		data: transactionsData,
		isLoading: isGetTransactionsLoading,
		isSuccess: isGetTransactionsSuccess,
		error: getTransactionsErrorData,
		refetch: refetchTransactions
	} = useGetAllTransactionsQuery(isAuth, { skip: !isAuth, pollingInterval: 1000 * 60 * 2 }); // Refetch transactions every 2 minutes
	const getTransactionsError: any = getTransactionsErrorData;

	const filteredOrders = useMemo(
		() =>
			orderStatus === "all"
				? transactionsData?.data.transactions
				: transactionsData?.data.transactions.filter(order => order.order_status === orderStatus),
		[orderStatus, transactionsData?.data.transactions]
	);

	const noDataFound = filteredOrders?.length === 0;

	return (
		<View>
			{isGetTransactionsLoading && (
				<FallbackContainer mt={10}>
					<LoadingSpinner />
				</FallbackContainer>
			)}
			{!isGetTransactionsLoading && getTransactionsError && (
				<FallbackContainer p={4} pt={6} bg="white">
					<AlertBox width="100%" mb={3}>
						{getTransactionsError?.data?.message || "Error while fetching voucher data"}
					</AlertBox>
					<TryAgainButton isLoading={isGetTransactionsLoading} onPress={refetchTransactions}>
						Try again
					</TryAgainButton>
				</FallbackContainer>
			)}
			{!isGetTransactionsLoading && isGetTransactionsSuccess && noDataFound && (
				<FallbackContainer mt={10}>
					<Text mb={2}>No orders found.</Text>
				</FallbackContainer>
			)}
			<FlatList
				initialNumToRender={10}
				data={filteredOrders}
				renderItem={({ item }) => <OrderListItem orderData={item} />}
				keyExtractor={item => `${item.id}`}
			/>
		</View>
	);
};

export default React.memo(OrdersList);
