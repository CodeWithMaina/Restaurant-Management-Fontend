import { MenuIcon, ShoppingCartIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCreadentials } from "../features/auth/authSlice";
import { useNavigate } from "react-router";

interface NavItem {
  name: string;
  href: string;
}

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Menu", href: "/menu" },
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
  ];

  const handleLogOut = async()=>{
    dispatch(clearCreadentials());
    navigate('/login');
  }

  // Simulate cart count update
  useEffect(() => {
    const interval = setInterval(() => {
      setCartCount(Math.floor(Math.random() * 10));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost" onClick={toggleMenu}>
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </label>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="text-base-content hover:text-primary"
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl font-bold text-primary">
          <span className="hidden sm:inline">Your</span> Logo
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className="text-base-content hover:text-primary font-medium"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleLogOut}>LogOut</button>

      <div className="navbar-end">
        <div className="relative">
          <Link to="/cart" className="btn btn-ghost">
            <ShoppingCartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 badge badge-primary badge-sm">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};