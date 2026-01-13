import { useLocation, useNavigate } from "react-router-dom";

function Page2() {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();

  if (!state) {
    return <h3>Please start from Trip Details page</h3>;
  }

  const vehicles = [
    { name: "Bike", rate: 50, min: 100 },
    { name: "Car", rate: 100, min: 200 },
    { name: "Van", rate: 150, min: 300 }
  ];

  const calculate = (v) => {
    let hourss = Number(state.distance) / 20;
    let cost = hourss * v.rate;

    if (cost < v.min) cost = v.min;

    let tax = cost * 0.05;
    let total = cost + tax;

    navigate("/total", {
      state: {
        ...state,
        vehicle: v.name,
        hourss,
        baseFare: cost,
        tax,
        total
      }
    });
  };

  return (
    <div>
      <h2>Select Vehicle</h2>

      {vehicles.map(v => (
        <div key={v.name}>
          <p>{v.name} - ₹{v.rate}/hour</p>
          <button onClick={() => calculate(v)}>Choose</button>
        </div>
      ))}
    </div>
  );
}

export default Page2;


// import {useLocation,useNavigate} from "react-router-dom";
// function Page2(){
//     const{state}=useLocation();
//     const navigate=useNavigate();
//     const vehicles=[
//         {name:"Bike",rate:50,min:100},
//         {name:"Car",rate:100,min:200},
//         {name:"Van",rate:150,min:300}
//     ];
//     const calculate=(v)=>{
//         let hourss=state.distance/20;
//         let cost=hourss*v.rate;
//         if (cost<v.min) cost=v.min;
//         let tax=cost*0.05;
//         let total=cost+tax;

//         navigate("/total",{
//             state:{
//                 ...state,
//                 vehicle:v.name,
//                 hourss,
//                 baseFare:cost,
//                 tax,
//                 total
//             }
//         });
//     };
//     return(
//         <div>
//             <h2>Select vehicle</h2>
//             {vehicles.map(v=>(
//                 <div key={v.name}>
//                     <p>{v.name}-${v.rate}/hour</p>
//                     <button onClick={()=>calculate(v)}>Choose</button>
//                 </div>
//             ))}
//         </div>
//     )
// }

// export default Page2;