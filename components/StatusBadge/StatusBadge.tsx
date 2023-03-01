// Dependencies
import React from "react";

// Components
import { Badge, IBadgeProps } from "native-base";

interface StatusBadgeProps extends IBadgeProps {
	children: string | React.ReactElement | React.ReactElement[];
	color?: string;
}

const StatusBadge = ({ children, color, ...props }: StatusBadgeProps) => {
	return (
		<Badge
			bg={color}
			_text={{ color: "white", textTransform: "uppercase", fontSize: "11px" }}
			borderRadius="10px"
			px={2}
			py={0.5}
			{...props}
		>
			{children}
		</Badge>
	);
};

export default StatusBadge;
