// Dependencies
import React from "react";

// Components
import { ISpinnerProps, Spinner } from "native-base";

interface LoadingSpinnerProps extends ISpinnerProps {}

const LoadingSpinner = ({ ...props }: LoadingSpinnerProps) => {
	return <Spinner size="lg" color="primary.400" {...props} />;
};

export default LoadingSpinner;
