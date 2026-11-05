import prisma from "../src/lib/prisma.js";

async function main() {
  const count = await prisma.product.count();
  if (count === 0) {
    await prisma.product.createMany({
      data: [
        { name: "Buku", price: 15000 },
        { name: "Pulpen", price: 5000 },
      ],
    });
    console.log("Database berhasil di-seed dengan produk awal (Buku & Pulpen).");
  } else {
    console.log("Database sudah memiliki data produk, skip seeding.");
  }
}

main()
  .catch((error) => {
    console.error("Gagal melakukan seed database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

