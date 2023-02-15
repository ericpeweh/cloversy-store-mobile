// Dependencies
import React from "react";

// Components
import { Button as NBButton, IButtonProps } from "native-base";

interface ButtonProps extends IButtonProps {}

const Button = ({ children, ...props }: ButtonProps) => {
	return (
		<NBButton
			backgroundColor="primary.400"
			color="white"
			textAlign="center"
			borderRadius="10px"
			_hover={{ backgroundColor: "grey.600" }}
			_pressed={{ backgroundColor: "grey.600" }}
			{...props}
		>
			{children}
		</NBButton>
	);
};

export default Button;
