import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // 🛍️ Add Item to Bag Logic
  const addToBag = (product, selectedSize) => {
    setCartItems((prevItems) => {
      // Check if product with same id AND same size already exists
      const existingIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.size === selectedSize
      );

      if (existingIndex > -1) {
        // If exists, increase quantity
        const newItems = [...prevItems];
        newItems[existingIndex].quantity += 1;
        return newItems;
      } else {
        // If new, add fresh item
        const priceStr = product.prices[selectedSize].replace(/[^0-9]/g, ''); // Extract numeric price
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            type: product.type,
            size: selectedSize,
            price: parseInt(priceStr, 10),
            priceString: product.prices[selectedSize],
            image: product.image,
            quantity: 1,
          },
        ];
      }
    });
  };

  // ➕ Increase Quantity
  const updateQuantity = (id, size, action) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id && item.size === size) {
            const newQty = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0) // Remove item if quantity becomes 0
    );
  };

  // 🗑️ Remove Completely
  const removeFromCart = (id, size) => {
    setCartItems((prevItems) => prevItems.filter((item) => !(item.id === id && item.size === size)));
  };

  // 💰 Calculate Total Price
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToBag, updateQuantity, removeFromCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);