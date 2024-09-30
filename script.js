// Inisialisasi Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

// Data untuk counting
let counts = {
    motor: 0,
    mobil: 0,
    angkutanUmum: 0,
    bus: 0,
    pickup: 0,
    trukBesar: 0
};

// Fungsi untuk menghitung kendaraan dan menyimpan data ke Firebase
function incrementCount(type) {
    counts[type]++;
    updateChart();
}

// Fungsi untuk memperbarui grafik
function updateChart() {
    const ctx = document.getElementById('trafficChart').getContext('2d');
    const data = [
        counts.motor, 
        counts.mobil, 
        counts.angkutanUmum, 
        counts.bus, 
        counts.pickup, 
        counts.trukBesar
    ];

    if (window.trafficChart) {
        window.trafficChart.destroy();
    }

    window.trafficChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Motor', 'Mobil', 'Angkutan Umum', 'Bus', 'Pickup', 'Truk Besar'],
            datasets: [{
                label: 'Jumlah Kendaraan',
                data: data,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'end',
                    color: 'black',
                    formatter: (value) => value
                }
            }
        }
    });
}

// Fungsi untuk export data ke Excel
function exportToExcel() {
    const data = [
        ['Kendaraan', 'Jumlah'],
        ['Motor', counts.motor],
        ['Mobil', counts.mobil],
        ['Angkutan Umum', counts.angkutanUmum],
        ['Bus', counts.bus],
        ['Pickup', counts.pickup],
        ['Truk Besar', counts.trukBesar]
    ];

    let csvContent = "data:text/csv;charset=utf-8," 
        + data.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "traffic_count.csv");
    document.body.appendChild(link);
    link.click();
}

// Fungsi untuk export grafik ke PNG
function exportChartAsPNG() {
    const link = document.createElement('a');
    link.href = document.getElementById('trafficChart').toDataURL('image/png');
    link.download = 'traffic_chart.png';
    link.click();
}

// Fungsi untuk memutar suara burung ketika logo diklik
function playBirdSound() {
    const sound = document.getElementById("birdSound");
    sound.play();
}
