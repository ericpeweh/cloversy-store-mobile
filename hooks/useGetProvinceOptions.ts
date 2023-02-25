// Hooks
import { useMemo } from "react";
import { useGetAllProvincesQuery } from "../api/data.api";
import useSelector from "./useSelector";

// Types
import { Province } from "../interfaces";

const useGetProvinceOptions = () => {
	const isAuth = useSelector(state => state.auth.isAuth);
	const {
		data: provincesData,
		isLoading,
		isFetching,
		refetch,
		error
	} = useGetAllProvincesQuery(isAuth, {
		skip: !isAuth
	});

	const provinceOptions = useMemo<{ label: string; value: number }[]>(() => {
		const availableOptions =
			provincesData?.data.provinces?.map((province: Province) => ({
				label: province.province,
				value: +province.province_id
			})) || [];

		return [{ label: "-- Select province --", value: -1 }, ...availableOptions];
	}, [provincesData?.data.provinces]);

	return { provinceOptions, isLoading, isFetching, error, refetch };
};

export default useGetProvinceOptions;
