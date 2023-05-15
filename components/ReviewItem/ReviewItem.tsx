// Dependencies
import React from "react";

// Types
import { ProductReviewItem } from "../../interfaces";

// Utils
import { formatDateFullMonth } from "../../utils/formatDate";

// Components
import { Avatar, Divider, HStack, Text, VStack } from "native-base";
import RatingInput from "../RatingInput/RatingInput";

interface ReviewItemProps {
	reviewData: ProductReviewItem;
}

const ReviewItem = ({ reviewData }: ReviewItemProps) => {
	return (
		<VStack>
			<HStack alignItems="flex-start">
				<Avatar
					source={{ uri: reviewData.profile_picture, headers: { referrer: "no-ref" } }}
					bg="gray.200"
					width="40px"
					height="40px"
				/>
				<VStack ml={3} mt={-0.3}>
					<Text fontWeight="500" fontSize="14px">
						{reviewData.full_name}
					</Text>
					<Text color="gray.400" fontSize="12px">
						{formatDateFullMonth(reviewData.created_at)}
					</Text>
				</VStack>
				<RatingInput
					startingValue={+reviewData.rating}
					imageSize={16}
					style={{ marginLeft: "auto", alignSelf: "center" }}
				/>
			</HStack>
			<Text fontSize="13px" color="gray.600" mt={2}>
				{reviewData.description}
			</Text>
			<Divider bgColor="gray.200" mt={3} mb={2} />
		</VStack>
	);
};

export default ReviewItem;
