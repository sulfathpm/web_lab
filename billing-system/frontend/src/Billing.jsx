import { useState } from "react";

function Billing() {
  const [amount, setAmount] = useState("");
  const [bill, setBill] = useState(null);

  const calculateBill = async () => {
    const amt = Number(amount);
    const tax = amt * 0.05;
    const discount = amt > 500 ? amt * 0.10 : 0;
    const total = amt + tax - discount;

    setBill({ tax, discount, total });

    await fetch("http://localhost:5000/add-bill", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amt, tax, discount, total })
    });

    alert("Bill Generated & Saved");
  };

  return (
    <div>
      <h2>Billing Page</h2>
      <input
        type="number"
        placeholder="Enter purchase amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <button onClick={calculateBill}>Generate Bill</button>

      {bill && (
        <div>
          <p>Tax (5%): ₹{bill.tax}</p>
          <p>Discount: ₹{bill.discount}</p>
          <h3>Total: ₹{bill.total}</h3>
        </div>
      )}
    </div>
  );
}

export default Billing;
