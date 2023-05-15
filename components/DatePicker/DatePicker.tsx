// Dependencies
import React from "react";
import { DateTimePickerAndroid, DateTimePickerEvent } from "@react-native-community/datetimepicker";

// Utils
import { formatDateStandard } from "../../utils/formatDate";

// Types
import { IViewProps } from "native-base/lib/typescript/components/basic/View/types";

// Components
import { Pressable, Text, View } from "native-base";

interface DatePickerProps extends IViewProps {
	value: Date;
	label: string;
	onChange: (event: DateTimePickerEvent, date?: Date | undefined) => void;
	onBlur: () => void;
}

const DatePicker = ({ value, label, onChange, onBlur, ...props }: DatePickerProps) => {
	const openDatePickerHandler = () => {
		DateTimePickerAndroid.open({
			value,
			onChange,
			mode: "date",
			maximumDate: new Date(),
			minimumDate: new Date("1900-01-01")
		});

		onBlur();
	};

	return (
		<View {...props}>
			<Text fontSize="14px" color="black" mb={2} fontWeight="500">
				{label}
			</Text>
			<Pressable onPress={openDatePickerHandler}>
				{({ isHovered, isPressed }) => (
					<View
						borderColor="gray.300"
						borderWidth="1"
						borderRadius="10px"
						px={3}
						py={2.5}
						bg={isPressed || isHovered ? "gray.100" : "white"}
					>
						<Text fontSize="14px">{formatDateStandard(value.toISOString())}</Text>
					</View>
				)}
			</Pressable>
		</View>
	);
};

export default DatePicker;
