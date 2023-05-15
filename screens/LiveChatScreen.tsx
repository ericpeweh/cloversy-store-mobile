// Dependencies
import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { shallowEqual } from "react-redux";

// Types
import { FlatList as FlatListType } from "react-native";
import { Message, RootStackProps, User } from "../interfaces";

// Actions
import {
	setMessages,
	setChatCursor,
	setCurrentCursor,
	setConversationData,
	addNewMessage,
	setActiveUsers
} from "../store/slices/chatSlice";

// Utils
import initSocketIO from "../utils/initSocketIO";

// Hooks
import { useEffect } from "react";
import { useGetConversationQuery } from "../api/chat.api";
import useDispatch from "../hooks/useDispatch";
import useSelector from "../hooks/useSelector";
import useHideHeaderTabbar from "../hooks/useHideHeaderTabbar";

// Components
import { SafeAreaView } from "react-native-safe-area-context";
import LiveChatHeader from "../components/LiveChatHeader/LiveChatHeader";
import LiveChatActions from "../components/LiveChatActions/LiveChatActions";
import LiveChatConversation from "../components/LiveChatConversation/LiveChatConversation";
import AlertBox from "../components/AlertBox/AlertBox";

// Init web socket connection
const socketClient = initSocketIO();

const LiveChatScreen = ({ navigation }: RootStackProps<"AccountLiveChat">) => {
	const dispatch = useDispatch();
	const { conversationId, messages, currentCursor, chatCursor, minCursor, nextCursor } =
		useSelector(state => state.chat, shallowEqual);
	const { isAuth, token, email: authEmail } = useSelector(state => state.auth, shallowEqual);
	const [isLoadingMoreMessage, setIsLoadingMoreMessage] = useState(false);
	const [connectError, setConnectError] = useState(false);
	const [scrollOffsetY, setScrollOffsetY] = useState(-1);

	// Scroll to bottom feature
	const scrollToBottomRef = useRef<FlatListType>(null);
	const [messageAtBottom, setMessageAtBottom] = useState(0);

	// User typing feature
	const [userTyping, setUserTyping] = useState("");

	const {
		data: conversationData,
		isFetching: isGetConversationFetching,
		isLoading: isGetConversationLoading,
		isSuccess: isGetConversationSuccess
	} = useGetConversationQuery(
		{ currentCursor: chatCursor },
		{
			skip: !isAuth
		}
	);

	useEffect(() => {
		if (conversationData && isGetConversationSuccess && !isGetConversationFetching) {
			if (currentCursor === -1 || currentCursor > conversationData.currentCursor) {
				const { currentCursor, data, minCursor, maxCursor, nextCursor } = conversationData;

				dispatch(setMessages(data.conversation.messages));
				dispatch(setCurrentCursor(currentCursor));
				dispatch(
					setConversationData({
						min: minCursor,
						max: maxCursor,
						next: nextCursor,
						conversationId: data.conversation.id
					})
				);
			}
		}
	}, [
		conversationData,
		currentCursor,
		isGetConversationSuccess,
		isGetConversationFetching,
		dispatch
	]);

	const loadMoreMessageHandler = () => {
		if (conversationData) {
			setIsLoadingMoreMessage(true);
			dispatch(setChatCursor(conversationData.nextCursor));

			setTimeout(() => {
				setIsLoadingMoreMessage(false);
			}, 700);
		}
	};

	// Websocket connection & events
	useEffect(() => {
		if (isAuth && token) {
			socketClient.connect(token);

			// Connection success
			socketClient.socket.on("connect", () => {
				setConnectError(false);
			});

			// Failed connect to websocket server
			socketClient.socket.on("connect_error", () => {
				setConnectError(true);
			});

			// Handle incoming message
			socketClient.socket.on("newMessageResponse", (newMessage: Message) => {
				// Store message to conversation messages
				dispatch(addNewMessage(newMessage));

				// Increase message at bottom count if user at the current conversation tab
				if (
					scrollOffsetY > 500 &&
					newMessage.conversation_id === conversationId &&
					newMessage.email !== authEmail
				) {
					setMessageAtBottom(prev => prev + 1);
				}
			});
		}

		// Active users feature
		socketClient.socket.on("activeUsers", (users: Partial<User>[]) => {
			dispatch(setActiveUsers(users));
		});

		// User typing feature
		socketClient.socket.on(
			"userTypingResponse",
			(data: { is_typing: boolean; full_name: string; conversation_id: string; email: string }) => {
				// If user typing is chat opponent
				if (data.email !== authEmail) {
					const { is_typing, conversation_id, full_name } = data;
					if (+conversation_id !== conversationId) return;

					setUserTyping(is_typing ? `${full_name} sedang mengetik...` : "");
				}
			}
		);

		return () => {
			socketClient.socket.off("connect");
			socketClient.socket.off("connect_error");
			socketClient.socket.off("newMessageResponse");
			socketClient.socket.off("activeUsers");
			socketClient.socket.off("userTypingResponse");
		};
	}, [isAuth, token, dispatch, conversationId, authEmail, scrollOffsetY]);

	const resetMessageAtBottomHandler = () => {
		setMessageAtBottom(0);
	};

	// Hide parent header and tabbar on mount
	useHideHeaderTabbar(navigation);

	return (
		<SafeAreaView style={styles.liveChatScreenContainer}>
			{connectError && <AlertBox>Failed </AlertBox>}
			<LiveChatHeader userTyping={userTyping} />
			<LiveChatConversation
				messages={messages}
				onLoadMore={loadMoreMessageHandler}
				hasMore={nextCursor > minCursor && !isGetConversationFetching}
				currentCursor={currentCursor}
				isLoading={isGetConversationLoading}
				isFetching={isGetConversationFetching}
				isLoadingMoreMessage={isLoadingMoreMessage}
				ref={scrollToBottomRef}
				onResetMessageAtBottom={resetMessageAtBottomHandler}
				onOffsetYChange={offset => setScrollOffsetY(offset)}
			/>
			<LiveChatActions
				conversationId={conversationId}
				socket={socketClient.socket}
				scrollToBottomRef={scrollToBottomRef}
				messageAtBottom={messageAtBottom}
				onResetMessageAtBottom={resetMessageAtBottomHandler}
			/>
		</SafeAreaView>
	);
};

export default LiveChatScreen;

const styles = StyleSheet.create({
	liveChatScreenContainer: {
		flex: 1,
		backgroundColor: "#fff"
	}
});
