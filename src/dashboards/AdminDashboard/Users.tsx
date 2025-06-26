import { useState } from "react";
import { userApi, type TUser } from "../../features/api/userApi";
import { UserCard } from "../../components/user/UserCard";
import { UserModal } from "../../components/user/UserModal";
import type { TUserFormData } from "../../types/user.types";

export const Users = () => {
  const { data: users, isLoading, refetch } = userApi.useFetchAllUsersQuery();
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateUser] = userApi.useUpdatingUserDataMutation();

  const handleUserClick = (user: TUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveUser = async (data: TUserFormData) => {
    if (!selectedUser) return;
    try {
      await updateUser({
        userId: selectedUser.id,
        user: {
          name: data.name,
          email: data.email,
          contactPhone: data.contactPhone,
        }
      }).unwrap();
      refetch();
    } catch (error: unknown) {
      console.error("Failed to update user:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="alert alert-warning">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>No users found</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onClick={() => handleUserClick(user)}
          />
        ))}
      </div>

      {selectedUser && (
        <UserModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
};