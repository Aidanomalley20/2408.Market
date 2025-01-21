const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      title: "Wireless Mouse",
      description: "Ergonomic wireless mouse with adjustable DPI.",
      price: 29.99,
    },
    {
      title: "Mechanical Keyboard",
      description: "RGB mechanical keyboard with blue switches.",
      price: 79.99,
    },
    {
      title: "Gaming Headset",
      description: "Noise-cancelling headset with surround sound.",
      price: 49.99,
    },
    {
      title: "Laptop Stand",
      description: "Adjustable aluminum laptop stand.",
      price: 25.0,
    },
    {
      title: "Smartphone Tripod",
      description: "Lightweight tripod with phone mount.",
      price: 15.99,
    },
    {
      title: "Bluetooth Speaker",
      description: "Portable speaker with deep bass.",
      price: 39.99,
    },
    {
      title: "Fitness Tracker",
      description: "Waterproof fitness tracker with heart rate monitor.",
      price: 59.99,
    },
    {
      title: "External Hard Drive",
      description: "1TB external drive with USB 3.0 support.",
      price: 64.99,
    },
    {
      title: "Smart Light Bulb",
      description: "Wi-Fi enabled LED light bulb with app control.",
      price: 12.99,
    },
    {
      title: "HD Webcam",
      description: "1080p webcam with built-in microphone.",
      price: 45.0,
    },
    {
      title: "Portable Power Bank",
      description: "10,000mAh power bank with fast charging.",
      price: 19.99,
    },
    {
      title: "Noise Cancelling Earbuds",
      description: "In-ear earbuds with active noise cancellation.",
      price: 89.99,
    },
    {
      title: "Action Camera",
      description: "4K waterproof action camera with wide lens.",
      price: 109.99,
    },
    {
      title: "Smartwatch",
      description: "Touchscreen smartwatch with fitness tracking.",
      price: 129.99,
    },
    {
      title: "Gaming Monitor",
      description: "27-inch 144Hz curved gaming monitor.",
      price: 299.99,
    },
    {
      title: "Wireless Charger",
      description: "Fast charging pad for Qi-enabled devices.",
      price: 29.99,
    },
    {
      title: "USB-C Hub",
      description: "7-in-1 hub with HDMI and multiple USB ports.",
      price: 34.99,
    },
    {
      title: "Mechanical Pencil",
      description: "Premium mechanical pencil for writing and sketching.",
      price: 9.99,
    },
    {
      title: "Electric Kettle",
      description: "1.7L stainless steel electric kettle.",
      price: 49.99,
    },
    {
      title: "Digital Picture Frame",
      description: "Wi-Fi digital frame with cloud storage.",
      price: 99.99,
    },
  ];

  console.log("Seeding products...");
  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
