// Hooks
import useDataInit from "../../hooks/useDataInit";

// Components
import LoadingScreen from "../LoadingScreen/LoadingScreen";

interface AppWrapperProps {
	children: React.ReactNode;
}

const AppWrapper = ({ children }: AppWrapperProps) => {
	const { isLoading, isAuthenticated } = useDataInit();

	return <>{isLoading ? <LoadingScreen /> : children}</>;
};

export default AppWrapper;
