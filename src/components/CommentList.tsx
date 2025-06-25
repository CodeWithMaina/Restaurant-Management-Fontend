import { MessageSquare } from "lucide-react";
import { CommentCard } from "./CommentCard";
import type { Comment } from "../features/api/commentApi";

type CommentListProps = {
  comments: Comment[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export const CommentList = ({ comments, onEdit, onDelete }: CommentListProps) => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="text-yellow-400" size={24} />
        <h1 className="text-2xl font-bold text-white">Customer Comments</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};