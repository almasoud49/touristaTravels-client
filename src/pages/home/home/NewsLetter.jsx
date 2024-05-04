import Swal from "sweetalert2";

const NewsLetter = () => {
  const handleSubscribe = (event) => {
    event.preventDefault();
    Swal.fire({
      title: "Thank You!",
      text: "Successfully subscribed TouristaTravels newsletter. !",
      icon: "success",
      showCancelButton: false,
      cancelButtonColor: "#d33",
    });
    event.target.reset();
  };

  return (
    <div className="p-8 md:p-12 lg:px-16 lg:py-24 ">
      <div className="mx-auto mt-8 max-w-xl">
        <form onSubmit={handleSubscribe} className="sm:flex sm:gap-4">
          <div className="sm:flex-1">
            <label className="sr-only">Email</label>

            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-md border-gray-200 bg-slate-700 p-3 text-white-700 shadow-sm transition focus:border-white focus:outline-none"
              required
            />
          </div>

          <button className="group mt-4 flex w-full items-center justify-center rounded-md px-5 py-3  focus:outline-none sm:mt-0 sm:w-auto btn btn-primary">
            <span className="text-sm font-medium"> Subscribe </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
