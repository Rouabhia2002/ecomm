import React, { createContext, useContext, useState } from "react";
import ShoppingCart from "../src/components/ShoppingCart";

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {

  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState([]);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )
  
  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  function getItemQuantity(id) {
    const item = cartItems.find((item) => item.id === id);
    return item ? item.quantity : 0;
  }

  function increaseCartQuantity(id) {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { id, quantity: 1 }];
      }
    });
  }

  function decreaseCartQuantity(id) {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        const updatedItems = [...prevItems];
        if (updatedItems[itemIndex].quantity > 1) {
          updatedItems[itemIndex].quantity -= 1;
        } else {
          updatedItems.splice(itemIndex, 1);
        }
        return updatedItems;
      }
      return prevItems;
    });
  }

  function removeFromCart(id) {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  //console.log("cartItems after increaseCartQuantity:", cartItems); // Log cartItems after calling increaseCartQuantity

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartQuantity,
        openCart,
        cartItems,
        closeCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
