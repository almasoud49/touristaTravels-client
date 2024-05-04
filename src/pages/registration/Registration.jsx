import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Registration = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile, logOut } = useAuth();
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
        handleUpdateUserProfile(name, photoURL);
        toast.success("Registration Completed Successfully");
        saveUserDataInDB(name, email, photoURL, user.uid);
      })
      .catch((err) => console.log(err.message));
  };
  const handleUpdateUserProfile = (name, photoURL) => {
    const profileData = {
      displayName: name,
      photoURL,
    };
    updateUserProfile(profileData)
      .then(() => {
        logOut().then(() => {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Now You Can Login",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/login");
        });
      })
      .catch((err) => console.log(err.message));
  };

  const saveUserDataInDB = (name, email, photoURL, uid) => {
    const user = { displayName: name, email, photoURL, uid };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {});
  };

  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up Now!</h1>
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
              <label className="label">
                {errors.email && (
                  <span className="label-text-alt">This field is required</span>
                )}
              </label>
            </div>
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
              <label className="label">
                {errors.password && (
                  <span className="label-text-alt">This field is required</span>
                )}
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary mb-0">Login</button>
            </div>
          </form>
          <p className="text-center mt-0 mb-4">
            Already have an account?{" "}
            <Link to="/login" className="text-gray-500 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
