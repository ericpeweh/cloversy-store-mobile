// Dependencies
import React from "react";
import { StyleSheet } from "react-native";

// Typess
import { RootStackProps } from "../interfaces";

// Components
import { ScrollView, VStack } from "native-base";
import ReviewItem from "../components/ReviewItem/ReviewItem";

const ProductReviewScreen = ({
	route
}: RootStackProps<"HomeProductReview" | "ExploreProductReview" | "WishlistProductReview">) => {
	const { productReviews } = route.params;

	return (
		<ScrollView style={styles.productReviewScreenContainer}>
			<VStack space={3} mb={6} mt={2}>
				{productReviews.map(review => (
					<ReviewItem reviewData={review} key={review.id} />
				))}
			</VStack>
		</ScrollView>
	);
};

export default ProductReviewScreen;

const styles = StyleSheet.create({
	productReviewScreenContainer: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 16
	}
});
