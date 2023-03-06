// Dependencies
import axios from "axios";
import { Platform } from "react-native";
import * as Device from "expo-device";
import { Subscription } from "expo-modules-core";
import * as Notifications from "expo-notifications";
import { shallowEqual } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Hooks
import { useEffect, useRef } from "react";
import useSelector from "./useSelector";

// API
import { BASE_URL } from "../api";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: true
	})
});

const registerForPushNotificationsAsync = async () => {
	let token;

	if (Platform.OS === "android") {
		await Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C"
		});
	}

	if (Device.isDevice) {
		const { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;

		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== "granted") {
			alert("Failed to get devvice push token for push notification!");
			return;
		}
		// token = (await Notifications.getExpoPushTokenAsync()).data;
		token = (await Notifications.getDevicePushTokenAsync()).data;
	} else {
		alert("Must use physical device for Push Notifications");
	}

	return token;
};

const useNotifications = () => {
	const { isAuth, token: authToken } = useSelector(state => state.auth, shallowEqual);
	const notificationListener = useRef<Subscription>();
	const responseListener = useRef<Subscription>();

	useEffect(() => {
		if (isAuth) {
			registerForPushNotificationsAsync().then(async token => {
				if (token) {
					// Send token to backend
					const res = await axios.post<
						void,
						{
							data: { data: { subscriptionId: number } };
						}
					>(
						`${BASE_URL}/subscription/push`,
						{ token },
						{
							headers: {
								Authorization: `Bearer ${authToken}`,
								"content-type": "application/json"
							},
							withCredentials: true
						}
					);

					// Store subscription id in local storage
					const subscriptionId = res.data?.data?.subscriptionId;
					if (subscriptionId) {
						AsyncStorage.setItem("subscriptionId", subscriptionId.toString());
					}
				}
			});
		}

		return () => {
			if (isAuth) {
				if (notificationListener.current)
					Notifications.removeNotificationSubscription(notificationListener.current);

				if (responseListener.current)
					Notifications.removeNotificationSubscription(responseListener.current);
			}
		};
	}, [isAuth]);
};

export const schedulePushNotification = async () => {
	await Notifications.scheduleNotificationAsync({
		content: {
			title: "You've got mail! 📬",
			body: "Here is the notification body",
			data: {
				deeplinkUrl: "id.cloversyid.cloversystoremobile://orders/WZAVBBAHN1/review"
			}
		},
		trigger: { seconds: 1 }
	});
};

export default useNotifications;
