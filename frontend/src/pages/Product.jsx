import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'

export default function Product() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [similarProducts, setSimilarProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const [productRes, similarRes] = await Promise.all([
        fetch(`http://localhost:5000/api/products/${id}`),
        fetch(`http://localhost:5000/api/products/${id}/similar`)
      ])
      const productData = await productRes.json()
      const similarData = await similarRes.json()
      
      setProduct(productData)
      setSimilarProducts(similarData)
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (product?.inStock) {
      addToCart(product)
    }
  }

  const handleToggleFavorite = () => {
    toggleFavorite(product)
  }

  if (loading) {
    return <ProductSkeleton />
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Məhsul tapılmadı</h2>
        <Link to="/" className="text-indigo-600 hover:text-indigo-700">
          Ana səhifəyə qayıt
        </Link>
      </div>
    )
  }

  const favorite = isFavorite(product._id)

  return (
    <div className="space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/" className="hover:text-indigo-600">Ana səhifə</Link>
        <span>/</span>
        <Link to={`/category/${product.category?.slug}`} className="hover:text-indigo-600">
          {product.category?.name}
        </Link>
        <span>/</span>
        <span className="text-slate-800 truncate">{product.name}</span>
      </nav>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-white rounded-3xl shadow-soft overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-slate-500 mb-2">{product.brand}</p>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">{product.name}</h1>
          </div>

          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-slate-200'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-slate-500">({product.rating})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-bold text-indigo-600">{product.price}₼</span>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {product.inStock ? (
              <span className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-xl">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Stokda var
              </span>
            ) : (
              <span className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-xl">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Stokda yoxdur
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`
                flex-1 min-w-[200px] px-8 py-4 rounded-2xl font-semibold text-lg
                transition-all duration-300
                ${product.inStock 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-1' 
                  : 'bg-slate-200 text-slate-500 cursor-not-allowed'}
              `}
            >
              {product.inStock ? 'Səbətə əlavə et' : 'Mövcud deyil'}
            </button>
            <button
              onClick={handleToggleFavorite}
              className={`
                px-6 py-4 rounded-2xl transition-all duration-300
                ${favorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-red-500 hover:text-red-500'}
              `}
            >
              <svg className="w-6 h-6" fill={favorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Description */}
          {product.description && (
            <div className="pt-6 border-t border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Təsvir</h3>
              <p className="text-slate-600 leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Specs */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="pt-6 border-t border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Xüsusiyyətlər</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-500">{key}</span>
                    <span className="font-medium text-slate-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Oxşar Məhsullar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function ProductSkeleton() {
  return (
    <div className="space-y-12">
      <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-200 rounded-3xl animate-pulse"></div>
        <div className="space-y-4">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-16 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}