import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { Plus, Search, Edit, Trash2, Eye, Clock, CheckCircle, DollarSign } from "lucide-react";
import { orderApi, type TOrder } from "../../features/api/ordersApi";

type OrderFormData = {
  restaurantId: number;
  userId: number;
  driverId: number;
  deliveryAddressId: number;
  estimatedDeliveryTime: string;
  price: string;
  discount: string;
};

export const AllOrders = () => {
  const { data: orders = [], error, isLoading } = orderApi.useFetchOrdersQuery();
  const [deleteOrder] = orderApi.useDeleteOrderMutation();
  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  console.log(orders);
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<OrderFormData>();

  const filteredOrders = orders.filter((order) =>
    order.id.toString().includes(searchTerm) ||
    order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteOrder(id).unwrap();
        toast.success("Order deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete order");
      }
    }
  };

  const openModal = (order: TOrder) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) return <div className="text-center py-8">Loading orders...</div>;
  if (error) return <div className="text-center py-8 text-error">Error loading orders</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Orders Management</h1>

      {/* Search */}
      <div className="flex mb-6">
        <div className="join flex-1">
          <input
            type="text"
            placeholder="Search orders..."
            className="input input-bordered join-item w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn join-item">
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>ID</th>
              <th>Restaurant</th>
              <th>Customer</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.restaurant.name}</td>
                  <td>{order.user.name}</td>
                  <td>${order.finalPrice}</td>
                  <td>
                    {order.actualDeliveryTime ? (
                      <span className="badge badge-success">Delivered</span>
                    ) : (
                      <span className="badge badge-warning">Pending</span>
                    )}
                  </td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => openModal(order)}
                      className="btn btn-info btn-sm"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="btn btn-error btn-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="modal modal-open">
          <div className="modal-box max-w-5xl">
            <h3 className="font-bold text-lg">Order #{selectedOrder.id} Details</h3>
            <div className="py-4 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card bg-base-100 shadow">
                  <div className="card-body">
                    <h4 className="font-semibold card-title">
                      <DollarSign size={18} className="mr-1" /> Order Summary
                    </h4>
                    <p>Price: ${selectedOrder.price}</p>
                    <p>Discount: ${selectedOrder.discount}</p>
                    <p>Final Price: ${selectedOrder.finalPrice}</p>
                    <p>Created: {formatDateTime(selectedOrder.createdAt)}</p>
                  </div>
                </div>

                <div className="card bg-base-100 shadow">
                  <div className="card-body">
                    <h4 className="font-semibold card-title">
                      <Clock size={18} className="mr-1" /> Delivery Info
                    </h4>
                    <p>Estimated: {formatDateTime(selectedOrder.estimatedDeliveryTime)}</p>
                    <p>Actual: {selectedOrder.actualDeliveryTime ? formatDateTime(selectedOrder.actualDeliveryTime) : "Pending"}</p>
                    <p>Instructions: {selectedOrder.deliveryAddress.deliveryInstructions}</p>
                  </div>
                </div>

                <div className="card bg-base-100 shadow">
                  <div className="card-body">
                    <h4 className="font-semibold card-title">Customer</h4>
                    <p>{selectedOrder.user.name}</p>
                    <p>{selectedOrder.user.email}</p>
                    <p>{selectedOrder.user.contactPhone}</p>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow">
                <div className="card-body">
                  <h4 className="font-semibold card-title">Delivery Address</h4>
                  <p>{selectedOrder.deliveryAddress.streetAddress1}</p>
                  <p>Zip: {selectedOrder.deliveryAddress.zipCode}</p>
                </div>
              </div>

              <div className="card bg-base-100 shadow">
                <div className="card-body">
                  <h4 className="font-semibold card-title">Driver Info</h4>
                  <p>Vehicle: {selectedOrder.driver.carYear} {selectedOrder.driver.carMake} {selectedOrder.driver.carModel}</p>
                </div>
              </div>

              <div className="card bg-base-100 shadow">
                <div className="card-body">
                  <h4 className="font-semibold card-title">Order Items ({selectedOrder.orderItems.length})</h4>
                  <div className="overflow-x-auto">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Qty</th>
                          <th>Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.orderItems.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <div className="font-medium">{item.menuItem.name}</div>
                              <div className="text-sm opacity-50">{item.menuItem.description}</div>
                            </td>
                            <td>{item.quantity}</td>
                            <td>${item.itemPrice}</td>
                            <td>${item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-action">
              <button onClick={closeModal} className="btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};