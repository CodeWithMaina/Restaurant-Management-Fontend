import { useState } from "react";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Loading } from "../../components/Loading";
import { commentApi } from "../../features/api/commentApi";
import Swal from "sweetalert2";
import { CommentList } from "../../components/CommentList";
import { CommentModal } from "../../components/CommentModal";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

export const Comment = () => {
  const [deleteComment] = commentApi.useDeleteCommentMutation();
  const [updateComment] = commentApi.useUpdateCommentMutation();
  const [selectedComment, setSelectedComment] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {user} = useSelector((state: RootState) => state.auth);
  const restaurantId = user.restaurantId;
  const { data: commentData, error, isLoading, refetch } = commentApi.useFetchCommentsByRestaurantIdQuery(restaurantId,{});

  const handleEdit = (id: number) => {
    const comment = commentData?.find((c) => c.id === id);
    if (comment) {
      setSelectedComment(comment);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f59e0b',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      background: '#1f2937',
      color: '#fff',
    });

    if (result.isConfirmed) {
      try {
        await deleteComment(id).unwrap();
        refetch();
        Swal.fire({
          title: 'Deleted!',
          text: 'The comment has been deleted.',
          icon: 'success',
          confirmButtonColor: '#f59e0b',
          background: '#1f2937',
          color: '#fff',
        });
      } catch {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete comment.',
          icon: 'error',
          confirmButtonColor: '#f59e0b',
          background: '#1f2937',
          color: '#fff',
        });
      }
    }
  };

  const handleSave = async (data: any) => {
    try {
      await updateComment({
        id: data.id,
        commentText: data.commentText,
        isPraise: data.isPraise,
        isComplaint: data.isComplaint,
      }).unwrap();
      refetch();
      setIsModalOpen(false);
      Swal.fire({
        title: 'Success!',
        text: 'Comment updated successfully.',
        icon: 'success',
        confirmButtonColor: '#f59e0b',
        background: '#1f2937',
        color: '#fff',
      });
    } catch{
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update comment.',
        icon: 'error',
        confirmButtonColor: '#f59e0b',
        background: '#1f2937',
        color: '#fff',
      });
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage variant="info" message="Error fetching comments" />;
  if (!commentData) return <div>No comments found</div>;

  return (
    <>
      <CommentList 
        comments={commentData} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
      
      {isModalOpen && selectedComment && (
        <CommentModal
          comment={selectedComment}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
};