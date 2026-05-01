import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    if (query) {
      fetchSearch()
    }
  }, [query])

  const fetchSearch = async () => {
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error('Error searching:', error)
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
    return <SearchSkeleton />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          "{query}" üçün nəticələr
        </h1>
        <p className="text-slate-500">{products.length} məhsul tapıldı</p>
      </div>

      {/* Sort */}
      <div className="flex items-center justify-between">
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

      {/* Results */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Nəticə tapılmadı</h3>
          <p className="text-slate-500 mb-6">"{query}" sözü ilə heç bir məhsul tapılmadı</p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Ana səhifəyə qayıt
          </Link>
        </div>
      )}
    </div>
  )
}

function SearchSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-10 w-64 bg-gray-200 rounded animate-pulse"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-80 bg-gray-200 rounded-2xl animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}