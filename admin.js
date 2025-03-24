document.addEventListener('DOMContentLoaded', () => {
    const reservationList = document.getElementById('reservation-list');

    // Ambil data dari localStorage (sementara, bisa diganti dengan API jika ada backend)
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];

    function renderReservations() {
        reservationList.innerHTML = '';
        reservations.forEach((res, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${res.name}</td>
                <td>${res.phone}</td>
                <td>${res.email}</td>
                <td>${res.date}</td>
                <td>${res.time}</td>
                <td>
                    <button class="delete-btn" data-index="${index}">Hapus</button>
                </td>
            `;
            reservationList.appendChild(row);
        });
    }

    // Event listener untuk menghapus reservasi
    reservationList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.getAttribute('data-index');
            reservations.splice(index, 1);
            localStorage.setItem('reservations', JSON.stringify(reservations));
            renderReservations();
        }
    });

    renderReservations();
});
