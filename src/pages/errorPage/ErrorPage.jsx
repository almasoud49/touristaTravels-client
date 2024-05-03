import { Link, useRouteError } from "react-router-dom";
import img from "../../../src/assets/error.jpg";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="grid min-h-screen place-content-center bg-white">
      <div className="text-center">
        <img src={img} alt="touristaTravel" />

        <p className="mt-4 text-gray-500">
          Sorry, an unexpected error has occurred.
        </p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <Link to="/" className="btn btn-primary">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
