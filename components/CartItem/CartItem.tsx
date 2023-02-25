// Dependencies
import React, { useEffect, useState } from "react";

// Hooks
import useCart from "../../hooks/useCart";
import useDebounce from "../../hooks/useDebounce";
import useDispatch from "../../hooks/useDispatch";
import { useNavigation } from "@react-navigation/native";

// Icons
import { AntDesign } from "@expo/vector-icons";

// Types
import { CartItemDetails, RootStackNavigationProp } from "../../interfaces";

// Images
const ProductPlaceholderImage = require("../../assets/images/no-image.png");

// Actions
import { updateUserCartItem } from "../../store/slices/globalSlice";

// Utils
import formatToRupiah from "../../utils/formatToRupiah";

// Components
import { AspectRatio, HStack, Icon, Image, Text, View, VStack } from "native-base";
import IconButton from "../IconButton/IconButton";
import { TouchableWithoutFeedback } from "react-native";
import QuantityInput from "../QuantityInput/QuantityInput";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface CartItemProps {
	itemData: CartItemDetails;
	onDelete: (cartItem: CartItemDetails) => void;
	isDeleteLoading: boolean;
}

const CartItem = ({ itemData, onDelete, isDeleteLoading }: CartItemProps) => {
	const dispatch = useDispatch();
	const navigation = useNavigation<RootStackNavigationProp>();
	const [quantityTouched, setQuantityTouched] = useState(false);
	const [quantity, setQuantity] = useState(itemData.quantity);

	const quantityDebounced = useDebounce(quantity, 800);

	const quantityTouchedHandler = () => setQuantityTouched(true);

	const { updateCartItemHandler, isDeleteCartItemLoading } = useCart();

	useEffect(() => {
		setQuantity(itemData.quantity);
	}, [itemData]);

	useEffect(() => {
		if (quantity && !isDeleteCartItemLoading) {
			dispatch(updateUserCartItem({ ...itemData, quantity }));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, quantity, isDeleteCartItemLoading]);

	useEffect(() => {
		if (quantityDebounced === 0 && quantityTouched) {
			setQuantity(1);
			onDelete(itemData);
		}

		if (!isNaN(quantityDebounced) && quantityDebounced > 0 && quantityTouched) {
			updateCartItemHandler({ id: itemData.id, quantity: quantityDebounced });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [quantityDebounced, quantityTouched]);

	const cartItemPressHandler = () => {
		navigation.navigate("HomeProduct", {
			productSlug: itemData.slug,
			runHeaderFn: false,
			runTabbarFn: false
		});
	};

	return (
		<View>
			<HStack
				bg="white"
				position="relative"
				p="15px"
				space={3}
				borderBottomWidth="1px"
				borderBottomColor="gray.100"
			>
				<TouchableWithoutFeedback onPress={() => cartItemPressHandler()}>
					<AspectRatio w="20" ratio={1 / 1}>
						<Image
							source={itemData.images ? { uri: itemData.images[0] } : ProductPlaceholderImage}
							resizeMode="cover"
							width="100%"
							height="100%"
							alt={itemData.title}
							borderRadius="10px"
						/>
					</AspectRatio>
				</TouchableWithoutFeedback>
				<VStack>
					<Text
						fontSize="14px"
						fontWeight="500"
						pt={0}
						textTransform="uppercase"
						color="gray.700"
						onPress={() => cartItemPressHandler()}
					>
						{itemData.title}
					</Text>
					<Text fontSize="13px" fontWeight="400" pt={1} pb={2} color="gray.500">
						EU {itemData.size}
					</Text>
					<HStack space={2}>
						<QuantityInput
							value={quantity}
							onChangeQuantity={setQuantity}
							onChangeCallback={quantityTouchedHandler}
						/>
						<IconButton
							icon={
								isDeleteLoading ? (
									<LoadingSpinner size="sm" color="primary.400" />
								) : (
									<Icon as={AntDesign} name="delete" color="gray.600" size="18px" />
								)
							}
							bg="white"
							disabled={isDeleteLoading}
							_pressed={{
								bg: "gray.100",
								borderColor: "gray.300"
							}}
							padding={2}
							alignSelf="center"
							borderWidth="1px"
							borderColor="gray.200"
							borderRadius="full"
							onPress={() => onDelete(itemData)}
						/>
					</HStack>
				</VStack>
				<Text
					fontSize="13px"
					fontWeight="400"
					pt={1}
					pb={2}
					color="gray.500"
					alignSelf="center"
					ml="auto"
				>
					{formatToRupiah(itemData.quantity * itemData.price)}
				</Text>
			</HStack>
		</View>
	);
};

export default React.memo(CartItem);
