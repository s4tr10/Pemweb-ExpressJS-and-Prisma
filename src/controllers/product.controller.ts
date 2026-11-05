import type { Request, Response } from 'express';
import prisma from '../lib/prisma.js';

export async function getProducts(_req: Request, res: Response) {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: 'asc' },
    });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error getProducts:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        message: 'Parameter id harus berupa angka bulat positif',
      });
      return;
    }

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      res.status(404).json({
        message: 'Produk tidak ditemukan',
      });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error getProductById:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const { name, price } = req.body ?? {};

    if (typeof name !== 'string' || name.trim() === '') {
      res.status(400).json({
        message: 'Field name wajib diisi berupa string',
      });
      return;
    }

    const parsedPrice = Number(price);
    if (
      price === undefined ||
      price === null ||
      price === '' ||
      Number.isNaN(parsedPrice) ||
      parsedPrice < 0
    ) {
      res.status(400).json({
        message: 'Field price wajib diisi berupa angka yang valid (>= 0)',
      });
      return;
    }

    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        price: Math.round(parsedPrice),
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error createProduct:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const rawId = req.body?.id ?? req.params.id;
    const id = Number(rawId);

    if (rawId === undefined || rawId === null || rawId === '' || Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        message: 'Field id wajib diisi berupa angka bulat positif',
      });
      return;
    }

    const { name, price } = req.body ?? {};

    if (typeof name !== 'string' || name.trim() === '') {
      res.status(400).json({
        message: 'Field name wajib diisi berupa string',
      });
      return;
    }

    const parsedPrice = Number(price);
    if (
      price === undefined ||
      price === null ||
      price === '' ||
      Number.isNaN(parsedPrice) ||
      parsedPrice < 0
    ) {
      res.status(400).json({
        message: 'Field price wajib diisi berupa angka yang valid (>= 0)',
      });
      return;
    }

    const existing = await prisma.product.findUnique({
      where: { id },
    });

    if (!existing) {
      res.status(404).json({
        message: 'Produk tidak ditemukan',
      });
      return;
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: name.trim(),
        price: Math.round(parsedPrice),
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updateProduct:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
}
