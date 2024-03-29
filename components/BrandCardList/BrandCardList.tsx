// Dependencies
import React from "react";

// Styles
import BrandCardListStyles from "./BrandCardList.styles";

// Types
import { RootStackNavigationProp } from "../../interfaces";

// Actions
import { changeBrandFilter } from "../../store/slices/productsSlice";

// Hooks
import useDispatch from "../../hooks/useDispatch";
import { useNavigation } from "@react-navigation/native";

// Components
import { TouchableWithoutFeedback } from "react-native";
import { Box, HStack, Image, ScrollView, Text, View } from "native-base";

const brandCardData = [
	{ label: "Nike AF1", image: require("../../assets/images/nike-af1-logo.png"), brandId: 1 },
	{ label: "Nike AJ", image: require("../../assets/images/nike-aj-logo.png"), brandId: 2 },
	{ label: "Vans", image: require("../../assets/images/vans-logo.png"), brandId: 6 },
	{ label: "Converse", image: require("../../assets/images/converse-logo.png"), brandId: 7 },
	{ label: "Yeezy", image: require("../../assets/images/yeezy-logo.png"), brandId: 3 },
	{ label: "Patrobas", image: require("../../assets/images/patrobas-logo.png"), brandId: 4 },
	{ label: "Ventela", image: require("../../assets/images/ventela-logo.png"), brandId: 5 }
];

const BrandCardList = () => {
	const navigation = useNavigation<RootStackNavigationProp>();
	const dispatch = useDispatch();

	const onBrandButtonClickHandler = (brandId: number) => {
		dispatch(changeBrandFilter(brandId));
		navigation.navigate("ExploreTab");
	};

	return (
		<View mt={4}>
			<Text fontWeight="500" fontSize={16} mb={3}>
				Popular Brands
			</Text>
			<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
				<HStack space={2} height={110} my={1} mx={1}>
					{brandCardData.map(data => (
						<TouchableWithoutFeedback
							key={data.label}
							onPress={() => onBrandButtonClickHandler(data.brandId)}
						>
							<Box style={BrandCardListStyles.brandCard}>
								<Image
									resizeMode="center"
									source={data.image}
									alt={data.label}
									width={80}
									bottom={0}
									left={0}
									right={0}
									top={0}
								/>
							</Box>
						</TouchableWithoutFeedback>
					))}
				</HStack>
			</ScrollView>
		</View>
	);
};

export default BrandCardList;
