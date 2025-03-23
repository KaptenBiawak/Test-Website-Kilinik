// Data dokter (dalam aplikasi sebenarnya, data ini akan diambil dari database)
const doctors = [
    {
        id: 1,
        name: "dr. Ahmad Susanto, Sp.JP",
        specialty: "Kardiologi",
        image: "/api/placeholder/250/200",
        schedule: [
            { day: "Senin", time: "09:00 - 14:00" },
            { day: "Rabu", time: "13:00 - 18:00" },
            { day: "Jumat", time: "09:00 - 12:00" }
        ]
    },
    {
        id: 2,
        name: "dr. Siti Rahma, Sp.A",
        specialty: "Anak",
        image: "/api/placeholder/250/200",
        schedule: [
            { day: "Selasa", time: "09:00 - 14:00" },
            { day: "Kamis", time: "13:00 - 18:00" },
            { day: "Sabtu", time: "09:00 - 12:00" }
        ]
    },
    {
        id: 3,
        name: "dr. Budi Santoso, Sp.PD",
        specialty: "Penyakit Dalam",
        image: "/api/placeholder/250/200",
        schedule: [
            { day: "Senin", time: "13:00 - 18:00" },
            { day: "Rabu", time: "09:00 - 14:00" },
            { day: "Jumat", time: "13:00 - 18:00" }
        ]
    },
    {
        id: 4,
        name: "dr. Dewi Anggraini, Sp.OG",
        specialty: "Kandungan",
        image: "/api/placeholder/250/200",
        schedule: [
            { day: "Selasa", time: "13:00 - 18:00" },
            { day: "Kamis", time: "09:00 - 14:00" },
            { day: "Sabtu", time: "13:00 - 16:00" }
        ]
    }
];

// Render dokter ke dalam halaman
function renderDoctors() {
    const doctorsContainer = document.getElementById('doctors-container');
    
    doctors.forEach(doctor => {
        const doctorCard = document.createElement('div');
        doctorCard.className = 'doctor-card';
        
        const scheduleHTML = doctor.schedule.map(item => `
            <div class="schedule-item">
                <span class="day">${item.day}</span>
                <span class="time">${item.time}</span>
            </div>
        `).join('');
        
        doctorCard.innerHTML = `
            <div class="doctor-image">
                <img src="${doctor.image}" alt="${doctor.name}">
            </div>
            <div class="doctor-info">
                <h3 class="doctor-name">${doctor.name}</h3>
                <p class="doctor-specialty">Spesialis ${doctor.specialty}</p>
                <button class="btn" onclick="openReservationModal(${doctor.id})">Reservasi</button>
                <div class="doctor-schedule">
                    <h4>Jadwal Praktek:</h4>
                    ${scheduleHTML}
                </div>
            </div>
        `;
        
        doctorsContainer.appendChild(doctorCard);
    });
}

// Modal Reservasi
const modal = document.getElementById('reservation-modal');
const closeModalBtn = document.getElementById('close-modal');
const cancelBtn = document.getElementById('cancel-reservation');
const reservationForm = document.getElementById('reservation-form');
const doctorIdInput = document.getElementById('doctor-id');
const timeSelect = document.getElementById('time');
const dateInput = document.getElementById('date');
const toast = document.getElementById('toast');

// Buka modal reservasi
function openReservationModal(doctorId) {
    doctorIdInput.value = doctorId;
    modal.style.display = 'flex';
    
    // Cari dokter berdasarkan ID
    const doctor = doctors.find(doc => doc.id === doctorId);
    
    // Atur minimal tanggal adalah hari ini
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    dateInput.min = formattedDate;
    
    // Reset dan populasi opsi waktu
    timeSelect.innerHTML = '<option value="">Pilih Waktu</option>';
    
    // Di aplikasi sebenarnya, ini akan mengambil jadwal yang tersedia dari server
    const timeSlots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
    
    timeSlots.forEach(time => {
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        timeSelect.appendChild(option);
    });
}

// Tutup modal
function closeModal() {
    modal.style.display = 'none';
    reservationForm.reset();
}

closeModalBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

// Saat user klik di luar modal, tutup modal
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Handle form submit
reservationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Di aplikasi sebenarnya, ini akan mengirim data ke server
    // Untuk demo, kita hanya simulasikan sukses
    
    // Tampilkan notifikasi sukses
    toast.className = "show";
    
    // Sembunyikan notifikasi setelah 3 detik
    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
        closeModal();
    }, 3000);
});

// Smooth scrolling untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Inisialisasi halaman
renderDoctors();
