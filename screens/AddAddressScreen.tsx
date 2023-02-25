// Dependencies
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Formik } from "formik";

// Types
import { Address, RootStackProps } from "../interfaces";

// Hooks
import { useCreateAddressMutation } from "../api/address.api";
import useGetProvinceOptions from "../hooks/useGetProvinceOptions";
import useGetCityOptions from "../hooks/useGetCityOptions";
import useGetSubdistrictOptions from "../hooks/useGetSubdistrictOptions";

// Utils
import { CreateAddressSchema } from "../utils/validation";

// Components
import { ScrollView, Text, View, VStack } from "native-base";
import FallbackContainer from "../components/FallbackContainer/FallbackContainer";
import AlertBox from "../components/AlertBox/AlertBox";
import FormControlInput from "../components/FormControlInput/FormControlInput";
import SingleButtonTab from "../components/SingleBottomTab/SingleButtonTab";
import FormControlTextArea from "../components/FormControlTextArea/FormControlTextArea";
import FormControlSelect from "../components/FormControlSelect/FormControlSelect";
import CheckboxInput from "../components/CheckboxInput/CheckboxInput";

type InputAddressFormValues = Omit<Address, "id">;

const AddAddressScreen = ({ navigation, route }: RootStackProps<"HomeCheckoutAddAddress">) => {
	const { state } = route.params;

	const [selectedProvinceId, setSelectedProvinceId] = useState(-1);
	const [selectedCityId, setSelectedCityId] = useState(-1);

	const [formInitialValues, setFormInitialValues] = useState<InputAddressFormValues>({
		recipient_name: "",
		shipping_note: "",
		contact: "",
		address: "",
		is_default: false,
		province: "",
		province_id: -1,
		city: "",
		city_id: -1,
		subdistrict: "",
		subdistrict_id: -1,
		postal_code: "",
		label: ""
	});

	const {
		provinceOptions,
		error: provincesError,
		isFetching: isGetProvincesFetching,
		refetch: refetchProvinces
	} = useGetProvinceOptions();
	const getProvincesError: any = provincesError;

	const {
		cityOptions,
		error: citiesError,
		isFetching: isGetCitiesFetching,
		refetch: refetchCities
	} = useGetCityOptions(selectedProvinceId);
	const getCitiesError: any = citiesError;

	const {
		subdistrictOptions,
		error: subdistrictError,
		isFetching: isGetSubdistrictsFetching,
		refetch: refetchSubdistricts
	} = useGetSubdistrictOptions(selectedCityId);
	const getSubdistrictsError: any = subdistrictError;

	const [
		createAddress,
		{
			isLoading: isCreateAddressLoading,
			error: createAddressErrorData,
			isSuccess: isCreateAddressSuccess,
			reset: resetCreateAddress
		}
	] = useCreateAddressMutation();
	const createAddressError: any = createAddressErrorData;

	useEffect(() => {
		if (isCreateAddressSuccess) {
			navigation.navigate("HomeCheckoutAddressPicker", { state });
			resetCreateAddress();
		}
	}, [isCreateAddressSuccess, resetCreateAddress]);

	const submitHandler = (values: InputAddressFormValues) => {
		createAddress(values);
	};

	return (
		<View style={styles.addressPickerScreenContainer}>
			<Formik
				initialValues={formInitialValues}
				validationSchema={CreateAddressSchema}
				onSubmit={values => {
					if (!isGetProvincesFetching && !isGetCitiesFetching && !isGetSubdistrictsFetching) {
						submitHandler(values);
					}
				}}
				enableReinitialize={true}
			>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
					<>
						<ScrollView>
							<VStack p={4} space={4}>
								<FormControlInput
									label="Recipient name *"
									value={values.recipient_name}
									placeholder="Recipient name"
									onChange={handleChange("recipient_name")}
									onBlur={handleBlur("recipient_name")}
									isError={Boolean(errors.recipient_name && touched.recipient_name)}
									error={errors?.recipient_name}
								/>
								<FormControlInput
									label="Phone number *"
									value={values.contact}
									placeholder="0812 1234 5678"
									onChange={(value: string) =>
										setFieldValue("contact", value.replace(/[^0-9]/g, ""))
									}
									onBlur={handleBlur("contact")}
									isError={Boolean(errors.contact && touched.contact)}
									error={errors?.contact}
									keyboardType="numeric"
								/>
								<FormControlInput
									label="Address label *"
									value={values.label}
									placeholder="Home, office, apartment"
									onChange={handleChange("label")}
									onBlur={handleBlur("label")}
									isError={Boolean(errors.label && touched.label)}
									error={errors?.label}
								/>
								<FormControlTextArea
									label="Shipping note"
									value={values.shipping_note}
									placeholder="Shipping note"
									onChange={handleChange("shipping_note")}
									onBlur={handleBlur("shipping_note")}
									isError={Boolean(errors.shipping_note && touched.shipping_note)}
									error={errors?.shipping_note}
								/>
								<VStack>
									<FormControlSelect
										label="Province *"
										isInvalid={Boolean(
											errors.province_id && touched.province_id && values.province_id === -1
										)}
										errorText={errors?.province_id}
										options={
											isGetProvincesFetching
												? [{ label: "Loading...", value: values.province_id }]
												: provinceOptions
										}
										selectedValue={values.province_id}
										onValueChange={(newValue: string, label: string) => {
											setSelectedProvinceId(+newValue);
											setFormInitialValues({
												...values,
												city_id: -1,
												province: label,
												province_id: +newValue
											});
										}}
									/>
									{provincesError && (
										<Text color="error.500" fontSize="12px">
											{getProvincesError?.data?.message}{" "}
											<Text underline color="text.primary" onPress={refetchProvinces}>
												Try again
											</Text>
										</Text>
									)}
								</VStack>
								{values.province_id !== -1 && (
									<VStack>
										<FormControlSelect
											label="City / District *"
											isInvalid={Boolean(errors.city_id && touched.city_id)}
											errorText={errors?.city_id}
											options={
												isGetCitiesFetching
													? [{ label: "Loading...", value: values.city_id }]
													: cityOptions
											}
											selectedValue={values.city_id}
											onValueChange={(newValue: string, label: string) => {
												setSelectedCityId(+newValue);
												setFormInitialValues({
													...values,
													subdistrict_id: -1,
													city: label,
													city_id: +newValue
												});
											}}
										/>
										{citiesError && (
											<Text color="error.500" fontSize="12px">
												{getCitiesError?.data?.message}{" "}
												<Text underline color="text.primary" onPress={refetchCities}>
													Try again
												</Text>
											</Text>
										)}
									</VStack>
								)}
								{values.city_id !== -1 && (
									<VStack>
										<FormControlSelect
											label="Subdistrict *"
											isInvalid={Boolean(errors.subdistrict_id && touched.subdistrict_id)}
											errorText={errors?.subdistrict_id}
											options={
												isGetSubdistrictsFetching
													? [{ label: "Loading...", value: values.subdistrict_id }]
													: subdistrictOptions
											}
											selectedValue={values.subdistrict_id}
											onValueChange={(newValue: string, label: string) => {
												setFormInitialValues({
													...values,
													subdistrict_id: +newValue,
													subdistrict: label
												});
											}}
										/>
										{subdistrictError && (
											<Text color="error.500" fontSize="12px">
												{getSubdistrictsError?.data?.message}{" "}
												<Text underline color="text.primary" onPress={refetchSubdistricts}>
													Try again
												</Text>
											</Text>
										)}
									</VStack>
								)}
								<FormControlInput
									label="Postal code *"
									value={values.postal_code}
									placeholder="Postal code"
									onChange={handleChange("postal_code")}
									onBlur={handleBlur("postal_code")}
									isError={Boolean(errors.postal_code && touched.postal_code)}
									error={errors?.postal_code}
								/>
								<FormControlTextArea
									label="Shipping address *"
									value={values.address}
									placeholder="Shipping address"
									onChange={handleChange("address")}
									onBlur={handleBlur("address")}
									isError={Boolean(errors.address && touched.address)}
									error={errors?.address}
								/>
								<CheckboxInput
									mt={2}
									value="is_default"
									isChecked={values.is_default}
									onChange={isSelected => setFieldValue("is_default", isSelected)}
								>
									Set as default address
								</CheckboxInput>
								{createAddressError && (
									<FallbackContainer size="md">
										<AlertBox width="100%">{createAddressError?.data?.message}</AlertBox>
									</FallbackContainer>
								)}
							</VStack>
						</ScrollView>
						<SingleButtonTab
							text="Save Address"
							onPress={() => handleSubmit()}
							isLoading={isCreateAddressLoading}
						/>
					</>
				)}
			</Formik>
		</View>
	);
};

export default AddAddressScreen;

const styles = StyleSheet.create({
	addressPickerScreenContainer: {
		flex: 1,
		backgroundColor: "#fff"
	}
});
