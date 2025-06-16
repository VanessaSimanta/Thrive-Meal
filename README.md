# Thrive Meal 🍽️

Thrive Meal adalah aplikasi web yang dirancang untuk katering makanan sehat yang dilengkapi dengan fitur baik untuk pengguna umum dan admin.
Dengan tujuan untuk meningkatkan pola hidup masyarakat agar memiliki akses yang mudah ke makanan sehat.

Beberapa fitur utama yang ada adalah sebagai berikut : 
### Untuk Pengguna:
- Melihat menu per minggu.
- Melakukan pemesanan.
- Melakukan pembayaran.

### Untuk Admin:
- Login ke dashboard admin.
- Mengelola daftar makanan (CRUD).
- Mengelola pesanan pengguna.
- Melihat statistik bulanan/harian.
- Mengatur cabang dan driver ke pemesanan.


## 🛠️ Teknologi yang Digunakan

- **Frontend**: React.js + Bootstrap
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL
- **ORM**: Knex.js
- **Authentication**: JWT
- **Deployment**: DigitalOcean (Ubuntu)
- **Email**: Nodemailer
- **Process Manager**: PM2

---

## ⚙️ Instalasi Lokal
1. Clone repository
2. Buka terminal 
3. cd frontend
4. npm install
5. cd ../frontend-admin
6. npm install
7. cd ../backend
8. npm install
9. Siapkan env di backend dan kedua frontend
10. npx knex migrate:latest --knexfile src/knex.js
11. npx knex seed:run --knexfile src/knex.js
12. Jalankan backend "nodemon index.js"
13. Jalankan kedua frontend "npm start"

