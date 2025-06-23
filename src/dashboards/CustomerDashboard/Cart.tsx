import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

export const Cart = () => {
  const { items, totalAmount, totalQuantity } = useSelector(
    (state: RootState) => state.cart
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      
      {/* Cart Items List */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)} each</p>
            </div>
            <div className="flex items-center">
              <span className="mr-4">
                {item.quantity} × ${(item.price * item.quantity).toFixed(2)}
              </span>
              {/* You could add quantity controls here later */}
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="border-t pt-4">
        <div className="flex justify-between mb-2">
          <span>Total Items:</span>
          <span>{totalQuantity}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total Amount:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};