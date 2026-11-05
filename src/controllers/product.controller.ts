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

let nextId = 3;

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

export function createProduct(req: Request, res: Response) {
  const { name, price } = req.body;

  if (typeof name !== 'string' || name.trim() === '') {
    res.status(400).json({
      message: 'Field name wajib diisi berupa string',
    });
    return;
  }

  const parsedPrice = Number(price);
  if (price === undefined || price === null || Number.isNaN(parsedPrice) || parsedPrice < 0) {
    res.status(400).json({
      message: 'Field price wajib diisi berupa angka yang valid',
    });
    return;
  }

  const product: Product = {
    id: nextId++,
    name: name.trim(),
    price: parsedPrice,
  };

  products.push(product);
  res.status(201).json(product);
}
