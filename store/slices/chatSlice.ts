// Dependencies
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Types
import { Message, User } from "../../interfaces";

interface ChatSliceState {
	messages: Message[];
	conversationId: number;
	activeUsers: Partial<User>[];
	currentCursor: number;
	chatCursor: number;
	minCursor: number;
	maxCursor: number;
	nextCursor: number;
}

const initialState: ChatSliceState = {
	conversationId: -1,
	messages: [],
	activeUsers: [],
	currentCursor: -1,
	chatCursor: -1,
	minCursor: 0,
	maxCursor: 0,
	nextCursor: 0
};

const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		setMessages: (state, { payload }: PayloadAction<Message[]>) => {
			state.messages.push(...payload);
		},
		addNewMessage: (state, { payload }: PayloadAction<Message>) => {
			state.messages = [payload, ...state.messages];
		},
		setCurrentCursor: (state, { payload }: PayloadAction<number>) => {
			state.currentCursor = payload;
		},
		setChatCursor: (state, { payload }: PayloadAction<number>) => {
			state.chatCursor = payload;
		},
		setActiveUsers: (state, { payload }: PayloadAction<Partial<User>[]>) => {
			state.activeUsers = payload;
		},
		setConversationData: (
			state,
			{ payload }: PayloadAction<{ min: number; max: number; next: number; conversationId: number }>
		) => {
			state.minCursor = payload.min;
			state.maxCursor = payload.max;
			state.nextCursor = payload.next;
			state.conversationId = payload.conversationId;
		}
	}
});

export const {
	setMessages,
	addNewMessage,
	setCurrentCursor,
	setChatCursor,
	setConversationData,
	setActiveUsers
} = chatSlice.actions;

export default chatSlice.reducer;
