// Dependencies
import React from "react";

// Components
import { IconButton as NBIconButton, IIconButtonProps } from "native-base";

interface IconButtonProps extends IIconButtonProps {
	icon: React.ReactElement;
}

const IconButton = ({ icon, ...props }: IconButtonProps) => {
	return (
		<NBIconButton
			icon={icon}
			borderRadius="full"
			_icon={{
				color: "gray.800",
				size: "lg"
			}}
			_hover={{
				bg: "gray.100"
			}}
			_pressed={{
				bg: "gray.100"
			}}
			{...props}
		/>
	);
};

export default IconButton;
