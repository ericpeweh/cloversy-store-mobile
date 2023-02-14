// Types
import { Address } from "./account.interface";

export type PaymentStatus =
	| "authorize"
	| "capture"
	| "settlement"
	| "deny"
	| "pending"
	| "cancel"
	| "refund"
	| "partial_refund"
	| "chargeback"
	| "partial_chargeback"
	| "expire"
	| "failure";

export type PaymentMethod = "gopay" | "bni" | "mandiri" | "permata" | "bri";

export type TransactionStatus = "pending" | "process" | "sent" | "success" | "cancel";

export type GopayActionsObject = [
	{
		name: "generate-qr-code";
		method: "GET";
		url: string;
	},
	{
		name: "deeplink-redirect";
		method: "GET";
		url: string;
	},
	{
		name: "get-status";
		method: "GET";
		url: string;
	},
	{
		name: "cancel";
		method: "POST";
		url: string;
		fields: string[];
	}
];

export interface TransactionTimelineItem {
	timeline_date: string;
	description: string;
}

export interface Transaction {
	id: string;
	user_id: string;
	order_status: TransactionStatus;
	gift_note: string;
	voucher_code: string;
	customer_note: string;
	created_at: string;
	subtotal: string;
	discount_total: string;
	total: string;
	is_reviewed: boolean;
}

export interface TransactionItem {
	product_id: number;
	quantity: number;
	price: string;
	product_size: string;
	title: string;
	slug: string;
	images: string[];
}

export interface TransactionShipping {
	transaction_id: string;
	shipping_cost: string;
	shipping_courier: string;
	shipping_service: string;
	shipping_tracking_code: string;
	shipping_etd: string;
}

export interface TransactionListItem {
	id: string;
	user_id: string;
	order_status: TransactionStatus;
	created_at: string;
	total: string;
	item_details: TransactionItem[];
	is_reviewed: boolean;
}

export interface ClientPaymentDetailsItem {
	payment_method: PaymentMethod;
	payment_status: PaymentStatus;
	expire_time: string;
	bill_key?: string;
	biller_code?: string;
	va_number?: string;
	actions?: GopayActionsObject;
}

export interface ClientTransactionDetails extends Transaction {
	shipping_details: Address & TransactionShipping;
	item_details: TransactionItem[];
	payment_details: ClientPaymentDetailsItem;
	timeline: TransactionTimelineItem[];
}

export interface CheckoutBody {
	address_id: string;
	voucher_code: string;
	customer_note?: string;
	gift_note?: string;
	shipping_courier: string;
	payment_method: string;
}

export interface CreateReviewItem {
	product_id: number;
	rating: number;
	review: string;
}
