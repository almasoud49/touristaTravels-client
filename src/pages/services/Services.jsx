import { useEffect, useState } from "react";
import { axiosSecure } from "../../hooks/useAxios";
import ServiceCard from "./ServiceCard";

const Services = () => {
    const [services, setServices] = useState([]);
	const [count, setCount] = useState(0);
	const [size, setSize] = useState(6);
	const [page,setPage] = useState(0)
	const pages = Math.ceil(count / size);

	const paginationInfo = {
		size,
		setSize,
		page,
		setPage,
		pages
	}

    useEffect(()=>{
        const url = `/services?size=${size}&page=${page}`
        axiosSecure.get(url)
        .then(res => setServices(res.data))
    },[page,size])
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 ml-10">
            {
                services.map((service)=>(
                    <ServiceCard key={service._id} service={service}></ServiceCard>
                ))
            }
        </div>
    );
};

export default Services;