// Dependencies
import React from "react";

// Components
import { Text, Alert, IAlertProps, HStack } from "native-base";

interface AlertBoxProps extends IAlertProps {}

const AlertBox = ({ children, status = "error", ...props }: AlertBoxProps) => {
	return (
		<Alert status={status} px={4} py={3} width="90%" {...props}>
			<HStack space={2} alignSelf="flex-start">
				<Alert.Icon mt="1" />
				<Text fontSize="13px" color="black">
					{children}
				</Text>
			</HStack>
		</Alert>
	);
};

export default AlertBox;
