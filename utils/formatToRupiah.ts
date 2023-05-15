const formatToRupiah = (amount: number) => {
	const numberFormat = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR"
	});
	const rupiah = numberFormat.format(amount);

	return rupiah.replace(",00", "");
};

export default formatToRupiah;
