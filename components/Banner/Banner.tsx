// Types
import { ImageSourcePropType, TouchableWithoutFeedback } from "react-native";
import { IBoxProps, Text } from "native-base";

// Components
import { Image, View, Box } from "native-base";
import Button from "../Button/Button";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../../interfaces";

interface BannerProps extends IBoxProps {
	imageSrc: ImageSourcePropType;
	title: string;
	buttonText?: string;
	height?: number;
	productSlug: string;
}

const Banner = ({
	imageSrc,
	title,
	height = 220,
	buttonText = "Shop now",
	productSlug,
	children,
	...props
}: BannerProps) => {
	const navigation = useNavigation<RootStackNavigationProp>();

	const bannerActionPressHandler = () => {
		navigation.navigate("HomeProduct", {
			productSlug: productSlug,
			runHeaderFn: true
		});
	};

	return (
		<TouchableWithoutFeedback>
			<Box style={{ position: "relative" }} {...props}>
				<Image source={imageSrc} alt={title} height={height} />
				<View position="absolute" width="100%" height="100%" bgColor="dark.100:alpha.20"></View>
				<View position="absolute" bottom="40px" left="15px" mb={2}>
					<Text fontWeight="600" fontSize="18px" mb={2} color="white">
						{title}
					</Text>
					<Button
						variant="outline"
						bgColor="white:alpha.10"
						py={2}
						style={{ borderWidth: 1 }}
						width="120px"
						onPress={bannerActionPressHandler}
					>
						<Text color="white" fontWeight="700" fontSize="14px">
							{buttonText}
						</Text>
					</Button>
				</View>
			</Box>
		</TouchableWithoutFeedback>
	);
};

export default Banner;
