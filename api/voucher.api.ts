// Dependencies
import API from "./index";

// Types
import { Voucher, ResponseBody } from "../interfaces";

const voucherApi = API.injectEndpoints({
	endpoints: build => ({
		getVouchers: build.query<ResponseBody<{ vouchers: Voucher[] }>, boolean>({
			query: () => `vouchers`,
			providesTags: ["Vouchers"]
		}),
		applyVoucher: build.mutation<ResponseBody<{ voucher: Voucher }>, string>({
			query: voucherCode => ({
				url: `vouchers/${voucherCode}`,
				method: "POST"
			})
		})
	}),
	overrideExisting: false
});

export const { useGetVouchersQuery, useApplyVoucherMutation } = voucherApi;

export default voucherApi;
