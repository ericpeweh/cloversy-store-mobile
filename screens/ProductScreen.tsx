// Dependencies
import React from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Share from "react-native-share";

// Types
import { Product, RootStackProps } from "../interfaces";
import { ScrollView as ScrollViewType } from "react-native-gesture-handler";

// Hooks
import { useRef } from "react";
import { useCallback, useLayoutEffect, useState, useEffect, useMemo } from "react";
import useSelector from "../hooks/useSelector";
import { useGetSingleProductQuery } from "../api/product.api";
import { useTrackProductSeenMutation } from "../api/activity.api";

// Icons
import { Entypo, Ionicons } from "@expo/vector-icons";

// Utils
import formatToRupiah from "../utils/formatToRupiah";

// Components
import { Divider, HStack, Icon, Pressable, ScrollView, Text, View, VStack } from "native-base";
import MainCarousel from "../components/MainCarousel/MainCarousel";
import ProductBottomBar from "../components/ProductBottomBar/ProductBottomBar";
import SizeRadio from "../components/SizeRadio/SizeRadio";
import RatingInput from "../components/RatingInput/RatingInput";
import ReviewItem from "../components/ReviewItem/ReviewItem";
import QuantityInput from "../components/QuantityInput/QuantityInput";
import IconButton from "../components/IconButton/IconButton";
import FallbackContainer from "../components/FallbackContainer/FallbackContainer";
import ErrorText from "../components/ErrorText/ErrorText";
import TryAgainButton from "../components/TryAgainButton/TryAgainButton";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import ProductCard from "../components/ProductCard/ProductCard";
import ImageViewer from "../components/ImageViewer/ImageViewer";

const ProductScreen = ({
	route,
	navigation
}: RootStackProps<"HomeProduct" | "ExploreProduct" | "WishlistProduct">) => {
	const { name } = route;

	const productScrollRef = useRef<ScrollViewType>(null);
	const [showFullDescription, setShowFullDescription] = useState(false);
	const [showImageViewer, setShowImageViewer] = useState(false);
	const [imageViewerIndex, setImageViewerIndex] = useState(0);
	const isAuth = useSelector(state => state.auth.isAuth);
	const { productSlug, runHeaderFn = true, runTabbarFn = true } = route.params;

	const {
		data: productData,
		isUninitialized: isGetProductUninitialized,
		isFetching: isGetProductFetching,
		isLoading: isGetProductLoading,
		isSuccess: isGetProductSuccess,
		error: getProductError,
		refetch: refetchProduct
	} = useGetSingleProductQuery({ productSlug }, { skip: !isAuth });
	const product = useMemo<Product | undefined>(() => productData?.data.product, [productData]);
	const productError: any = getProductError;

	const [shoesSize, setShoesSize] = useState(
		product && product.sizes?.length > 0 ? product.sizes[0] : "36"
	);
	const [quantity, setQuantity] = useState(1);

	// Track user product last seen
	const [trackProductSeen] = useTrackProductSeenMutation();

	useEffect(() => {
		if (isAuth && product) {
			trackProductSeen(product.id);

			// Set show full description based on product desc text length
			if (product.description.length > 400) {
				setShowFullDescription(false);
			} else {
				setShowFullDescription(true);
			}
		}
	}, [isAuth, product, trackProductSeen]);

	// Hide parent header on mount
	useLayoutEffect(
		useCallback(() => {
			navigation?.getParent()?.setOptions({
				...(runHeaderFn && { headerShown: false }),
				...(runTabbarFn && { tabBarStyle: { display: "none" } })
			});

			// Cleanup function (revert header & tabbar style changes)
			return () => {
				navigation?.getParent()?.setOptions({
					...(runHeaderFn && { headerShown: true }),
					...(runTabbarFn && {
						tabBarStyle: { display: "flex", height: 56, paddingTop: 5, paddingBottom: 7 }
					})
				});
			};
		}, [])
	);

	const shareProductHandler = async () => {
		try {
			if (product) {
				const productTitle = `Check out this product: \n${product.title}`;
				const productUrl = `https://www.cloversy.id/products/${product.slug}`;
				const productDesc = product.description
					? product.description.slice(0, 200) + "..."
					: "No description provided";

				const options = {
					title: "Share Product",
					message: `${productTitle}\n\n${productUrl}\n\n${productDesc}`
				};

				await Share.open(options);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const scrollToTopHandler = () => {
		if (productScrollRef?.current) {
			productScrollRef.current.scrollTo({ y: 0, animated: true });
		}
	};

	const openAllReviewsHandler = () => {
		if (product) {
			navigation.navigate(`${name}Review`, { productReviews: product.reviews });
		}
	};

	const imagePressHandler = (imageIndex: number) => {
		setImageViewerIndex(imageIndex);
		setShowImageViewer(true);
	};

	return (
		<View style={styles.productScreenContainer} position="relative">
			{!isGetProductLoading && !isGetProductFetching && isGetProductSuccess && product && (
				<ImageViewer
					images={product.images.map(image => ({ uri: image }))}
					imageIndex={imageViewerIndex}
					onRequestClose={() => setShowImageViewer(false)}
					visible={showImageViewer}
				/>
			)}
			<ScrollView ref={productScrollRef}>
				{!isGetProductLoading && !isGetProductFetching && productError && (
					<FallbackContainer my={10} size="lg">
						<ErrorText>{productError?.data?.message || "Error while fetching data"} </ErrorText>
						<TryAgainButton isLoading={isGetProductLoading} onPress={refetchProduct}>
							Try again
						</TryAgainButton>
					</FallbackContainer>
				)}
				{(isGetProductLoading || isGetProductUninitialized || isGetProductFetching) && (
					<FallbackContainer my={10} size="lg">
						<LoadingSpinner />
					</FallbackContainer>
				)}
				{!isGetProductLoading && !isGetProductFetching && isGetProductSuccess && product && (
					<>
						<MainCarousel images={product.images} onImagePress={imagePressHandler} />
						<VStack p={4} mt={1} space={1}>
							<Text fontSize="20px" fontWeight="700" textTransform="uppercase">
								{product.title}
							</Text>
							<HStack alignItems="center" space={3}>
								{product.rating ? (
									<>
										<RatingInput readonly startingValue={+product.rating} />
										<Text fontWeight="400" fontSize={13} color="gray.600" letterSpacing={0.7}>
											{(+product?.rating).toFixed(1)} | {product.review_count} Reviews
										</Text>
									</>
								) : (
									<Text fontWeight="400" fontSize={13} color="gray.600" letterSpacing={0.7}>
										- No reviews yet -
									</Text>
								)}
							</HStack>
							<Text fontWeight="500" fontSize="18px" mt={2} letterSpacing={0.6}>
								{formatToRupiah(product.price)}
							</Text>
							<VStack space={3} mb={4} mt={3}>
								<Text fontSize="15px" fontWeight="500">
									Shoes Size ( EU )
								</Text>
								<SizeRadio
									value={shoesSize}
									onChange={setShoesSize}
									sizeOptions={product?.sizes ?? []}
								/>
							</VStack>
							<HStack alignItems="center" space={3}>
								<Text fontSize="15px" fontWeight="500">
									Product Qty :
								</Text>
								<QuantityInput value={quantity} onChangeQuantity={setQuantity} />
								<IconButton
									onPress={shareProductHandler}
									variant="outline"
									size="sm"
									borderColor="gray.100"
									icon={
										<Icon as={Ionicons} name="share-social-outline" color="gray.700" size="md" />
									}
									ml="auto"
								/>
							</HStack>
							<Divider mb={2} mt={4} bg="gray.200" />
							<VStack space={3} mb={6} mt={2}>
								<Text fontSize="15px" fontWeight="500">
									Product Description
								</Text>
								<Text fontSize="14px" fontWeight="400">
									{product?.description
										? showFullDescription
											? product.description
											: product.description.slice(0, 400) + "..."
										: "No description provided."}
								</Text>
								{product?.description && (
									<View>
										<LinearGradient
											colors={["#ffffff32", "#ffffff"]}
											style={{ marginTop: showFullDescription ? -23 : -35 }}
										>
											<View height={35}></View>
										</LinearGradient>
										<Divider bg="gray.2 00" />
										<Pressable onPress={() => setShowFullDescription(prev => !prev)}>
											{({ isHovered, isPressed }) => (
												<View
													bg={isHovered || isPressed ? "gray.100" : "white"}
													p={2}
													borderBottomRadius={10}
												>
													<HStack alignItems="center" justifyContent="center" space={1}>
														<Text fontSize="14px" fontWeight="400" color="primary.400">
															{showFullDescription ? "Show less" : "Read more"}
														</Text>
														<Icon
															as={Entypo}
															name={showFullDescription ? "chevron-up" : "chevron-down"}
															color="primary.400"
															size="18px"
														/>
													</HStack>
												</View>
											)}
										</Pressable>
									</View>
								)}
							</VStack>
							{+product.review_count > 0 && (
								<VStack space={3} mb={6} mt={2}>
									<HStack justifyContent="space-between" mb={3}>
										<Text fontSize="15px" fontWeight="500">
											Product Reviews ({product.review_count})
										</Text>
										{+product.review_count > 3 && (
											<TouchableWithoutFeedback
												style={{ flexDirection: "row", alignItems: "center" }}
												onPress={openAllReviewsHandler}
											>
												<HStack alignItems="center" space={1}>
													<Text fontSize="14px" fontWeight="400" color="primary.400">
														All Reviews
													</Text>
													<Icon as={Entypo} name="chevron-right" color="primary.400" size="18px" />
												</HStack>
											</TouchableWithoutFeedback>
										)}
									</HStack>
									{product.reviews.slice(0, 3).map(review => (
										<ReviewItem reviewData={review} key={review.id} />
									))}
								</VStack>
							)}
							{product?.recommendations.length > 0 && (
								<VStack space={3} mb={6} mt={2}>
									<Text fontSize="15px" fontWeight="500" mb={2}>
										Related Products
									</Text>
									<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
										{product.recommendations.map((item, i) => (
											<View width={140} key={item.id}>
												<ProductCard
													productData={item}
													index={i}
													size="small"
													style={{ marginRight: 10, marginLeft: 0 }}
													targetScreenName="HomeProduct"
													onPressCallback={scrollToTopHandler}
												/>
											</View>
										))}
									</ScrollView>
								</VStack>
							)}
						</VStack>
					</>
				)}
			</ScrollView>
			{!isGetProductLoading && isGetProductSuccess && product && (
				<ProductBottomBar productData={product} shoesSize={shoesSize} quantity={quantity} />
			)}
		</View>
	);
};

export default ProductScreen;

const styles = StyleSheet.create({
	productScreenContainer: {
		flex: 1,
		backgroundColor: "#fff"
	}
});
