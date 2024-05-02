import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

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
        alert("Registration Success");
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
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <main
          aria-label="Main"
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
        >
          <div className="max-w-xl lg:max-w-3xl">
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
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
                <button className="btn btn-primary rounded-md px-12 py-3">
                  Create an account
                </button>
              </div>
            </form>
            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Already have an account?{" "}
              <Link to="/login" className="text-gray-700 underline">
                Log in
              </Link>
            </p>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Registration;
