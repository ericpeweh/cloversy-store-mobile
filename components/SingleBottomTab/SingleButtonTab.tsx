// Dependencies
import React from "react";

// Utils
import { shadowProps } from "../../themes/helpers";

// Icons
import { Feather } from "@expo/vector-icons";

// Components
import { Text, HStack, Pressable, Icon } from "native-base";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface SingleButtonTabProps {
	text: string;
	type?: "confirm" | "cancel";
	onPress: () => void;
	isLoading?: boolean;
}

const SingleButtonTab = ({ text, type = "confirm", isLoading, onPress }: SingleButtonTabProps) => {
	const isCancel = type === "cancel";

	return (
		<HStack
			bg={isCancel ? "gray.100" : "primary.400"}
			borderTopColor="gray.100"
			borderTopWidth={0.6}
			height="56px"
			width="100%"
			alignItems="center"
			justifyContent="space-between"
			style={{ ...shadowProps.xl }}
		>
			<Pressable
				flex={1}
				bg={isCancel ? "gray.100" : "primary.400"}
				alignSelf="stretch"
				alignItems="center"
				justifyContent="center"
				onPress={() => onPress()}
				disabled={isLoading}
			>
				{({ isHovered, isPressed }) => {
					let bgColor = "";
					if (isHovered || isPressed) {
						bgColor = isCancel ? "primary.400:alpha.10" : "white:alpha.10";
					} else {
						bgColor = isCancel ? "white" : "primary.400";
					}

					return isLoading ? (
						<LoadingSpinner size="sm" color="white" />
					) : (
						<HStack
							space={3}
							height="100%"
							width="100%"
							justifyContent="center"
							alignItems="center"
							bg={bgColor}
						>
							<Text
								color={isCancel ? "black" : "white"}
								fontSize="13px"
								fontWeight="500"
								letterSpacing={0.5}
								textTransform="uppercase"
							>
								{text}
							</Text>
							<Icon
								as={Feather}
								name={isCancel ? "x-circle" : "check"}
								size="md"
								color={isCancel ? "black" : "white"}
							/>
						</HStack>
					);
				}}
			</Pressable>
		</HStack>
	);
};

export default SingleButtonTab;
