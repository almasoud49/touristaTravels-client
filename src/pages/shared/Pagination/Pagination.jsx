
const Pagination = ({ paginationInfo }) => {
    const { size, setSize, page, setPage, pages } = paginationInfo;

    return (
        <div>
            {!!pages && (
				<div>
					<div className='divider'></div>
					<p className='text-center'>
						page: {page + 1}/{pages} - view: {size}
					</p>
					<ol className='flex justify-center gap-1 text-xs font-medium items-center'>
						{[...Array(pages).keys()].map((num) => (
							<li key={num}>
								<button
									onClick={() => setPage(num)}
									className={`block h-8 w-8 rounded border border-gray-100 text-center leading-8 ${
										num === page && 'bg-primary text-white'
									}`}
								>
									{num + 1}
								</button>
							</li>
						))}
						<li>
							<select
								onChange={(event) =>
									setSize(event.target.value)
								}
								defaultValue={size}
								className='select select-borderer select-primary'
							>
								<option>3</option>
								<option>6</option>
								<option>9</option>
							</select>
						</li>
					</ol>
				</div>
			)}
        </div>
    );
};

export default Pagination;