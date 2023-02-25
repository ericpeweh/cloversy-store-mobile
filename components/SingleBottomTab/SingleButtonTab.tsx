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
	onPress: () => void;
	isLoading?: boolean;
}

const SingleButtonTab = ({ text, isLoading, onPress }: SingleButtonTabProps) => {
	return (
		<HStack
			bg="white"
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
				bg="primary.400"
				alignSelf="stretch"
				alignItems="center"
				justifyContent="center"
				onPress={() => onPress()}
				disabled={isLoading}
			>
				{({ isHovered, isPressed }) =>
					isLoading ? (
						<LoadingSpinner size="sm" color="white" />
					) : (
						<HStack
							space={3}
							height="100%"
							width="100%"
							justifyContent="center"
							alignItems="center"
							bg={isHovered || isPressed ? "white:alpha.10" : "primary.400"}
						>
							<Text
								color="white"
								fontSize="13px"
								fontWeight="500"
								letterSpacing={0.5}
								textTransform="uppercase"
							>
								{text}
							</Text>
							<Icon as={Feather} name="check" size="md" color="white" />
						</HStack>
					)
				}
			</Pressable>
		</HStack>
	);
};

export default SingleButtonTab;
