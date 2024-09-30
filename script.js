// Inisialisasi variabel untuk menghitung jumlah kendaraan
let counts = {
    motor: 0,
    mobil: 0,
    angkutanUmum: 0,
    bus: 0,
    pickup: 0,
    trukBesar: 0
};

// Fungsi untuk meningkatkan jumlah kendaraan
function incrementCount(type) {
    counts[type]++;
    updateChart();
}

// Fungsi untuk memperbarui grafik
function updateChart() {
    // Kode untuk memperbarui grafik Anda
}

// Fungsi untuk mengekspor ke Excel
function exportToExcel() {
    // Kode untuk mengekspor ke Excel
}

// Fungsi untuk mengekspor grafik ke PNG
function exportChartToPNG() {
    // Kode untuk mengekspor grafik ke PNG
}

// Fungsi untuk memainkan suara burung
function playBirdSound() {
    var sound = document.getElementById("birdSound");
    sound.currentTime = 0; // Mulai dari awal
    sound.play(); // Mainkan suara
}
