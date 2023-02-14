// Dependencies
import React, { useState } from "react";

// Hooks
import useDimensions from "../../hooks/useDimensions";

// Components
import { Box, Image, Pressable, View } from "native-base";
import Carousel from "react-native-reanimated-carousel";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const carouselItems = [
	{
		image: require("../../assets/images/1.jpg"),
		title: "Nike AF1 Homesick"
	},
	{
		image: require("../../assets/images/2.jpg"),
		title: "Challenges Ventela V1"
	},
	{
		image: require("../../assets/images/3.jpg"),
		title: "Nike AF1 Homesick"
	}
];

const MainCarousel = () => {
	const [carouselItemIndex, setCarouselItemIndex] = useState(0);
	const { window } = useDimensions();

	return (
		<View>
			<GestureHandlerRootView>
				<Carousel
					loop
					width={window.width}
					height={282}
					autoPlay={true}
					autoPlayInterval={10000}
					data={carouselItems}
					scrollAnimationDuration={500}
					onSnapToItem={index => setCarouselItemIndex(index)}
					renderItem={({ item }) => (
						<Pressable style={{ position: "relative" }}>
							{({ isHovered, isPressed }) => (
								<>
									<Image source={item.image} alt={item.title} height={280} />
									<View
										position="absolute"
										top={0}
										left={0}
										right={0}
										bottom={0}
										bgColor={isHovered || isPressed ? "white:alpha.20" : "transparent"}
									></View>
								</>
							)}
						</Pressable>
					)}
				/>
			</GestureHandlerRootView>
			<View
				flexDir="row"
				position="absolute"
				left={carouselItemIndex === 0 ? 0 : `${carouselItemIndex}/${carouselItems.length}`}
				bottom={0}
			>
				<Box
					backgroundColor="primary.400"
					borderRadius={2}
					style={{
						height: 3,
						width: window.width / carouselItems.length
					}}
				></Box>
			</View>
		</View>
	);
};

export default MainCarousel;
