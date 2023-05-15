// Dependencies
import { extendTheme } from "native-base";

const mainThemeConfig = {
	colors: {
		primary: {
			300: "#65a85d",
			400: "#55904E",
			500: "#477841"
		},
		secondary: {
			300: "#3b3b3b",
			400: "#282828"
		}
	},
	fontConfig: {
		300: {
			normal: "Roboto-Light"
		},
		400: {
			normal: "Roboto-Regular"
		},
		500: {
			normal: "Roboto-Medium"
		},
		700: {
			normal: "Roboto-Bold"
		}
	},
	components: {
		Input: {
			defaultProps: {
				_input: {
					selectionColor: undefined,
					cursorColor: undefined
				}
			}
		},
		TextArea: {
			defaultProps: {
				_input: {
					selectionColor: undefined,
					cursorColor: undefined
				}
			}
		}
	}
};

const mainTheme = extendTheme(mainThemeConfig);

export default mainTheme;
