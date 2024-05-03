import { useEffect, useState } from "react";
import { axiosSecure } from "../../../hooks/useAxios";
import ServiceCard from "../../services/ServiceCard";
const Home = () => {
  const [services, setServices] = useState([]);

  const url = "/services?limit=3";

  useEffect(() => {
    axiosSecure.get(url).then((res) => setServices(res.data));
  }, [url]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 ml-10">
      {services.map((service) => (
        <ServiceCard key={service._id} service={service}></ServiceCard>
      ))}
    </div>
  );
};

export default Home;
