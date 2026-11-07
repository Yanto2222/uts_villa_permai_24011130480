// 1. DATA PERUMAHAN
const daftarVila = [
    {
        id: "vila-1",
        nama: "Villa Permai",
        tipe: "Rumah Siap Huni (2 Kamar)",
        lokasi: "Blok A - Villa Permai",
        harga: 350000000,
        fasilitas: "Siap Huni, Lingkungan Nyaman, Carport, WiFi",
        tersedia: true
    },
    {
        id: "vila-2",
        nama: "Villa Indah Harapan",
        tipe: "Rumah Mewah (3 Kamar)",
        lokasi: "Blok B - Indah Harapan",
        harga: 550000000,
        fasilitas: "Desain Mewah, Taman Pribadi, Water Heater, WiFi",
        tersedia: true
    },
    {
        id: "vila-3",
        nama: "Villa Gading",
        tipe: "Rumah Besar (4 Kamar)",
        lokasi: "Blok C - Gading",
        harga: 800000000,
        fasilitas: "Halaman Luas, Dapur Lengkap, Area Santai, Parkir 2 Mobil",
        tersedia: true
    }
];

// Ambil elemen DOM
const villaContainer = document.getElementById("villa-list");
const searchInput = document.getElementById("search-input");
const selectVila = document.getElementById("pilihan-vila");
const inputNama = document.getElementById("nama-tamu");
const areaHasil = document.getElementById("area-hasil");

// Helper format Rupiah
function formatRupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
}

// 2. RENDER DAFTAR PERUMAHAN
function renderVila(data) {
    if (!villaContainer) return;
    villaContainer.innerHTML = "";

    if (data.length === 0) {
        const pesanKosong = document.createElement("p");
        pesanKosong.textContent = "Perumahan yang Anda cari tidak ditemukan.";
        villaContainer.appendChild(pesanKosong);
        return;
    }

    data.forEach((vila) => {
        const card = document.createElement("article");
        card.className = "villa-card";

        const title = document.createElement("h3");
        title.className = "villa-card_title";
        title.textContent = vila.nama;

        const tipe = document.createElement("p");
        tipe.textContent = `Tipe: ${vila.tipe} | Lokasi: ${vila.lokasi}`;

        const fasilitas = document.createElement("p");
        fasilitas.textContent = `Fasilitas: ${vila.fasilitas}`;

        const harga = document.createElement("p");
        harga.className = "villa-card_price";
        harga.textContent = `Harga: ${formatRupiah(vila.harga)}`;

        const status = document.createElement("span");
        status.className = vila.tersedia ? "status-tersedia" : "status-penuh";
        status.textContent = vila.tersedia ? "Tersedia" : "Sudah Terjual";

        card.appendChild(title);
        card.appendChild(tipe);
        card.appendChild(fasilitas);
        card.appendChild(harga);
        card.appendChild(status);

        villaContainer.appendChild(card);
    });
}

// 3. ISI DROPDOWN PILIH UNIT PERUMAHAN
function isiDropdownVila() {
    if (!selectVila) return;
    daftarVila.forEach((vila) => {
        const option = document.createElement("option");
        option.value = vila.id;
        option.textContent = `${vila.nama} (${formatRupiah(vila.harga)})`;
        selectVila.appendChild(option);
    });
}

// 4. FITUR PENCARIAN / FILTER
if (searchInput) {
    searchInput.addEventListener("input", function () {
        const kataKunci = searchInput.value.toLowerCase();
        const hasilFilter = daftarVila.filter((vila) => {
            return (
                vila.nama.toLowerCase().includes(kataKunci) ||
                vila.lokasi.toLowerCase().includes(kataKunci) ||
                vila.fasilitas.toLowerCase().includes(kataKunci)
            );
        });
        renderVila(hasilFilter);
    });
}

// 5. TAMPILKAN HASIL SAAT DROPDOWN DIPILIH
if (selectVila && areaHasil) {
    selectVila.addEventListener("change", function () {
        const vilaTerpilih = daftarVila.find((v) => v.id === selectVila.value);
        areaHasil.innerHTML = "";

        if (vilaTerpilih) {
            const p = document.createElement("p");
            p.textContent = `Anda memilih ${vilaTerpilih.nama} - Harga: ${formatRupiah(vilaTerpilih.harga)}.`;
            areaHasil.appendChild(p);
        }
    });
}

// 6. SIMPAN NAMA TAMU KE LOCALSTORAGE
if (inputNama) {
    inputNama.addEventListener("input", function () {
        try {
            localStorage.setItem("namaTamuTerakhir", inputNama.value.trim());
        } catch (error) {
            console.warn("Gagal menyimpan nama ke localStorage.");
        }
    });
}

// 7. INISIALISASI SAAT HALAMAN DIBUKA
document.addEventListener("DOMContentLoaded", function () {
    renderVila(daftarVila);
    isiDropdownVila();

    try {
        const namaTersimpan = localStorage.getItem("namaTamuTerakhir");
        if (namaTersimpan && inputNama) {
            inputNama.value = namaTersimpan;
        }
    } catch (error) {
        console.warn("Gagal memuat data dari localStorage.");
    }
});