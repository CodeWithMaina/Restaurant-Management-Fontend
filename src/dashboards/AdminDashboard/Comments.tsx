import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { Plus, Search, Edit, Trash2, Save, X, Eye } from "lucide-react";
import { commentApi } from "../../features/api/commentApi";

type CommentFormData = {
  orderId: number;
  userId: number;
  commentText: string;
  isComplaint: boolean;
  isPraise: boolean;
};

export const Comments = () => {
  const { data: comments = [], error, isLoading } = commentApi.useFetchCommentsQuery();
  const [deleteComment] = commentApi.useDeleteCommentMutation();
  const [selectedComment, setSelectedComment] = useState<TComment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<CommentFormData>();

  const filteredComments = comments.filter((comment) =>
    comment.commentText.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.orderId.toString().includes(searchTerm)
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
        await deleteComment(id).unwrap();
        toast.success("Comment deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete comment");
      }
    }
  };

  const openModal = (comment: TComment) => {
    setSelectedComment(comment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedComment(null);
  };

  if (isLoading) return <div className="text-center py-8">Loading comments...</div>;
  if (error) return <div className="text-center py-8 text-error">Error loading comments</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Comments Management</h1>

      {/* Search */}
      <div className="flex mb-6">
        <div className="join flex-1">
          <input
            type="text"
            placeholder="Search comments..."
            className="input input-bordered join-item w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn join-item">
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Comments Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>ID</th>
              <th>Order ID</th>
              <th>User</th>
              <th>Comment</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredComments.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No comments found
                </td>
              </tr>
            ) : (
              filteredComments.map((comment) => (
                <tr key={comment.id}>
                  <td>{comment.id}</td>
                  <td>{comment.orderId}</td>
                  <td>{comment.user.name}</td>
                  <td className="max-w-xs truncate">{comment.commentText}</td>
                  <td>
                    {comment.isPraise && (
                      <span className="badge badge-success">Praise</span>
                    )}
                    {comment.isComplaint && (
                      <span className="badge badge-error">Complaint</span>
                    )}
                  </td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => openModal(comment)}
                      className="btn btn-info btn-sm"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(comment.id)}
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

      {/* Comment Details Modal */}
      {isModalOpen && selectedComment && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <h3 className="font-bold text-lg">Comment Details</h3>
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">User Information</h4>
                  <p>Name: {selectedComment.user.name}</p>
                  <p>Email: {selectedComment.user.email}</p>
                  <p>Phone: {selectedComment.user.contactPhone}</p>
                  <p>User Type: {selectedComment.user.userType}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Order Information</h4>
                  <p>Order ID: {selectedComment.orderId}</p>
                  <p>Price: ${selectedComment.order.price}</p>
                  <p>Final Price: ${selectedComment.order.finalPrice}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Comment</h4>
                <p className="p-4 bg-base-200 rounded-lg">
                  {selectedComment.commentText}
                </p>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Type:</span>
                {selectedComment.isPraise && (
                  <span className="badge badge-success">Praise</span>
                )}
                {selectedComment.isComplaint && (
                  <span className="badge badge-error">Complaint</span>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  Created: {new Date(selectedComment.createdAt).toLocaleString()}
                </p>
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