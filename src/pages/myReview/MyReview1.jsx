import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosSecure } from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import MyReviewItem from "./MyReviewItem";

const MyReview = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const [selectUpdate, setSelectUpdate] = useState({});
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(4);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(`/my-review?uid=${user?.uid}`);
        console.log(response.data);
        setReviews(response.data.reviews);
        setCount(response.data.count);
        setLoading(false);

        if (response.data.status === 401 || response.data.status === 403) {
          await logOut();
          console.log("Session Expired, Login Again");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.uid, logOut, navigate]);

  const handleDelete = async (id) => {
    try {
      alert("Are you sure to delete the item?");
      const response = await axiosSecure.delete(
        `/my-review?id=${id}&uid=${user?.uid}`
      );

      if (response.status === 401 || response.status === 403) {
        await logOut();
        alert("Session Expired, Login Again");
        navigate("/login");
      }

      if (response.data.deletedCount > 0) {
        alert("Data deleted Successfully");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const onSubmit = async (inputData) => {
    try {
      const { user_review } = inputData;
      const review = {
        user_review: user_review,
        user_rating: rating + 1,
      };

      const response = await axiosSecure.patch(
        `/my-review?id=${selectUpdate._id}&uid=${user?.uid}`,
        review
      );

      if (response.status === 401 || response.status === 403) {
        await logOut();
        console.log("Session Expired, Login Again");
        localStorage.removeItem("touristaTravel-token");
        navigate("/login");
        return;
      }

      const data = response.data;
      if (data.modifiedCount > 0) {
        reset();
        const modal = document.getElementById("my-modal");
        modal.checked = false;
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleUpdate = (preReview) => {
    setSelectUpdate(preReview);
    const modal = document.getElementById("my-modal");
    modal.checked = true;
    setRating(preReview.user_rating - 1);
  };

  return (
    <section>
      <div className="modal">
        <form onSubmit={handleSubmit(onSubmit)} className="modal-box">
          <div>
            <h3 className="font-bold text-lg">Update review</h3>

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
              <textarea
                placeholder="Describe you feedback"
                className="textarea textarea-bordered"
                {...register("user_review", {
                  required: true,
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
        </form>
      </div>
      <div className="w-11/12 mx-auto">
        <h2 className="text-3xl uppercase font-light">
          You reviewed {count} service
        </h2>
        <p className="text-sm uppercase">
          Checkout all your review those you give our services
        </p>
        <div className="divider"></div>
        <div>
          {count && user?.uid ? (
            <div className="grid gap-10">
              {reviews.map((review) => (
                <MyReviewItem
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                  review={review}
                  key={review._id}
                />
              ))}
            </div>
          ) : (
            <h2>You have not write a review yet!</h2>
          )}
        </div>
      </div>
      )
    </section>
  );
};

export default MyReview;
