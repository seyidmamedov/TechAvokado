import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import ProductCard from '../components/ProductCard'

export default function Favorites() {
  const { favorites, clearFavorites } = useFavorites()

  if (favorites.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-8xl mb-6">❤️</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Sevimlilər yoxdur</h2>
        <p className="text-slate-500 mb-8">Sevdiyiniz məhsulları ❤️ ilə işarələyin</p>
        <Link
          to="/"
          className="inline-block px-8 py-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-colors"
        >
          Alış-verişə davam et
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Sevimlilər</h1>
          <p className="text-slate-500 mt-1">{favorites.length} məhsul</p>
        </div>
        <button
          onClick={clearFavorites}
          className="text-red-500 hover:text-red-600 font-medium"
        >
          Hamısını sil
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}