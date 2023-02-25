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
import { Divider, HStack, ScrollView, Text, View } from "native-base";
import CheckoutInfo from "../components/CheckoutInfo/CheckoutInfo";
import CheckoutShipping from "../components/CheckoutShipping/CheckoutShipping";
import CheckoutSectionTitle from "../components/CheckoutSectionTitle/CheckoutSectionTitle";
import CheckoutPayment from "../components/CheckoutPayment/CheckoutPayment";
import CheckoutDetails from "../components/CheckoutDetails/CheckoutDetails";
import CheckoutNotes from "../components/CheckoutNotes/CheckoutNotes";
import CheckoutVoucher from "../components/CheckoutVoucher/CheckoutVoucher";

const CheckoutScreen = ({ navigation, route }: RootStackProps<"HomeCheckout">) => {
	const dispatch = useDispatch();
	const isAuth = useSelector(state => state.auth.isAuth);
	const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);

	const {
		data: cartItemsData,
		error: getCartItemsErrorData,
		isLoading: isGetCartItemsLoading,
		isSuccess: isGetCartItemsSuccess,
		isUninitialized: isGetCartItemsUninitialized
	} = useGetCheckoutCartItemsQuery(isAuth, { skip: !isAuth });
	const getCartItemsError: any = getCartItemsErrorData;
	const noCartItemsDataFound = cartItemsData?.data.cart.length === 0;

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
		{
			data: checkoutResultData,
			isLoading: isCheckoutLoading,
			error: checkoutErrorData,
			isSuccess: isCheckoutSuccess,
			reset: resetCheckout
		}
	] = useCheckoutMutation();
	const checkoutResult = checkoutResultData?.data.transaction;
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
				// nextHandler();
				// scrollToTop();
				dispatch(setUserCart({ cart: [] }));
			}
			actions.setTouched({});
			actions.setSubmitting(false);
			return;
		}

		// nextHandler();
		// scrollToTop();
		actions.setTouched({});
		actions.setSubmitting(false);
	};

	// Handle incoming form values changes (redirected from navigate)
	useEffect(() => {
		if (route.params.state) {
			setFormInitialValues(route.params.state);
		}
	}, [route.params.state]);

	// Add confirm modal if user cancel checkout
	useEffect(() => {
		const beforeRemoveEventHandler = (event: ScreenBeforeRemoveEvent) => {
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
		};

		navigation.addListener("beforeRemove", beforeRemoveEventHandler);

		return () => {
			navigation.removeListener("beforeRemove", beforeRemoveEventHandler);
		};
	}, []);

	return (
		<ScrollView style={styles.checkoutScreenContainer}>
			<Formik
				initialValues={formInitialValues}
				validationSchema={CheckoutSchema}
				onSubmit={submitHandler}
				enableReinitialize={true}
			>
				{({ handleSubmit, values }) => (
					<>
						<View bg="white" p={4} mb={2}>
							<CheckoutSectionTitle
								title="Shipping Address"
								navigateScreenName="HomeCheckoutAddressPicker"
								buttonText="Choose address"
							/>
							<CheckoutInfo setFormInitialValues={setFormInitialValues} />
						</View>
						<View bg="white" p={4} mb={2}>
							<CheckoutSectionTitle
								title="Shipping Method"
								navigateScreenName="HomeCheckoutShippingPicker"
								buttonText="Change method"
							/>
							<CheckoutShipping setFormInitialValues={setFormInitialValues} />
							<CheckoutSectionTitle
								mt={8}
								title="Payment Method"
								navigateScreenName="HomeCheckoutPaymentPicker"
								buttonText="Change method"
							/>
							<CheckoutPayment />
						</View>
						<View bg="white" p={4} mb={2}>
							<CheckoutSectionTitle
								title="Order Information"
								navigateScreenName="HomeCheckoutEditOrderInfo"
								buttonText="Edit notes"
							/>
							<CheckoutNotes />
						</View>
						<View bg="white" p={4} mb={2}>
							<CheckoutSectionTitle
								title="Voucher"
								navigateScreenName="HomeCheckoutVoucherPicker"
								buttonText="Use / choose voucher"
							/>
							<CheckoutVoucher appliedVoucher={appliedVoucher} />
						</View>
						<View bg="white" p={4} mb={2}>
							<CheckoutSectionTitle title="Order Details" />
							<CheckoutDetails />
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
