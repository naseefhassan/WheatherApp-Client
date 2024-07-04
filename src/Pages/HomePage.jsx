import React from "react";
import CurrentWheather from "../Components/Home/CurrentWheather";
import SkyImg from '../assets/Images/Wheather.jpeg'
import Forecast from "../Components/Home/Forecast";

function HomePage() {
  return (
    <>
      <div className="h-screen bg-no-repeat bg-center bg-cover text-white" style={{backgroundImage:`url(${SkyImg})`}}>
        <div className="p-5">
        <CurrentWheather />
        </div>
        <div className="">
          <Forecast/>
        </div>
      </div>
    </>
  );
}

export default HomePage; 
