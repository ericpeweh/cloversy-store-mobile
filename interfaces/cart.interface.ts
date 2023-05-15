// Types
import { Product } from "./product.interface";

export interface CartItem {
	id: string | number;
	product_id: number;
	quantity: number;
	size: string;
}

export type CartItemDetails = CartItem & Omit<Product, "id">;

export interface EditNotesFormValues {
	customer_note: string;
	send_as_gift: boolean;
	gift_note: string;
}

export interface CheckoutFormValues {
	voucher_code: string;
	voucher_discount: number;
	voucher_type: "default" | "value" | "percentage";
	address_id: number;
	customer_note: string;
	send_as_gift: boolean;
	gift_note: string;
	shipping_courier: string;
	payment_method: "default" | "gopay" | "bni" | "mandiri" | "permata" | "bri";
}
