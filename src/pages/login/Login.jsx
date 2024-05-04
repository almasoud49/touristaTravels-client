import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import ProviderLogin from "../providerLogin/ProviderLogin";
import toast from "react-hot-toast";

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
        toast.success(" User Login Successfully");
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
        document.cookie = "touristaTravels-token=" + token.token;
      });
  };

  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <p className="text-center">
            Do not have an account?{" "}
            <Link to="/registration" className="text-gray-500 underline">
              Signup
            </Link>
          </p>
          <div className="my-3">
            <div className="divider text-xl">OR</div>
            <ProviderLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
