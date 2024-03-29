// Dependencies
import React from "react";

// Components
import { Image } from "native-base";

// Files
const LogoLong = require("../../assets/images/logo-long.png");

const HeaderLogo = () => {
	return <Image source={LogoLong} alt="Cloversy Logo" width="100px" resizeMode="contain" />;
};

export default HeaderLogo;
