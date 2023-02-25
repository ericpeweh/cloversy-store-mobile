// Dependencies
import React from "react";

// Components
import { Button, Text, IButtonProps } from "native-base";

interface TryAgainButtonProps extends IButtonProps {}

const TryAgainButton = ({ children, ...props }: TryAgainButtonProps) => {
	return (
		<Button variant="outline" py={2} px={4} _pressed={{ bgColor: "gray.100" }} {...props}>
			<Text fontSize="13px">{children as React.ReactNode}</Text>
		</Button>
	);
};

export default TryAgainButton;
