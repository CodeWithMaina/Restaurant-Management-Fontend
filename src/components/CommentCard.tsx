import { useState } from "react";
import { Pencil, Trash2, Star, AlertTriangle, ChevronRight } from "lucide-react";

type Comment = {
  id: number;
  commentText: string;
  isComplaint: boolean;
  isPraise: boolean;
  user: {
    name: string;
    userType: string;
  };
  order: {
    finalPrice: string;
  };
  createdAt: string;
};

type CommentCardProps = {
  comment: Comment;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export const CommentCard = ({ comment, onEdit, onDelete }: CommentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="bg-base-100 rounded-lg shadow-md p-4 mb-4 border border-gray-700 hover:border-yellow-400 transition-colors cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          {comment.isPraise && (
            <Star className="text-yellow-400 fill-yellow-400" size={18} />
          )}
          {comment.isComplaint && (
            <AlertTriangle className="text-red-500" size={18} />
          )}
          <h3 className="font-semibold text-white">{comment.user.name}</h3>
          <span className="text-gray-400 text-sm">({comment.user.userType})</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(comment.id);
            }}
            className="text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(comment.id);
            }}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <p className="mt-2 text-gray-300">{comment.commentText}</p>
      
      <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
        <span>Order total: ${comment.order.finalPrice}</span>
        <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
      </div>

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Details</span>
            <ChevronRight className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} size={16} />
          </div>
          <div className="mt-2 space-y-1 text-sm text-gray-300">
            <p>Comment ID: {comment.id}</p>
            <p>Type: {comment.isPraise ? 'Praise' : comment.isComplaint ? 'Complaint' : 'General'}</p>
            <p>Created: {new Date(comment.createdAt).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};