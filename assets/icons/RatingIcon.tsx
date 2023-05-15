// Dependencies
import * as React from "react";

// Components
import Svg, { G, Path } from "react-native-svg";

interface RatingIconProps {
	size?: number;
}

const RatingIcon = ({ size = 24 }: RatingIconProps) => {
	return (
		<Svg
			fill="#000"
			width={size}
			height={size}
			viewBox="0 0 512.026 512.026"
			strokeWidth={1}
			style={{ marginTop: 4 }}
		>
			<Path d="M509.494 344.89c-2.005-2.411-4.992-3.776-8.128-3.776H355.019l-3.307-13.248a10.675 10.675 0 00-10.347-8.085h-21.333c-5.888 0-10.667 4.779-10.667 10.667s4.779 10.667 10.667 10.667h12.992l25.963 103.765a31.95 31.95 0 0031.04 24.235h90.006c5.888 0 10.667-4.779 10.667-10.667s-4.779-10.667-10.667-10.667h-90.005a10.661 10.661 0 01-10.347-8.064l-3.328-13.269h96.277c15.723 0 28.992-11.243 31.552-26.731l7.701-46.187a10.665 10.665 0 00-2.389-8.64zm-26.347 51.328a10.62 10.62 0 01-10.517 8.896H371.019l-10.667-42.667h128.427l-5.632 33.771z" />
			<Path d="M324.832 411.578l-74.667-37.333a10.711 10.711 0 00-9.536 0l-129.813 64.917 27.712-138.624c.683-3.499-.405-7.125-2.923-9.643L33.547 188.837l138.688-18.389a10.682 10.682 0 008.128-5.803l65.003-130.304 65.003 130.304c1.557 3.157 4.608 5.333 8.128 5.803l138.688 18.389-102.059 102.059c-4.16 4.16-4.16 10.923 0 15.083s10.923 4.16 15.083 0l117.333-117.333c2.88-2.88 3.861-7.125 2.56-10.965s-4.693-6.613-8.704-7.147l-154.496-20.48L254.88 5.669c-3.605-7.232-15.488-7.232-19.093 0l-72.021 144.384L9.27 170.533a10.662 10.662 0 00-6.144 18.112l113.301 113.301-30.869 154.39a10.73 10.73 0 003.989 10.581 10.717 10.717 0 006.485 2.197 10.84 10.84 0 004.779-1.131l144.555-72.277 69.931 34.965c5.269 2.603 11.669.491 14.315-4.779 2.623-5.268.49-11.668-4.78-14.314zM384.032 469.114c-11.776 0-21.333 9.557-21.333 21.333s9.557 21.333 21.333 21.333 21.333-9.557 21.333-21.333-9.557-21.333-21.333-21.333zM448.032 490.448c0 11.776 9.557 21.333 21.333 21.333s21.333-9.557 21.333-21.333-9.557-21.333-21.333-21.333-21.333 9.557-21.333 21.333z" />
		</Svg>
	);
};

export default RatingIcon;
