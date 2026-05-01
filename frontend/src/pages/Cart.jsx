import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cart, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-8xl mb-6">🛒</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Səbət boşdur</h2>
        <p className="text-slate-500 mb-8">Alış-verişə başlamaq üçün məhsullar əlavə edin</p>
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
        <h1 className="text-3xl font-bold text-slate-800">Səbət</h1>
        <button
          onClick={clearCart}
          className="text-red-500 hover:text-red-600 font-medium"
        >
          Səbəti təmizlə
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex gap-4 p-4 bg-white rounded-2xl shadow-soft"
            >
              <Link to={`/product/${item._id}`} className="shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item._id}`}>
                  <h3 className="font-semibold text-slate-800 line-clamp-2 hover:text-indigo-600">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-sm text-slate-500 mt-1">{item.brand}</p>
                <p className="text-lg font-bold text-indigo-600 mt-2">
                  {item.price}₼
                </p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-2xl shadow-soft p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Sifariş summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-slate-600">
                <span>Məhsullar ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
                <span>{cartTotal}₼</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Çatdırılma</span>
                <span className="text-green-600">Pulsuz</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Cəmi</span>
                  <span className="text-indigo-600">{cartTotal}₼</span>
                </div>
              </div>
            </div>
            <button className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
              Sifariş et
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}