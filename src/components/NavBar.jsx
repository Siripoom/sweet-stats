import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Sweet Stats
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/manage-desserts">Manage Desserts</Link>
          </li>
          {/* <li>
            <Link to="/health-info">Health Info</Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
