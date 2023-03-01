// Dependencies
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Alert, StyleSheet } from "react-native";
import { FormikHelpers } from "formik";

// Hooks
import useDispatch from "../hooks/useDispatch";
import useSelector from "../hooks/useSelector";
import { useGetCheckoutCartItemsQuery } from "../api/cart.api";
import { useCheckoutMutation } from "../api/transaction.api";
import useHideHeaderTabbar from "../hooks/useHideHeaderTabbar";

// Types
import {
	CheckoutBody,
	CheckoutFormValues,
	RootStackProps,
	ScreenBeforeRemoveEvent,
	Voucher
} from "../interfaces";

// Actions
import { setUserCart } from "../store/slices/globalSlice";

// Validations
import { CheckoutSchema } from "../utils/validation";

// Components
import { ScrollView, View } from "native-base";
import CheckoutInfo from "../components/CheckoutInfo/CheckoutInfo";
import CheckoutShipping from "../components/CheckoutShipping/CheckoutShipping";
import CheckoutSectionTitle from "../components/CheckoutSectionTitle/CheckoutSectionTitle";
import CheckoutPayment from "../components/CheckoutPayment/CheckoutPayment";
import CheckoutDetails from "../components/CheckoutDetails/CheckoutDetails";
import CheckoutNotes from "../components/CheckoutNotes/CheckoutNotes";
import CheckoutVoucher from "../components/CheckoutVoucher/CheckoutVoucher";
import Button from "../components/Button/Button";
import AlertBox from "../components/AlertBox/AlertBox";

const CheckoutScreen = ({ navigation, route }: RootStackProps<"HomeCheckout">) => {
	const dispatch = useDispatch();
	const isAuth = useSelector(state => state.auth.isAuth);
	const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);

	const { data: cartItemsData, isSuccess: isGetCartItemsSuccess } = useGetCheckoutCartItemsQuery(
		isAuth,
		{ skip: !isAuth }
	);

	const [formInitialValues, setFormInitialValues] = useState<CheckoutFormValues>({
		voucher_code: "",
		voucher_type: "default",
		voucher_discount: 0,
		address_id: -1,
		customer_note: "",
		send_as_gift: false,
		gift_note: "",
		shipping_courier: "default",
		payment_method: "gopay"
	});

	const [
		checkoutHandler,
		{ isLoading: isCheckoutLoading, error: checkoutErrorData, isSuccess: isCheckoutSuccess }
	] = useCheckoutMutation();
	const checkoutError: any = checkoutErrorData;

	const submitHandler = async (
		values: CheckoutFormValues,
		actions: FormikHelpers<CheckoutFormValues>
	) => {
		if (!isCheckoutLoading && !isCheckoutSuccess) {
			const checkoutData: CheckoutBody = {
				address_id: values.address_id.toString(),
				payment_method: values.payment_method,
				shipping_courier: values.shipping_courier,
				voucher_code: values.voucher_code,
				customer_note: values.customer_note,
				...(values.send_as_gift && { gift_note: values.gift_note })
			};

			const result = await checkoutHandler(checkoutData).unwrap();
			if (result.data.transaction) {
				// Redirect to success checkout page
				navigation.replace("HomeCheckoutSuccess", { transaction: result.data.transaction });
				dispatch(setUserCart({ cart: [] }));
			}
			actions.setTouched({});
			actions.setSubmitting(false);
			return;
		}
	};

	// Handle incoming form values changes (redirected from navigate)
	useEffect(() => {
		if (route.params.state) {
			setFormInitialValues(route.params.state);
		}

		if (route.params.appliedVoucher || route.params.appliedVoucher === null) {
			setAppliedVoucher(route.params.appliedVoucher);
		}
	}, [route.params.state]);

	// Add confirm modal if user cancel checkout
	useEffect(() => {
		const beforeRemoveEventHandler = (event: ScreenBeforeRemoveEvent) => {
			if (!isCheckoutSuccess) {
				event.preventDefault();

				Alert.alert(
					"Cancel checkout",
					"Are you sure you want to cancel checkout? All entered data will be lost.",
					[
						{ text: "No", style: "cancel", onPress: () => {} },
						{
							text: "Yes",
							style: "destructive",
							onPress: () => navigation.dispatch(event.data.action)
						}
					]
				);
			}
		};

		navigation.addListener("beforeRemove", beforeRemoveEventHandler);

		return () => {
			navigation.removeListener("beforeRemove", beforeRemoveEventHandler);
		};
	}, [isCheckoutSuccess]);

	// Hide parent header and tabbar on mount
	useHideHeaderTabbar(navigation);

	return (
		<ScrollView style={styles.checkoutScreenContainer}>
			<Formik
				initialValues={formInitialValues}
				validationSchema={CheckoutSchema}
				onSubmit={submitHandler}
				enableReinitialize={true}
			>
				{({ handleSubmit, errors, touched }) => (
					<>
						<View bg="white" p={4} mb={2}>
							<CheckoutSectionTitle
								title="Shipping Address"
								navigateScreenName="HomeCheckoutAddressPicker"
								buttonText="Choose address"
							/>
							<CheckoutInfo setFormInitialValues={setFormInitialValues} />
							{errors.address_id && touched.address_id && (
								<AlertBox width="100%" mt={3}>
									{errors.address_id}
								</AlertBox>
							)}
						</View>
						<View bg="white" p={4} mb={2}>
							<CheckoutShipping setFormInitialValues={setFormInitialValues} />
							{errors.shipping_courier && touched.shipping_courier && (
								<AlertBox width="100%" mt={3}>
									{errors.shipping_courier}
								</AlertBox>
							)}
							<CheckoutSectionTitle
								mt={8}
								title="Payment Method"
								navigateScreenName="HomeCheckoutPaymentPicker"
								buttonText="Change method"
							/>
							<CheckoutPayment />
							{errors.payment_method && touched.payment_method && (
								<AlertBox width="100%" mt={3}>
									{errors.payment_method}
								</AlertBox>
							)}
						</View>
						<View bg="white" p={4} mb={2}>
							<CheckoutSectionTitle
								title="Order Information"
								navigateScreenName="HomeCheckoutEditOrderInfo"
								buttonText="Edit notes"
							/>
							<CheckoutNotes />
							{errors.customer_note && touched.customer_note && (
								<AlertBox width="100%" mt={3}>
									{errors.customer_note}
								</AlertBox>
							)}
							{errors.gift_note && touched.gift_note && (
								<AlertBox width="100%" mt={3}>
									{errors.gift_note}
								</AlertBox>
							)}
						</View>
						<View bg="white" p={4} mb={2}>
							<CheckoutSectionTitle
								title="Voucher"
								navigateScreenName="HomeCheckoutVoucherPicker"
								buttonText="Use / choose voucher"
							/>
							<CheckoutVoucher appliedVoucher={appliedVoucher} />
							{errors.voucher_code && touched.voucher_code && (
								<AlertBox width="100%" mt={3}>
									{errors.voucher_code}
								</AlertBox>
							)}
						</View>
						<View bg="white" p={4}>
							<CheckoutSectionTitle title="Order Details" />
							<CheckoutDetails />
							{checkoutError && (
								<AlertBox width="100%" mb={3}>
									{checkoutError?.data?.message || "Failed to checkout."}
								</AlertBox>
							)}
							<Button
								_pressed={{ bg: "primary.500" }}
								_text={{ fontSize: "15px", fontWeight: "700", letterSpacing: 0.5 }}
								py={2}
								isLoading={isCheckoutLoading}
								isDisabled={!isGetCartItemsSuccess || cartItemsData?.data.cart.length === 0}
								onPress={() => handleSubmit()}
							>
								Create order
							</Button>
						</View>
					</>
				)}
			</Formik>
		</ScrollView>
	);
};

export default CheckoutScreen;

const styles = StyleSheet.create({
	checkoutScreenContainer: {
		flex: 1,
		backgroundColor: "#f8f8f8"
	}
});
