// Dependencies
import React from "react";

// Types
import { KeyboardTypeOptions, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

// Components
import { FormControl, WarningOutlineIcon, TextArea, ITextAreaProps } from "native-base";

interface FormControlTextAreaProps extends Omit<ITextAreaProps, "onChange"> {
	value: string;
	label: string;
	placeholder: string;
	onChange: (value: string) => void;
	onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
	keyboardType?: KeyboardTypeOptions;
	isError?: boolean;
	error?: string;
}

const FormControlTextArea = ({
	value,
	label,
	placeholder,
	onChange,
	onBlur,
	numberOfLines = 4,
	keyboardType = "default",
	error,
	isError = false,
	...props
}: FormControlTextAreaProps) => {
	return (
		<FormControl w="100%" isInvalid={isError} {...props}>
			<FormControl.Label _text={{ color: "black", fontSize: "14px", mb: 1 }}>
				{label}
			</FormControl.Label>
			<TextArea
				numberOfLines={numberOfLines}
				_invalid={{ borderColor: "error.500" }}
				_focus={{ bgColor: "white" }}
				borderColor={isError ? "error.500" : "gray.300"}
				focusOutlineColor={isError ? "error.500" : "primary.400"}
				placeholder={placeholder}
				width="100%"
				borderRadius="10"
				fontSize="14px"
				value={value}
				onChangeText={onChange}
				onBlur={onBlur}
				keyboardType={keyboardType}
				autoCompleteType={false}
			/>
			{isError && error && (
				<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
					{error}
				</FormControl.ErrorMessage>
			)}
		</FormControl>
	);
};

export default FormControlTextArea;
