// Dependencies
import React from "react";

// Components
import { Checkbox, ICheckboxProps } from "native-base";

interface CheckoutInputProps extends ICheckboxProps {}

const CheckboxInput = ({ ...props }: CheckoutInputProps) => {
	return (
		<Checkbox
			color="primary.400"
			size="sm"
			_hover={{ bg: "gray.200" }}
			_pressed={{ bg: "gray.200" }}
			_checked={{
				bg: "primary.400",
				borderColor: "primary.400",
				_hover: {
					color: "primary.400",
					bg: "primary.400",
					borderColor: "primary.400"
				},
				_pressed: {
					bg: "primary.400",
					borderColor: "primary.400"
				}
			}}
			_text={{ fontSize: "14px" }}
			{...props}
		/>
	);
};

export default CheckboxInput;
