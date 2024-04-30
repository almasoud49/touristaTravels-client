import { useEffect, useState } from "react";
import HomeCard from "./HomeCard";

import { axiosSecure } from "../../../hooks/useAxios";
const Home = () => {
  const [services, setServices] = useState([]);
  

  const url = "/services?limit=3";
  
  useEffect(() => {
   
    axiosSecure.get(url).then((res) => setServices(res.data));
  }, [url]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 ml-10">
      
      {services.map((service) => (
             <HomeCard key={service._id} service={service}></HomeCard>
      ))}
 
     
    </div>
  );
};

export default Home;
