
import { GoogleAuthProvider } from "firebase/auth";
import useAuth from "../../hooks/useAuth";
import { FaGoogle} from 'react-icons/fa';

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
      
        <span className="flex "><FaGoogle className="me-2" />  Continue With Google</span>
      </button>
    </div>
  );
};

export default ProviderLogin;
