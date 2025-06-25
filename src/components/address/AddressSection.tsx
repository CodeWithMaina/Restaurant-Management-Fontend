import { MapPin, Plus } from "lucide-react";
import { AddressCard } from "./AddressCard";

type AddressSectionProps = {
  addresses: any[];
  onAddAddress: () => void;
  onEditAddress: (address: any) => void;
};

export const AddressSection = ({
  addresses,
  onAddAddress,
  onEditAddress,
}: AddressSectionProps) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <MapPin className="w-6 h-6" />
        Addresses
      </h3>
      <button
        onClick={onAddAddress}
        className="btn btn-sm btn-primary gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Address
      </button>
    </div>

    {addresses?.length ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            onEdit={() => onEditAddress(address)}
          />
        ))}
      </div>
    ) : (
      <div className="alert alert-info">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          <span>No addresses saved yet.</span>
        </div>
      </div>
    )}
  </div>
);