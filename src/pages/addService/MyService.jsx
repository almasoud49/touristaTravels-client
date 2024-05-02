import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const MyService = ({ service }) => {
  const { _id, title, img, description } = service;
  const { user } = useAuth();
  return (
    <article className="rounded-xl border-2 border-gray-100 bg-white">
      <div className="flex items-start p-6">
        <div className="h-20 w-32">
          <img
            alt={title}
            src={img}
            className="h-full w-full rounded-lg object-cover"
          />
        </div>

        <div className="ml-4">
          <h3 className="font-medium sm:text-lg">
            <Link to={`/service/${_id}`} className="hover:underline">
              {title}
            </Link>
          </h3>

          <p className="text-sm text-gray-700 line-clamp-2">
            {description.length >= 100
              ? description.slice(0, 100) + "..."
              : description}
          </p>

          <div className="mt-2 sm:flex sm:items-center sm:gap-2">
            <p className="hidden sm:block sm:text-xs sm:text-gray-500">
              Added by {user?.displayName}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MyService;
