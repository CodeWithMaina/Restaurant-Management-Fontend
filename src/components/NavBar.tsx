import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import type { RootState } from "../app/store";
import { clearCreadentials } from "../features/auth/authSlice";
const NavBar = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(user);

  const handleLogOut = async () => {
    try {
      await dispatch(clearCreadentials());
      navigate("/login");
    } catch (error) {
      console.log("Log Out Failed", error);
    }
  };
  return (
    <div className="navbar bg-black shadow-sm">
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
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <ul className="menu menu-vertical px-1">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/menu">Menu</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      {!isAuthenticated ? (
        <div className="navbar-end gap-2">
          <Link className="btn" to="/login">
            Login
          </Link>
          <Link className="btn" to="/contact">
            SignIn
          </Link>
        </div>
      ) : (
        <div className="dropdown navbar-end dropdown-start">
          <div tabIndex={0} role="button" className="btn m-1">
            {user.data.email}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 shadow-sm"
          >
            <li>
              <Link className="btn" to="/dashboard/dash">
                DashBoard
              </Link>
            </li>
            <li>
              <button className="btn" onClick={handleLogOut}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
