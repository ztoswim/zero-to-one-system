import { useState } from "react";

interface InvoiceItem {
  courseName: string;
  description: string;
  unitPrice: number;
  quantity: number;
  taxRate: number;
  isTaxExempt: boolean;
  discountRate?: number;
}

export default function InvoiceForm() {
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [newItem, setNewItem] = useState<InvoiceItem>({
    courseName: "",
    description: "",
    unitPrice: 0,
    quantity: 1,
    taxRate: 10,
    isTaxExempt: false,
    discountRate: 0,
  });

  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem({
      courseName: "",
      description: "",
      unitPrice: 0,
      quantity: 1,
      taxRate: 10,
      isTaxExempt: false,
      discountRate: 0,
    });
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const discount = item.discountRate ? item.unitPrice * (item.discountRate / 100) : 0;
      const priceAfterDiscount = item.unitPrice - discount;
      const subtotal = priceAfterDiscount * item.quantity;
      const tax = item.isTaxExempt ? 0 : subtotal * (item.taxRate / 100);
      return total + subtotal + tax;
    }, 0);
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Invoice Line Items</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Course Name"
          value={newItem.courseName}
          onChange={(e) => setNewItem({ ...newItem, courseName: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Unit Price"
          value={newItem.unitPrice}
          onChange={(e) => setNewItem({ ...newItem, unitPrice: parseFloat(e.target.value) || 0 })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Tax Rate (%)"
          value={newItem.taxRate}
          onChange={(e) => setNewItem({ ...newItem, taxRate: parseFloat(e.target.value) || 0 })}
          className="border p-2 rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={newItem.isTaxExempt}
            onChange={(e) => setNewItem({ ...newItem, isTaxExempt: e.target.checked })}
          />
          Tax Exempt
        </label>
        <input
          type="number"
          placeholder="Discount Rate (%)"
          value={newItem.discountRate}
          onChange={(e) => setNewItem({ ...newItem, discountRate: parseFloat(e.target.value) || 0 })}
          className="border p-2 rounded"
        />
        <button
          onClick={handleAddItem}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Item
        </button>
      </div>
      <h3 className="mt-4 text-lg font-bold">Invoice Summary</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="border-b py-2">
            {item.courseName} - {item.quantity} x RM{item.unitPrice.toFixed(2)} (Tax: {item.isTaxExempt ? "Exempt" : `${item.taxRate}%`})
          </li>
        ))}
      </ul>
      <h3 className="text-xl font-bold mt-4">Total: RM{calculateTotal().toFixed(2)}</h3>
    </div>
  );
}
