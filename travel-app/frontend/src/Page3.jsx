import { useLocation } from "react-router-dom";

function Page3() {
  const location = useLocation();
  const state = location.state;

  if (!state) {
    return <h3>No trip data found. Please start again.</h3>;
  }

  const saveTrip = async () => {
    try {
      const res = await fetch("http://localhost:5000/saveTrip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Trip saved successfully!");
      } else {
        alert("Failed to save trip");
        console.error(data);
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Server not reachable");
    }
  };

  return (
    <div>
      <h2>Bill Summary</h2>

      <p>Pickup: {state.pickup}</p>
      <p>Destination: {state.destination}</p>
      <p>Vehicle: {state.vehicle}</p>
      <p>Base Fare: ₹{state.baseFare}</p>
      <p>Tax (5%): ₹{state.tax}</p>

      <h3>Total: ₹{state.total}</h3>

      <button onClick={saveTrip}>Confirm & Save</button>
    </div>
  );
}

export default Page3;



// import {useLocation} from "react-router-dom";
// function Page3(){
//     const {state}=useLocation();
//     const saveTrip=()=>{
//         fetch("http://localhost:5000/saveTrip",{
//             method:"POST",
//             headers:{"Content-Type":"application/json"},
//             body:JSON.stringify(state)
//         });
//     };
//     return(
//         <div>
//             <h2>Bill Summary</h2>
//             <p>Pickup:{state.pickup}</p>
//             <p>Destination:{state.destination}</p>
//             <p>Vehicle:{state.vehicle}</p>
//             <p>Base Fare:${state.baseFare}</p>
//             <p>tax(5%):${state.tax}</p>
//             <h3>Total:${state.total}</h3>
//             <button onClick={saveTrip}>Confirm & Save</button>
//         </div>
//     );
// }

// export default Page3;