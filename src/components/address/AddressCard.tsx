import { Home, Edit2, Trash2 } from "lucide-react";
import type { TAddress } from "../types/user.types";

type AddressCardProps = {
  address: TAddress;
  onEdit: () => void;
};

export const AddressCard = ({ address, onEdit }: AddressCardProps) => (
  <div className="card bg-base-200">
    <div className="card-body p-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 mb-2">
          <Home className="w-5 h-5 text-primary" />
          <h4 className="card-title">{address.streetAddress1}</h4>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="btn btn-circle btn-sm btn-ghost"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button className="btn btn-circle btn-sm btn-ghost text-error">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {address.streetAddress2 && (
        <p className="text-sm">{address.streetAddress2}</p>
      )}
      <p className="text-sm">
        {address.city.name}, {address.city.state.code} {address.zipCode}
      </p>
      {address.deliveryInstructions && (
        <div className="mt-3 pt-3 border-t border-base-300">
          <p className="text-sm font-medium">Delivery Instructions:</p>
          <p className="text-sm">{address.deliveryInstructions}</p>
        </div>
      )}
    </div>
  </div>
);