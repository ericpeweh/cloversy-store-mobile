// Types
import { PaymentMethod } from "../interfaces";

type PaymentInstructionsType = {
	[key in PaymentMethod]: { label: string; steps: string[] }[];
};

const paymentInstructions: PaymentInstructionsType = {
	gopay: [
		{
			label: "Gojek / E-Wallet",
			steps: [
				"Buka <strong>aplikasi Gojek</strong> atau <strong>e-wallet lain</strong> Anda.",
				"Pindai <strong>kode QR</strong> pada monitor.",
				"Konfirmasi pembayaran pada aplikasi.",
				"Pembayaran selesai."
			]
		}
	],
	mandiri: [
		{
			label: "ATM Mandiri",
			steps: [
				"Pilih <strong>Bayar/Beli</strong> pada menu utama.",
				"Pilih <strong>Lainnya.</strong>",
				"Pilih <strong>Multi Payment.</strong>",
				"Masukkan kode perusahaan <strong>70012.</strong>",
				"Masukkan <strong>nomor virtual account</strong>, lalu <strong>konfirmasi.</strong>",
				"Pembayaran selesai."
			]
		},
		{
			label: "Internet Banking",
			steps: [
				"Pilih <strong>Bayar</strong> pada menu utama.",
				"Pilih <strong>Multi Payment</strong>.",
				"Pilih <strong>Dari rekening</strong>.",
				"Pilih <strong>Midtrans</strong> di bagian <strong>Penyedia jasa</strong>.",
				"Masukkan <strong>nomor virtual account</strong>, lalu <strong>konfirmasi</strong>.",
				"Pembayaran selesai."
			]
		}
	],
	permata: [
		{
			label: "ATM Permata/ALTO",
			steps: [
				"Pilih <strong>transaksi lainnya</strong> pada menu utama.",
				"Pilih <strong>pembayaran</strong>.",
				"Pilih <strong>pembayaran lainnya</strong>.",
				"Pilih <strong>virtual account</strong>.",
				"Masukkan <strong>nomor virtual account Permata</strong>, lalu <strong>konfirmasi</strong>.",
				"Pembayaran selesai."
			]
		}
	],
	bni: [
		{
			label: "ATM BNI",
			steps: [
				"Pilih <strong>menu lain</strong> pada menu utama.",
				"Pilih <strong>transfer</strong>.",
				"Pilih <strong>ke rekening BNI</strong>.",
				"Masukkan <strong>nomor rekening pembayaran</strong>.",
				"Masukkan <strong>jumlah yang akan dibayar</strong>, lalu <strong>konfirmasi</strong>.",
				"Pembayaran selesai."
			]
		},
		{
			label: "Internet Banking",
			steps: [
				"Pilih <strong>transaksi</strong>, lalu <strong>info & administrasi transfer</strong>.",
				"Pilih <strong>atur rekening tujuan</strong>.",
				"Masukkan <strong>informasi rekening</strong>, lalu <strong>konfirmasi</strong>.",
				"Pilih <strong>transfer, lalu transfer ke rekening BNI</strong>.",
				"Masukkan <strong>detail pembayaran</strong>, lalu <strong>konfirmasi</strong>.",
				"Pembayaran selesai."
			]
		},
		{
			label: "Mobile Banking",
			steps: [
				"Pilih <strong>transfer</strong>.",
				"Pilih <strong>virtual account billing</strong>.",
				"Pilih <strong>rekening debit</strong> yang akan digunakan.",
				"Masukkan <strong>nomor virtual account</strong>, lalu <strong>konfirmasi</strong>.",
				"Pembayaran selesai."
			]
		}
	],
	bri: [
		{
			label: "ATM BRI",
			steps: [
				"Pilih <strong>transaksi lainnya</strong> pada menu utama.",
				"Pilih <strong>pembayaran</strong>.",
				"Pilih <strong>lainnya</strong>.",
				"Pilih <strong>BRIVA</strong>.",
				"Masukkan <strong>nomor BRIVA</strong>, lalu <strong>konfirmasi</strong>.",
				"Pembayaran selesai."
			]
		},
		{
			label: "IB BRI",
			steps: [
				"Pilih <strong>pembayaran & pembelian</strong>.",
				"Pilih<strong>BRIVA</strong>.",
				"Masukkan <strong>nomor BRIVA</strong>, lalu <strong>konfirmasi</strong>.",
				"Pembayaran selesai."
			]
		},
		{
			label: "BRImo",
			steps: [
				"Pilih <strong>pembayaran</strong>.",
				"Pilih <strong>BRIVA</strong>.",
				"Masukkan <strong>nomor BRIVA</strong>, lalu <strong>konfirmasi</strong>.",
				"Pembayaran selesai."
			]
		}
	]
};

export default paymentInstructions;
