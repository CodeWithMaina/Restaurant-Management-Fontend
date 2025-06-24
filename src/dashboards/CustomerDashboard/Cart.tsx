import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast, Toaster } from "sonner";
import Swal from "sweetalert2";
import { decreaseItemQuantity, deleteItemFromCart, increaseItemQuantity, type CartItem } from "../../features/cart/cartSlice";
import { useNavigate } from "react-router";

export const Cart = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalAmount, totalQuantity } = useSelector(
    (state: RootState) => state.cart
  );

  const handleIncreaseQuantity = (id: number) => {
    dispatch(increaseItemQuantity(id));
    toast.success('Quantity increased');
  };

  const handleDecreaseQuantity = (id:number) => {
    dispatch(decreaseItemQuantity(id))
    toast.warning('Quantity Decreased');
  };

  const handleDeleteItem = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove the item from your cart",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove it!",
      background: "#1f2937",
      color: "#ffffff",
    }).then((result) => {
      if (result.isConfirmed) {
      dispatch(deleteItemFromCart(id));
      toast.error('Item removed');
    }
    });
  };

  const handleOrderCheckout = (items:CartItem[]) => {
    Swal.fire({
      title: "Confirm",
      text: "You wanna order, for real",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, for sure!",
      background: "#1f2937",
      color: "#ffffff",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(items)
        // Add current user id
        // assign a driver
        //delivery address of the currrent user
      toast.success('Niiiiice, you are my G');
    }
    });
  }

  return (
    <div className="p-4 bg-base-100 min-h-screen">
      <Toaster richColors top-right/>
      <h2 className="text-2xl font-bold mb-4 text-white">Your Cart</h2>
      
      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400">Your cart is empty</p>
        </div>
      ) : (
        <>
          {/* Cart Items List */}
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-4 rounded-lg bg-base-200 border border-base-300">
                <div className="flex items-center space-x-4">
                  {item.imageUrl && (
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <h3 className="font-medium text-white">{item.name}</h3>
                    <p className="text-gray-400">${item.price.toFixed(2)} each</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleDecreaseQuantity(item.id)}
                      className="btn btn-sm btn-ghost text-yellow-400 hover:bg-base-300"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-2 bg-base-300 rounded text-white">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => handleIncreaseQuantity(item.id)}
                      className="btn btn-sm btn-ghost text-yellow-400 hover:bg-base-300"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <span className="text-white min-w-[80px] text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  
                  <button 
                    onClick={() => handleDeleteItem(item.id)}
                    className="btn btn-sm btn-ghost text-red-500 hover:bg-base-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="border-t border-base-300 pt-4">
            <div className="flex justify-between mb-2 text-gray-300">
              <span>Total Items:</span>
              <span>{totalQuantity}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-yellow-400">
              <span>Total Amount:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button onClick={() => navigate('/restaurant/food')} className="btn btn-outline text-gray-300 hover:bg-base-300">
                Continue Shopping
              </button>
              <button onClick={()=>handleOrderCheckout(items)} className="btn bg-yellow-400 text-black hover:bg-yellow-500">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};