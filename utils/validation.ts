// Dependencies
import * as Yup from "yup";

const CheckoutNotesValidation = {
	customer_note: Yup.string(),
	send_as_gift: Yup.boolean().required(),
	gift_note: Yup.string().when("send_as_gift", {
		is: true,
		then: Yup.string().required("Please provide information about gift requests")
	})
};

export const CheckoutNotesSchema = Yup.object().shape({
	...CheckoutNotesValidation
});

export const CheckoutSchema = Yup.object().shape({
	voucher_code: Yup.string().test(
		"10 characters long or empty",
		"Kode voucher tidak valid, harus terdiri dari 10 karakter",
		value => value === "" || value === undefined || value?.length === 10
	),
	voucher_type: Yup.string().when("voucher_code", {
		is: (value: string) => value !== "" && value !== undefined,
		then: Yup.string().not(["default"], "Invalid voucher code provided").required(),
		otherwise: Yup.string()
	}),
	voucher_discount: Yup.number().when("voucher_code", {
		is: (value: string) => value !== "" && value !== undefined,
		then: Yup.number().min(0).required()
	}),
	address_id: Yup.number().not([-1], "Kamu harus memilih alamat tersimpan").required(),
	...CheckoutNotesValidation,
	shipping_courier: Yup.string()
		.not(["default"], "Kamu harus memilih metode pengiriman")
		.required(),
	payment_method: Yup.string()
		.oneOf(["mandiri", "permata", "bri", "bni", "gopay"], "Metode pembayaran tidak valid")
		.required()
});

export const CreateAddressSchema = Yup.object().shape({
	recipient_name: Yup.string().required("Recipient name required"),
	contact: Yup.string().required("Phone number required"),
	address: Yup.string().required("Please provide a valid address"),
	is_default: Yup.boolean(),
	province: Yup.string().required("Required"),
	province_id: Yup.number().not([-1], "Please select a province").required("Required"),
	city: Yup.string().required("Required"),
	city_id: Yup.number().not([-1], "Please select a city or district").required("Required"),
	subdistrict: Yup.string().required("Required"),
	subdistrict_id: Yup.number().not([-1], "Please select a subdistrict").required("Required"),
	postal_code: Yup.string().required("Postal code required"),
	label: Yup.string().required("Please provide a label for this address"),
	shipping_note: Yup.string()
});

export const UpdateAddressSchema = CreateAddressSchema;
