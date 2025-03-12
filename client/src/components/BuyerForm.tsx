import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createBuyer, updateBuyer } from '../api/buyerAPI'; // Importing the API functions

// Address interface type definition
interface Address {
  addressLine0: string;
  addressLine1: string;
  addressLine2: string;
  postalZone: string;
  cityName: string;
  state: string;
  country: string;
}

// BuyerFormProps interface to define the structure for props
interface BuyerFormProps {
  selectedBuyer: any | null;
  onClose: () => void;
  onSuccess: () => void;
}

const BuyerForm: React.FC<BuyerFormProps> = ({ selectedBuyer, onClose, onSuccess }) => {
  const [buyer, setBuyer] = useState<any>(selectedBuyer || {});  // Initializing buyer state
  const [address, setAddress] = useState<Address>(selectedBuyer?.address || {
    addressLine0: '',
    addressLine1: '',
    addressLine2: '',
    postalZone: '',
    cityName: '',
    state: '',
    country: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setBuyer({ ...buyer, [field]: e.target.value });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setAddress({ ...address, [field]: e.target.value });
  };

  const handleSubmit = async () => {
    const buyerData = { ...buyer, address };
    try {
      if (selectedBuyer) {
        await updateBuyer(selectedBuyer.id, buyerData);  // Update the existing buyer
      } else {
        await createBuyer(buyerData);  // Create a new buyer
      }
      onSuccess();
    } catch (error) {
      toast.error("Error saving buyer");
    }
  };

  return (
    <div>
      <div>
        <h2>{selectedBuyer ? 'Edit Buyer' : 'New Buyer'}</h2>
        <div>
          <label>Name</label>
          <input type="text" value={buyer.name} onChange={(e) => handleInputChange(e, 'name')} />
        </div>
        <div>
          <label>TIN</label>
          <input type="text" value={buyer.tin} onChange={(e) => handleInputChange(e, 'tin')} />
        </div>
        <div>
          <label>Registration Number</label>
          <input type="text" value={buyer.registrationNumber} onChange={(e) => handleInputChange(e, 'registrationNumber')} />
        </div>
        <div>
          <label>Registration Scheme</label>
          <input type="text" value={buyer.registrationScheme} onChange={(e) => handleInputChange(e, 'registrationScheme')} />
        </div>
        <div>
          <label>SST</label>
          <input type="text" value={buyer.sst} onChange={(e) => handleInputChange(e, 'sst')} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={buyer.email} onChange={(e) => handleInputChange(e, 'email')} />
        </div>
        <div>
          <label>Contact</label>
          <input type="text" value={buyer.contact} onChange={(e) => handleInputChange(e, 'contact')} />
        </div>

        {/* Address Fields */}
        <div>
          <h3>Address</h3>
          <div>
            <label>Address Line 0</label>
            <input type="text" value={address.addressLine0} onChange={(e) => handleAddressChange(e, 'addressLine0')} />
          </div>
          <div>
            <label>Address Line 1</label>
            <input type="text" value={address.addressLine1} onChange={(e) => handleAddressChange(e, 'addressLine1')} />
          </div>
          <div>
            <label>Address Line 2</label>
            <input type="text" value={address.addressLine2} onChange={(e) => handleAddressChange(e, 'addressLine2')} />
          </div>
          <div>
            <label>Postal Zone</label>
            <input type="text" value={address.postalZone} onChange={(e) => handleAddressChange(e, 'postalZone')} />
          </div>
          <div>
            <label>City Name</label>
            <input type="text" value={address.cityName} onChange={(e) => handleAddressChange(e, 'cityName')} />
          </div>
          <div>
            <label>State</label>
            <input type="text" value={address.state} onChange={(e) => handleAddressChange(e, 'state')} />
          </div>
          <div>
            <label>Country</label>
            <input type="text" value={address.country} onChange={(e) => handleAddressChange(e, 'country')} />
          </div>
        </div>

        <div>
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BuyerForm;
