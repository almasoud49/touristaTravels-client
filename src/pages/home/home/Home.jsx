import { useEffect, useState } from "react";
import { axiosSecure } from "../../../hooks/useAxios";
import ServiceCard from "../../services/ServiceCard";
import { Link } from "react-router-dom";
import Banner from "./Banner";
import NewsLetter from "./NewsLetter";
const Home = () => {
  const [services, setServices] = useState([]);

  const url = "/services?limit=3";

  useEffect(() => {
    axiosSecure.get(url).then((res) => setServices(res.data));
  }, [url]);

  return (
    <section>
      <div>
      <Banner/>
      </div>
      <div className="divider  text-sm font-bold uppercase py-5">Our Services</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 ml-10">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service}></ServiceCard>
        ))}
      </div>
      <div className="flex flex-col w-full">
        <div className="divider  mt-10">
          <Link
            to="/services"
            className='className="mt-10 block btn btn-primary  px-12 py-3 text-sm font-bold uppercase tracking-wider text-white transition focus:outline-none'
          >
            See All
          </Link>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <div className="divider  mt-10">
          
            Email Subscription
          
        </div>
      </div>
        <NewsLetter/>
      
    </section>
  );
};

export default Home;
