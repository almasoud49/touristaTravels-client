import { GoogleAuthProvider } from "firebase/auth";
import useAuth from "../../hooks/useAuth";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProviderLogin = () => {
  const { providerLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    providerLogin(provider)
      .then((res) => {
        const user = res.user;
        toast.success("Login Success");
        handleJwtToken(user);
        saveUserDataInDB(user.displayName, user.email, user.photoURL, user.uid);
        navigate(from, { replace: true });
      })
      .catch((err) => toast.error(err.message));
  };

  const handleJwtToken = async (user) => {
    const currentUser = { uid: user?.uid };
    const response = await fetch("http://localhost:5000/jwt", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(currentUser),
    });
    const data = await response.json();
    document.cookie = "touristaTravels-token=" + data.token;
  };

  const saveUserDataInDB = (name, email, photoURL, uid) => {
    const user = { displayName: name, email, photoURL, uid };
    fetch("http://localhost:5000/jwt/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {});
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleGoogleLogin}
        className="btn btn-ghost flex justify-center items-center gap-3 border border-gray-300 shadow"
      >
        <span className="flex ">
          <FaGoogle className="me-2" /> Continue With Google
        </span>
      </button>
    </div>
  );
};

export default ProviderLogin;
