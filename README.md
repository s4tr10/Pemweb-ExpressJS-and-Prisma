# Pemrograman Web: ExpressJS & Prisma (Week 9 & 10)

Repository untuk tugas mata kuliah Pemrograman Web:
- **Minggu ke-9 (`feat/tugas-9`)**: REST API Daftar Produk menggunakan ExpressJS (In-Memory Array)
- **Minggu ke-10 (`feat/tugas-10`)**: Integrasi PostgreSQL & Prisma ORM (CRUD Produk Lengkap + Migration)

## Struktur Folder

```text
├── prisma/
│   ├── migrations/
│   │   └── 20261105153250_init_product/
│   │       └── migration.sql
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── controllers/
│   │   ├── hello.controller.ts
│   │   └── product.controller.ts
│   ├── lib/
│   │   └── prisma.ts
│   ├── middleware/
│   │   └── request-logger.ts
│   ├── routes/
│   │   ├── hello.routes.ts
│   │   └── product.routes.ts
│   ├── app.ts
│   └── index.ts
├── .env.example
├── package.json
├── prisma.config.ts
└── tsconfig.json
```

## Cara Menjalankan Proyek

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Siapkan konfigurasi database (`.env`):**
   Salin `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```
   - Jika menggunakan **Prisma Postgres Lokal** (tanpa perlu install PostgreSQL manual):
     ```bash
     npx prisma dev -n pemweb --db-port 51214 --shadow-db-port 51215 -p 51213
     ```
     Lalu pastikan `.env` berisi:
     ```env
     DATABASE_URL="postgres://postgres:postgres@localhost:51214/template1?sslmode=disable&max=1&fetch_types=false"
     PORT=3000
     ```

3. **Jalankan Migration, Generate Client, dan Seed Data Awal:**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   npm run seed
   ```

4. **Jalankan Server Express:**
   ```bash
   npm run dev
   ```
   Server akan berjalan di `http://localhost:3000`.

5. **Membuka Prisma Studio (untuk melihat & screenshot isi database):**
   ```bash
   npx prisma studio
   ```

## Daftar Endpoint API

| Method | Endpoint | Deskripsi | Request Body (JSON) | Status Code |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/hello` | Sapaan JSON (`?nama=...`) | - | `200 OK` |
| `GET` | `/products` | Menampilkan seluruh data produk | - | `200 OK` |
| `GET` | `/products/:id` | Menampilkan satu produk berdasarkan `id` | - | `200 OK` / `400` / `404` |
| `POST` | `/products` | Membuat produk baru | `{ "name": "Spidol", "price": 8500 }` | `201 Created` / `400` |
| `PUT` | `/products` atau `/products/:id` | Mengupdate produk yang sudah ada | `{ "id": 3, "name": "Spidol Snowman", "price": 9500 }` | `200 OK` / `400` / `404` |
| `DELETE` | `/products/:id` atau `/products` | Menghapus produk berdasarkan `id` | Opsional `{ "id": 3 }` jika tanpa `:id` | `200 OK` / `400` / `404` |
