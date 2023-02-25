// Dependencies
import React from "react";

// Types
import { CheckoutFormValues } from "../../interfaces";

// Hooks
import { useFormikContext } from "formik";

// Components
import { Text, View } from "native-base";

const CheckoutNotes = () => {
	const { values } = useFormikContext<CheckoutFormValues>();

	return (
		<View>
			<Text fontWeight="500" fontSize="14px" color="gray.500">
				Order notes:
			</Text>
			<View bg="gray.100" p={3} borderRadius="10px" mt={2}>
				<Text fontSize="13px" color="gray.600">
					{values.customer_note || "No order notes provided."}
				</Text>
			</View>
			<Text mt={3} fontWeight="500" fontSize="14px" color="gray.500">
				Gift notes:
			</Text>
			<View bg="gray.100" p={3} borderRadius="10px" mt={2}>
				<Text fontSize="13px" color="gray.600">
					{values.send_as_gift
						? values.gift_note
							? values.gift_note
							: "No gift notes provided."
						: "Not sent as a gift."}
				</Text>
			</View>
		</View>
	);
};

export default CheckoutNotes;
