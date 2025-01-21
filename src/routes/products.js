const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching products.' });
  }
});

router.get('/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        orders: true,
      },
    });

    if (!product) return res.status(404).json({ error: 'Product not found.' });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching product.' });
  }
});

module.exports = router;
