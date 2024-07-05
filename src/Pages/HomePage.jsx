import CurrentWheather from "../Components/Home/CurrentWheather";
import SkyImg from '../assets/Images/Wheather.jpeg'
import Forecast from "../Components/Home/Forecast";
import Favorite from "../Components/Home/Favorite";
import History from "../Components/Home/History";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <div className=" bg-no-repeat bg-center bg-cover text-white" style={{backgroundImage:`url(${SkyImg})`}}>
        <div className="flex justify-end ">
          <Link to={'/register'}>
        <button className="p-1 px-2 bg-gray-400 rounded-lg m-2 text-sm font-bold ">Register</button>
          </Link>

        </div>
        <div className="p-5 sm:flex">
        <CurrentWheather />
        <Favorite/>
        </div>
        <div className="p-2">
          <Forecast/>
          {/* <History/> */}
        </div>
      </div>
    </>
  );
}

export default HomePage; 
