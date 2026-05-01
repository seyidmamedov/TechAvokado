import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('http://localhost:5000/api/products'),
        fetch('http://localhost:5000/api/categories')
      ])
      const productsData = await productsRes.json()
      const categoriesData = await categoriesRes.json()
      
      setProducts(productsData)
      setCategories(categoriesData)
      setFeaturedProducts(productsData.filter(p => p.featured).slice(0, 4))
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <HomeSkeleton />
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 lg:p-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjwvZz48L3N2Zz4=')] opacity-30"></div>
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-white text-sm font-medium mb-4">
            Yeni Kolleksiya
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Ən Yaxşı
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              Texnoloji
            </span>
            Həllər
          </h1>
          <p className="text-lg text-indigo-100 mb-8">
            Ən son texnoloji məhsulları sizin üçün bir yerə toplayıb. 
            Premium keyfiyyət, əlçatan qiymətlər.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/search"
              className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold hover:shadow-xl transition-all hover:-translate-y-1"
            >
              Kəşf Et
            </Link>
            <Link
              to="/category/noutbuklar"
              className="px-8 py-4 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-all"
            >
              Noutbuklar
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </section>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Kateqoriyalar</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/category/${category.slug}`}
              className="group p-4 bg-white rounded-2xl shadow-soft hover:shadow-lg transition-all text-center"
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <h3 className="font-semibold text-slate-800 text-sm">{category.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{category.productCount} məhsul</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Seçilmiş Məhsullar</h2>
              <p className="text-slate-500 mt-1">Xüsusi təkliflər və endirimlər</p>
            </div>
            <Link to="/search" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Hamısını gör →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* All Products */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Bütün Məhsullar</h2>
            <p className="text-slate-500 mt-1">{products.length} məhsul mövcuddur</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}

function HomeSkeleton() {
  return (
    <div className="space-y-12">
      <div className="h-64 bg-gray-200 rounded-3xl animate-pulse"></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-2xl animate-pulse"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-80 bg-gray-200 rounded-2xl animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}