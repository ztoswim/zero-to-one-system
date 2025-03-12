import { useState } from "react";

const BuyerInvoiceForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    tin: "",
    identificationNumber: "",
    sstNumber: "NA",
    email: "",
    contactNumber: "",
    addressLine0: "",
    addressLine1: "",
    addressLine2: "",
    postalZone: "",
    city: "",
    state: "",
    country: "MYS",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    // 可以在这里提交数据到后端 API
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Buyer Information</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input type="text" name="name" placeholder="Buyer’s Name" className="p-2 border rounded" value={formData.name} onChange={handleChange} required />
        <input type="text" name="tin" placeholder="Buyer’s TIN" className="p-2 border rounded" value={formData.tin} onChange={handleChange} required />
        <input type="text" name="identificationNumber" placeholder="Identification Number" className="p-2 border rounded" value={formData.identificationNumber} onChange={handleChange} required />
        <input type="text" name="sstNumber" placeholder="SST Registration Number" className="p-2 border rounded" value={formData.sstNumber} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" className="p-2 border rounded" value={formData.email} onChange={handleChange} />
        <input type="text" name="contactNumber" placeholder="Contact Number" className="p-2 border rounded" value={formData.contactNumber} onChange={handleChange} required />
        <input type="text" name="addressLine0" placeholder="Address Line 0" className="p-2 border rounded" value={formData.addressLine0} onChange={handleChange} required />
        <input type="text" name="addressLine1" placeholder="Address Line 1" className="p-2 border rounded" value={formData.addressLine1} onChange={handleChange} />
        <input type="text" name="addressLine2" placeholder="Address Line 2" className="p-2 border rounded" value={formData.addressLine2} onChange={handleChange} />
        <input type="text" name="postalZone" placeholder="Postal Zone" className="p-2 border rounded" value={formData.postalZone} onChange={handleChange} />
        <input type="text" name="city" placeholder="City" className="p-2 border rounded" value={formData.city} onChange={handleChange} required />
        <input type="text" name="state" placeholder="State" className="p-2 border rounded" value={formData.state} onChange={handleChange} required />
        <input type="text" name="country" placeholder="Country" className="p-2 border rounded" value={formData.country} onChange={handleChange} required />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default BuyerInvoiceForm;
