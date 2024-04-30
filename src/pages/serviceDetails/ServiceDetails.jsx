import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosSecure } from "../../hooks/useAxios";


const ServiceDetails = () => {
    const params = useParams();
	const [service, setService] = useState({});
    const { title, img, description, price } = service;
    // console.log(service)

    useEffect(()=>{
        const url = `/service/${params.id}`
        axiosSecure.get(url)
        .then(res => setService(res.data))
    },[params.id])
    return (
<div className="card card-side bg-base-100 shadow-xl w-4/5 ">
  <figure><img src={img} alt="Travels"/></figure>
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <p>{description}</p>
    <p>Price: {price}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Watch</button>
    </div>
  </div>
</div>
    );
};

export default ServiceDetails;