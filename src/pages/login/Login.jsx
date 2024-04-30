import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import ProviderLogin from "../../pages/providerLogin/ProviderLogin";

const Login = () => {
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
        console.log(user);
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div className="hero min-h-screen  bg-base-200">
      <div className="hero-content flex-col ">
        <div className="text-center ">
          <h1 className="text-5xl font-bold">Login Now!</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body ">
            <form onSubmit={handleSubmit(onSubmit)}>
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
              <label className="label ">
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
                <button className="btn btn-primary rounded-md px-12 ">
                  Login
                </button>
              </div>
            </form>
          </div>
          <p className="text-sm text-gray-500 text-center mt-0 mb-5">
            Do not have an account?{" "}
            <Link to="/registration" className="text-gray-700 underline">
              Signup
            </Link>
          </p>
          <div className="my-3">
            <div className="divider text-xl">OR</div>
            <ProviderLogin/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
