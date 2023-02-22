// Dependencies
import React from "react";

// Icons
import { AntDesign } from "@expo/vector-icons";

// Components
import ImageView from "react-native-image-viewing";
import { Center, HStack, Icon, Text, View } from "native-base";
import { ImageSource } from "react-native-image-viewing/dist/@types";
import IconButton from "../IconButton/IconButton";

interface ImageViewerProps {
	images: ImageSource[];
	imageIndex: number;
	visible: boolean;
	onRequestClose: () => void;
}

const ImageViewer = ({ images, imageIndex, visible, onRequestClose }: ImageViewerProps) => {
	return (
		<ImageView
			images={images}
			imageIndex={imageIndex}
			visible={visible}
			onRequestClose={onRequestClose}
			HeaderComponent={() => (
				<HStack p={4} alignItems="center" justifyContent="flex-end">
					<IconButton
						onPress={onRequestClose}
						icon={<Icon as={AntDesign} name="close" color="white" />}
						_pressed={{ bg: "gray.700" }}
					/>
				</HStack>
			)}
			backgroundColor="#101010"
			FooterComponent={({ imageIndex }) => (
				<View alignItems="center">
					<Center mb={4}>
						<Text color="white" fontWeight="400" fontSize="18px" letterSpacing={2}>
							{imageIndex + 1} / {images.length}
						</Text>
					</Center>
				</View>
			)}
		/>
	);
};

export default ImageViewer;
