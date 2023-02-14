export interface Conversation {
	id: number;
	title: string;
	created_by: number;
	created_at: string;
	messages: Message[];
}

export interface Message {
	id: number;
	conversation_id: number;
	body: string;
	sender_id: number;
	created_at: string;
	email: string;
}

export interface GetConversationQuery {
	currentCursor: number;
}
