import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import MyReviewItem from "./MyReviewItem";
import toast from "react-hot-toast";

const MyReview = () => {
  const [selectUpdate, setSelectUpdate] = useState({});
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const { user, logOut } = useAuth();
  const [reloadData, setReloadData] = useState(0);
  const navigate = useNavigate();
  const [rating, setRating] = useState(4);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/my-review?uid=${user?.uid}`, {
      headers: {
        authorization: `Bearer ${document.cookie.split("=")[1]}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          return logOut().then(() => {
            toast.error("Session Expired at get review, Login Again");
          });
        }
        return res.json();
      })
      .then((data) => {
        setReviews(data?.reviews);
        setCount(data?.count);
        setLoading(false);
      });
  }, [logOut, user?.uid, reloadData, setLoading]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "It will permanently deleted !",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setBtnLoading(true);
        fetch(`http://localhost:5000/my-review?id=${id}&uid=${user?.uid}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
        })
          .then((res) => {
            if (res.status === 401 || res.status === 403) {
              return logOut().then(() => {
                toast.error("Session Expired at delete review, Login Again");
                navigate("/login");
              });
            }
            return res.json();
          })
          .then((data) => {
            if (data.deletedCount > 0) {
              setReloadData(reloadData + 1);
              Swal.fire({
                title: "Deleted!?",
                text: "Your Review has been deleted. !",
                icon: "success",
                showCancelButton: false,
                cancelButtonColor: "#d33",
              });
              setBtnLoading(false);
            }
          });
      }
    });
  };

  const onSubmit = async (inputData) => {
    const { user_review } = inputData;
    const modal = document.getElementById("my-modal");
    const review = {
      user_review: user_review,
      user_rating: rating + 1,
    };
    setBtnLoading(true);
    const response = await fetch(
      `http://localhost:5000/my-review?id=${selectUpdate._id}&uid=${user?.uid}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
        body: JSON.stringify(review),
      }
    );

    const data = await response.json();
    if (data.modifiedCount > 0) {
      setBtnLoading(false);
      setReloadData(reloadData + 1);
      reset();
      Swal.fire({
        title: "Updated!",
        text: "Your Review has been Updated. !",
        icon: "success",
        showCancelButton: false,
        cancelButtonColor: "#d33",
      });
      modal.checked = false;
    }
    if (response.status === 401 || response.status === 403) {
      return logOut().then(() => {
        toast.error("Session Expired at update review, Login Again");
        localStorage.removeItem("touristaTravels-token");
        navigate("/login");
      });
    }
  };
  const handleUpdate = (preReview) => {
    setSelectUpdate(preReview);
    const modal = document.getElementById("my-modal");
    modal.checked = true;
    setRating(preReview.user_rating - 1);
  };

  return (
    <div className="min-h-screen my-10 ">
      {!loading && (
        <>
          <input type="checkbox" id="my-modal" className="modal-toggle" />
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
                    <span className="label-text-alt">
                      This field is required
                    </span>
                  )}
                </label>

                <div className="modal-action">
                  {!btnLoading && (
                    <>
                      <label htmlFor="my-modal" className="btn">
                        Close
                      </label>
                      <button className="btn btn-primary">Submit</button>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="w-11/12 mx-auto">
            <h2 className="text-3xl  font-light">
              You Reviewed {count} Service
            </h2>
            <p className="text-sm ">
              Checkout All your Review those you Give our Services
            </p>
            <div className="divider"></div>
            <div>
              {count && user?.uid ? (
                <div className="grid gap-10 ">
                  {reviews?.map((review) => (
                    <MyReviewItem
                      handleDelete={handleDelete}
                      handleUpdate={handleUpdate}
                      review={review}
                      btnLoading={btnLoading}
                      key={review._id}
                    />
                  ))}
                </div>
              ) : (
                <h2>You have not write a review yet!</h2>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyReview;
