// Dependencies
import API from "./index";

// Types
import {
	CheckoutBody,
	ClientTransactionDetails,
	CreateReviewItem,
	ResponseBody,
	TransactionListItem
} from "../interfaces";

const transactionApi = API.injectEndpoints({
	endpoints: build => ({
		getAllTransactions: build.query<ResponseBody<{ transactions: TransactionListItem[] }>, boolean>(
			{
				query: () => `transactions`,
				providesTags: ["Transactions"]
			}
		),
		getTransactionDetails: build.query<
			ResponseBody<{ transaction: ClientTransactionDetails }>,
			string
		>({
			query: transactionId => `transactions/${transactionId}`,
			providesTags: res => [{ type: "Transaction", id: res?.data.transaction.id }]
		}),
		cancelTransaction: build.mutation<ResponseBody<{ transactionId: string }>, string>({
			query: transactionId => ({ url: `transactions/${transactionId}/cancel`, method: "POST" }),
			invalidatesTags: (_, _1, transactionId) => [
				{ type: "Transaction", id: transactionId },
				"Transactions"
			]
		}),
		checkout: build.mutation<ResponseBody<{ transaction: ClientTransactionDetails }>, CheckoutBody>(
			{
				query: checkoutData => ({
					url: "transactions",
					method: "POST",
					body: checkoutData
				}),
				invalidatesTags: ["Transactions", "Cart", "Checkout Cart"]
			}
		),
		createReviews: build.mutation<
			ResponseBody<{ transactionId: string }>,
			{ transactionId: string; reviews: CreateReviewItem[] }
		>({
			query: ({ transactionId, reviews }) => ({
				url: `transactions/${transactionId}/review`,
				method: "POST",
				body: { reviews }
			}),
			invalidatesTags: (_, _1, { reviews, transactionId }) => [
				{ type: "Transaction", id: transactionId },
				{ type: "Reviews", id: reviews[0].product_id }
			]
		})
	}),
	overrideExisting: false
});

export const {
	useCheckoutMutation,
	useGetAllTransactionsQuery,
	useGetTransactionDetailsQuery,
	useCancelTransactionMutation,
	useCreateReviewsMutation
} = transactionApi;

export default transactionApi;
