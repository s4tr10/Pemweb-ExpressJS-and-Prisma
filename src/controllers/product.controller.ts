import type { Request, Response } from 'express';

export interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: 'Buku', price: 15000 },
  { id: 2, name: 'Pulpen', price: 5000 },
];

export function getProducts(_req: Request, res: Response) {
  res.status(200).json(products);
}

export function getProductById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const product = products.find((item) => item.id === id);

  if (!product) {
    res.status(404).json({
      message: 'Produk tidak ditemukan',
    });
    return;
  }

  res.status(200).json(product);
}
