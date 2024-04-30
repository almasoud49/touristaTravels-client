import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const { _id, title, img, description, price } = service;

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={img} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <p>Price: {price}</p>

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
