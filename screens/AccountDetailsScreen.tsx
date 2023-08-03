// Dependencies
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { shallowEqual } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";

// Actions
import { setUserDetails, setUserProfilePicture } from "../store/slices/authSlice";

// Hooks
import useHideHeaderTabbar from "../hooks/useHideHeaderTabbar";
import useSelector from "../hooks/useSelector";
import useDispatch from "../hooks/useDispatch";
import {
	useDeleteProfilePictureMutation,
	useResetPasswordMutation,
	useUpdateAccountDetailsMutation,
	useUpdateProfilePictureMutation
} from "../api/account.api";

// Icons
import { MaterialIcons } from "@expo/vector-icons";

// Types
import { RootStackProps } from "../interfaces";
import { UpdateAccountDetailsBody } from "../interfaces";

// Images
const NoImagePlaceholder = require("../assets/images/no-image.png");

// Components
import { Text, ScrollView, HStack, Avatar, VStack, Icon } from "native-base";
import Button from "../components/Button/Button";
import StatusBadge from "../components/StatusBadge/StatusBadge";
import FormControlInput from "../components/FormControlInput/FormControlInput";
import DatePicker from "../components/DatePicker/DatePicker";
import AlertBox from "../components/AlertBox/AlertBox";

interface EditAccountDetailsFormValues {
	full_name: string;
	contact: string;
	birth_date: Date;
}

const EditAccountDetailsSchema = Yup.object().shape({
	full_name: Yup.string().required("Full name required"),
	contact: Yup.string()
		.matches(/^08\d{8,11}$/g, "Invalid contact number")
		.required("Contact required")
});

const AccountDetailsScreen = ({ navigation }: RootStackProps<"AccountDetails">) => {
	const dispatch = useDispatch();
	const [successResetPassword, setSuccessResetPassword] = useState(false);
	const { email, email_verified, full_name, profile_picture, birth_date, contact } = useSelector(
		state => state.auth,
		shallowEqual
	);

	const [formInitialValues] = useState<EditAccountDetailsFormValues>({
		full_name,
		contact: contact ?? "",
		birth_date: birth_date ? new Date(birth_date) : new Date("2000-01-01")
	});

	// Hide parent header and tabbar on mount
	useHideHeaderTabbar(navigation);

	const [
		updateAccountDetails,
		{
			data: updateAccountDetailsData,
			isLoading: isUpdateAccountDetailsLoading,
			error: updateAccountDetailsErrorData,
			isSuccess: isUpdateAccountDetailsSuccess,
			reset: resetUpdateAccountDetails
		}
	] = useUpdateAccountDetailsMutation();
	const updateAccountDetailsError: any = updateAccountDetailsErrorData;

	const [
		updateProfilePicture,
		{
			data: updateProfilePictureData,
			isLoading: isUpdateProfilePictureLoading,
			error: updateProfilePictureErrorData,
			isSuccess: isUpdateProfilePictureSuccess,
			reset: resetUpdateProfilePicture
		}
	] = useUpdateProfilePictureMutation();
	const updateProfilePictureError: any = updateProfilePictureErrorData;

	const [
		resetPassword,
		{
			isLoading: isResetPasswordLoading,
			error: resetPasswordErrorData,
			isSuccess: isResetPasswordSuccess,
			reset: resetResetPassword
		}
	] = useResetPasswordMutation();
	const resetPasswordError: any = resetPasswordErrorData;

	const [
		deleteProfilePicture,
		{
			data: deleteProfilePictureData,
			isLoading: isDeleteProfilePictureLoading,
			error: deleteProfilePictureErrorData,
			isSuccess: isDeleteProfilePictureSuccess,
			reset: resetDeleteProfilePicture
		}
	] = useDeleteProfilePictureMutation();
	const deleteProfilePictureError: any = deleteProfilePictureErrorData;

	useEffect(() => {
		if (isUpdateAccountDetailsSuccess && updateAccountDetailsData) {
			const userData = updateAccountDetailsData?.data?.updatedAccountDetails;
			dispatch(
				setUserDetails({
					full_name: userData.full_name || "",
					contact: userData.contact || "",
					birth_date: userData.birth_date || ""
				})
			);
			resetUpdateAccountDetails();
		}
	}, [
		isUpdateAccountDetailsSuccess,
		resetUpdateAccountDetails,
		updateAccountDetailsData,
		dispatch
	]);

	useEffect(() => {
		if (isUpdateProfilePictureSuccess && updateProfilePictureData) {
			const userData = updateProfilePictureData?.data?.updatedAccountDetails;

			if (userData.profile_picture) {
				dispatch(
					setUserProfilePicture({
						profile_picture: userData.profile_picture
					})
				);
				resetUpdateProfilePicture();
			}
		}
	}, [
		isUpdateProfilePictureSuccess,
		resetUpdateProfilePicture,
		updateProfilePictureData,
		dispatch
	]);

	useEffect(() => {
		if (isDeleteProfilePictureSuccess && deleteProfilePictureData) {
			const userData = deleteProfilePictureData?.data?.updatedAccountDetails;

			dispatch(
				setUserProfilePicture({
					profile_picture: userData.profile_picture || ""
				})
			);
			resetDeleteProfilePicture();
		}
	}, [
		isDeleteProfilePictureSuccess,
		resetDeleteProfilePicture,
		deleteProfilePictureData,
		dispatch
	]);

	useEffect(() => {
		if (isResetPasswordSuccess) {
			resetResetPassword();
			setSuccessResetPassword(true);
		}
	}, [isResetPasswordSuccess, resetResetPassword]);

	const updateAccountDetailsHandler = (data: UpdateAccountDetailsBody) =>
		updateAccountDetails(data);

	const updateProfilePictureHandler = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.4
		});

		if (!result.canceled && result?.assets[0]?.uri) {
			const newProfilePicture = new FormData();
			const uri = result.assets[0].uri;
			const fileName = uri.split("/").pop()!;
			const fileType = fileName.split(".").pop();

			newProfilePicture.append("image", {
				uri,
				name: fileName,
				type: `image/${fileType}`
			} as unknown as Blob);
			updateProfilePicture(newProfilePicture);
		}
	};

	const deleteProfilePictureHandler = async () => {
		deleteProfilePicture();
	};

	const resetPasswordHandler = async () => {
		setSuccessResetPassword(false);
		resetPassword();
	};

	return (
		<ScrollView style={styles.accountDetailsScreenContainer}>
			<VStack>
				<Text fontWeight="500" fontSize="15px">
					Profile Picture
				</Text>
				<HStack alignItems="center" space={2} mt={3}>
					<Avatar
						bg="gray.200"
						source={
							profile_picture
								? { uri: profile_picture, headers: { referrer: "no-ref" } }
								: NoImagePlaceholder
						}
						width="65px"
						height="65px"
					/>
					<Button
						variant="outline"
						_loading={{ _spinner: { color: "secondary.400" } }}
						ml={1}
						bg="white"
						borderWidth="1"
						borderColor="gray.600"
						_text={{ color: "gray.600", fontSize: "13px" }}
						_pressed={{ bg: "gray.100" }}
						py={1}
						onPress={updateProfilePictureHandler}
						isLoading={isUpdateProfilePictureLoading}
					>
						Change Picture
					</Button>
					<Button
						variant="outline"
						colorScheme="error"
						bg="white"
						borderWidth="1"
						borderColor="error.500"
						_text={{ color: "error.500", fontSize: "13px" }}
						_pressed={{ bg: "error.100:alpha.50" }}
						py={1}
						onPress={deleteProfilePictureHandler}
						isLoading={isDeleteProfilePictureLoading}
					>
						Delete
					</Button>
				</HStack>
				{updateProfilePictureError && (
					<AlertBox width="100%" mt={3}>
						{updateProfilePictureError?.data?.message ||
							"Error occured while updating profile picture."}
					</AlertBox>
				)}
				{deleteProfilePictureError && (
					<AlertBox width="100%" mt={3}>
						{deleteProfilePictureError?.data?.message ||
							"Error occured while deleting profile picture."}
					</AlertBox>
				)}
			</VStack>
			<VStack mt={6}>
				<Text fontWeight="500" fontSize="15px">
					Account Information
				</Text>
				<HStack alignItems="center" space={2} mt={3} mb={4}>
					<Text fontSize="13px">Email: {email}</Text>
					<StatusBadge
						startIcon={
							<Icon as={MaterialIcons} name={email_verified ? "verified" : "error"} color="white" />
						}
						color={email_verified ? "primary.400" : "error.500"}
					>
						{email_verified ? "Verified" : "Not Verified"}
					</StatusBadge>
				</HStack>
				<Formik
					initialValues={formInitialValues}
					validationSchema={EditAccountDetailsSchema}
					enableReinitialize={true}
					onSubmit={({ birth_date, contact, full_name }) => {
						updateAccountDetailsHandler({
							contact: contact!,
							full_name: full_name!,
							birth_date: birth_date.toISOString().slice(0, 23)
						});
					}}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						setFieldValue,
						setFieldTouched
					}) => (
						<VStack space={2}>
							<FormControlInput
								label="Full name *"
								value={values.full_name}
								placeholder="Full name"
								onChange={handleChange("full_name")}
								onBlur={handleBlur("full_name")}
								isError={Boolean(errors.full_name && touched.full_name)}
								error={errors?.full_name}
							/>
							<FormControlInput
								label="Contact *"
								value={values.contact}
								placeholder="081234567890"
								onChange={handleChange("contact")}
								onBlur={handleBlur("contact")}
								isError={Boolean(errors.contact && touched.contact)}
								error={errors?.contact}
							/>
							<DatePicker
								label="Birth Date *"
								value={values.birth_date}
								onChange={(_, newDate) => setFieldValue("birth_date", newDate)}
								onBlur={() => setFieldTouched("birth_date", true)}
								mt={2}
							/>
							{updateAccountDetailsError && (
								<AlertBox status="error" width="100%" mt={3}>
									{updateAccountDetailsError?.data?.message ||
										"Error occured while updating account details."}
								</AlertBox>
							)}
							<Button
								mt={2}
								onPress={() => handleSubmit()}
								isLoading={isUpdateAccountDetailsLoading}
							>
								Save Changes
							</Button>
						</VStack>
					)}
				</Formik>
			</VStack>
			<VStack mt={6} mb={8}>
				<Text fontWeight="500" fontSize="15px" mb={3}>
					Account Security
				</Text>
				<Button
					bg="secondary.300"
					_text={{ color: "white" }}
					_pressed={{ bg: "secondary.400" }}
					onPress={resetPasswordHandler}
					isLoading={isResetPasswordLoading}
					isDisabled={successResetPassword}
				>
					Reset Password
				</Button>
				{successResetPassword && (
					<AlertBox status="success" width="100%" mt={3}>
						We've just sent you an email to reset your password.
					</AlertBox>
				)}
				{resetPasswordError && (
					<AlertBox status="error" width="100%" mt={3}>
						{resetPasswordError?.data?.message || "Failed to send reset password email"}
					</AlertBox>
				)}
			</VStack>
		</ScrollView>
	);
};

export default AccountDetailsScreen;

const styles = StyleSheet.create({
	accountDetailsScreenContainer: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 16
	}
});
