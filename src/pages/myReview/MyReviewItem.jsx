import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

export const timeConvert = (time) => {
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    time = time.slice(1);
    time[5] = +time[0] < 12 ? "AM" : "PM";
    time[0] = +time[0] % 12 || 12;
  }
  return time.join("");
};

const MyReviewItem = ({ review, handleDelete, handleUpdate, btnLoading }) => {
  const {
    _id,
    createAt,
    user_review,
    service_name,
    service_photo,
    user_rating,
    service_id,
  } = review;
  const date = new Date(createAt).toString().split(" ");

  const year = date[3];
  const month = date[1];
  const day = date[2];
  const time = timeConvert(date[4]);
  return (
<article className='flex bg-white transition hover:shadow-lg shadow border border-gray-100'>
			<div className='rotate-180 p-2 [writing-mode:_vertical-lr]'>
				<div className='flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900'>
					<span>{year}</span>
					<span className='w-px flex-1 bg-gray-900/10'></span>
					<span>
						{month} {day}
					</span>
				</div>
			</div>

			<div className='hidden sm:block sm:basis-56'>
				<img
					alt='Guitar'
					src={service_photo}
					className='aspect-square h-full w-full object-cover'
				/>
			</div>

			<div className='flex flex-1 flex-col justify-between'>
				<div className='border-l border-gray-900/10 p-4 sm:border-l-transparent sm:p-6'>
					<span>
						<p className='uppercase text-xs opacity-70'>
							Submit At: {time}
						</p>
						<div className='-ml-1 flex my-2'>
							{[...Array(5).keys()].map((rate) => (
								<svg
									key={rate}
									className={
										rate < user_rating
											? 'text-yellow-400 h-6 w-6'
											: 'text-gray-300 h-6 w-6'
									}
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
									fill='currentColor'
								>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
							))}
						</div>
						<h3 className='font-bold uppercase text-gray-900 link link-hover'>
							<Link to={`/service/${service_id}`}>{service_name}</Link>
						</h3>
					</span>

					<p className='mt-2 text-sm leading-relaxed text-gray-700 line-clamp-3'>
						{user_review}
					</p>
				</div>

				<div className='flex sm:items-end sm:justify-end'>
					<button
						onClick={() => handleUpdate(review)}
						className='block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400'
					>
						Update
					</button>
					<button
						onClick={() => handleDelete(_id)}
						className='block btn-primary px-5 py-3 text-center text-xs font-bold uppercase'
					>
						{!btnLoading ? (
							'Delete'
						) : (
							<ThreeDots
								height='16'
								width='40'
								radius='5'
								color='#fff'
								ariaLabel='three-dots-loading'
								wrapperStyle={{}}
								wrapperClassName=''
								visible={true}
							/>
						)}
					</button>
				</div>
			</div>
		</article>
  );
};

export default MyReviewItem;
