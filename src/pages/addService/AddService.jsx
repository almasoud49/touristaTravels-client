import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import MyService from "./MyService";
import auth from "../../firebase/firebase.config";

const AddService = () => {
  const [services, setServices] = useState([]);
  const [count, setCount] = useState(0);
  const [reloadData, setReloadData] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (service) => {
    const { title, img, description, price } = service;
    const postService = {
      title,
      img,
      description,
      price,
      createBy: auth.currentUser?.uid,
      createAt: new Date(),
    };

    fetch(`http://localhost:5000/services?uid=${auth?.currentUser?.uid}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${document.cookie.split("=")[1]}`,
      },
      body: JSON.stringify(postService),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({
            title: "Service Added!",
            text: "Your Service Added Successfully. !",
            icon: "success",
            showCancelButton: false,
            cancelButtonColor: "#d33",
          });
          reset();
          setReloadData(reloadData + 1);
        }
      });
  };

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/my-service?uid=${user?.uid}`, {
      headers: {
        authorization: `Bearer ${document.cookie.split("=")[1]}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services);
        setCount(data.count);
        setLoading(false);
      });
  }, [user?.uid, reloadData]);

  return (
    <section>
      {!loading && (
        <div className="mx-auto w-11/12">
          <h1 className="text-3xl  font-light">
            You Added: {count} Service - Create New
          </h1>
          <p className="text-sm ">
            You can simply post your services on my site.
          </p>
          <div className="divider"></div>
          <div className="flex flex-col-reverse lg:grid gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-2 lg:py-12 grid gap-5">
              {count ? (
                <div>
                  {services?.map((service) => (
                    <MyService key={service._id} service={service} />
                  ))}
                </div>
              ) : (
                <div>
                  <h3>You did not added any service!</h3>
                </div>
              )}
            </div>

            <div className=" lg:col-span-3 lg:p-12">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 rounded-lg bg-white p-8 shadow-lg"
              >
                <div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Service Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Service Name"
                      className="input input-bordered"
                      {...register("title", {
                        required: true,
                        minLength: 15,
                      })}
                    />
                  </div>
                  <label className="label">
                    {errors.title && (
                      <span className="label-text-alt">
                        This field is required
                      </span>
                    )}
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Service Photo</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Service Photo"
                        className="input input-bordered"
                        {...register("img", {
                          required: true,
                        })}
                      />
                    </div>
                    <label className="label">
                      {errors.img && (
                        <span className="label-text-alt">
                          This field is required
                        </span>
                      )}
                    </label>
                  </div>

                  <div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Service Price</span>
                      </label>
                      <input
                        type="number"
                        placeholder="Service Price"
                        className="input input-bordered"
                        {...register("price", {
                          required: true,
                        })}
                      />
                    </div>
                    <label className="label">
                      {errors.price && (
                        <span className="label-text-alt">
                          This field is required
                        </span>
                      )}
                    </label>
                  </div>
                </div>

                <div>
                  <div className="form-control space-y-3">
                    <textarea
                      placeholder="Describe service details minimums 100 character"
                      className="textarea textarea-bordered"
                      rows="8"
                      {...register("description", {
                        required: true,
                        minLength: 100,
                      })}
                    />
                  </div>
                  <label className="label">
                    {errors.description && (
                      <span className="label-text-alt">
                        This field is required
                      </span>
                    )}
                  </label>
                </div>

                <div className="mt-4">
                  <button className="inline-flex w-full items-center justify-center rounded-lg bg-black px-5 py-3 text-white sm:w-auto">
                    <span className="font-medium"> Submit </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AddService;
