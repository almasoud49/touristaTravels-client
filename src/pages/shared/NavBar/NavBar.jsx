import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import img from "../../../assets/img.png"

const NavBar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("User Logout Successfully");
      })
      .catch((err) => toast.err(err.message));
  };
  const navItems = (
    <>
      <li>
        <Link to="/">Home</Link>{" "}
      </li>
      <li>
        {" "}
        <Link to="/services">Services</Link>{" "}
      </li>
      <li>
        {" "}
        <Link to="/blogs">Blogs</Link>{" "}
      </li>

      {user?.uid && (
        <>
          <li>
            <Link to="/my-review">My Review</Link>
          </li>
          <li>
            <Link to="/add-service">Add Service</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 text-white font-bold mb-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        <Link
					to='/'
					className='normal-case text-xl font-bold flex justify-center items-center'
				>
					<img  className='w-6 rounded-full me-1' src={img} alt='' />
					<span>touristaTravels</span>
          
				</Link>
        
       
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end ">
        <Link to="/login" className="btn ">
          Login
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
