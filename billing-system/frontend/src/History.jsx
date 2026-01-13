import { useEffect, useState } from "react";

function History() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/history")
      .then(res => res.json())
      .then(data => setBills(data));
  }, []);

  return (
    <div>
      <h2>Bill History</h2>

      {bills.length === 0 ? (
        <p>No bills found</p>
      ) : (
        <ul>
          {bills.map(b => (
            <li key={b.id}>
              Total ₹{b.total} | {new Date(b.created_at).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;
