export interface Province {
	province_id: string;
	province: string;
}

export interface City {
	city_id: string;
	province_id: string;
	province: string;
	type: "Kabupaten" | "Kota";
	city_name: string;
	postal_code: string;
}

export interface Subdistrict {
	subdistrict_id: string;
	province_id: string;
	province: string;
	city_id: string;
	city: string;
	type: string;
	subdistrict_name: string;
}

export interface ShippingCost {
	value: number;
	etd: string;
	note: string;
	courier: string;
	service: string;
	description: string;
}
