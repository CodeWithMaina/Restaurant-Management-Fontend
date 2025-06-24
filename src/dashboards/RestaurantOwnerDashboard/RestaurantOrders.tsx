import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { orderApi, type Order } from "../../features/api/ordersApi";
import { Loader2, AlertCircle, ChevronDown, ChevronUp, Edit, Trash2, Check, X, Truck, Clock, Ban } from "lucide-react";
import { toast } from "sonner";

export const RestaurantOrders = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  const restaurantId = Number(user?.restaurantId);
  const isAdmin = user?.userType === "admin";

  const {
    data: restaurantOrders,
    isLoading,
    isError,
    error,
  } = orderApi.useFetchOrdersByRestaurantIdQuery(restaurantId, { skip: !isAuthenticated || !restaurantId });

  const [updateOrderStatus] = orderApi.useUpdateOrderStatusMutation();
  const [deleteOrder] = orderApi.useDeleteOrderMutation();

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await updateOrderStatus({
        id: orderId,
        status: newStatus
      }).unwrap();
      toast.success("Order status updated successfully");
    } catch (err) {
      toast.error("Failed to update order status");
      console.error(err);
    }
  };

  const handleDeleteOrder = async (orderId: number) => {
    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order deleted successfully");
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to delete order");
      console.error(err);
    }
  };

  const toggleOrderExpand = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="alert alert-error shadow-lg">
        <div className="flex items-center gap-2">
          <Ban className="w-6 h-6" />
          <span>Unauthorized access. Admin privileges required.</span>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error shadow-lg">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-6 h-6" />
          <span>Error loading orders: {error?.toString()}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Truck className="w-8 h-8" />
        Restaurant Orders
      </h1>

      <div className="space-y-4">
        {restaurantOrders?.length === 0 ? (
          <div className="alert alert-info shadow-lg">
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6" />
              <span>No orders found</span>
            </div>
          </div>
        ) : (
          restaurantOrders?.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              isExpanded={expandedOrderId === order.id}
              onToggleExpand={toggleOrderExpand}
              onClick={handleOrderClick}
            />
          ))
        )}
      </div>

      {isModalOpen && selectedOrder && (
        <OrderModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteOrder}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

// Order Card Component
const OrderCard = ({ order, isExpanded, onToggleExpand, onClick }: {
  order: Order;
  isExpanded: boolean;
  onToggleExpand: (id: number) => void;
  onClick: (order: Order) => void;
}) => {
  const currentStatus = order.statuses[order.statuses.length - 1]?.statusCatalog.name || "Pending";
  const totalItems = order.orderItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = order.orderItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  const statusColor = {
    "Pending": "bg-yellow-100 text-yellow-800",
    "Processing": "bg-blue-100 text-blue-800",
    "Completed": "bg-green-100 text-green-800",
    "Cancelled": "bg-red-100 text-red-800",
  }[currentStatus] || "bg-gray-100 text-gray-800";

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
      <div className="card-body p-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="card-title flex items-center gap-2">
              Order #{order.id}
              <span className={`badge ${statusColor} text-xs font-medium`}>
                {currentStatus}
              </span>
            </h2>
            <p className="text-sm text-gray-500">
              Customer: {order.user.name} • {order.user.contactPhone}
            </p>
          </div>
          <button
            onClick={() => onToggleExpand(order.id)}
            className="btn btn-ghost btn-sm"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-3">
            <div className="flex justify-between">
              <p className="font-medium">Items: {totalItems}</p>
              <p className="font-bold">Total: ${totalPrice.toFixed(2)}</p>
            </div>

            <div className="divider my-1"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-1">Delivery Address</h3>
                <p className="text-sm">
                  {order.deliveryAddress.streetAddress1}
                  {order.deliveryAddress.streetAddress2 && `, ${order.deliveryAddress.streetAddress2}`}
                  <br />
                  {order.deliveryAddress.city?.name || 'N/A'}, {order.deliveryAddress.zipCode}
                </p>
                {order.deliveryAddress.deliveryInstructions && (
                  <p className="text-sm mt-1">
                    <span className="font-medium">Instructions:</span> {order.deliveryAddress.deliveryInstructions}
                  </p>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-1">Restaurant</h3>
                <p className="text-sm">{order.restaurant.name}</p>
                <p className="text-sm">{order.restaurant.streetAddress}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => onClick(order)}
                className="btn btn-sm btn-primary"
              >
                <Edit className="w-4 h-4" />
                View Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Order Modal Component
const OrderModal = ({ order, isOpen, onClose, onStatusChange, onDelete, isEditing, setIsEditing }: {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (orderId: number, newStatus: string) => void;
  onDelete: (orderId: number) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}) => {
  const currentStatus = order.statuses[order.statuses.length - 1]?.statusCatalog.name || "Pending";
  const totalPrice = order.orderItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  const statusOptions = ["Pending", "Processing", "Completed", "Cancelled"];

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Order Details #{order.id}</h3>
          <button onClick={onClose} className="btn btn-circle btn-sm">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order Summary */}
          <div className="md:col-span-2">
            <div className="card bg-base-200">
              <div className="card-body p-4">
                <h4 className="card-title mb-4">Order Items</h4>
                <div className="space-y-3">
                  {order.orderItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">{item.menuItem.name}</p>
                        <p className="text-sm text-gray-500">{item.menuItem.description}</p>
                      </div>
                      <div className="text-right">
                        <p>${parseFloat(item.menuItem.price).toFixed(2)} × {item.quantity}</p>
                        <p className="font-medium">${(parseFloat(item.menuItem.price) * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-2 border-t border-base-300 flex justify-between">
                  <p className="font-bold">Total:</p>
                  <p className="font-bold">${totalPrice.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-4">
            <div className="card bg-base-200">
              <div className="card-body p-4">
                <h4 className="card-title mb-2">Customer Information</h4>
                <p className="font-medium">{order.user.name}</p>
                <p className="text-sm">{order.user.contactPhone}</p>
                <p className="text-sm">{order.user.email}</p>
              </div>
            </div>

            <div className="card bg-base-200">
              <div className="card-body p-4">
                <h4 className="card-title mb-2">Delivery Address</h4>
                <p className="text-sm">
                  {order.deliveryAddress.streetAddress1}
                  {order.deliveryAddress.streetAddress2 && `, ${order.deliveryAddress.streetAddress2}`}
                  <br />
                  {order.deliveryAddress.city?.name || 'N/A'}, {order.deliveryAddress.zipCode}
                </p>
                {order.deliveryAddress.deliveryInstructions && (
                  <p className="text-sm mt-2">
                    <span className="font-medium">Instructions:</span> {order.deliveryAddress.deliveryInstructions}
                  </p>
                )}
              </div>
            </div>

            <div className="card bg-base-200">
              <div className="card-body p-4">
                <h4 className="card-title mb-2">Status</h4>
                {isEditing ? (
                  <select
                    className="select select-bordered w-full"
                    value={currentStatus}
                    onChange={(e) => onStatusChange(order.id, e.target.value)}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className={`badge ${
                      currentStatus === "Completed" ? "badge-success" :
                      currentStatus === "Cancelled" ? "badge-error" :
                      currentStatus === "Processing" ? "badge-info" : "badge-warning"
                    }`}>
                      {currentStatus}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        {order.comments.length > 0 && (
          <div className="mt-6">
            <h4 className="font-bold mb-2">Comments</h4>
            <div className="space-y-2">
              {order.comments.map((comment) => (
                <div key={comment.id} className="bg-base-200 p-3 rounded-lg">
                  <p className="text-sm">{comment.commentText}</p>
                  <div className="flex gap-2 mt-1">
                    {comment.isComplaint && <span className="badge badge-error badge-sm">Complaint</span>}
                    {comment.isPraise && <span className="badge badge-success badge-sm">Praise</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="modal-action">
          <button
            onClick={() => onDelete(order.id)}
            className="btn btn-error gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete Order
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-ghost gap-2"
            >
              {isEditing ? (
                <>
                  <X className="w-4 h-4" />
                  Cancel
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4" />
                  Edit Order
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="btn btn-primary gap-2"
            >
              <Check className="w-4 h-4" />
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};