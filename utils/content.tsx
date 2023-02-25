// Types
import { ImageSourcePropType } from "react-native";

// Icons
import WalletIcon from "../assets/icons/WalletIcon";
import PackageIcon from "../assets/icons/PackageIcon";
import ShippingIcon from "../assets/icons/ShippingIcon";
import RatingIcon from "../assets/icons/RatingIcon";
import { PaymentMethod } from "../interfaces";

// Images
const JNELogo = require("../assets/images/jne.png");
const JNTLogo = require("../assets/images/j&t.png");
const SiCepatLogo = require("../assets/images/sicepat.png");

const BNILogo = require("../assets/images/bni.png");
const BRILogo = require("../assets/images/bri.png");
const GoPayLogo = require("../assets/images/gopay.png");
const MandiriLogo = require("../assets/images/mandiri.png");
const PermataLogo = require("../assets/images/permata.png");

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

export const productSortOptions = [
	{ label: "Default sorting", value: "id" },
	{ label: "Sort by popularity", value: "popularity" },
	{ label: "Sort by rating", value: "rating" },
	{ label: "Sort by price: low to high", value: "low-to-high" },
	{ label: "Sort by price: high to low", value: "high-to-low" }
];

export const courierImages: { [key: string]: any } = {
	jne: JNELogo,
	"J&T": JNTLogo,
	sicepat: SiCepatLogo
};

export const paymentMethods: { name: PaymentMethod; label: string; image: ImageSourcePropType }[] =
	[
		{
			name: "gopay",
			label: "Gopay",
			image: GoPayLogo
		},
		{
			name: "mandiri",
			label: "Mandiri Virtual Account",
			image: MandiriLogo
		},
		{
			name: "bni",
			label: "BNI Virtual Account",
			image: BNILogo
		},
		{
			name: "bri",
			label: "BRI Virtual Account",
			image: BRILogo
		},
		{
			name: "permata",
			label: "Permata Virtual Account",
			image: PermataLogo
		}
	];
