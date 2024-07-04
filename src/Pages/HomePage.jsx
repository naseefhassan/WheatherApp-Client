import React from "react";
import CurrentWheather from "../Components/Home/CurrentWheather";
import SkyImg from '../assets/Images/Wheather.jpeg'

function HomePage() {
  return (
    <>
      <div className="h-screen bg-no-repeat bg-center bg-cover" style={{backgroundImage:`url(${SkyImg})`}}>
        <div className="p-5">
        <CurrentWheather />
        </div>
      </div>
    </>
  );
}

export default HomePage; 
