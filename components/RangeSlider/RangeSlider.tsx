// Dependencies
import React, { useCallback, useState } from "react";
import RNRangeSlider from "rn-range-slider";

// Components
import { HStack, Text, View } from "native-base";
import { shadowProps } from "../../themes/helpers";
import formatToRupiah from "../../utils/formatToRupiah";

interface RangeSliderProps {
	min: number;
	max: number;
	lowValue: number;
	highValue: number;
	onTouchEnd: (newLow: number, newHigh: number) => void;
	step?: number;
}

const RangeSlider = ({
	min,
	max,
	step = 100000,
	lowValue,
	highValue,
	onTouchEnd
}: RangeSliderProps) => {
	const [low, setLow] = useState(lowValue);
	const [high, setHigh] = useState(highValue);

	const renderThumb = useCallback(
		() => (
			<View
				borderRadius="full"
				bg="primary.400"
				width={6}
				height={6}
				borderWidth={1}
				borderColor="white"
				style={{ ...shadowProps.xs }}
			/>
		),
		[]
	);
	const renderRail = useCallback(
		() => <View flex={1} height="6px" borderRadius="10px" bg="gray.200" />,
		[]
	);
	const renderRailSelected = useCallback(
		() => <View height="6px" borderRadius="10px" bg="primary.400" />,
		[]
	);

	const handleValueChange = useCallback(
		(newLow: number, newHigh: number) => {
			setLow(newLow);
			setHigh(newHigh);
		},
		[setLow, setHigh]
	);

	return (
		<View>
			<RNRangeSlider
				minRange={500000}
				min={min}
				max={max}
				step={step}
				low={low}
				high={high}
				style={{ paddingHorizontal: 0, padding: 0 }}
				renderThumb={renderThumb}
				renderRail={renderRail}
				renderRailSelected={renderRailSelected}
				onValueChanged={handleValueChange}
				onSliderTouchEnd={onTouchEnd}
			/>
			<HStack justifyContent="space-between" mt={4}>
				<Text fontWeight="500" fontSize="13px">
					Min: <Text fontWeight="400">{formatToRupiah(low)}</Text>
				</Text>
				<Text fontWeight="500" fontSize="13px">
					Max: <Text fontWeight="400">{formatToRupiah(high)}</Text>
				</Text>
			</HStack>
		</View>
	);
};

export default RangeSlider;
