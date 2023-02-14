// Dependencies
import React from "react";

// Components
import { Flex, Text, View } from "native-base";

const BestSellers = () => {
	return (
		<View mt={4}>
			<Text fontWeight="500" fontSize={15} mb={3}>
				Best Sellers
			</Text>
			<Flex>
				{/* <HStack space={2} height={110} my={1} mx={1}>
					{brandCardData.map(data => (
						<TouchableWithoutFeedback key={data.label} onPress={() => alert("Pressed")}>
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
				</HStack> */}
			</Flex>
		</View>
	);
};

export default BestSellers;
