import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar({ isOpen, onClose, categories }) {
  const [expandedCategory, setExpandedCategory] = useState(null)
  const location = useLocation()

  const toggleCategory = (slug) => {
    setExpandedCategory(expandedCategory === slug ? null : slug)
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-16 lg:top-20 left-0 bottom-0 w-64 bg-white/80 backdrop-blur-xl 
        border-r border-gray-100 z-50 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo Mobile */}
          <div className="lg:hidden p-4 border-b border-gray-100">
            <Link 
              to="/" 
              onClick={onClose}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.859L21 12l-5.714 2.143L13.857 21 12 19.857 8.143 21 7 14.143l-2.286-6.859L1 12l5.714-2.143L10.143 3 12 4.143z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-slate-800">TechAvokado</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            {/* Home Link */}
            <Link
              to="/"
              onClick={onClose}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all
                ${isActive('/') 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'}
              `}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="font-medium">Ana Səhifə</span>
            </Link>

            {/* Categories */}
            <div className="mt-4">
              <h3 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Kateqoriyalar
              </h3>
              
              {categories.map((category) => (
                <div key={category._id} className="mb-1">
                  {category.products && category.products.length > 0 ? (
                    <>
                      <button
                        onClick={() => toggleCategory(category.slug)}
                        className={`
                          w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all
                          ${isActive(`/category/${category.slug}`)
                            ? 'bg-indigo-50 text-indigo-600'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{category.icon}</span>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                            {category.productCount || 0}
                          </span>
                          <svg 
                            className={`w-4 h-4 transition-transform ${expandedCategory === category.slug ? 'rotate-180' : ''}`}
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>

                      {/* Subcategories */}
                      {expandedCategory === category.slug && (
                        <div className="ml-4 mt-1 space-y-1">
                          {category.products.slice(0, 5).map((product) => (
                            <Link
                              key={product._id}
                              to={`/product/${product._id}`}
                              onClick={onClose}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-slate-500 hover:text-indigo-600 rounded-lg transition-colors"
                            >
                              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                              <span className="truncate">{product.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={`/category/${category.slug}`}
                      onClick={onClose}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                        ${isActive(`/category/${category.slug}`)
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'}
                      `}
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                      <span className="ml-auto text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        {category.productCount || 0}
                      </span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white">
              <p className="font-semibold text-sm">Kömək lazımdır?</p>
              <p className="text-xs text-indigo-100 mt-1">Bizimlə əlaqə saxlayın</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}