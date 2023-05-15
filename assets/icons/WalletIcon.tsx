// Dependencies
import * as React from "react";

// Components
import Svg, { Path, Circle } from "react-native-svg";

interface WalletIconProps {
	size?: number;
}

const WalletIcon = ({ size = 24 }: WalletIconProps) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="#000" strokeWidth={2}>
			<Path d="M52 20v-4a4 4 0 00-4-4H12a4 4 0 00-4 4v32a4 4 0 004 4h36a4 4 0 004-4v-4" />
			<Path d="M36 20h18a2 2 0 012 2v20a2 2 0 01-2 2H36a12 12 0 01-12-12 12 12 0 0112-12z" />
			<Circle cx={36} cy={32} r={4} />
		</Svg>
	);
};

export default WalletIcon;
