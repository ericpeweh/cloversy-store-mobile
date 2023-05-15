// Dependencies
import React, { useMemo } from "react";

// Types
import { CheckoutFormValues } from "../../interfaces";

// Hooks
import { useFormikContext } from "formik";

// Utils
import { paymentMethods } from "../../utils/content";

// Components
import { AspectRatio, HStack, Image, Text, View } from "native-base";

const CheckoutPayment = () => {
	const { values } = useFormikContext<CheckoutFormValues>();

	const selectedPayment = useMemo(
		() => paymentMethods.filter(method => method.name === values.payment_method)[0],
		[values.payment_method]
	);

	return (
		<View>
			<HStack alignItems="center" justifyContent="space-between">
				<AspectRatio ratio={2 / 1} width="80px">
					<Image
						source={selectedPayment.image}
						resizeMode="cover"
						width="100%"
						height="100%"
						alt={selectedPayment.name}
						key={selectedPayment.name}
					/>
				</AspectRatio>
				<Text fontWeight="500" fontSize="14px" ml={3}>
					{selectedPayment.label}
				</Text>
			</HStack>
		</View>
	);
};

export default CheckoutPayment;
