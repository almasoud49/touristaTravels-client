import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import ProviderLogin from "../providerLogin/ProviderLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    handleLoginUser(email, password);
  };
  const handleLoginUser = (email, password) => {
    signIn(email, password)
      .then((res) => {
        const user = res.user;
        alert("Login Success");
        handleJwtToken(user);
        navigate(from, { replace: true });
      })
      .catch((err) => console.log(err.message));
  };
  const handleJwtToken = (user) => {
    const currentUser = { uid: user?.uid };
    fetch("http://localhost:5000/jwt", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(currentUser),
    })
      .then((res) => res.json())
      .then((token) => {
        document.cookie = "tt-token=" + token.token;
      });
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
                  Login
                </button>
              </div>
            </form>
            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Do not have an account?{" "}
              <Link to="/registration" className="text-gray-700 underline">
                Create an account
              </Link>
              .
            </p>
            <div className="my-3">
              <div className="divider text-xl">OR</div>
              <ProviderLogin />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Login;
