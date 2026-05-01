import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

export default function Category() {
  const { slug } = useParams()
  const [category, setCategory] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    fetchCategory()
  }, [slug])

  const fetchCategory = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/category/${slug}`)
      const data = await res.json()
      setCategory(data.category)
      setProducts(data.products)
    } catch (error) {
      console.error('Error fetching category:', error)
    } finally {
      setLoading(false)
    }
  }

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  if (loading) {
    return <CategorySkeleton />
  }

  if (!category) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Kateqoriya tapılmadı</h2>
        <Link to="/" className="text-indigo-600 hover:text-indigo-700">
          Ana səhifəyə qayıt
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{category.icon}</span>
            <h1 className="text-3xl font-bold text-slate-800">{category.name}</h1>
          </div>
          <p className="text-slate-500">{products.length} məhsul</p>
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          <option value="default">Standart</option>
          <option value="price-asc">Qiymət: Aşağıdan yuxarı</option>
          <option value="price-desc">Qiymət: Yuxarıdan aşağı</option>
          <option value="name">Ad: A-Z</option>
        </select>
      </div>

      {/* Products Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Məhsul yoxdur</h3>
          <p className="text-slate-500">Bu kateqoriyada hələ məhsul yoxdur</p>
        </div>
      )}
    </div>
  )
}

function CategorySkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-16 w-64 bg-gray-200 rounded animate-pulse"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-80 bg-gray-200 rounded-2xl animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}