
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, Heart } from "lucide-react";
import { toast, Toaster } from "sonner";
import Swal from "sweetalert2";
import { decreaseItemQuantity, deleteItemFromCart, increaseItemQuantity, type CartItem } from "../../features/cart/cartSlice";
import { useNavigate } from "react-router";
import { useState } from "react";

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalAmount, totalQuantity } = useSelector(
    (state: RootState) => state.cart
  );
  const [favorites, setFavorites] = useState(new Set<number>());

  const handleIncreaseQuantity = (id: number) => {
    dispatch(increaseItemQuantity(id));
    toast.success('Quantity increased');
  };

  const handleDecreaseQuantity = (id: number) => {
    dispatch(decreaseItemQuantity(id));
    toast.warning('Quantity decreased');
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

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const handleOrderCheckout = (items: CartItem[]) => {
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
        console.log(items);
        // Add current user id
        // assign a driver
        //delivery address of the currrent user
        toast.success('Niiiiice, you are my G');
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Toaster richColors position="top-right" />
      
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex  items-center gap-3">
                <div className="p-2 bg-yellow-400/10 rounded-full">
                  <ShoppingBag className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Your Cart</h1>
                  <p className="text-sm text-gray-400">{totalQuantity} items</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-gray-600" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Your cart is empty</h3>
            <p className="text-gray-400 mb-8">Add some delicious items to get started</p>
            <button 
              onClick={() => navigate('/restaurant/food')} 
              className="px-8 py-3 bg-yellow-400 text-black font-medium rounded-full hover:bg-yellow-500 transition-colors"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Order Items</h2>
                <button 
                  onClick={() => {
                    Swal.fire({
                      title: "Clear all items?",
                      text: "This will remove all items from your cart",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#f59e0b",
                      cancelButtonColor: "#6b7280",
                      confirmButtonText: "Yes, clear all!",
                      background: "#1f2937",
                      color: "#ffffff",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        items.forEach(item => dispatch(deleteItemFromCart(item.id)));
                        toast.error('All items removed');
                      }
                    });
                  }}
                  className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  Clear all
                </button>
              </div>

              {items.map((item) => (
                <div key={item.id} className="group bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                  <div className="flex gap-4">
                    {/* Item Image */}
                    <div className="relative flex-shrink-0">
                      {item.imageUrl && (
                        <img 
                          src={item.imageUrl} 
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-xl"
                        />
                      )}
                      <button
                        onClick={() => toggleFavorite(item.id)}
                        className="absolute -top-2 -right-2 p-1.5 bg-gray-900 rounded-full border border-gray-600 hover:border-red-500 transition-colors"
                      >
                        <Heart 
                          className={`w-4 h-4 ${favorites.has(item.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} 
                        />
                      </button>
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-white truncate">{item.name}</h3>
                          <p className="text-sm text-gray-400">${item.price.toFixed(2)} each</p>
                        </div>
                        <button 
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleDecreaseQuantity(item.id)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                          >
                            <Minus className="w-4 h-4 text-yellow-400" />
                          </button>
                          <span className="w-12 text-center font-medium text-white">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => handleIncreaseQuantity(item.id)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4 text-yellow-400" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal ({totalQuantity} items)</span>
                      <span>${totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Delivery Fee</span>
                      <span>$2.99</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Service Fee</span>
                      <span>$1.50</span>
                    </div>
                    <div className="border-t border-gray-600 pt-3">
                      <div className="flex justify-between font-semibold text-lg">
                        <span className="text-white">Total</span>
                        <span className="text-yellow-400">${(totalAmount + 4.49).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button 
                      onClick={() => handleOrderCheckout(items)}
                      className="w-full py-4 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-5 h-5" />
                      Proceed to Checkout
                    </button>
                    <button 
                      onClick={() => navigate('/restaurant/food')}
                      className="w-full py-3 border border-gray-600 text-gray-300 font-medium rounded-xl hover:bg-gray-700/50 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>

                  {/* Promo Code */}
                  {/* <div className="mt-6 pt-6 border-t border-gray-700">
                    <p className="text-sm text-gray-400 mb-2">Have a promo code?</p>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Enter code"
                        className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                      />
                      <button className="px-4 py-2 bg-gray-700 text-yellow-400 rounded-lg hover:bg-gray-600 transition-colors">
                        Apply
                      </button>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// import { useDispatch, useSelector } from "react-redux";
// import type { RootState } from "../../app/store";
// import { Minus, Plus, Trash2 } from "lucide-react";
// import { toast, Toaster } from "sonner";
// import Swal from "sweetalert2";
// import { decreaseItemQuantity, deleteItemFromCart, increaseItemQuantity, type CartItem } from "../../features/cart/cartSlice";
// import { useNavigate } from "react-router";

// export const Cart = () => {

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { items, totalAmount, totalQuantity } = useSelector(
//     (state: RootState) => state.cart
//   );

//   const handleIncreaseQuantity = (id: number) => {
//     dispatch(increaseItemQuantity(id));
//     toast.success('Quantity increased');
//   };

//   const handleDecreaseQuantity = (id:number) => {
//     dispatch(decreaseItemQuantity(id))
//     toast.warning('Quantity Decreased');
//   };

//   const handleDeleteItem = (id: number) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This will remove the item from your cart",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#f59e0b",
//       cancelButtonColor: "#6b7280",
//       confirmButtonText: "Yes, remove it!",
//       background: "#1f2937",
//       color: "#ffffff",
//     }).then((result) => {
//       if (result.isConfirmed) {
//       dispatch(deleteItemFromCart(id));
//       toast.error('Item removed');
//     }
//     });
//   };

//   const handleOrderCheckout = (items:CartItem[]) => {
//     Swal.fire({
//       title: "Confirm",
//       text: "You wanna order, for real",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#f59e0b",
//       cancelButtonColor: "#6b7280",
//       confirmButtonText: "Yes, for sure!",
//       background: "#1f2937",
//       color: "#ffffff",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         console.log(items)
//         // Add current user id
//         // assign a driver
//         //delivery address of the currrent user
//       toast.success('Niiiiice, you are my G');
//     }
//     });
//   }

//   return (
//     <div className="p-4 bg-base-100 min-h-screen">
//       <Toaster richColors top-right/>
//       <h2 className="text-2xl font-bold mb-4 text-white">Your Cart</h2>
      
//       {items.length === 0 ? (
//         <div className="text-center py-8">
//           <p className="text-gray-400">Your cart is empty</p>
//         </div>
//       ) : (
//         <>
//           {/* Cart Items List */}
//           <div className="space-y-4 mb-6">
//             {items.map((item) => (
//               <div key={item.id} className="flex justify-between items-center p-4 rounded-lg bg-base-200 border border-base-300">
//                 <div className="flex items-center space-x-4">
//                   {item.imageUrl && (
//                     <img 
//                       src={item.imageUrl} 
//                       alt={item.name} 
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                   )}
//                   <div>
//                     <h3 className="font-medium text-white">{item.name}</h3>
//                     <p className="text-gray-400">${item.price.toFixed(2)} each</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center space-x-4">
//                   <div className="flex items-center space-x-2">
//                     <button 
//                       onClick={() => handleDecreaseQuantity(item.id)}
//                       className="btn btn-sm btn-ghost text-yellow-400 hover:bg-base-300"
//                     >
//                       <Minus size={16} />
//                     </button>
//                     <span className="px-2 bg-base-300 rounded text-white">
//                       {item.quantity}
//                     </span>
//                     <button 
//                       onClick={() => handleIncreaseQuantity(item.id)}
//                       className="btn btn-sm btn-ghost text-yellow-400 hover:bg-base-300"
//                     >
//                       <Plus size={16} />
//                     </button>
//                   </div>
                  
//                   <span className="text-white min-w-[80px] text-right">
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </span>
                  
//                   <button 
//                     onClick={() => handleDeleteItem(item.id)}
//                     className="btn btn-sm btn-ghost text-red-500 hover:bg-base-300"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Cart Summary */}
//           <div className="border-t border-base-300 pt-4">
//             <div className="flex justify-between mb-2 text-gray-300">
//               <span>Total Items:</span>
//               <span>{totalQuantity}</span>
//             </div>
//             <div className="flex justify-between font-bold text-lg text-yellow-400">
//               <span>Total Amount:</span>
//               <span>${totalAmount.toFixed(2)}</span>
//             </div>
            
//             <div className="mt-6 flex justify-end space-x-3">
//               <button onClick={() => navigate('/restaurant/food')} className="btn btn-outline text-gray-300 hover:bg-base-300">
//                 Continue Shopping
//               </button>
//               <button onClick={()=>handleOrderCheckout(items)} className="btn bg-yellow-400 text-black hover:bg-yellow-500">
//                 Checkout
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };