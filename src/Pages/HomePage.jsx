import React from "react";
import CurrentWheather from "../Components/Home/CurrentWheather";
import SkyImg from '../assets/Images/Wheather.jpeg'

function HomePage() {
  return (
    <>
      <div className="h-screen bg-no-repeat bg-center bg-cover" style={{backgroundImage:`url(${SkyImg})`}}>
        <CurrentWheather />
      </div>
    </>
  );
}

export default HomePage; 
