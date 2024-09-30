// Inisialisasi variabel untuk menghitung jumlah kendaraan
let counts = {
    motor: 0,
    mobil: 0,
    angkutanUmum: 0,
    bus: 0,
    pickup: 0,
    trukBesar: 0
};

// Variabel untuk debounce
let lastClickTime = 0;
const debounceTime = 300; // waktu dalam milidetik

// Fungsi untuk meningkatkan jumlah kendaraan dengan debounce
function incrementCount(type) {
    const currentTime = Date.now();
    if (currentTime - lastClickTime >= debounceTime) {
        counts[type]++; // Meningkatkan jumlah kendaraan
        lastClickTime = currentTime; // update waktu klik terakhir
        updateChart(); // Memperbarui grafik setelah menghitung
    }
}

// Fungsi untuk memperbarui grafik
function updateChart() {
    const ctx = document.getElementById('trafficChart').getContext('2d');
    const data = {
        labels: ['Motor', 'Mobil', 'Angkutan Umum', 'Bus', 'Pickup', 'Truk Besar'],
        datasets: [{
            label: 'Jumlah Kendaraan',
            data: [counts.motor, counts.mobil, counts.angkutanUmum, counts.bus, counts.pickup, counts.trukBesar],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            borderWidth: 1,
        }]
    };

    // Jika chart sudah ada, hapus sebelum mengganti dengan yang baru
    if (window.trafficChart) {
        window.trafficChart.destroy();
    }

    // Buat grafik baru
    window.trafficChart = new Chart(ctx, {
        type: 'bar', // Jenis grafik bisa diubah sesuai kebutuhan
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                datalabels: {
                    display: true,
                    color: '#fff',
                    anchor: 'end',
                    align: 'end',
                    formatter: (value) => value,
                }
            }
        }
    });
}

// Fungsi untuk mengekspor ke Excel
function exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet([
        { Kendaraan: 'Motor', Jumlah: counts.motor },
        { Kendaraan: 'Mobil', Jumlah: counts.mobil },
        { Kendaraan: 'Angkutan Umum', Jumlah: counts.angkutanUmum },
        { Kendaraan: 'Bus', Jumlah: counts.bus },
        { Kendaraan: 'Pickup', Jumlah: counts.pickup },
        { Kendaraan: 'Truk Besar', Jumlah: counts.trukBesar },
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Kendaraan');
    XLSX.writeFile(workbook, 'data_kendaraan.xlsx');
}

// Fungsi untuk mengekspor grafik ke PNG
function exportChartToPNG() {
    const canvas = document.getElementById('trafficChart');
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'chart.png';
    link.click();
}

// Fungsi untuk memainkan suara burung
function playBirdSound() {
    var sound = document.getElementById("birdSound");
    sound.currentTime = 0; // Mulai dari awal
    sound.play(); // Mainkan suara
}

// Fungsi untuk menangani klik kendaraan
function incrementMotor() { incrementCount('motor'); }
function incrementMobil() { incrementCount('mobil'); }
function incrementAngkutanUmum() { incrementCount('angkutanUmum'); }
function incrementBus() { incrementCount('bus'); }
function incrementPickup() { incrementCount('pickup'); }
function incrementTrukBesar() { incrementCount('trukBesar'); }
