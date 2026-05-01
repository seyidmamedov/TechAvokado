import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Product from './pages/Product'
import Category from './pages/Category'
import Search from './pages/Search'
import Cart from './pages/Cart'
import Favorites from './pages/Favorites'
import { CartProvider } from './context/CartContext'
import { FavoritesProvider } from './context/FavoritesContext'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/categories')
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CartProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
            <Header 
              onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
              categories={categories}
            />
            
            <div className="flex">
              <Sidebar 
                isOpen={sidebarOpen} 
                onClose={() => setSidebarOpen(false)}
                categories={categories}
              />
              
              <main className="flex-1 lg:ml-64 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/category/:slug" element={<Category />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/favorites" element={<Favorites />} />
                  </Routes>
                </div>
              </main>
            </div>
          </div>
        </BrowserRouter>
      </FavoritesProvider>
    </CartProvider>
  )
}

export default App