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
├── screenshot/
│   ├── 01-prisma-studio-migration.png
│   ├── 02-postman-get-all-products.jpg
│   ├── 03-postman-get-product-by-id.png
│   ├── 04-postman-get-product-404.png
│   ├── 05-postman-post-product-201.png
│   ├── 06-postman-post-validation-error-400.png
│   ├── 07-postman-put-product-200.png
│   ├── 08-postman-delete-product-200.jpg
│   ├── 09-database-before.png
│   └── 10-database-after.png
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

5. **Membuka Prisma Studio (untuk melihat & memantau isi database):**
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
| `PUT` | `/products` atau `/products/:id` | Mengupdate produk yang sudah ada | `{ "id": 1, "name": "Buku Tulis Sinar Dunia", "price": 18000 }` | `200 OK` / `400` / `404` |
| `DELETE` | `/products/:id` atau `/products` | Menghapus produk berdasarkan `id` | Opsional `{ "id": 4 }` jika tanpa `:id` | `200 OK` / `400` / `404` |

---

## Bukti Pengujian & Evidence (Screenshots)

Berikut adalah dokumentasi pengujian seluruh skenario endpoint API menggunakan Postman dan bukti perubahan data pada database melalui Prisma Studio:

### Bagian A: Pengujian Endpoint API (Postman)

#### 1. GET /products (Menampilkan Seluruh Data Produk - 200 OK)
Menampilkan seluruh data produk yang tersimpan di database (`Buku` & `Pulpen`):
![GET All Products](screenshot/02-postman-get-all-products.jpg)

#### 2. GET /products/:id (Menampilkan Detail Produk Berdasarkan ID - 200 OK)
Menampilkan satu produk dengan ID 1 (`Buku`):
![GET Product By ID](screenshot/03-postman-get-product-by-id.png)

#### 3. GET /products/:id (Error Handling 404 Not Found)
Respon ketika ID produk tidak ditemukan di database (`/products/123`):
![GET Product 404 Not Found](screenshot/04-postman-get-product-404.png)

#### 4. POST /products (Menambahkan Produk Baru - 201 Created)
Menambahkan produk baru bernama `"Spidol"` dengan harga `8500`:
![POST Product 201 Created](screenshot/05-postman-post-product-201.png)

#### 5. POST /products (Validasi Gagal - 400 Bad Request)
Respon validasi saat field `name` kosong dan `price` bernilai negatif:
![POST Validation Error 400](screenshot/06-postman-post-validation-error-400.png)

#### 6. PUT /products (Mengupdate Produk yang Sudah Ada - 200 OK)
Mengupdate data produk ID 1 menjadi `"Buku Tulis Sinar Dunia"` dan harga `18000`:
![PUT Product 200 OK](screenshot/07-postman-put-product-200.png)

#### 7. DELETE /products/:id (Menghapus Data Produk - 200 OK)
Menghapus data produk berdasarkan ID (`/products/4`):
![DELETE Product 200 OK](screenshot/08-postman-delete-product-200.jpg)

---

### Bagian B: Perubahan pada Database (Prisma Studio)

#### 1. Riwayat Migrasi Database (`_prisma_migrations`)
Riwayat eksekusi migrasi awal yang berhasil diterapkan ke database PostgreSQL (`20261105153250_init_product`):
![Prisma Studio Migration](screenshot/01-prisma-studio-migration.png)

#### 2. Kondisi Database Sebelum Penambahan Data (Before)
Tabel `Product` sebelum operasi penambahan produk baru (hanya berisi data yang sudah ada):
![Database Before](screenshot/09-database-before.png)

#### 3. Kondisi Database Sesudah Penambahan Data (After)
Tabel `Product` sesudah operasi penambahan produk baru (muncul data baru dengan ID 5: `"Buku Tulis Paling Baru"` seharga `99000`):
![Database After](screenshot/10-database-after.png)
