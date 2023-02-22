import { Auth0ContextInterface as Auth0ContextInterfaceExtend } from "react-native-auth0";

interface ClearSessionArg {
	customScheme?: string;
}

declare module "react-native-auth0" {
	export interface Auth0ContextInterface extends Auth0ContextInterfaceExtend {
		clearSession(ClearSessionArg): Promise<void>;
	}
}
