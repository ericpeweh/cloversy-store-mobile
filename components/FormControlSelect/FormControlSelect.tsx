// Dependencies
import React from "react";

// Icons
import { Ionicons } from "@expo/vector-icons";

// Components
import { CheckIcon, FormControl, Icon, Select, WarningOutlineIcon } from "native-base";

interface FormControlSelectProps {
	options: { label: string; value: string | number }[];
	label: string;
	selectedValue: string | number;
	onValueChange: (value: string, label: string) => void;
	errorText?: string;
	isRequired?: boolean;
	isInvalid?: boolean;
	onClose?: Function;
}

const FormControlSelect = ({
	label,
	options,
	selectedValue,
	onValueChange,
	errorText,
	isRequired,
	isInvalid,
	onClose
}: FormControlSelectProps) => {
	return (
		<FormControl w="100%" isRequired={isRequired} isInvalid={isInvalid} mb={2}>
			<FormControl.Label _text={{ color: "black", fontSize: "14px", mb: 1 }}>
				{label}
			</FormControl.Label>
			<Select
				onClose={() => onClose && onClose()}
				accessibilityLabel={label}
				selectedValue={selectedValue + ""}
				onValueChange={newValue => {
					const label = options.find(option => option.value === +newValue)?.label;

					if (label) {
						onValueChange(newValue, label);
					}
				}}
				placeholder={label}
				_selectedItem={{
					_text: { color: "white", fontSize: "14px" },
					bg: "primary.400",
					endIcon: <CheckIcon size={5} ml="auto" color="white" />
				}}
				fontSize="14px"
				color="black"
				borderColor={isInvalid ? "error.500" : "gray.300"}
				borderRadius="10px"
				mt={2}
				px={4}
				dropdownOpenIcon={
					<Icon as={Ionicons} name="chevron-up" size="lg" color="gray.400" mr={2} />
				}
				dropdownCloseIcon={
					<Icon as={Ionicons} name="chevron-down" size="lg" color="gray.400" mr={2} />
				}
			>
				{options.map(({ label, value }) => (
					<Select.Item
						label={label}
						value={value + ""}
						key={value}
						borderRadius="10px"
						py={3}
						mt={2}
						_pressed={{ bg: "gray.100" }}
						_text={{ fontSize: "14px" }}
					/>
				))}
			</Select>
			{errorText && (
				<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
					{errorText}
				</FormControl.ErrorMessage>
			)}
		</FormControl>
	);
};

export default FormControlSelect;
