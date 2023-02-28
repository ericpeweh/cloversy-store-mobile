// Dependencies
import React from "react";

// Types
import { CheckoutFormValues, RootStackNavigationProp, RootStackParamList } from "../../interfaces";
import { IHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";

// Hooks
import { useNavigation } from "@react-navigation/native";
import { useFormikContext } from "formik";

// Components
import Button from "../Button/Button";
import { HStack, Text } from "native-base";

interface CheckoutSectionTitleProps extends IHStackProps {
	title: string;
	isDisabled?: boolean;
	navigateScreenName?: keyof RootStackParamList;
	buttonText?: string;
}

const CheckoutSectionTitle = ({
	title,
	isDisabled = false,
	navigateScreenName,
	buttonText = "Change",
	...props
}: CheckoutSectionTitleProps) => {
	const { values } = useFormikContext<CheckoutFormValues>();
	const navigation = useNavigation<RootStackNavigationProp>();

	return (
		<HStack justifyContent="space-between" alignItems="center" mb={3} {...props}>
			<Text fontWeight="500" fontSize="15px">
				{title}
			</Text>
			{navigateScreenName && (
				<Button
					py={1}
					_text={{ fontWeight: "500", fontSize: "12px" }}
					_pressed={{ bg: "primary.500" }}
					onPress={() =>
						!isDisabled && navigation.navigate(navigateScreenName as any, { state: values })
					}
					isLoading={isDisabled}
					disabled={isDisabled}
				>
					{buttonText}
				</Button>
			)}
		</HStack>
	);
};

export default CheckoutSectionTitle;
