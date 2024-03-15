import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const NavItem = ({ icon, href, title, active, isButton = false, onClick }) => {
  if (isButton) {
    return (
      <button className="nav-item" onClick={onClick}>
        <span className="material-symbols-outlined">{icon}</span>
        <span className="link">{title}</span>
      </button>
    );
  }

  return (
    <li className={`nav-item ${active === href ? "active" : null}`}>
      <span className="material-symbols-outlined">{icon}</span>
      <Link className="link" to={href}>
        {title}
      </Link>
    </li>
  );
};

export function Sidebar() {
  const { pathname } = useLocation();
  const { isLoggedIn, user, logoutUser } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  const logout = async () => {
    try {
      const res = await axios.post(
        "/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
          withCredentials: true,
        }
      );

      console.log("data", res.data);

      logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <aside className="sidebar">
      <div className="wrapper">
        <div className="logo">
          <h1>WIR</h1>
        </div>

        <nav>
          <ul>
            <NavItem
              active={pathname}
              href={"/"}
              icon="overview"
              title="Overview"
            />
            <NavItem
              active={pathname}
              href={"/history"}
              icon="history"
              title="History"
            />
            <NavItem icon="logout" title="Logout" isButton onClick={logout} />
          </ul>
        </nav>
      </div>
    </aside>
  );
}
