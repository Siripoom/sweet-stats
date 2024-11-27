import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar ">
      <div className="flex-1">
        {/* <Link to="/" className="btn btn-ghost normal-case text-xl">
          งดทานหวานเพราะน้ำตาลแพงมาก
        </Link> */}
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/manage-desserts"></Link>
          </li>
          <li>
            <Link to="/weight">คำนวนน้ำตาล</Link>
          </li>
          <li>{/* <Link to="/">LogIn</Link> */}</li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
