// Hooks
import { useMemo } from "react";
import { useGetCitiesByProvinceIdQuery } from "../api/data.api";
import useSelector from "./useSelector";

// Types
import { City } from "../interfaces";

const useGetCityOptions = (provinceId: number) => {
	const isAuth = useSelector(state => state.auth.isAuth);
	const {
		data: citiesData,
		isLoading,
		isFetching,
		error,
		refetch
	} = useGetCitiesByProvinceIdQuery(provinceId, {
		skip: !isAuth || provinceId === -1
	});

	const cityOptions = useMemo<{ label: string; value: number }[]>(() => {
		const availableOptions =
			citiesData?.data.cities?.map((city: City) => ({
				label: `${city.type === "Kabupaten" ? "Kab." : "Kota"} ${city.city_name}`,
				value: +city.city_id
			})) || [];

		return [{ label: "-- Select city/subdistrict --", value: -1 }, ...availableOptions];
	}, [citiesData?.data.cities]);

	return { cityOptions, isLoading, isFetching, error, refetch };
};

export default useGetCityOptions;
