# Latihan Prisma

Teknologi yang digunakan:

- TypeScript
- Node.js (TS)
- Prisma ORM
- PostgreSQL (database)

## Installation

### Step 1: Setup Environment

Salin file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

### Step 2: Install Dependencies

Jalankan perintah berikut untuk menginstal semua package:

```bash
npm install
```

## Menjalankan Migration dan Seeder

Untuk informasi lebih lanjut, baca dokumentasi resmi di [Prisma ORM Documentation](https://orm.drizzle.team/docs/get-started/postgresql-new).

### Step 1: Generate dari dari Prisma dan Migration

```bash
npx prisma migrate dev --name init
```

### Step 2: Menjalankan Seeder

Jalankan file seeder sesuai dengan nama file di folder `seeders`. Contoh:

```bash
ts-node src/seed/userSeed.ts
```

## Menjalankan Aplikasi

Untuk menjalankan aplikasi, gunakan perintah berikut:

```bash
npm run dev
```
