export type UserStatus = "active" | "banned";

export type UserRole = "user" | "admin";

export interface User {
	id: number;
	full_name: string;
	email: string;
	profile_picture: string;
	email_verified: boolean;
	birth_date: string | null;
	banned_date: string | null;
	contact: string | null;
	created_at: string;
	credits: number;
	sub: string;
	user_role: UserRole;
	user_status: UserStatus;
}

export interface UpdateAccountDetailsBody {
	full_name: string;
	contact: string;
	birth_date: string;
}
export interface Address {
	id: number;
	recipient_name: string;
	contact: string;
	address: string;
	is_default: boolean;
	province: string;
	province_id: number;
	city: string;
	city_id: number;
	subdistrict: string;
	subdistrict_id: number;
	postal_code: string;
	label: string;
	shipping_note: string;
}

export interface Voucher {
	code: string;
	title: string;
	discount: number;
	discount_type: string;
	expiry_date: string;
}

export interface Wishlist {
	id: number;
	product_id: number;
	user_id: number;
}
