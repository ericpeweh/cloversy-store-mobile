// Icons
import WalletIcon from "../assets/icons/WalletIcon";
import PackageIcon from "../assets/icons/PackageIcon";
import ShippingIcon from "../assets/icons/ShippingIcon";
import RatingIcon from "../assets/icons/RatingIcon";

export const myOrderMenuList = [
	{
		label: "Pending",
		value: "pending",
		icon: <WalletIcon size={42} />
	},
	{
		label: "Processed",
		value: "process",
		icon: <PackageIcon size={40} />
	},
	{
		label: "Shipped",
		value: "sent",
		icon: <ShippingIcon size={36} />
	},
	{
		label: "Reviews",
		value: "success",
		icon: <RatingIcon size={35} />
	}
];
