// Dependencies
import React from "react";

// Types
import { KeyboardTypeOptions, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

// Components
import { Text, View, FormControl, Input, WarningOutlineIcon, IFormControlProps } from "native-base";

interface FormControlInputProps extends IFormControlProps {
	value: string;
	label: string;
	placeholder: string;
	onChange: (value: string) => void;
	onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
	keyboardType?: KeyboardTypeOptions;
	isError?: boolean;
	error?: string;
}

const FormControlInput = ({
	value,
	label,
	placeholder,
	onChange,
	onBlur,
	keyboardType = "default",
	error,
	isError = false,
	...props
}: FormControlInputProps) => {
	return (
		<FormControl w="100%" isInvalid={isError} {...props}>
			<FormControl.Label _text={{ color: "black", fontSize: "14px", mb: 1 }}>
				{label}
			</FormControl.Label>
			<Input
				_invalid={{ borderColor: "error.500" }}
				_focus={{ bgColor: "white" }}
				focusOutlineColor={isError ? "error.500" : "primary.400"}
				placeholder={placeholder}
				width="100%"
				borderRadius="10"
				fontSize="14px"
				value={value}
				onChangeText={onChange}
				onBlur={onBlur}
				keyboardType={keyboardType}
				autoComplete="off"
			/>
			{isError && error && (
				<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
					{error}
				</FormControl.ErrorMessage>
			)}
		</FormControl>
	);
};

export default FormControlInput;
