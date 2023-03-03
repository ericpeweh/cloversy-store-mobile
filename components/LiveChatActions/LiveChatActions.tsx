// Dependencies
import React, { useCallback, useRef, useState } from "react";

// Utils
import { shadowProps } from "../../themes/helpers";

// Types
import { Socket } from "socket.io-client";
import { FlatList } from "react-native";

// Icons
import { Ionicons } from "@expo/vector-icons";

// Components
import { HStack, Icon, Input } from "native-base";
import IconButton from "../IconButton/IconButton";
import { IInputComponentType } from "native-base/lib/typescript/components/primitives/Input/types";
import throttleEvent from "../../utils/throttleEvent";

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
	const messageInputRef = useRef<any>(null);
	const [messageInput, setMessageInput] = useState("");

	const scrollToBottomHandler = () => {
		if (scrollToBottomRef.current) {
			scrollToBottomRef.current?.scrollToEnd();
		}
	};

	const sendMessageHandler = () => {
		// e.preventDefault();
		if (messageInput === "" || conversationId === -1) return;

		socket.emit("newMessage", {
			message: messageInput,
			conversationId
		});
		// Emit stop typing event (userTyping)
		stopTypingHandler();

		setMessageInput("");
		messageInputRef.current?.focus();
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
			px={3}
		>
			<Input
				ref={messageInputRef}
				flex={1}
				placeholder="Type message"
				borderRadius="10px"
				fontSize="14px"
				_invalid={{ borderColor: "error.500" }}
				_focus={{ bgColor: "white" }}
				focusOutlineColor="primary.400"
				_input={{ height: "38px", bg: "white", px: 3 }}
			/>
			<IconButton
				onPress={() => {
					// Send message
				}}
				size="sm"
				ml={2}
				borderColor="gray.100"
				icon={<Icon as={Ionicons} name="send" color="gray.400" size="md" />}
			/>
		</HStack>
	);
};

export default LiveChatActions;
