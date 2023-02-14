export interface PaginationData {
	page: number;
	pageSize: number;
	totalCount: number;
	totalPages: number;
}

export interface CursorPaginationData {
	nextCursor: number;
	currentCursor: number;
	maxCursor: number;
	minCursor: number;
}

export interface ResponseBody<T> {
	status: "success" | "error";
	error?: string;
	data: T;
}

export type ResponseWithPagination<T> = ResponseBody<T> & PaginationData;

export type ResponseWithCursorPagination<T> = ResponseBody<T> & CursorPaginationData;
