import { createContext, useContext, useReducer, useEffect } from "react"
import { toast } from "react-toastify"

const CartContext = createContext()

export { CartContext }

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
        return {
          ...state,
          items: updatedItems,
          total: state.total + action.payload.price,
        }
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          total: state.total + action.payload.price,
        }
      }

    case "REMOVE_FROM_CART":
      const itemToRemove = state.items.find((item) => item.id === action.payload)
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        total: state.total - itemToRemove.price * itemToRemove.quantity,
      }

    case "UPDATE_QUANTITY":
      const { id, quantity } = action.payload
      const item = state.items.find((item) => item.id === id)
      const quantityDiff = quantity - item.quantity

      return {
        ...state,
        items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        total: state.total + item.price * quantityDiff,
      }

    case "CLEAR_CART":
      return {
        items: [],
        total: 0,
      }

    case "LOAD_CART":
      return action.payload

    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
  })

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    if (product.stock <= 0) {
      toast.error("Product is out of stock!")
      return
    }
    dispatch({ type: "ADD_TO_CART", payload: product })
    toast.success("Product added to cart!")
  }

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId })
    toast.success("Product removed from cart!")
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: productId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
    toast.success("Cart cleared!")
  }

  const getCartTotal = () => {
    return cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartItemsCount = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems: cart.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
