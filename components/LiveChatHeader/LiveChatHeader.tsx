// Dependencies
import React from "react";

// Utils
import { shadowProps } from "../../themes/helpers";

// Icons
import { Entypo } from "@expo/vector-icons";

// Types
import { RootStackNavigationProp } from "../../interfaces";

// Hooks
import { useNavigation } from "@react-navigation/native";
import useSelector from "../../hooks/useSelector";

// Images
const LogoSquare = require("../../assets/images/logo-square.jpg");

// Components
import { Avatar, HStack, Icon, Text, VStack } from "native-base";
import IconButton from "../IconButton/IconButton";
import StatusBadge from "../StatusBadge/StatusBadge";

interface ChattingHeaderProps {
	userTyping: string;
}

const LiveChatHeader = ({ userTyping }: ChattingHeaderProps) => {
	const navigation = useNavigation<RootStackNavigationProp>();
	const activeUsers = useSelector(state => state.chat.activeUsers);
	const isAdminActive = Boolean(activeUsers.find(user => user.user_role === "admin"));

	return (
		<HStack
			height="65px"
			p={2}
			px={3}
			alignItems="center"
			space={2}
			borderBottomColor="gray.200"
			borderBottomWidth={1}
			bg="white"
			style={{ ...shadowProps.xs }}
		>
			<IconButton
				onPress={() => {
					if (navigation.canGoBack()) {
						navigation.goBack();
					} else {
						navigation.navigate("AccountDashboard");
					}
				}}
				size="sm"
				borderColor="gray.100"
				icon={<Icon as={Entypo} name="chevron-thin-left" color="gray.700" size="md" />}
			/>
			<Avatar
				bg="gray.200"
				source={LogoSquare}
				width="48px"
				height="48px"
				borderColor="gray.300"
				borderWidth="1"
			/>
			<VStack ml={2}>
				<Text fontWeight="500">Cloversy Admin</Text>
				<Text fontSize="11px">{userTyping || "Customer Service"}</Text>
			</VStack>
			<StatusBadge color={isAdminActive ? "primary.400" : "error.500"} ml="auto">
				{isAdminActive ? "ON" : "OFF"}
			</StatusBadge>
		</HStack>
	);
};

export default LiveChatHeader;
