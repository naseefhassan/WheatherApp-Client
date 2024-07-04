import React from "react";
import CurrentWheather from "../Components/Home/CurrentWheather";
import SkyImg from '../assets/Images/Wheather.jpeg'
import Forecast from "../Components/Home/Forecast";
import Favorite from "../Components/Home/Favorite";

function HomePage() {
  return (
    <>
      <div className=" bg-no-repeat bg-center bg-cover text-white" style={{backgroundImage:`url(${SkyImg})`}}>
        <div className="p-5 sm:flex">
        <CurrentWheather />
        <Favorite/>
        </div>
        <div className="p-2">
          <Forecast/>
        </div>
      </div>
    </>
  );
}

export default HomePage; 
