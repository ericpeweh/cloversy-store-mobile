// Dependencies
import React, { useCallback, useState } from "react";

// Utils
import { shadowProps } from "../../themes/helpers";
import throttleEvent from "../../utils/throttleEvent";

// Types
import { Socket } from "socket.io-client";

// Icons
import { Ionicons } from "@expo/vector-icons";

// Components
import { FlatList } from "react-native";
import { Center, HStack, Icon, Input } from "native-base";
import IconButton from "../IconButton/IconButton";
import Button from "../Button/Button";

interface ChattingActionsProps {
	socket: Socket;
	conversationId: number;
	scrollToBottomRef: React.RefObject<FlatList>;
	messageAtBottom: number;
	onResetMessageAtBottom: () => void;
}

let timeout: NodeJS.Timeout;

const LiveChatActions = ({
	socket,
	conversationId,
	scrollToBottomRef,
	messageAtBottom,
	onResetMessageAtBottom
}: ChattingActionsProps) => {
	const [messageInput, setMessageInput] = useState("");

	const scrollToBottomHandler = () => {
		if (scrollToBottomRef.current) {
			scrollToBottomRef.current?.scrollToOffset({ offset: 0, animated: false });
		}
	};

	const sendMessageHandler = () => {
		if (messageInput === "" || conversationId === -1) return;

		socket.emit("newMessage", {
			message: messageInput,
			conversationId
		});
		// Emit stop typing event (userTyping)
		stopTypingHandler();

		setMessageInput("");
	};

	const stopTypingHandler = () => {
		socket.emit("userTyping", { conversationId, isTyping: false });
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const throttledMessageTypingHandler = useCallback(
		throttleEvent(() => {
			socket.emit("userTyping", {
				conversationId,
				isTyping: true
			});
			if (timeout) clearTimeout(timeout);
			timeout = setTimeout(stopTypingHandler, 2500);
		}, 1000),
		[conversationId, socket]
	);

	return (
		<HStack
			borderTopColor="gray.200"
			borderTopWidth="1"
			bg="white"
			height="56px"
			width="100%"
			alignItems="center"
			justifyContent="space-between"
			style={{ ...shadowProps.xs }}
			position="relative"
		>
			{messageAtBottom > 0 && (
				<Center position="absolute" bottom="65px" width="100%">
					<Button
						bg="secondary.300"
						_pressed={{ bg: "secondary.400" }}
						_text={{ fontSize: "12px" }}
						endIcon={<Icon as={Ionicons} name="information-circle" />}
						onPress={() => {
							scrollToBottomHandler();
							onResetMessageAtBottom();
						}}
					>
						{`${messageAtBottom} New ${messageAtBottom > 1 ? "Messages" : "Message"}`}
					</Button>
				</Center>
			)}
			<HStack px={3} alignItems="center">
				<Input
					flex={1}
					placeholder="Type message"
					borderRadius="10px"
					fontSize="14px"
					_invalid={{ borderColor: "error.500" }}
					_focus={{ bgColor: "white" }}
					focusOutlineColor="primary.400"
					_input={{ height: "38px", bg: "white", px: 3 }}
					value={messageInput}
					onChangeText={value => setMessageInput(value)}
					onKeyPress={throttledMessageTypingHandler}
				/>
				<IconButton
					onPress={() => sendMessageHandler()}
					size="sm"
					ml={2}
					borderColor="gray.100"
					icon={
						<Icon
							as={Ionicons}
							name="send"
							color={messageInput && conversationId !== -1 ? "primary.400" : "gray.400"}
							size="md"
						/>
					}
				/>
			</HStack>
		</HStack>
	);
};

export default LiveChatActions;
