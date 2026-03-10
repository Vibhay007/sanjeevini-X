import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData, loading } = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    setShowDropdown(false);
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = () => setShowDropdown(false);
    window.addEventListener("click", closeDropdown);
    return () => window.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-dark-border bg-dark-surface/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* ================= LOGO ================= */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img
            src={assets.logo}
            alt="Sanjeevini X"
            className="w-10 h-10 rounded-full bg-white p-1 shadow-md
                       transition-transform duration-500 group-hover:rotate-[360deg]"
          />
          <span className="text-white font-bold text-lg tracking-tight flex items-center gap-1">
            Sanjeevini
            <span className="text-sky-400 font-extrabold">X</span>
          </span>
        </div>

        {/* ================= DESKTOP LINKS ================= */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-sm">
          {[
            { path: "/", label: "HOME" },
            { path: "/doctors", label: "ALL DOCTORS" },
            { path: "/about", label: "ABOUT" },
            { path: "/contact", label: "CONTACT" },
          ].map(({ path, label }) => (
            <NavLink key={path} to={path} className="relative group">
              {({ isActive }) => (
                <>
                  <li className="py-1 text-dark-muted group-hover:text-white transition">
                    {label}
                  </li>
                  {isActive && (
                    <span className="absolute left-1/2 -bottom-2 w-5 h-0.5 bg-primary rounded -translate-x-1/2" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </ul>

        {/* ================= AUTH ================= */}
        <div className="flex items-center gap-4">

          {/* ===== Logged In ===== */}
          {token && userData ? (
            <div
              className="relative flex items-center gap-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown((prev) => !prev);
              }}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-dark-card border border-dark-border">
                <img
                  src={userData.image}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <img
                src={assets.dropdown_icon}
                className={`w-2.5 opacity-70 transition-transform ${
                  showDropdown ? "rotate-180" : ""
                }`}
                alt=""
              />

              {/* ===== CLICK DROPDOWN ===== */}
              {showDropdown && (
                <div className="absolute top-full right-0 mt-4 z-20">
                  <div className="min-w-48 bg-dark-card border border-dark-border rounded-xl shadow-xl p-4 text-sm flex flex-col gap-3 text-dark-muted">
                    <p
                      onClick={() => {
                        navigate("/my-profile");
                        setShowDropdown(false);
                      }}
                      className="hover:text-primary cursor-pointer"
                    >
                      My Profile
                    </p>

                    <p
                      onClick={() => {
                        navigate("/my-appointments");
                        setShowDropdown(false);
                      }}
                      className="hover:text-primary cursor-pointer"
                    >
                      My Appointments
                    </p>

                    <p
                      onClick={() => {
                        navigate("/my-reports");
                        setShowDropdown(false);
                      }}
                      className="hover:text-primary cursor-pointer"
                    >
                      My Reports
                    </p>

                    <hr className="border-dark-border" />

                    <p
                      onClick={logout}
                      className="hover:text-red-400 cursor-pointer"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : token && loading ? (
            <div className="w-8 h-8 rounded-full bg-dark-border animate-pulse" />
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden md:block bg-primary text-white px-8 py-3 rounded-full font-medium
                         hover:brightness-110 transition shadow-lg"
            >
              Create account
            </button>
          )}

          {/* ================= MOBILE MENU ICON ================= */}
          <img
            onClick={() => setShowMenu(true)}
            className="w-6 md:hidden cursor-pointer"
            src={assets.menu_icon}
            alt=""
          />
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`${
          showMenu ? "fixed inset-0" : "h-0 w-0"
        } md:hidden z-50 overflow-hidden bg-dark-surface transition-all`}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-dark-border">
          <div className="flex items-center gap-2">
            <img className="w-9" src={assets.logo} alt="" />
            <span className="text-white font-semibold">Sanjeevini</span>
          </div>
          <img
            className="w-7 cursor-pointer"
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>

        <ul className="flex flex-col items-center gap-4 mt-8 text-lg font-medium text-white">
          {[
            { path: "/", label: "HOME" },
            { path: "/doctors", label: "ALL DOCTORS" },
            { path: "/about", label: "ABOUT" },
            { path: "/contact", label: "CONTACT" },
          ].map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setShowMenu(false)}
              className="w-full text-center"
            >
              <p className="px-4 py-2 rounded hover:bg-dark-card">{label}</p>
            </NavLink>
          ))}

          <div className="w-3/4 h-px bg-dark-border my-2" />

          {token ? (
            <>
              <NavLink
                to="/my-profile"
                onClick={() => setShowMenu(false)}
              >
                MY PROFILE
              </NavLink>
              <p
                onClick={() => {
                  logout();
                  setShowMenu(false);
                }}
                className="text-red-500 cursor-pointer"
              >
                LOGOUT
              </p>
            </>
          ) : (
            <NavLink to="/login" onClick={() => setShowMenu(false)}>
              LOGIN
            </NavLink>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
