import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'

export default function ProductCard({ product, showActions = true }) {
  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const handleToggleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(product)
  }

  const favorite = isFavorite(product._id)

  return (
    <Link
      to={`/product/${product._id}`}
      className="group block bg-white rounded-2xl shadow-soft hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-square bg-slate-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-medium rounded-full">
              Seçilmiş
            </span>
          )}
          {!product.inStock && (
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
              Bitib
            </span>
          )}
        </div>

        {/* Favorite Button */}
        {showActions && (
          <button
            onClick={handleToggleFavorite}
            className={`
              absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center
              transition-all duration-300 shadow-soft
              ${favorite 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-slate-400 hover:text-red-500'}
            `}
          >
            <svg className="w-5 h-5" fill={favorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-slate-500 mb-1">{product.brand}</p>
        <h3 className="font-semibold text-slate-800 line-clamp-2 mb-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        
        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-slate-200'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-slate-500">({product.rating})</span>
          </div>
        )}

        {/* Price & Actions */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-indigo-600">{product.price}₼</span>
          </div>
          
          {showActions && product.inStock && (
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          )}
        </div>

        {/* Out of stock */}
        {!product.inStock && (
          <div className="mt-3 text-center py-2 bg-slate-100 rounded-xl">
            <span className="text-sm text-slate-500">Mövcud deyil</span>
          </div>
        )}
      </div>
    </Link>
  )
}