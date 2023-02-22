// Dependencies
import React from "react";

// Types
import { InterfaceViewProps } from "native-base/lib/typescript/components/basic/View/types";

// Components
import { View } from "native-base";

interface FallbackContainerProps extends InterfaceViewProps {
	size?: "sm" | "md" | "lg";
}

const FallbackContainer = ({ size = "sm", children, ...props }: FallbackContainerProps) => {
	return (
		<View my={size === "sm" ? 2 : size === "md" ? 4 : 6} alignItems="center" {...props}>
			{children}
		</View>
	);
};

export default FallbackContainer;
