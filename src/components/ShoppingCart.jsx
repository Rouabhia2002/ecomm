import React from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json"; // Importing storeItems data from JSON file

function ShoppingCart({ isOpen }) {
  const { closeCart, cartItems } = useShoppingCart();

  
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>

        {cartItems ? ( // Check if cartItems is not undefined
            cartItems.map((cartItem) => (
              <CartItem
                key={cartItem.id}
                id={cartItem.id}
                quantity={cartItem.quantity}
              />
            ))
          ) : (
            <div>No items in the cart</div>
          )}

          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find(i => i.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
              }, 0)
            )}
          </div>

    
        </Stack>


     
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShoppingCart;
