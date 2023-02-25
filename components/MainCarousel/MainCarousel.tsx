// Dependencies
import React, { useCallback, useRef, useState } from "react";

// Hooks
import useDimensions from "../../hooks/useDimensions";

// Components
import { AspectRatio, Box, Button, Center, HStack, Image, ScrollView, View } from "native-base";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { GestureHandlerRootView, TouchableWithoutFeedback } from "react-native-gesture-handler";

interface MainCarouselProps {
	images: string[];
	onImagePress: (imageIndex: number) => void;
}

const MainCarousel = ({ images, onImagePress }: MainCarouselProps) => {
	const carouselRef = useRef<ICarouselInstance | null>(null);
	const [carouselItemIndex, setCarouselItemIndex] = useState(0);

	const { window } = useDimensions();

	const handleSnapToItem = useCallback((index: number) => {
		setCarouselItemIndex(index);
	}, []);

	const nextImageHandler = () => {
		carouselRef.current?.next({ animated: true });
	};

	const prevImageHandler = () => {
		carouselRef.current?.prev({ animated: true });
	};

	return (
		<GestureHandlerRootView>
			<View>
				<Carousel
					enabled={images && images.length > 1}
					loop
					ref={carouselRef}
					width={window.width}
					height={362}
					panGestureHandlerProps={{
						onCancelled: e => {
							if ((e.nativeEvent.translationX as number) > 0) {
								prevImageHandler();
							} else {
								nextImageHandler();
							}
						}
					}}
					autoPlay={images && images.length > 1}
					autoPlayInterval={10000}
					data={images}
					scrollAnimationDuration={500}
					onSnapToItem={handleSnapToItem}
					renderItem={({ item, index }) => (
						<TouchableWithoutFeedback onPress={() => onImagePress(index)}>
							<AspectRatio ratio={1 / 1}>
								<Image
									source={{ uri: item }}
									alt={`Product image ${index}`}
									resizeMode="cover"
									width={window.width}
									maxWidth={450}
								/>
							</AspectRatio>
						</TouchableWithoutFeedback>
					)}
				/>
				{images.length > 1 && (
					<Center position="absolute" bottom={2} width="100%">
						<HStack space={2} mt={2} justifyContent="center">
							{images.map((image, i) => (
								<View
									borderRadius="full"
									height={2}
									width={2}
									borderColor="gray.500"
									borderWidth={0.5}
									bg={carouselItemIndex === i ? "primary.400" : "gray.200"}
									key={`${image}-${i}`}
								></View>
							))}
						</HStack>
					</Center>
				)}
			</View>
		</GestureHandlerRootView>
	);
};

export default MainCarousel;
