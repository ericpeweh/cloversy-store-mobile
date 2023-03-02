// Types
import { TransactionStatus } from "../interfaces";

const getOrderStatus = (status: TransactionStatus) => {
	const orderStatus = {
		pending: { label: "Pending", color: "warning.400" },
		process: { label: "Processed", color: "info.500" },
		sent: { label: "Shipped", color: "secondary.400" },
		success: { label: "Success", color: "primary.400" },
		cancel: { label: "Canceled", color: "error.500" }
	};

	return { status, ...orderStatus[status] };
};

export default getOrderStatus;
