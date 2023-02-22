// Types
import { TransactionStatus } from "../interfaces";

const getOrderStatus = (status: TransactionStatus) => {
	const orderStatus = {
		pending: { label: "Belum bayar", color: "warning" },
		process: { label: "Diproses", color: "info" },
		sent: { label: "Dikirim", color: "secondary" },
		success: { label: "Selesai", color: "primary" },
		cancel: { label: "Dibatalkan", color: "error" }
	};

	return { status, ...orderStatus[status] };
};

export default getOrderStatus;
