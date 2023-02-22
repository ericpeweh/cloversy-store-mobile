// Dependencies
import React from "react";

// Hooks
import { useTheme } from "native-base";

// Components
import { Rating, SwipeRatingProps } from "react-native-ratings";

interface RatingInputProps extends SwipeRatingProps {}

const RatingInput = ({ ...props }: RatingInputProps) => {
	const { colors } = useTheme();

	return (
		<Rating
			type="custom"
			readonly
			imageSize={18}
			ratingBackgroundColor={colors.trueGray[100]}
			{...props}
		/>
	);
};

export default RatingInput;
