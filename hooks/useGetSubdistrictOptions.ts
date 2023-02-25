// Hooks
import { useMemo } from "react";
import { useGetSubdistrictsByCityIdQuery } from "../api/data.api";
import useSelector from "./useSelector";

// Types
import { Subdistrict } from "../interfaces";

const useGetSubdistrictOptions = (cityId: number) => {
	const isAuth = useSelector(state => state.auth.isAuth);
	const {
		data: subdistrictsData,
		isLoading,
		isFetching,
		error,
		refetch
	} = useGetSubdistrictsByCityIdQuery(cityId, {
		skip: !isAuth || cityId === -1
	});

	const subdistrictOptions = useMemo<{ label: string; value: number }[]>(() => {
		const availableOptions =
			subdistrictsData?.data.subdistricts?.map((subdistrict: Subdistrict) => ({
				label: subdistrict.subdistrict_name,
				value: +subdistrict.subdistrict_id
			})) || [];

		return [{ label: "-- Select subdistrict --", value: -1 }, ...availableOptions];
	}, [subdistrictsData?.data.subdistricts]);

	return { subdistrictOptions, isLoading, isFetching, error, refetch };
};

export default useGetSubdistrictOptions;
