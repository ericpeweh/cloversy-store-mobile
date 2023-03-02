// Dependencies
import React from "react";
import { shallowEqual } from "react-redux";

// Hooks
import useSelector from "../../hooks/useSelector";

// Icons
import { MaterialIcons } from "@expo/vector-icons";

// Images
const NoImagePlaceholder = require("../../assets/images/no-image.png");

// Components
import { View, Text, HStack, Avatar, VStack, Icon, Badge } from "native-base";
import IconButton from "../IconButton/IconButton";

const AccountHeader = () => {
	const { email, email_verified, full_name, profile_picture, birth_date, contact } = useSelector(
		state => state.auth,
		shallowEqual
	);

	return (
		<VStack>
			<HStack
				space={3}
				alignItems="center"
				padding={4}
				borderBottomWidth="3"
				borderBottomColor="gray.100"
			>
				<Avatar
					bg="gray.200"
					source={
						profile_picture
							? { uri: profile_picture, headers: { referrer: "no-ref" } }
							: NoImagePlaceholder
					}
					width="55px"
					height="55px"
				/>
				<VStack>
					<Text fontSize="14px">Hello,</Text>
					<Text fontWeight="500" fontSize="16px" letterSpacing={0.5}>
						{full_name}
					</Text>
				</VStack>
				<IconButton
					variant="outline"
					size="sm"
					borderColor="gray.100"
					icon={<Icon as={MaterialIcons} name="edit" color="gray.700" size="md" mr={-0.5} />}
					ml="auto"
				/>
			</HStack>
		</VStack>
	);
};

export default AccountHeader;
