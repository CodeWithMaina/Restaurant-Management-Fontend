// UserCard.tsx
import { Edit, Phone, Mail, MapPin, Check, X } from "lucide-react";
import type { TUser } from "../../features/api/userApi";

interface UserCardProps {
  user: TUser;
  onClick: () => void;
}

export const UserCard = ({ user, onClick }: UserCardProps) => {
  return (
    <div 
      className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="card-body p-4">
        <div className="flex justify-between items-start">
          <h3 className="card-title text-lg font-bold">{user.name}</h3>
          <span className="badge badge-sm badge-warning">
            {user.userType.replace('_', ' ')}
          </span>
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <Mail className="h-4 w-4 text-gray-500" />
          <span className="text-sm">{user.email}</span>
          {user.emailVerified ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <X className="h-4 w-4 text-red-500" />
          )}
        </div>
        
        <div className="flex items-center gap-2 mt-1">
          <Phone className="h-4 w-4 text-gray-500" />
          <span className="text-sm">{user.contactPhone}</span>
          {user.phoneVerified ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <X className="h-4 w-4 text-red-500" />
          )}
        </div>
        
        {user.addresses?.length > 0 && (
          <div className="flex items-center gap-2 mt-1">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-sm">
              {user.addresses[0].streetAddress1}, {user.addresses[0].city.name}
            </span>
          </div>
        )}
        
        <div className="mt-3 flex justify-between items-center">
          <div className="flex gap-2">
            <span className="badge badge-sm">
              {user.orders?.length || 0} orders
            </span>
            {user.userType === 'restaurant_owner' && (
              <span className="badge badge-sm">
                {user.ownedRestaurants?.length || 0} restaurants
              </span>
            )}
          </div>
          <button className="btn btn-sm btn-ghost">
            <Edit className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};