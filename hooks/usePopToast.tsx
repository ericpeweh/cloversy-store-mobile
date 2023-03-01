// Hooks
import { useCallback } from "react";
import { useToast } from "native-base";
import useDimensions from "./useDimensions";

// Icons
import { MaterialIcons } from "@expo/vector-icons";

// Components
import { View, HStack, Text, Icon } from "native-base";

interface UsePopToastProps {
	id: string;
	text: string;
	pageWithTabbar?: boolean;
	showIcon?: boolean;
	duration?: number;
}

const usePopToast = ({
	id,
	text,
	showIcon = false,
	duration = 2000,
	pageWithTabbar = true
}: UsePopToastProps) => {
	const { window } = useDimensions();
	const toast = useToast();

	const showToastHandler = useCallback(() => {
		if (toast.isActive(id)) return;

		toast.show({
			render: () => (
				<View width={window.width} position="relative" mb={pageWithTabbar ? "5px" : "-56px"}>
					<HStack
						bg="secondary.400"
						pt={3}
						px={2}
						pb={3}
						alignItems="center"
						justifyContent="center"
						space={2}
						mt={1.5}
					>
						<Text textAlign="center" color="white">
							{text}
						</Text>
						{showIcon && <Icon as={MaterialIcons} name="done" color="white" />}
					</HStack>
				</View>
			),
			duration,
			id
		});
	}, [text, showIcon, id, duration, toast]);

	return { showToastHandler, toast };
};

export default usePopToast;
