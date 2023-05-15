// Dependencies
import React, { useMemo } from "react";
import * as Yup from "yup";
import { StyleSheet } from "react-native";
import { Formik } from "formik";

// Types
import { CreateReviewItem, RootStackProps, TransactionItem } from "../interfaces";

// Hooks
import useSelector from "../hooks/useSelector";
import { useCreateReviewsMutation, useGetTransactionDetailsQuery } from "../api/transaction.api";
import useHideHeaderTabbar from "../hooks/useHideHeaderTabbar";

// Icons
import { AntDesign } from "@expo/vector-icons";

// Components
import { View, Text, ScrollView, Center, Icon, VStack } from "native-base";
import FallbackContainer from "../components/FallbackContainer/FallbackContainer";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import AlertBox from "../components/AlertBox/AlertBox";
import TryAgainButton from "../components/TryAgainButton/TryAgainButton";
import OrderDetailsItem from "../components/OrderDetailsItem/OrderDetailsItem";
import RatingInput from "../components/RatingInput/RatingInput";
import FormControlTextArea from "../components/FormControlTextArea/FormControlTextArea";
import Button from "../components/Button/Button";

const ReviewSchema = Yup.object().shape({
	reviews: Yup.array().of(
		Yup.object().shape({
			rating: Yup.number().min(0.5).max(5).required(),
			review: Yup.string()
				.max(200, "Maximum review length is 200 characters")
				.required("Please leave a review")
		})
	)
});

const CreateReviewScreen = ({ route, navigation }: RootStackProps<"AccountCreateReview">) => {
	const isAuth = useSelector(state => state.auth.isAuth);
	const { transactionId } = route.params;

	const {
		data: resultData,
		isLoading: isGetOrderLoading,
		isSuccess: isGetOrderSuccess,
		error: getOrderErrorData,
		refetch: refetchOrder,
		isUninitialized: isGetOrderUninitialized
	} = useGetTransactionDetailsQuery(transactionId, {
		skip: !isAuth
	});
	const getOrderError: any = getOrderErrorData;
	const orderData = resultData?.data.transaction;

	const [
		createReviews,
		{ isLoading: isCreateReviewsLoading, error: createReviewsErrorData, reset: resetCreateReviews }
	] = useCreateReviewsMutation();
	const createReviewsError: any = createReviewsErrorData;

	const createReviewsHandler = async (reviewsData: CreateReviewItem[]) => {
		if (orderData?.id && reviewsData) {
			const result = await createReviews({
				reviews: reviewsData.map(item => ({ ...item, rating: +item.rating * 2 })),
				transactionId: orderData?.id
			}).unwrap();

			if (result.status === "success") {
				resetCreateReviews();
			}
		}
	};

	const products =
		useMemo(() => {
			return orderData?.item_details.reduce((arr: TransactionItem[], curr) => {
				const existItemIndex = arr.findIndex(item => item.product_id === curr.product_id);

				if (existItemIndex !== -1) {
					const arrCopy = JSON.parse(JSON.stringify(arr));

					arrCopy[existItemIndex].product_size += `, EU ${curr.product_size}`;
					arrCopy[existItemIndex].quantity += curr.quantity;

					return arrCopy;
				} else {
					return [...arr, curr];
				}
			}, []);
		}, [orderData?.item_details]) || [];

	// Hide parent header and tabbar on mount
	useHideHeaderTabbar(navigation);

	return (
		<ScrollView style={styles.createReviewScreenContainer}>
			{(isGetOrderLoading || isGetOrderUninitialized) && (
				<FallbackContainer mt={10}>
					<LoadingSpinner />
				</FallbackContainer>
			)}
			{!isGetOrderLoading && getOrderError && (
				<FallbackContainer mt={10}>
					<AlertBox mb={3}>
						{getOrderError?.data?.message || "Error occured while fetching order data"}
					</AlertBox>
					<TryAgainButton onPress={refetchOrder}>Try again</TryAgainButton>
				</FallbackContainer>
			)}
			{isGetOrderSuccess && orderData && orderData.order_status !== "success" && (
				<Center minHeight="200px">
					<Icon as={AntDesign} name="closecircleo" color="error.500" size="70px" />
					<Text fontSize="16px" fontWeight="500" mt={5} width="80%" textAlign="center">
						The transaction has not been completed
					</Text>
				</Center>
			)}
			{isGetOrderSuccess && orderData && orderData?.is_reviewed && (
				<Center minHeight="200px">
					<Icon as={AntDesign} name="checkcircleo" color="primary.400" size="70px" />
					<Text fontSize="16px" fontWeight="500" mt={5} width="80%" textAlign="center">
						Review successfully created
					</Text>
				</Center>
			)}
			{!orderData?.is_reviewed && orderData?.order_status === "success" && (
				<Formik
					initialValues={{
						reviews: products.map(product => ({
							product_id: product.product_id,
							rating: 5,
							review: ""
						}))
					}}
					validationSchema={ReviewSchema}
					onSubmit={values => {
						createReviewsHandler(values.reviews);
					}}
				>
					{({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
						<View>
							<VStack space={8}>
								{products.map((item, i) => (
									<VStack>
										<OrderDetailsItem
											itemData={item}
											disableBorder={true}
											key={`${item.product_id}_${item.product_size}`}
										/>
										<RatingInput
											fractions={4}
											jumpValue={0.5}
											startingValue={+values.reviews[i].rating}
											imageSize={30}
											style={{ alignSelf: "center" }}
											onFinishRating={(rating: number) => {
												setFieldValue(`reviews.${i}.rating`, rating);
											}}
										/>
										<FormControlTextArea
											label="User Review"
											value={values.reviews[i].review}
											placeholder="Review about our products or services"
											onChange={handleChange(`reviews.${i}.review`)}
											onBlur={handleBlur(`reviews.${i}.review`)}
											maxLength={200}
											mt={3}
											isError={Boolean(
												touched.reviews &&
													touched.reviews[i]?.review &&
													errors.reviews &&
													errors.reviews[i]
											)}
											error={
												errors.reviews
													? (errors.reviews[i] as { review: string })?.review
													: "Please leave a review"
											}
										/>
									</VStack>
								))}
							</VStack>
							<Button
								mt={5}
								_text={{ fontWeight: "500" }}
								_pressed={{ bg: "primary.500" }}
								onPress={() => handleSubmit()}
								isLoading={isCreateReviewsLoading}
							>
								Submit Review
							</Button>
							{createReviewsError && (
								<AlertBox status="error" width="100%" mt={3}>
									{createReviewsError?.data?.message || "Error occured while submitting reviews."}
								</AlertBox>
							)}
						</View>
					)}
				</Formik>
			)}
		</ScrollView>
	);
};

export default CreateReviewScreen;

const styles = StyleSheet.create({
	createReviewScreenContainer: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 16
	}
});
