// Dependencies
import API from "./index";

// Types
import { Conversation, ResponseWithCursorPagination, GetConversationQuery } from "../interfaces";

const chatApi = API.injectEndpoints({
	endpoints: build => ({
		getConversation: build.query<
			ResponseWithCursorPagination<{ conversation: Conversation }>,
			GetConversationQuery
		>({
			query: ({ currentCursor }) => {
				const params = new URLSearchParams({
					currentCursor: currentCursor === -1 ? "" : currentCursor.toString()
				});

				return `chat?${params.toString()}`;
			}
		})
	}),
	overrideExisting: false
});

export const { useGetConversationQuery } = chatApi;

export default chatApi;
