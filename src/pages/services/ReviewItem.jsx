import { timeConvert } from "../myReview/MyReviewItem";

const ReviewItem = ({ review }) => {
  const {
    user_name,
    user_photo,
    user_email,
    user_rating,
    user_review,
    createAt,
  } = review;
  const date = new Date(createAt).toString().split(" ");

  const year = date[3];
  const month = date[1];
  const day = date[2];
  const time = timeConvert(date[4]);

  return (
    <blockquote className="border border-gray-100 shadow-sm p-5 rounded-md">
      <header className="sm:flex sm:items-center">
        <div className="group flex shrink-0 items-center rounded-lg transition">
          <img
            alt="Man"
            src={user_photo}
            className="h-10 w-10 rounded-full object-cover"
          />

          <p className="ml-2 text-left text-xs">
            <strong className="block font-medium">{user_name}</strong>
            <span className="text-gray-500"> {user_email} </span>
          </p>
        </div>
      </header>

      <div>
        <p className="mt-2 text-gray-700">{user_review}</p>

        <footer className="mt-4">
          <div className="-ml-1 flex">
            {[...Array(5).keys()].map((rate) => (
              <svg
                key={rate}
                className={
                  user_rating <= rate
                    ? "text-gray-300 h-5 w-5"
                    : "text-yellow-400 h-5 w-5"
                }
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <div className="mt-2">
            <p className="uppercase text-[10px] opacity-70">
              Submitted Time: {time} <br />
              Submitted Data: {day}/{month}/{year}
            </p>
          </div>
        </footer>
      </div>
    </blockquote>
  );
};

export default ReviewItem;
