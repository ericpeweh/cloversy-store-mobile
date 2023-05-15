// Dependencies
import React from "react";
import Timeline, { TimelineProps } from "react-native-timeline-flatlist";

// Components
import { Text, useTheme, View } from "native-base";

interface OrderTimelineProps extends TimelineProps {}

const OrderTimeline = ({ ...props }: OrderTimelineProps) => {
	const { colors } = useTheme();

	return (
		<Timeline
			isUsingFlatlist={false}
			circleSize={20}
			lineColor={colors.gray[100]}
			lineWidth={3}
			titleStyle={{
				fontSize: 13,
				fontWeight: "400",
				marginTop: -10,
				marginBottom: 20,
				color: colors.gray[700]
			}}
			descriptionStyle={{ display: "none" }}
			detailContainerStyle={{ marginLeft: 5, flex: 1 }}
			timeContainerStyle={{ minWidth: 115 }}
			timeStyle={{ fontSize: 13, textAlign: "left", color: colors.gray[500] }}
			innerCircle="dot"
			{...props}
		/>
	);
};

export default OrderTimeline;
