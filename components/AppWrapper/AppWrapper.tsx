// Hooks
import useDataInit from "../../hooks/useDataInit";

// Screens
import LoginScreen from "../../screens/LoginScreen";
import LoadingScreen from "../../screens/LoadingScreen";

interface AppWrapperProps {
	children: React.ReactNode;
}

const AppWrapper = ({ children }: AppWrapperProps) => {
	const { isLoading, isAuthenticated } = useDataInit();

	return <>{isLoading ? <LoadingScreen /> : !isAuthenticated ? <LoginScreen /> : children}</>;
};

export default AppWrapper;
