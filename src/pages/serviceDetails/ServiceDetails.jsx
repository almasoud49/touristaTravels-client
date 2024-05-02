import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { axiosSecure } from "../../hooks/useAxios";
import ReviewSection from "../services/ReviewSection2";

const ServiceDetails = () => {
  const params = useParams();
  const [service, setService] = useState({});
  const { title, img, description, price } = service;
  // console.log(service)

  useEffect(() => {
    const url = `/service/${params.id}`;
    axiosSecure.get(url).then((res) => setService(res.data));
  }, [params.id]);
  return (
    <>
      <div className="card card-side mx-auto bg-base-100 shadow-xl w-4/5 ">
        <div>
          <PhotoProvider>
            <div>
              <PhotoView src={img}>
                <img
                  className="aspect-square w-full rounded-xl "
                  src={img}
                  alt=""
                />
              </PhotoView>
            </div>
          </PhotoProvider>
        </div>

        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <p>Price: {price}</p>
          <div className="card-actions justify-end">
            <Link to="/services" className="btn btn-primary">
              Go Back
            </Link>
          </div>
        </div>
      </div>
      <ReviewSection service={service}></ReviewSection>
    </>
  );
};

export default ServiceDetails;
