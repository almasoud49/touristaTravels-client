import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const { _id, title, img, description, price } = service;

  return (
    <div className="card w-96 bg-stone-900 text-white shadow-xl mt-4">
      <figure>
        <img src={img} alt="Shoes" />
      </figure>
      <div className="card-body ">
        <h2 className="card-title text-white">{title}</h2>
        <p className="text-white">{description.slice(0, 100)}...</p>
        
        <p className="text-white">Price: {price}</p>

        <Link
          to={`/service/${_id}`}
          className="mt-6 block btn btn-primary  px-12 py-3 text-sm font-bold uppercase tracking-wider text-white transition focus:outline-none"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
