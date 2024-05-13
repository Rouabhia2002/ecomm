import React from "react";
import { Button, Stack } from "react-bootstrap"; // Importing Button and Stack components from react-bootstrap
import { useShoppingCart } from "../../context/ShoppingCartContext"; // Importing custom hook useShoppingCart from context
import storeItems from "../data/items.json"; // Importing storeItems data from JSON file
import { formatCurrency } from "../utilities/formatCurrency"; // Importing utility function formatCurrency

// CartItem component definition
export function CartItem({ id, quantity }) {
    
  const { removeFromCart } = useShoppingCart();



  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;

  return (
    
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div> {formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>

      
    </Stack>
  );
}
