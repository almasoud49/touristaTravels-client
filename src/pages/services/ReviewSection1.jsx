import { Link, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosSecure } from "../../hooks/useAxios";
import ReviewItem from "./ReviewItem";
import Pagination from "../shared/Pagination/Pagination";

const ReviewSection = () => {
  const params = useParams();
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(4);
  const [average, setAverage] = useState(0);

  //Pagination Data
  const [count, setCount] = useState(0);
  const [size, setSize] = useState(6);
  const [page, setPage] = useState(0);
  const pages = Math.ceil(count / size);

  const paginationInfo = {
    size,
    setSize,
    page,
    setPage,
    pages,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const { user_review } = data;
    const modal = document.getElementById("my-modal");

    const review = {
      user_name: user.displayName,
      user_email: user.email,
      user_uid: user.uid,
      user_photo: user.photoURL,
      user_review: user_review,
      user_rating: rating + 1,
      service_name: service?.title,
      service_id: service?._id,
      service_photo: service?.img,
      createAt: new Date(),
    };

    axiosSecure.post(`/review?uid=${user?.uid}`, review).then((res) => {
      console.log(res.data);
      if ((res, data.acknowledged)) {
        alert("Review Inserted Successfully");
        modal.checked = false;
        reset();
      }
    });
  };

  useEffect(() => {
    axiosSecure
      .get(`/reviews?service_id=${params.id}&page=${page}&size=${size}`)
      .then((res) => {
        console.log(res.data);
        setReviews(res.data.reviews);
        setCount(res.data.count);
        setAverage(res.data.average);
      });
  }, [page, params.id, size]);

  return (
    <section>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <form onSubmit={handleSubmit(onSubmit)} className="modal-box">
          {user?.uid ? (
            <div>
              <h3 className="font-bold text-lg">Add a review</h3>

              <div className="form-control">
                <div>
                  <p className="text-sm font-semibold">
                    Rating Star: {rating + 1}
                  </p>
                  <div className="-ml-1 flex my-2">
                    {[...Array(5).keys()].map((rate) => (
                      <svg
                        key={rate}
                        className={
                          rate <= rating
                            ? "text-yellow-400 h-6 w-6"
                            : "text-gray-300 h-6 w-6"
                        }
                        onClick={() => setRating(rate)}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <div className="form-control space-y-3">
                <input
                  className="input input-bordered"
                  disabled
                  type="text"
                  defaultValue={user?.displayName}
                />
                <input
                  className="input input-bordered"
                  disabled
                  type="email"
                  defaultValue={user?.email}
                />
                <textarea
                  placeholder="Describe you feedback minimums 50 characters"
                  className="textarea textarea-bordered"
                  {...register("user_review", {
                    required: true,
                    minLength: 50,
                  })}
                />
              </div>
              <label className="label">
                {errors.user_review && (
                  <span className="label-text-alt">This field is required</span>
                )}
              </label>

              <div className="modal-action">
                <label htmlFor="my-modal" className="btn">
                  Close
                </label>
                <button className="btn btn-primary">Submit</button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-col gap-5 justify-center items-center">
                <h3 className="text-2xl">Please login to add a review</h3>
                <Link className="btn btn-primary" to="/login">
                  Login Now
                </Link>
              </div>
              <div>
                <div className="modal-action">
                  <label htmlFor="my-modal" className="btn">
                    Close
                  </label>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>

      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold sm:text-2xl">Customer Reviews</h2>

        <div className="flex justify-between items-center">
          <div className="mt-4 flex items-center">
            <p className="text-3xl font-medium">
              {average.toFixed(1)}
              <span className="sr-only"> Average review score </span>
            </p>

            <div className="ml-4">
              <div className="-ml-1 flex">
                {[...Array(5).keys()].map((rate) => (
                  <svg
                    key={rate}
                    className={
                      Math.ceil(average) <= rate
                        ? "text-gray-300 h-5 w-5"
                        : "text-yellow-400 h-5 w-5"
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="mt-0.5 text-xs text-gray-500">
                Based on {count} reviews
              </p>
            </div>
          </div>
          <div>
            <label htmlFor="my-modal" className="btn btn-primary">
              Write A Review
            </label>
          </div>
        </div>

        <div className="divider"></div>
        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-2 h-full">
          {reviews.map((review) => (
            <ReviewItem key={review._id} review={review} />
          ))}
        </div>
        <div>
          {!count && (
            <div>
              <h3 className="uppercase text-xl font-light">
                No one give review on this service!
              </h3>
            </div>
          )}
          <Pagination paginationInfo={paginationInfo} />
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
