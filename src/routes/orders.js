const express = require("express");
const { PrismaClient } = require("@prisma/client");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", authenticate, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { customerId: req.user.userId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching orders." });
  }
});

router.post("/", authenticate, async (req, res) => {
  const { date, note, productIds } = req.body;

  if (!productIds || productIds.length === 0) {
    return res
      .status(400)
      .json({ error: "At least one product must be included in the order." });
  }

  try {
    const order = await prisma.order.create({
      data: {
        date,
        note,
        customerId: req.user.userId,
        items: {
          create: productIds.map((productId) => ({
            product: { connect: { id: productId } },
          })),
        },
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating order." });
  }
});

router.get("/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    if (order.customerId !== req.user.userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to view this order." });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching order." });
  }
});

module.exports = router;
