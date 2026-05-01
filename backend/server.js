// ============================================
// TECHAVOKADO E-COMMERCE BACKEND
// ============================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// MIDDLEWARE
// ============================================
app.use(cors());
app.use(express.json());

// ============================================
// MONGODB CONNECTION
// ============================================
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/techavokado';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ============================================
// SCHEMAS & MODELS
// ============================================

// Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  icon: { type: String, default: 'cpu' },
  order: { type: Number, default: 0 },
  productCount: { type: Number, default: 0 }
}, { timestamps: true });

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  image: { type: String, required: true },
  images: [{ type: String }],
  description: { type: String },
  specs: { type: Map, of: String },
  inStock: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  rating: { type: Number, default: 4.5 },
  reviewCount: { type: Number, default: 0 }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);

// ============================================
// API ROUTES
// ============================================

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find().sort({ order: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get products by category
app.get('/api/products/category/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    const products = await Product.find({ category: category._id }).populate('category', 'name slug');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const { category, search, limit, skip } = req.query;
    let query = {};
    
    if (category) {
      const cat = await Category.findOne({ slug: category });
      if (cat) query.category = cat._id;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }
    
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .skip(parseInt(skip) || 0)
      .limit(parseInt(limit) || 50);
    
    const total = await Product.countDocuments(query);
    
    res.json({ products, total, skip: parseInt(skip) || 0, limit: parseInt(limit) || 50 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name slug');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get similar products
app.get('/api/products/:id/similar', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const similar = await Product.find({
      category: product.category,
      _id: { $ne: product._id }
    })
      .populate('category', 'name slug')
      .limit(4);
    
    res.json(similar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search products
app.get('/api/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);
    
    const products = await Product.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { brand: { $regex: q, $options: 'i' } }
      ]
    })
      .populate('category', 'name slug')
      .limit(10);
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// SEED DATA
// ============================================
async function seedDatabase() {
  const categoryCount = await Category.countDocuments();
  if (categoryCount > 0) {
    console.log('📦 Database already seeded');
    return;
  }
  
  console.log('🌱 Seeding database...');
  
  // Create categories
  const categories = await Category.insertMany([
    { name: 'Noutbuklar', slug: 'noutbuklar', icon: 'laptop', order: 1 },
    { name: 'Klaviaturalar', slug: 'klaviaturalar', icon: 'keyboard', order: 2 },
    { name: 'Mouse', slug: 'mouse', icon: 'mouse', order: 3 },
    { name: 'Qulaqcıqlar', slug: 'qulaciqlar', icon: 'headphones', order: 4 },
    { name: 'Masaüstü Kompüterlər', slug: 'masauesu-kompyuterler', icon: 'monitor', order: 5 },
    { name: 'Monitorlar', slug: 'monitorlar', icon: 'display', order: 6 },
    { name: 'Digər Aksesuarlar', slug: 'diger-aksesuarlar', icon: 'cpu', order: 7 }
  ]);
  
  // Create products
  const products = await Product.insertMany([
    // Noutbuklar
    {
      name: 'MacBook Pro 14" M3',
      brand: 'Apple',
      price: 3999,
      originalPrice: 4499,
      category: categories[0]._id,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
      description: 'Apple M3 chip, 16GB RAM, 512GB SSD. Peşəkar istifadəçilər üçün ideal seçim.',
      specs: { 'Chip': 'M3', 'RAM': '16GB', 'Yaddaş': '512GB SSD', 'Ekran': '14.2" Liquid Retina XDR' },
      featured: true,
      rating: 4.9,
      reviewCount: 128
    },
    {
      name: 'MacBook Air 13" M3',
      brand: 'Apple',
      price: 2499,
      category: categories[0]._id,
      image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800',
      description: 'Apple M3 chip, 8GB RAM, 256GB SSD. Yüngül və güclü.',
      specs: { 'Chip': 'M3', 'RAM': '8GB', 'Yaddaş': '256GB SSD', 'Ekran': '13.6" Liquid Retina' },
      rating: 4.7,
      reviewCount: 89
    },
    {
      name: 'Dell XPS 15',
      brand: 'Dell',
      price: 2899,
      category: categories[0]._id,
      image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800',
      description: 'Intel Core i7, 32GB RAM, 1TB SSD, RTX 4050. Yüksək performans.',
      specs: { 'Chip': 'Intel Core i7-13700H', 'RAM': '32GB', 'Yaddaş': '1TB SSD', 'Qrafika': 'RTX 4050' },
      featured: true,
      rating: 4.6,
      reviewCount: 67
    },
    {
      name: 'ASUS ROG Zephyrus G14',
      brand: 'ASUS',
      price: 2199,
      originalPrice: 2499,
      category: categories[0]._id,
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2304?w=800',
      description: 'AMD Ryzen 9, 16GB RAM, 1TB SSD, RTX 4060. Oyun üçün güclü.',
      specs: { 'Chip': 'AMD Ryzen 9 7940HS', 'RAM': '16GB', 'Yaddaş': '1TB SSD', 'Qrafika': 'RTX 4060' },
      rating: 4.8,
      reviewCount: 156
    },
    // Klaviaturalar
    {
      name: 'Keychron Q1 Pro',
      brand: 'Keychron',
      price: 249,
      category: categories[1]._id,
      image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800',
      description: 'Wireless mechanical keyboard, QMK/VIA programmable, hot-swappable.',
      specs: { 'Switch': 'Gateron G Pro', 'Layout': '75%', 'Connection': 'Bluetooth/USB-C' },
      featured: true,
      rating: 4.8,
      reviewCount: 234
    },
    {
      name: 'Logitech MX Mechanical',
      brand: 'Logitech',
      price: 179,
      category: categories[1]._id,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800',
      description: 'Premium wireless mechanical keyboard with smart illumination.',
      specs: { 'Switch': 'Tactile', 'Layout': 'Full-size', 'Connection': 'Bluetooth/USB' },
      rating: 4.6,
      reviewCount: 189
    },
    {
      name: 'Royal Kludge RK100',
      brand: 'Royal Kludge',
      price: 129,
      category: categories[1]._id,
      image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800',
      description: 'Budget-friendly mechanical keyboard with RGB backlight.',
      specs: { 'Switch': 'Outemu', 'Layout': '100%', 'RGB': 'Yes' },
      rating: 4.4,
      reviewCount: 312
    },
    // Mouse
    {
      name: 'Logitech G Pro X Superlight',
      brand: 'Logitech',
      price: 159,
      originalPrice: 189,
      category: categories[2]._id,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91d51a437?w=800',
      description: 'Ultra-light wireless gaming mouse, 25K DPI sensor.',
      specs: { 'Sensor': 'HERO 25K', 'Weight': '63g', 'Battery': '70 saat' },
      featured: true,
      rating: 4.9,
      reviewCount: 456
    },
    {
      name: 'Razer DeathAdder V3',
      brand: 'Razer',
      price: 139,
      category: categories[2]._id,
      image: 'https://images.unsplash.com/photo-1615663245858-ac93bb7c39e7?w=800',
      description: 'Ergonomic gaming mouse with Focus Pro 30K sensor.',
      specs: { 'Sensor': 'Focus Pro 30K', 'Weight': '59g', 'Switches': 'Gen-3' },
      rating: 4.7,
      reviewCount: 289
    },
    {
      name: 'SteelSeries Aerox 3',
      brand: 'SteelSeries',
      price: 79,
      category: categories[2]._id,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800',
      description: 'Lightweight gaming mouse with IP32 water resistance.',
      specs: { 'Sensor': 'TrueMove Core', 'Weight': '57g', 'RGB': 'Yes' },
      rating: 4.5,
      reviewCount: 178
    },
    // Qulaqcıqlar
    {
      name: 'AirPods Pro 2',
      brand: 'Apple',
      price: 349,
      category: categories[3]._id,
      image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5c434?w=800',
      description: 'Active Noise Cancellation, Adaptive Audio, USB-C charging.',
      specs: { 'Type': 'In-ear', 'ANC': 'Yes', 'Battery': '6 saat' },
      featured: true,
      rating: 4.8,
      reviewCount: 567
    },
    {
      name: 'Sony WH-1000XM5',
      brand: 'Sony',
      price: 399,
      originalPrice: 449,
      category: categories[3]._id,
      image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800',
      description: 'Industry-leading noise cancellation, 30-hour battery.',
      specs: { 'Type': 'Over-ear', 'ANC': 'Yes', 'Battery': '30 saat' },
      rating: 4.9,
      reviewCount: 423
    },
    {
      name: 'Samsung Galaxy Buds2 Pro',
      brand: 'Samsung',
      price: 249,
      category: categories[3]._id,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800',
      description: '24-bit Hi-Fi sound, ANC, IPX7 water resistance.',
      specs: { 'Type': 'In-ear', 'ANC': 'Yes', 'Battery': '5 saat' },
      rating: 4.6,
      reviewCount: 234
    },
    // Monitorlar
    {
      name: 'LG UltraGear 27GP850',
      brand: 'LG',
      price: 599,
      category: categories[5]._id,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800',
      description: '27" Nano IPS, 180Hz, 1ms GtG, HDR400.',
      specs: { 'Panel': 'Nano IPS', 'Refresh': '180Hz', 'Response': '1ms', 'HDR': 'HDR400' },
      featured: true,
      rating: 4.7,
      reviewCount: 189
    },
    {
      name: 'Samsung Odyssey G7',
      brand: 'Samsung',
      price: 799,
      category: categories[5]._id,
      image: 'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=800',
      description: '27" QLED, 240Hz, 1ms, 1000R curvature.',
      specs: { 'Panel': 'QLED', 'Refresh': '240Hz', 'Curvature': '1000R' },
      rating: 4.6,
      reviewCount: 145
    },
    {
      name: 'ASUS ProArt PA278QV',
      brand: 'ASUS',
      price: 449,
      category: categories[5]._id,
      image: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800',
      description: '27" IPS, 100% sRGB, Calman Verified for creators.',
      specs: { 'Panel': 'IPS', 'Color': '100% sRGB', 'Calibration': 'Yes' },
      rating: 4.5,
      reviewCount: 98
    },
    // Masaüstü
    {
      name: 'iMac 24" M3',
      brand: 'Apple',
      price: 1999,
      category: categories[4]._id,
      image: 'https://images.unsplash.com/photo-1624772189298-6008aca5a2e7?w=800',
      description: 'Apple M3, 24" 4.5K Retina, 8GB RAM, 256GB SSD.',
      specs: { 'Chip': 'M3', 'RAM': '8GB', 'Ekran': '24" 4.5K' },
      featured: true,
      rating: 4.9,
      reviewCount: 78
    },
    {
      name: 'Dell XPS Desktop',
      brand: 'Dell',
      price: 1499,
      category: categories[4]._id,
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8f7f23?w=800',
      description: 'Intel Core i7, 16GB RAM, 512GB SSD, RTX 3060.',
      specs: { 'Chip': 'Intel Core i7-13700', 'RAM': '16GB', 'Qrafika': 'RTX 3060' },
      rating: 4.5,
      reviewCount: 56
    },
    // Digər Aksesuarlar
    {
      name: 'Samsung T7 Shield 1TB',
      brand: 'Samsung',
      price: 129,
      category: categories[6]._id,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56afe16?w=800',
      description: 'Portable SSD 1TB, IP65 water/dust resistant, 1050MB/s.',
      specs: { 'Capacity': '1TB', 'Speed': '1050MB/s', 'Protection': 'IP65' },
      rating: 4.8,
      reviewCount: 234
    },
    {
      name: 'Logitech C920s Pro HD',
      brand: 'Logitech',
      price: 89,
      category: categories[6]._id,
      image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=800',
      description: 'Full HD 1080p webcam, auto HD light correction.',
      specs: { 'Resolution': '1080p', 'FPS': '30fps', 'Mic': 'Stereo' },
      rating: 4.6,
      reviewCount: 567
    },
    {
      name: 'Anker 737 Power Bank',
      brand: 'Anker',
      price: 149,
      originalPrice: 179,
      category: categories[6]._id,
      image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800',
      description: '24,000mAh, 140W output, Smart display.',
      specs: { 'Capacity': '24000mAh', 'Output': '140W', 'Display': 'Yes' },
      rating: 4.7,
      reviewCount: 189
    }
  ]);
  
  // Update category product counts
  for (const cat of categories) {
    const count = await Product.countDocuments({ category: cat._id });
    await Category.findByIdAndUpdate(cat._id, { productCount: count });
  }
  
  console.log('✅ Database seeded with', categories.length, 'categories and', products.length, 'products');
}

// ============================================
// START SERVER
// ============================================
seedDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 API endpoints:`);
    console.log(`   GET /api/categories`);
    console.log(`   GET /api/products`);
    console.log(`   GET /api/products/:id`);
    console.log(`   GET /api/products/:id/similar`);
    console.log(`   GET /api/products/category/:slug`);
    console.log(`   GET /api/search?q=query`);
  });
});