import { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('techavokado_favorites')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [favoritesCount, setFavoritesCount] = useState(0)

  useEffect(() => {
    localStorage.setItem('techavokado_favorites', JSON.stringify(favorites))
    setFavoritesCount(favorites.length)
  }, [favorites])

  const addToFavorites = (product) => {
    setFavorites(prev => {
      if (prev.some(item => item._id === product._id)) {
        return prev
      }
      return [...prev, product]
    })
  }

  const removeFromFavorites = (productId) => {
    setFavorites(prev => prev.filter(item => item._id !== productId))
  }

  const isFavorite = (productId) => {
    return favorites.some(item => item._id === productId)
  }

  const toggleFavorite = (product) => {
    if (isFavorite(product._id)) {
      removeFromFavorites(product._id)
    } else {
      addToFavorites(product)
    }
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoritesCount,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}