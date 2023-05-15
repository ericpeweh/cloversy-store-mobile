// Dependencies
import React, { forwardRef, MutableRefObject, useCallback, useMemo } from "react";

// Hooks
import useSelector from "../../hooks/useSelector";

// Types
import { Message } from "../../interfaces";
import { NativeScrollEvent, NativeSyntheticEvent, FlatList as FlatListType } from "react-native";

// Utils
import { formatDateFullMonth, formatDateTimeOnly } from "../../utils/formatDate";
import throttleEvent from "../../utils/throttleEvent";

// Components
import { Text, FlatList, HStack } from "native-base";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import FallbackContainer from "../FallbackContainer/FallbackContainer";
import AlertBox from "../AlertBox/AlertBox";

interface LiveChatConversationProps {
	messages: Message[];
	onLoadMore: () => void;
	currentCursor: number;
	hasMore: boolean;
	isLoading: boolean;
	isFetching: boolean;
	isLoadingMoreMessage: boolean;
	onResetMessageAtBottom: () => void;
	onOffsetYChange: (offsetY: number) => void;
}

const LiveChatConversation = forwardRef<FlatListType, LiveChatConversationProps>((props, ref) => {
	const {
		onLoadMore,
		hasMore,
		isLoading,
		isFetching,
		isLoadingMoreMessage,
		messages,
		currentCursor,
		onResetMessageAtBottom,
		onOffsetYChange
	} = props;

	const userEmail = useSelector(state => state.auth.email);

	const conversationScrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const { contentOffset, contentSize } = event.nativeEvent;

		// // Reset bottom chat number if scroll reach almost the end
		if (Math.abs(contentOffset.y) / contentSize.height < 0.06) {
			onResetMessageAtBottom();
			onOffsetYChange(contentOffset.y);
		}
	};

	const conversationScrollEndHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const { contentOffset } = event.nativeEvent;

		if (contentOffset.y) {
			onOffsetYChange(contentOffset.y);
		}
	};

	const modifiedMessages = useMemo(() => {
		let result: Message[] = [];

		messages.forEach((message, i) => {
			result.push(message);

			if (
				i !== messages.length - 1 &&
				message.created_at.slice(8, 10) !== messages[i + 1].created_at.slice(8, 10)
			) {
				result.push({
					...message,
					email: "timestamp"
				});
			}
		});

		return result;
	}, [messages]);

	const keyExtractor = useCallback((item: Message, i: number) => {
		return `${item.id}-${i}`;
	}, []);

	const renderChatItem = useCallback(
		({ item }: { item: Message }) => {
			const isSentByMe = item.email === userEmail;
			const isTimeStamp = item.email === "timestamp";

			return isTimeStamp ? (
				<Text
					alignSelf="center"
					bg="gray.100"
					borderRadius="10px"
					px={3}
					py={1}
					fontSize="12px"
					color="gray.600"
					mt={6}
					mb={4}
				>
					{formatDateFullMonth(item.created_at)}
				</Text>
			) : (
				<HStack
					alignSelf={isSentByMe ? "flex-end" : "flex-start"}
					px={3.5}
					py={1.5}
					pr={12}
					mb={2}
					bg={isSentByMe ? "primary.400" : "gray.200:alpha.60"}
					borderRadius="10px"
					maxWidth="65%"
					position="relative"
				>
					<Text fontSize="13px" color={isSentByMe ? "white" : "black"}>
						{item.body}
					</Text>
					<Text
						pl={3}
						fontSize="10px"
						alignSelf="flex-end"
						color={isSentByMe ? "white" : "black"}
						position="absolute"
						bottom={1}
						right={2}
					>
						{formatDateTimeOnly(item.created_at)}
					</Text>
				</HStack>
			);
		},
		[modifiedMessages]
	);

	return (
		<>
			{!isLoading && messages.length === 0 && (
				<FallbackContainer my={8}>
					<AlertBox status="info">No messages yet, send a message to start a conversation</AlertBox>
				</FallbackContainer>
			)}
			{isLoading && (
				<FallbackContainer my={10}>
					<LoadingSpinner />
				</FallbackContainer>
			)}
			<FlatList
				ref={ref as MutableRefObject<any>}
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "flex-start",
					padding: 16,
					paddingBottom: 0
				}}
				ListFooterComponent={
					currentCursor !== -1 && ((hasMore && isLoadingMoreMessage) || isFetching) ? (
						<FallbackContainer my={2} mb={6}>
							<LoadingSpinner size="sm" />
						</FallbackContainer>
					) : (
						<></>
					)
				}
				onEndReached={() => onLoadMore()}
				inverted={true}
				data={modifiedMessages || []}
				keyExtractor={keyExtractor}
				renderItem={renderChatItem}
				onScroll={throttleEvent(conversationScrollHandler, 2000)}
				onMomentumScrollEnd={throttleEvent(conversationScrollEndHandler, 500)}
			/>
		</>
	);
});

export default LiveChatConversation;
