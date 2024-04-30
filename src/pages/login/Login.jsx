

const Login = () => {

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
		loginUser(email, password)
			.then((res) => {
				const user = res.user;
				toast.success('Login Success');
				handleJwtToken(user);
				navigate(from, { replace: true });
			})     
			.catch((err) => toast.error(err.message));
	};
    return (
        <div>
          <h2>this is login part</h2>  
        </div>
    );
};

export default Login;