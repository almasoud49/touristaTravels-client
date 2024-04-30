
import { GoogleAuthProvider } from "firebase/auth";
import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProviderLogin = () => {
  const { providerLogin } = useAuth();

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    providerLogin(provider)
      .then((res) => {
        const user = res.user;
        console.log(user);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleGoogleLogin}
        className="btn btn-ghost flex justify-center items-center gap-3 border border-gray-300 shadow"
      >
        <FontAwesomeIcon
          className="text-xl font-bold text-blue"
          // icon={faGoogle}
        />
        <span>Continue With Google</span>
      </button>
    </div>
  );
};

export default ProviderLogin;
