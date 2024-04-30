import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Registration = () => {
  const { createUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password, name, photoURL } = data;
    handleCreateUser(email, password, name, photoURL);
  };

  const handleCreateUser = (email, password, name, photoURL) => {
    createUser(email, password)
      .then((res) => {
        const user = res.user;
        console.log(user);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col ">
        <div className="text-center ">
          <h1 className="text-5xl font-bold">Signup Now!</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                {...register("name", {
                  required: true,
                })}
              />
            </div>
            <label className="label">
              {errors.name && (
                <span className="label-text-alt">This field is required</span>
              )}
            </label>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", {
                  required: true,
                })}
              />
            </div>
            <label className="label">
              {errors.email && (
                <span className="label-text-alt">This field is required</span>
              )}
            </label>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="photoURL"
                className="input input-bordered"
                {...register("photoURL", {
                  required: true,
                })}
              />
            </div>
            <label className="label">
              {errors.photoURL && (
                <span className="label-text-alt">This field is required</span>
              )}
            </label>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                {...register("password", {
                  required: true,
                })}
              />
            </div>
            <label className="label">
              {errors.password && (
                <span className="label-text-alt">This field is required</span>
              )}
            </label>

            <div className=" sm:flex sm:items-center sm:gap-4">
              <button className="btn btn-primary rounded-md px-12 mb-0">
                Create an account
              </button>
            </div>
          </form>
          <p className="text-sm text-gray-500 text-center my-5">
            Already have an account?{" "}
            <Link to="/login" className="text-gray-700 underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
