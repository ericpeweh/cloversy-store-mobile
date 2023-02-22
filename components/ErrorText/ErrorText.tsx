// Dependencies
import React from "react";

// Types
import { ColorType } from "native-base/lib/typescript/components/types";
import { ITextProps } from "native-base";

// Components
import { Text } from "native-base";

interface ErrorTextProps extends ITextProps {
	color?: ColorType;
}

const ErrorText = ({ children, color = "red.600" }: ErrorTextProps) => {
	return (
		<Text color={color} fontSize="13px" mb={3}>
			{children}
		</Text>
	);
};

export default ErrorText;
