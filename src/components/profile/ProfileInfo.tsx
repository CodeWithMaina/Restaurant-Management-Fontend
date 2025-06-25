import { User, Phone, Mail } from "lucide-react";

type ProfileInfoProps = {
  userData: any;
};

export const ProfileInfo = ({ userData }: ProfileInfoProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    {/* Name */}
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-full bg-base-200">
        <User className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
        <p className="text-lg font-medium">{userData?.name}</p>
      </div>
    </div>

    {/* Phone */}
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-full bg-base-200">
        <Phone className="w-6 h-6 text-primary" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
          {userData?.phoneVerified && (
            <span className="badge badge-success gap-1">
              <Check className="w-3 h-3" />
              Verified
            </span>
          )}
        </div>
        <p className="text-lg font-medium">{userData?.contactPhone}</p>
      </div>
    </div>

    {/* Email */}
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-full bg-base-200">
        <Mail className="w-6 h-6 text-primary" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-gray-500">Email</h3>
          {userData?.emailVerified && (
            <span className="badge badge-success gap-1">
              <Check className="w-3 h-3" />
              Verified
            </span>
          )}
        </div>
        <p className="text-lg font-medium">{userData?.email}</p>
      </div>
    </div>

    {/* User Type */}
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-full bg-base-200">
        <User className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">User Type</h3>
        <p className="text-lg font-medium capitalize">{userData?.userType}</p>
      </div>
    </div>
  </div>
);