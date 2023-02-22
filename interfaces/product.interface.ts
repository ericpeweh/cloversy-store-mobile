export interface Product {
	id: number;
	title: string;
	sku: string;
	price: number;
	status: "active" | "disabled";
	category_id: number;
	category: string;
	brand_id: number;
	brand: string;
	description: string;
	slug: string;
	created_at: string;
	modified_at: string;
	tags: string[];
	sizes: string[];
	image: string;
	images: string[];
	recommendations: Product[];
	rating: string;
	review_count: string;
	reviews: ProductReviewItem[];
}

export interface ProductReviewItem {
	id: number;
	rating: string;
	description: string;
	created_at: string;
	profile_picture: string;
	full_name: string;
}

export interface SearchProductsQuery {
	q: string;
}

export interface GetProductsQuery {
	page: number | string;
	brandFilter: number;
	q: string;
	sortBy: string;
	priceFilter: [number, number];
}

export interface GetSingleProductQuery {
	productSlug: string;
}

export type ProductsSortValues = "id" | "popularity" | "rating" | "low-to-high" | "high-to-low";

export interface ProductLastSeen {
	id: number;
	user_id: number;
	product_id: number;
	seen_date: string;
	title: string;
	price: string;
	slug: string;
	images: string[] | null;
}
