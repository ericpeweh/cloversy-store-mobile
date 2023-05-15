// Dependencies
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

// Types
import { EditNotesFormValues, RootStackProps } from "../interfaces";

// Validations
import { CheckoutNotesSchema } from "../utils/validation";

// Components
import { ScrollView, View, VStack } from "native-base";
import { Formik } from "formik";
import FormControlTextArea from "../components/FormControlTextArea/FormControlTextArea";
import CheckboxInput from "../components/CheckboxInput/CheckboxInput";
import SingleButtonTab from "../components/SingleBottomTab/SingleButtonTab";

const EditOrderInfoScreen = ({
	navigation,
	route
}: RootStackProps<"HomeCheckoutEditOrderInfo">) => {
	const { state } = route.params;
	const [formInitialValues, setFormInitialValues] = useState<EditNotesFormValues>({
		customer_note: "",
		send_as_gift: false,
		gift_note: ""
	});

	const submitHandler = (values: EditNotesFormValues) => {
		navigation.navigate("HomeCheckout", { state: { ...state, ...values } });
	};

	useEffect(() => {
		if (state) {
			setFormInitialValues({
				customer_note: state.customer_note,
				send_as_gift: state.send_as_gift,
				gift_note: state.gift_note
			});
		}
	}, [state]);

	return (
		<View style={styles.addressPickerScreenContainer}>
			<Formik
				initialValues={formInitialValues}
				validationSchema={CheckoutNotesSchema}
				onSubmit={values => {
					submitHandler(values);
				}}
				enableReinitialize={true}
			>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
					<>
						<ScrollView p={4}>
							<VStack space={2}>
								<FormControlTextArea
									label="Order note"
									value={values.customer_note}
									placeholder="Order note (optional)"
									onChange={handleChange("customer_note")}
									onBlur={handleBlur("customer_note")}
									isError={Boolean(errors.customer_note && touched.customer_note)}
									error={errors?.customer_note}
								/>
								<CheckboxInput
									mt={2}
									value="send_as_gift"
									isChecked={values.send_as_gift}
									onChange={isSelected => setFieldValue("send_as_gift", isSelected)}
								>
									Send as a gift
								</CheckboxInput>
								{values.send_as_gift && (
									<FormControlTextArea
										mt={2}
										label="Gift note *"
										value={values.gift_note}
										placeholder="Gift note"
										onChange={handleChange("gift_note")}
										onBlur={handleBlur("gift_note")}
										isError={Boolean(errors.gift_note && touched.gift_note)}
										error={errors?.gift_note}
									/>
								)}
							</VStack>
						</ScrollView>
						<SingleButtonTab text="Save notes" onPress={() => handleSubmit()} />
					</>
				)}
			</Formik>
		</View>
	);
};

export default EditOrderInfoScreen;

const styles = StyleSheet.create({
	addressPickerScreenContainer: {
		flex: 1,
		backgroundColor: "#fff"
	}
});
