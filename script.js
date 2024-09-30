let countData = {
    motor: 0,
    mobil: 0,
    angkutanUmum: 0,
    bus: 0,
    pickup: 0,
    trukBesar: 0
};

let lastClicked = 0;

function incrementCount(type) {
    const now = Date.now();
    if (now - lastClicked < 300) { // 300 ms delay
        return; // Jangan lakukan apa-apa jika diklik terlalu cepat
    }
    lastClicked = now;

    countData[type]++;
    updateChart();
    animateCount(type); // Panggil fungsi animasi
}

const ctx = document.getElementById('trafficChart').getContext('2d');
const trafficChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Motor', 'Mobil', 'Angkutan Umum', 'Bus', 'Pickup', 'Truk Besar'],
        datasets: [{
            label: 'Jumlah Kendaraan',
            data: [
                countData.motor, 
                countData.mobil, 
                countData.angkutanUmum, 
                countData.bus, 
                countData.pickup, 
                countData.trukBesar
            ],
            backgroundColor: [
                '#ffc107', '#007bff', '#28a745', '#dc3545', '#17a2b8', '#6c757d'
            ],
            datalabels: {
                anchor: 'end',
                align: 'end',
                formatter: (value) => value, // Menampilkan nilai
                color: '#fff', // Warna teks
                font: {
                    weight: 'bold',
                },
            },
        }]
    },
    options: {
        plugins: {
            datalabels: {
                display: true,
            },
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function updateChart() {
    trafficChart.data.datasets[0].data = [
        countData.motor, 
        countData.mobil, 
        countData.angkutanUmum, 
        countData.bus, 
        countData.pickup, 
        countData.trukBesar
    ];
    trafficChart.update();
}

function animateCount(type) {
    const counterElement = document.querySelector('.counter');
    counterElement.classList.add('animate');
    setTimeout(() => {
        counterElement.classList.remove('animate');
    }, 500);
}

function exportToExcel() {
    const workbook = XLSX.utils.book_new();
    const worksheetData = [
        ["Jenis Kendaraan", "Jumlah"],
        ["Motor", countData.motor],
        ["Mobil", countData.mobil],
        ["Angkutan Umum", countData.angkutanUmum],
        ["Bus", countData.bus],
        ["Pickup", countData.pickup],
        ["Truk Besar", countData.trukBesar],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Traffic Count");

    XLSX.writeFile(workbook, "Traffic_Count.xlsx");
}

function exportChartToPNG() {
    const link = document.createElement('a');
    link.href = trafficChart.toBase64Image();
    link.download = 'Traffic_Chart.png';
    link.click();
}
function playBirdSound() {
    var sound = document.getElementById("birdSound");
    sound.currentTime = 0; // Mulai dari awal
    sound.play(); // Mainkan suara
}


