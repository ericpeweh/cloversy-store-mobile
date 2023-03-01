// Components
import { ITextProps, Text, VStack } from "native-base";

// Types
import { PaymentMethod } from "../interfaces";

type PaymentInstructionsType = {
	[key in PaymentMethod]: { label: string; steps: React.ReactElement }[];
};

const NormalText = ({ children }: ITextProps) => <Text fontSize="13px">{children}</Text>;

const BoldText = ({ children }: ITextProps) => (
	<Text fontWeight="700" fontSize="13px">
		{children}
	</Text>
);

const paymentInstructions: PaymentInstructionsType = {
	gopay: [
		{
			label: "Gojek / E-Wallet",
			steps: (
				<VStack p={4} pt={2}>
					<NormalText>
						1. Buka <BoldText>aplikasi Gojek</BoldText> atau <BoldText>e-wallet lain</BoldText>{" "}
						Anda.
					</NormalText>
					<NormalText>
						2. Pindai <BoldText>kode QR</BoldText> pada monitor.
					</NormalText>
					<NormalText>4. Konfirmasi pembayaran pada aplikasi.</NormalText>
					<NormalText>5. Pembayaran selesai.</NormalText>
				</VStack>
			)
		}
	],
	mandiri: [
		{
			label: "ATM Mandiri",
			steps: (
				<VStack p={4} pt={2}>
					<NormalText>
						1. Pilih <BoldText>Bayar/Beli</BoldText> pada menu utama.
					</NormalText>
					<NormalText>
						2. Pilih <BoldText>Lainnya.</BoldText>
					</NormalText>
					<NormalText>
						3. Pilih <BoldText>Multi Payment.</BoldText>
					</NormalText>
					<NormalText>
						4. Masukkan kode perusahaan <BoldText>70012.</BoldText>
					</NormalText>
					<NormalText>
						5. Masukkan <BoldText>nomor virtual account</BoldText>, lalu{" "}
						<BoldText>konfirmasi.</BoldText>
					</NormalText>
					<NormalText>6. Pembayaran selesai.</NormalText>
				</VStack>
			)
		},
		{
			label: "Internet Banking",
			steps: (
				<VStack p={4} pt={2}>
					<NormalText>
						1. Pilih <BoldText>Bayar</BoldText> pada menu utama.
					</NormalText>
					<NormalText>
						2. Pilih <BoldText>Multi Payment</BoldText>.
					</NormalText>
					<NormalText>
						3. Pilih <BoldText>Dari rekening</BoldText>.
					</NormalText>
					<NormalText>
						4. Pilih <BoldText>Midtrans</BoldText> di bagian <BoldText>Penyedia jasa</BoldText>.
					</NormalText>
					<NormalText>
						5. Masukkan <BoldText>nomor virtual account</BoldText>, lalu{" "}
						<BoldText>konfirmasi</BoldText>.
					</NormalText>
					<NormalText>6. Pembayaran selesai.</NormalText>
				</VStack>
			)
		}
	],
	permata: [
		{
			label: "ATM Permata/ALTO",
			steps: (
				<VStack p={4} pt={2}>
					<NormalText>
						1. Pilih <BoldText>transaksi lainnya</BoldText> pada menu tama
					</NormalText>
					<NormalText>
						2. Pilih <BoldText>pembayaran</BoldText>.
					</NormalText>
					<NormalText>
						3. Pilih <BoldText>pembayaran lainnya</BoldText>.
					</NormalText>
					<NormalText>
						4. Pilih <BoldText>virtual account</BoldText>.
					</NormalText>
					<NormalText>
						5. Masukkan <BoldText>nomor virtual account Permata</BoldText>, lalu{" "}
						<BoldText>konfirmasi</BoldText>.
					</NormalText>
					<NormalText>6. Pembayaran selesai."</NormalText>
				</VStack>
			)
		}
	],
	bni: [
		{
			label: "ATM BNI",
			steps: (
				<VStack p={4} pt={2}>
					<NormalText>
						1. Pilih <BoldText>menu lain</BoldText> pada menu utama.
					</NormalText>
					<NormalText>
						2. Pilih <BoldText>transfer</BoldText>.
					</NormalText>
					<NormalText>
						3. Pilih <BoldText>ke rekening BNI</BoldText>.
					</NormalText>
					<NormalText>
						4. Masukkan <BoldText>nomor rekening pembayaran</BoldText>.
					</NormalText>
					<NormalText>
						5. Masukkan <BoldText>jumlah yang akan dibayar</BoldText>, lalu{" "}
						<BoldText>konfirmasi</BoldText>.
					</NormalText>
					<NormalText>6. Pembayaran selesai.</NormalText>
				</VStack>
			)
		},
		{
			label: "Internet Banking",
			steps: (
				<VStack p={4} pt={2}>
					<NormalText>
						1. Pilih <BoldText>transaksi</BoldText>, lalu{" "}
						<BoldText>info & administrasi transfer</BoldText>.
					</NormalText>
					<NormalText>
						2. Pilih <BoldText>atur rekening tujuan</BoldText>.
					</NormalText>
					<NormalText>
						3. Masukkan <BoldText>informasi rekening</BoldText>, lalu{" "}
						<BoldText>konfirmasi</BoldText>.
					</NormalText>
					<NormalText>
						4. Pilih <BoldText>transfer, lalu transfer ke rekening BNI</BoldText>.
					</NormalText>
					<NormalText>
						5. Masukkan <BoldText>detail pembayaran</BoldText>, lalu <BoldText>konfirmasi</BoldText>
						.
					</NormalText>
					<NormalText>6. Pembayaran selesai.</NormalText>
				</VStack>
			)
		},
		{
			label: "Mobile Banking",
			steps: (
				<VStack p={4} pt={2}>
					<NormalText>
						1. Pilih <BoldText>transfer</BoldText>.
					</NormalText>
					<NormalText>
						2. Pilih <BoldText>virtual account billing</BoldText>.
					</NormalText>
					<NormalText>
						3. Pilih <BoldText>rekening debit</BoldText> yang akan digunakan.
					</NormalText>
					<NormalText>
						4. Masukkan <BoldText>nomor virtual account</BoldText>, lalu{" "}
						<BoldText>konfirmasi</BoldText>.
					</NormalText>
					<NormalText>5. Pembayaran selesai.</NormalText>
				</VStack>
			)
		}
	],
	bri: [
		{
			label: "ATM BRI",
			steps: (
				<VStack p={4} pt={2}>
					<NormalText>
						1. Pilih <BoldText>transaksi lainnya</BoldText>
						pada menu utama.
					</NormalText>
					<NormalText>
						2. Pilih <BoldText>pembayaran</BoldText>.
					</NormalText>
					<NormalText>
						3. Pilih <BoldText>lainnya</BoldText>.
					</NormalText>
					<NormalText>
						4. Pilih <BoldText>BRIVA</BoldText>.
					</NormalText>
					<NormalText>
						5. Masukkan <BoldText>nomor BRIVA</BoldText>
						lalu <BoldText>konfirmasi</BoldText>.,
					</NormalText>
					<NormalText>6. Pembayaran selesai.</NormalText>
				</VStack>
			)
		},
		{
			label: "IB BRI",
			steps: (
				<VStack p={4} pt={2}>
					<NormalText>
						1. Pilih <BoldText>pembayaran & pembelian</BoldText>.
					</NormalText>
					<NormalText>
						2. Pilih <BoldText>BRIVA</BoldText>.
					</NormalText>
					<NormalText>
						3. Masukkan <BoldText>nomor BRIVA</BoldText>, lalu <BoldText>konfirmasi</BoldText>.
					</NormalText>
					<NormalText>4. Pembayaran selesai.</NormalText>
				</VStack>
			)
		},
		{
			label: "BRImo",
			steps: (
				<VStack p={4} pt={2}>
					<NormalText>
						1. Pilih <BoldText>pembayaran</BoldText>.
					</NormalText>
					<NormalText>
						2. Pilih <BoldText>BRIVA</BoldText>.
					</NormalText>
					<NormalText>
						3. Masukkan <BoldText>nomor BRIVA</BoldText>, lalu <BoldText>konfirmasi</BoldText>.
					</NormalText>
					<NormalText>4. Pembayaran selesai.</NormalText>
				</VStack>
			)
		}
	]
};

export default paymentInstructions;
