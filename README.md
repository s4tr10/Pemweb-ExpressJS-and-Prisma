# Pemrograman Web: ExpressJS & Prisma (Week 9 & 10)

Repository untuk tugas mata kuliah Pemrograman Web:
- **Minggu ke-9 (Tugas 9)**: REST API Daftar Produk menggunakan ExpressJS (In-Memory Array)
- **Minggu ke-10 (Tugas 10)**: Integrasi PostgreSQL & Prisma ORM (CRUD Produk Lengkap)

## Struktur Folder

```text
├── src/
│   ├── controllers/
│   │   ├── hello.controller.ts
│   │   └── product.controller.ts
│   ├── middleware/
│   │   └── request-logger.ts
│   ├── routes/
│   │   ├── hello.routes.ts
│   │   └── product.routes.ts
│   ├── app.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

## Cara Menjalankan Proyek

1. Install dependencies:
   ```bash
   npm install
   ```
2. Jalankan server dalam mode development:
   ```bash
   npm run dev
   ```
   Server akan berjalan di `http://localhost:3000`.

## Daftar Endpoint (Week 9)

| Method | Endpoint | Deskripsi | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/hello` | Mengembalikan pesan sapaan JSON (`?nama=...`) | `200 OK` |
| `GET` | `/products` | Menampilkan seluruh daftar produk | `200 OK` |
| `GET` | `/products/:id` | Menampilkan detail satu produk berdasarkan `id` | `200 OK` / `404 Not Found` |
| `POST` | `/products` | Menambahkan produk baru (`name`, `price`) | `201 Created` / `400 Bad Request` |
