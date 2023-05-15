// Dependencies
import React from "react";

// Icons
import { Entypo } from "@expo/vector-icons";

// Components
import { HStack, Icon, Pressable, Text, View } from "native-base";

interface AccountMenuListItemProps {
	icon: unknown;
	iconName: string;
	label: string;
	onPress?: () => void;
	hideArrow?: boolean;
}

const AccountMenuListItem = ({
	icon,
	iconName,
	label,
	onPress,
	hideArrow = false
}: AccountMenuListItemProps) => {
	return (
		<Pressable borderBottomWidth="1px" borderBottomColor="gray.100" onPress={onPress}>
			{({ isHovered, isPressed }) => (
				<View bg={isHovered || isPressed ? "gray.100:alpha.50" : "white"} px={4} py={4}>
					<HStack alignItems="center" justifyContent="space-between">
						<HStack space={5} alignItems="center">
							<Icon as={icon} name={iconName} color="gray.800" size="20px" />
							<Text>{label}</Text>
						</HStack>
						{!hideArrow && (
							<Icon as={Entypo} name="chevron-right" color="gray.400" size="20px" ml="auto" />
						)}
					</HStack>
				</View>
			)}
		</Pressable>
	);
};

export default AccountMenuListItem;
