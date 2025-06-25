import { useForm } from "react-hook-form";
import type { Comment } from "../features/api/commentApi";

type CommentModalProps = {
  comment: Comment;
  onClose: () => void;
  onSave: (data: Comment) => void;
};

export const CommentModal = ({
  comment,
  onClose,
  onSave,
}: CommentModalProps) => {
  const { register, handleSubmit, watch, setValue } = useForm<Comment>({
    defaultValues: {
      ...comment,
      commentText: comment.commentText,
      isPraise: comment.isPraise,
      isComplaint: comment.isComplaint,
    },
  });

  const isPraise = watch("isPraise");
  const isComplaint = watch("isComplaint");

  const onSubmit = (data: Comment) => {
    console.log(data);
    onSave(data);
  };

  const handlePraiseChange = () => {
    const newValue = !isPraise;
    setValue("isPraise", newValue);
    if (newValue && isComplaint) {
      setValue("isComplaint", false);
    }
  };

  const handleComplaintChange = () => {
    const newValue = !isComplaint;
    setValue("isComplaint", newValue);
    if (newValue && isPraise) {
      setValue("isPraise", false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-base-100 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Edit Comment</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">User</label>
              <div className="bg-base-200 p-3 rounded text-white">
                {comment.user.name} ({comment.user.userType})
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Order Details</label>
              <div className="bg-base-200 p-3 rounded text-white">
                Total: ${comment.order.finalPrice}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Comment Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPraise}
                    onChange={handlePraiseChange}
                    className="checkbox checkbox-warning"
                  />
                  <span className="text-gray-300">Praise</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isComplaint}
                    onChange={handleComplaintChange}
                    className="checkbox checkbox-error"
                  />
                  <span className="text-gray-300">Complaint</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Comment Text</label>
              <textarea
                {...register("commentText", { required: true })}
                className="textarea textarea-bordered w-full bg-base-200 text-white"
                rows={5}
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-ghost text-white"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-warning text-black">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};