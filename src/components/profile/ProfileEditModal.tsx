import type { FormData } from "../../dashboards/Profile";

type ProfileEditModalProps = {
  userData: any;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  errors: any;
  isDirty: boolean;
  register: any;
};

export const ProfileEditModal = ({
  userData,
  isOpen,
  onClose,
  onSubmit,
  errors,
  isDirty,
  register,
}: ProfileEditModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-base-100 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Edit Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              &times;
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered ${
                    errors.name && "input-error"
                  }`}
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.name.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Phone Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="tel"
                  className={`input input-bordered ${
                    errors.contactPhone && "input-error"
                  }`}
                  {...register("contactPhone", {
                    required: "Phone is required",
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: "Invalid phone number",
                    },
                  })}
                />
                {errors.contactPhone && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.contactPhone.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className={`input input-bordered ${
                    errors.email && "input-error"
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.email.message}
                    </span>
                  </label>
                )}
              </div>

              {/* User Type (Readonly) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">User Type</span>
                </label>
                <div className="input input-bordered flex items-center">
                  {userData?.userType}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isDirty}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};